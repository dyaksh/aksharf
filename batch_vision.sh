#!/bin/bash
# Process images one by one with delay
BASE="/home/z/my-project/public/images/portfolio"
RESULTS="/home/z/my-project/vision_results.txt"
> "$RESULTS"

analyze() {
    local img="$1"
    local prompt="$2"
    local full_path="${BASE}/${img}"
    
    for attempt in 1 2 3 4 5; do
        raw=$(z-ai vision -p "$prompt" -i "$full_path" 2>&1)
        
        if echo "$raw" | grep -q "429\|Too many"; then
            echo "  Rate limited, waiting 30s (attempt $attempt)..." >&2
            sleep 30
            continue
        fi
        
        # Extract content from JSON
        content=$(echo "$raw" | python3 -c "
import sys, json
o = sys.stdin.read()
s = o.find('{')
if s >= 0:
    d = 0
    for i in range(s, len(o)):
        if o[i] == '{': d += 1
        elif o[i] == '}':
            d -= 1
            if d == 0:
                data = json.loads(o[s:i+1])
                print(data['choices'][0]['message']['content'].strip())
                break
" 2>/dev/null)
        
        if [ -n "$content" ]; then
            echo "$content"
            return 0
        fi
    done
    echo "FAILED"
}

# Product images
PRODUCTS=(
    "bed/bed-1.png"
    "bed/bed-2.png"
    "sofa/sofa-1.jpeg"
    "sofa/sofa-2.jpeg"
    "sofa/sofa-3.png"
    "sofa/sofa-4.png"
    "chairs/chair-1.jpeg"
    "chairs/chair-2.jpeg"
    "chairs/chair-3.png"
    "table/table-1.jpeg"
    "table/table-2.png"
    "table/table-3.png"
    "cabinet/cabinet-1.png"
    "cupboard/cupboard-1.png"
    "lamp/lamp-1.png"
    "lamp/lamp-2.png"
)

echo "=== PRODUCT IMAGES ==="
for img in "${PRODUCTS[@]}"; do
    result=$(analyze "$img" "What single piece of furniture is shown? 3-5 words only.")
    echo "${img} → ${result}"
    echo "PRODUCT|${img}|${result}" >> "$RESULTS"
    sleep 8
done

# Catalog pages
CATALOGS=(
    "catalog-04.jpg"
    "catalog-06.jpg"
    "catalog-12.jpg"
    "catalog-14.jpg"
    "catalog-22.jpg"
    "catalog-24.jpg"
    "catalog-28.jpg"
    "catalog-30.jpg"
    "catalog-32.jpg"
    "catalog-36.jpg"
    "catalog-38.jpg"
    "catalog-42.jpg"
    "catalog-44.jpg"
)

echo ""
echo "=== CATALOG PAGES ==="
for img in "${CATALOGS[@]}"; do
    result=$(analyze "$img" "Is this a single product photo or a catalog page with multiple products? Answer 'single' or 'multiple' then describe in 3-5 words.")
    echo "${img} → ${result}"
    echo "CATALOG|${img}|${result}" >> "$RESULTS"
    sleep 8
done

echo ""
echo "=== COMPLETE MAPPING ==="
cat "$RESULTS"

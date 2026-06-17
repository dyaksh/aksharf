#!/bin/bash
cd /home/z/my-project
AI_DIR="./public/images/room-transformation/ai"
mkdir -p "$AI_DIR"

# Try to generate one missing image at a time
declare -A PROMPTS
PROMPTS=(
  ["before-guest-room"]="Empty hotel guest room under construction, bare grey walls, concrete floor, no furniture, exposed ceiling ducts, dim lighting, realistic interior photography, wide angle, no people"
  ["after-guest-room"]="Luxurious hotel guest room fully furnished, elegant dark wood headboard, crisp white bedding, modern nightstands with lamps, desk with task chair, floor lamp, artwork on walls, warm ambient lighting, realistic interior photography, wide angle, no people"
  ["before-suite"]="Empty luxury hotel suite before furnishing, bare walls, unfinished floor, no furniture, exposed pipes, grey concrete, realistic interior photography, wide angle, no people"
  ["after-suite"]="Stunning luxury hotel executive suite fully furnished, upholstered sofa and armchairs, coffee table, king bed with tufted headboard panel, chandelier, decorative mirrors and art, warm ambient lighting, realistic interior photography, wide angle, no people"
  ["before-bathroom"]="Empty hotel bathroom before renovation, bare walls, unfinished plumbing, no vanity no mirror, exposed pipes, grey concrete floor, realistic interior photography, wide angle, no people"
  ["after-bathroom"]="Elegant hotel bathroom fully furnished, modern vanity with basin, framed mirror, towel rack with white towels, soap dispenser, vanity lighting, marble countertop, chrome fixtures, realistic interior photography, wide angle, no people"
  ["before-lobby"]="Empty hotel lobby before furnishing, vast empty space, bare walls, concrete floor, no reception desk no seating, exposed ceiling, realistic interior photography, wide angle, no people"
  ["after-lobby"]="Grand hotel lobby fully furnished, elegant reception desk, plush lobby seating ensemble, statement chandelier, planters, accent tables, feature wall art, marble floor, warm ambient lighting, realistic interior photography, wide angle, no people"
  ["before-dining"]="Empty hotel restaurant space before furnishing, bare walls, no tables no chairs, concrete floor, exposed ceiling, dim lighting, realistic interior photography, wide angle, no people"
  ["after-dining"]="Elegant hotel restaurant fully furnished, dining tables with chairs, pendant lighting, upholstered banquettes, buffet station, decorative partitions, warm ambient lighting, realistic interior photography, wide angle, no people"
  ["before-lighting"]="Empty hotel corridor before lighting installation, bare walls, temporary construction lights, no fixtures, exposed wiring, grey concrete, realistic interior photography, wide angle, no people"
  ["after-lighting"]="Beautifully lit hotel corridor with installed lighting fixtures, wall sconces, ceiling pendant lights, ambient LED accent lighting, warm glow, elegant wall panels, carpet runner, realistic interior photography, wide angle, no people"
)

echo "[$(date)] Checking for missing room images..."

for key in "${!PROMPTS[@]}"; do
  filepath="$AI_DIR/${key}.png"
  if [ -f "$filepath" ] && [ "$(wc -c < "$filepath")" -gt 10000 ]; then
    continue  # Already exists
  fi
  
  echo "[$(date)] Generating: ${key}.png"
  if z-ai image -p "${PROMPTS[$key]}" -o "$filepath" -s 1344x768 2>&1; then
    echo "[$(date)] ✓ Generated: ${key}.png"
  else
    echo "[$(date)] ✗ Failed: ${key}.png (will retry next run)"
  fi
  
  sleep 5  # Brief pause between generations
  break  # Only generate one per run to avoid rate limits
done

echo "[$(date)] Done. Files:"
ls -la "$AI_DIR"/*.png 2>/dev/null || echo "  No files yet"

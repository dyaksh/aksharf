#!/bin/bash
OUTDIR="/home/z/my-project/public/images/portfolio/products"

generate() {
  local name=$1
  local prompt=$2
  local outfile="$OUTDIR/$name"
  
  if [ -f "$outfile" ]; then
    echo "SKIP $name (exists)"
    return 0
  fi
  
  for attempt in 1 2 3; do
    echo "Generating $name (attempt $attempt)..."
    result=$(z-ai image -p "$prompt" -o "$outfile" -s 864x1152 2>&1)
    if echo "$result" | grep -q "completed"; then
      echo "OK $name"
      sleep 15
      return 0
    fi
    echo "RETRY $name after error"
    sleep 60
  done
  echo "FAIL $name"
}

generate "sofa-1.png" "Professional product photo of a modern hotel sofa in cream fabric, clean white studio background, soft lighting, hospitality FF&E catalog, high quality"
generate "chair-1.png" "Professional product photo of a hotel lounge accent chair with dark wood frame and cream upholstery, clean white studio background, soft lighting, high quality"
generate "desk-1.png" "Professional product photo of a hotel bedroom writing desk in warm walnut wood with metal legs, clean white studio background, soft lighting, high quality"
generate "dresser-1.png" "Professional product photo of a hotel bedroom dresser chest in dark walnut wood with marble top, clean white studio background, soft lighting, high quality"
generate "lamp-1.png" "Professional product photo of a modern hotel table lamp with fabric shade, clean white studio background, soft lighting, hospitality FF&E catalog, high quality"
generate "lamp-2.png" "Professional product photo of a hotel floor standing lamp with brass finish, clean white studio background, soft lighting, hospitality FF&E, high quality"
generate "wardrobe-1.png" "Professional product photo of a hotel wardrobe closet in dark walnut wood, clean white studio background, soft lighting, hospitality furniture, high quality"
generate "ottoman-1.png" "Professional product photo of a hotel bedroom ottoman bench at foot of bed, cream fabric, clean white studio background, soft lighting, high quality"
generate "mirror-1.png" "Professional product photo of a decorative hotel wall mirror with ornate frame, clean white studio background, soft lighting, hospitality FF&E, high quality"
generate "ctable-1.png" "Professional product photo of a hotel C-table nesting side table in wood and metal, clean white studio background, soft lighting, high quality"
generate "bench-1.png" "Professional product photo of a hotel luggage bench in wood with fabric cushion, clean white studio background, soft lighting, high quality"
generate "tv-console-1.png" "Professional product photo of a hotel TV console media unit in dark wood, clean white studio background, soft lighting, high quality"

echo "DONE"
ls -la "$OUTDIR"

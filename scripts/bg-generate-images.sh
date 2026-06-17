#!/bin/bash
# Background AI image generator for room transformation
# Run this script periodically - it skips already-generated images
# Usage: bash scripts/bg-generate-images.sh

cd /home/z/my-project

AI_DIR="./public/images/room-transformation/ai"
mkdir -p "$AI_DIR"

declare -A PROMPTS
PROMPTS[before-guest-room.png]="Empty hotel guest room under construction, bare concrete walls, no furniture, no flooring, exposed wiring, wide angle, photorealistic, 8K, no text watermark"
PROMPTS[after-guest-room.png]="Luxurious furnished hotel guest room, plush king bed with headboard, nightstands with lamps, dresser, warm lighting, modern interior, 8K, no text watermark"
PROMPTS[before-suite.png]="Empty luxury hotel suite under construction, large bare room concrete floor, exposed ductwork ceiling, no furniture, wide angle, photorealistic, 8K, no text watermark"
PROMPTS[after-suite.png]="Beautifully furnished executive hotel suite, L-shaped sofa, coffee table, chandelier, large windows, elegant decor, luxury interior, 8K, no text watermark"
PROMPTS[before-bathroom.png]="Unfinished hotel bathroom, bare concrete walls, exposed plumbing, no fixtures, cement board, construction lights, wide angle, 8K, no text watermark"
PROMPTS[after-bathroom.png]="Elegant luxury hotel bathroom, marble vanity, framed mirror, glass shower, towel rack, warm lighting, 5-star quality, 8K, no text watermark"
PROMPTS[before-lobby.png]="Empty hotel lobby under construction, concrete pillars, bare floors, no furniture, ceiling grid exposed, wide angle, 8K, no text watermark"
PROMPTS[after-lobby.png]="Grand hotel lobby reception, marble floor, front desk, lounge seating, chandelier, potted plants, luxury interior, 8K, no text watermark"
PROMPTS[before-dining.png]="Empty restaurant dining room under construction, bare concrete, no tables chairs, exposed ceiling, construction site, wide angle, 8K, no text watermark"
PROMPTS[after-dining.png]="Elegant hotel restaurant, dining tables with chairs, pendant lights, banquettes, warm lighting, sophisticated interior, 8K, no text watermark"
PROMPTS[before-lighting.png]="Dark hotel corridor, no light fixtures, bare ceiling electrical boxes, concrete walls, gloomy, under construction, wide angle, 8K, no text watermark"
PROMPTS[after-lighting.png]="Beautifully lit luxury hotel corridor, wall sconces, recessed ceiling lights, warm glow, carpeted floor, art on walls, 8K, no text watermark"

GENERATED=0
SKIPPED=0
FAILED=0

for name in "${!PROMPTS[@]}"; do
  outfile="$AI_DIR/$name"
  if [ -f "$outfile" ] && [ "$(stat -c %s "$outfile")" -gt 5000 ]; then
    echo "✅ SKIP (exists): $name"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo "🎨 Generating: $name"
  if z-ai image -p "${PROMPTS[$name]}" -o "$outfile" -s 1344x768 2>&1; then
    if [ -f "$outfile" ] && [ "$(stat -c %s "$outfile")" -gt 5000 ]; then
      echo "✅ DONE: $name"
      GENERATED=$((GENERATED + 1))
    else
      echo "❌ EMPTY: $name"
      FAILED=$((FAILED + 1))
    fi
  else
    echo "❌ FAIL: $name"
    FAILED=$((FAILED + 1))
  fi
  # Wait between images
  sleep 10
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: $GENERATED generated, $SKIPPED skipped, $FAILED failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
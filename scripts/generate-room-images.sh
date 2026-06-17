#!/bin/bash
# Persistent room image generation script
# Keeps retrying with exponential backoff until all 12 images are generated
# Each image pair: before (empty/construction) and after (furnished)

cd /home/z/my-project
AI_DIR="./public/images/room-transformation/ai"
mkdir -p "$AI_DIR"

log() { echo "[$(date '+%H:%M:%S')] $1"; }

# Define all 12 image generation tasks
# Format: "filename|prompt"
TASKS=(
  "before-guest-room|Empty hotel guest room under construction, bare grey walls, concrete floor, no furniture, exposed ceiling ducts, dim lighting, realistic interior photography, wide angle, no people"
  "after-guest-room|Luxurious hotel guest room fully furnished, elegant dark wood headboard, crisp white bedding, modern nightstands with lamps, desk with task chair, floor lamp, artwork on walls, warm ambient lighting, realistic interior photography, wide angle, no people"
  "before-suite|Empty luxury hotel suite before furnishing, bare walls, unfinished floor, no furniture, exposed pipes, grey concrete, realistic interior photography, wide angle, no people"
  "after-suite|Stunning luxury hotel executive suite fully furnished, upholstered sofa and armchairs, coffee table, king bed with tufted headboard panel, chandelier, decorative mirrors and art, warm ambient lighting, realistic interior photography, wide angle, no people"
  "before-bathroom|Empty hotel bathroom before renovation, bare walls, unfinished plumbing, no vanity no mirror, exposed pipes, grey concrete floor, realistic interior photography, wide angle, no people"
  "after-bathroom|Elegant hotel bathroom fully furnished, modern vanity with basin, framed mirror, towel rack with white towels, soap dispenser, vanity lighting, marble countertop, chrome fixtures, realistic interior photography, wide angle, no people"
  "before-lobby|Empty hotel lobby before furnishing, vast empty space, bare walls, concrete floor, no reception desk no seating, exposed ceiling, realistic interior photography, wide angle, no people"
  "after-lobby|Grand hotel lobby fully furnished, elegant reception desk, plush lobby seating ensemble, statement chandelier, planters, accent tables, feature wall art, marble floor, warm ambient lighting, realistic interior photography, wide angle, no people"
  "before-dining|Empty hotel restaurant space before furnishing, bare walls, no tables no chairs, concrete floor, exposed ceiling, dim lighting, realistic interior photography, wide angle, no people"
  "after-dining|Elegant hotel restaurant fully furnished, dining tables with chairs, pendant lighting, upholstered banquettes, buffet station, decorative partitions, warm ambient lighting, realistic interior photography, wide angle, no people"
  "before-lighting|Empty hotel corridor before lighting installation, bare walls, temporary construction lights, no fixtures, exposed wiring, grey concrete, realistic interior photography, wide angle, no people"
  "after-lighting|Beautifully lit hotel corridor with installed lighting fixtures, wall sconces, ceiling pendant lights, ambient LED accent lighting, warm glow, elegant wall panels, carpet runner, realistic interior photography, wide angle, no people"
)

log "=== Room Image Generation Script ==="
log "Total images to generate: ${#TASKS[@]}"

WAIT=60  # Initial wait between attempts
MAX_WAIT=300  # Max 5 minutes between retries
TOTAL_RETRIES=0

for task in "${TASKS[@]}"; do
  IFS='|' read -r filename prompt <<< "$task"
  filepath="$AI_DIR/${filename}.png"
  
  # Skip if already exists and is > 10KB
  if [ -f "$filepath" ] && [ "$(wc -c < "$filepath")" -gt 10000 ]; then
    log "⏭ Skipping (exists): ${filename}.png"
    continue
  fi
  
  log "Generating: ${filename}.png"
  
  SUCCESS=false
  ATTEMPT=0
  
  while [ "$SUCCESS" = false ] && [ $ATTEMPT -lt 8 ]; do
    ATTEMPT=$((ATTEMPT + 1))
    TOTAL_RETRIES=$((TOTAL_RETRIES + 1))
    
    log "  Attempt $ATTEMPT for ${filename}.png..."
    
    OUTPUT=$(z-ai image -p "$prompt" -o "$filepath" -s 1344x768 2>&1)
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -eq 0 ] && [ -f "$filepath" ] && [ "$(wc -c < "$filepath")" -gt 10000 ]; then
      log "  ✓ Generated: ${filename}.png ($(du -h "$filepath" | cut -f1))"
      SUCCESS=true
      WAIT=30  # Reset wait on success
      sleep 3
    else
      log "  ✗ Failed (attempt $ATTEMPT). Exit code: $EXIT_CODE"
      if echo "$OUTPUT" | grep -q "429"; then
        log "  Rate limited. Waiting ${WAIT}s..."
        sleep $WAIT
        WAIT=$((WAIT + 30))
        [ $WAIT -gt $MAX_WAIT ] && WAIT=$MAX_WAIT
      else
        log "  Non-rate-limit error. Waiting 10s..."
        sleep 10
      fi
    fi
  done
  
  if [ "$SUCCESS" = false ]; then
    log "  ✗ FAILED after $ATTEMPT attempts: ${filename}.png"
  fi
done

log ""
log "=== Generation Complete ==="
log "Total retries: $TOTAL_RETRIES"
log "Files generated:"
ls -la "$AI_DIR"/*.png 2>/dev/null || log "  No files found"

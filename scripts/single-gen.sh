#!/bin/bash
# Generate a single room transformation image with retry
# Usage: bash single-gen.sh "filename" "prompt"

FILENAME="$1"
PROMPT="$2"
OUTDIR="/home/z/my-project/public/images/room-transformation/ai"
OUTPATH="$OUTDIR/$FILENAME"

mkdir -p "$OUTDIR"

# Skip if file exists and is > 10KB
if [ -f "$OUTPATH" ] && [ $(stat -f%z "$OUTPATH" 2>/dev/null || stat -c%s "$OUTPATH" 2>/dev/null) -gt 10000 ]; then
  echo "SKIP: $FILENAME already exists"
  exit 0
fi

cd /home/z/my-project

for attempt in 1 2 3; do
  echo "Attempt $attempt: $FILENAME"
  if z-ai image -p "$PROMPT" -o "$OUTPATH" -s 1344x768 2>/dev/null; then
    echo "OK: $FILENAME"
    exit 0
  fi
  echo "FAIL attempt $attempt, waiting..."
  sleep 60
done

echo "FAILED: $FILENAME after 3 attempts"
exit 1
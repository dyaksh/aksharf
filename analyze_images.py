#!/usr/bin/env python3
"""Analyze product images using z-ai vision CLI tool with rate limiting and retries."""
import subprocess
import json
import time
import sys
import os

IMAGES = [
    "bed/bed-1.png",
    "bed/bed-2.png",
    "sofa/sofa-1.jpeg",
    "sofa/sofa-2.jpeg",
    "sofa/sofa-3.png",
    "sofa/sofa-4.png",
    "chairs/chair-1.jpeg",
    "chairs/chair-2.jpeg",
    "chairs/chair-3.png",
    "table/table-1.jpeg",
    "table/table-2.png",
    "table/table-3.png",
    "cabinet/cabinet-1.png",
    "cupboard/cupboard-1.png",
    "lamp/lamp-1.png",
    "lamp/lamp-2.png",
]

CATALOG_PAGES = [
    "catalog-04.jpg",
    "catalog-06.jpg",
    "catalog-12.jpg",
    "catalog-14.jpg",
    "catalog-22.jpg",
    "catalog-24.jpg",
    "catalog-28.jpg",
    "catalog-30.jpg",
    "catalog-32.jpg",
    "catalog-36.jpg",
    "catalog-38.jpg",
    "catalog-42.jpg",
    "catalog-44.jpg",
]

BASE = "/home/z/my-project/public/images/portfolio"
PROMPT_PRODUCT = "What single piece of furniture is shown? 3-5 words only."
PROMPT_CATALOG = "Is this a single product photo or a catalog page with multiple products? Answer 'single' or 'multiple' then describe in 3-5 words."
RESULTS_FILE = "/home/z/my-project/vision_results.json"

def parse_vision_output(output):
    """Extract content from z-ai vision JSON output."""
    start = output.find('{')
    if start < 0:
        return None
    depth = 0
    for i in range(start, len(output)):
        if output[i] == '{': depth += 1
        elif output[i] == '}':
            depth -= 1
            if depth == 0:
                try:
                    data = json.loads(output[start:i+1])
                    return data['choices'][0]['message']['content'].strip()
                except:
                    return None
    return None

def run_vision(image_path, prompt, max_retries=5):
    """Run z-ai vision with retries on rate limit."""
    full_path = os.path.join(BASE, image_path)
    for attempt in range(max_retries):
        try:
            result = subprocess.run(
                ["z-ai", "vision", "-p", prompt, "-i", full_path],
                capture_output=True, text=True, timeout=60
            )
            output = result.stdout + result.stderr
            
            if "429" in output or "Too many requests" in output:
                wait = 30 * (attempt + 1)
                print(f"    Rate limited, waiting {wait}s...", flush=True)
                time.sleep(wait)
                continue
            
            content = parse_vision_output(output)
            if content:
                return content
            return f"PARSE_ERROR"
        except subprocess.TimeoutExpired:
            time.sleep(15)
            continue
        except Exception as e:
            return f"ERROR: {e}"
    return "FAILED: max retries"

# Load existing results if any
results = {}
if os.path.exists(RESULTS_FILE):
    with open(RESULTS_FILE) as f:
        results = json.load(f)
    print(f"Loaded {len(results)} existing results", flush=True)

def save_results():
    with open(RESULTS_FILE, 'w') as f:
        json.dump(results, f, indent=2)

# Process product images
print("=" * 60, flush=True)
print("PRODUCT IMAGES", flush=True)
print("=" * 60, flush=True)
for i, img in enumerate(IMAGES):
    if img in results:
        print(f"[{i+1}/{len(IMAGES)}] {img} → {results[img]} (cached)", flush=True)
        continue
    print(f"[{i+1}/{len(IMAGES)}] Analyzing {img}...", flush=True)
    content = run_vision(img, PROMPT_PRODUCT)
    results[img] = content
    print(f"  → {content}", flush=True)
    save_results()
    time.sleep(6)

# Process catalog pages
print("\n" + "=" * 60, flush=True)
print("CATALOG PAGES", flush=True)
print("=" * 60, flush=True)
for i, img in enumerate(CATALOG_PAGES):
    if img in results:
        print(f"[{i+1}/{len(CATALOG_PAGES)}] {img} → {results[img]} (cached)", flush=True)
        continue
    print(f"[{i+1}/{len(CATALOG_PAGES)}] Analyzing {img}...", flush=True)
    content = run_vision(img, PROMPT_CATALOG)
    results[img] = content
    print(f"  → {content}", flush=True)
    save_results()
    time.sleep(6)

# Final summary
print("\n" + "=" * 60, flush=True)
print("COMPLETE MAPPING", flush=True)
print("=" * 60, flush=True)
for k in sorted(results.keys()):
    print(f"  {k} → {results[k]}", flush=True)

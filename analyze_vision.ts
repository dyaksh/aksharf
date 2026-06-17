import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const BASE = '/home/z/my-project/public/images/portfolio';

const PRODUCT_IMAGES = [
  'bed/bed-1.png',
  'bed/bed-2.png',
  'sofa/sofa-1.jpeg',
  'sofa/sofa-2.jpeg',
  'sofa/sofa-3.png',
  'sofa/sofa-4.png',
  'chairs/chair-1.jpeg',
  'chairs/chair-2.jpeg',
  'chairs/chair-3.png',
  'table/table-1.jpeg',
  'table/table-2.png',
  'table/table-3.png',
  'cabinet/cabinet-1.png',
  'cupboard/cupboard-1.png',
  'lamp/lamp-1.png',
  'lamp/lamp-2.png',
];

const CATALOG_PAGES = [
  'catalog-04.jpg',
  'catalog-06.jpg',
  'catalog-12.jpg',
  'catalog-14.jpg',
  'catalog-22.jpg',
  'catalog-24.jpg',
  'catalog-28.jpg',
  'catalog-30.jpg',
  'catalog-32.jpg',
  'catalog-36.jpg',
  'catalog-38.jpg',
  'catalog-42.jpg',
  'catalog-44.jpg',
];

const PRODUCT_PROMPT = "What single piece of furniture is shown? 3-5 words only.";
const CATALOG_PROMPT = "Is this a single product photo or a catalog page with multiple products? Answer 'single' or 'multiple' then describe in 3-5 words.";

const RESULTS_FILE = '/home/z/my-project/vision_results.json';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function imageToBase64(imagePath: string): { base64: string; mimeType: string } {
  const buffer = fs.readFileSync(imagePath);
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.jpeg' ? 'image/jpeg' : 'image/jpeg';
  return { base64: buffer.toString('base64'), mimeType };
}

async function analyzeImage(zai: any, imagePath: string, prompt: string, maxRetries = 5): Promise<string> {
  const fullPath = path.join(BASE, imagePath);
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { base64, mimeType } = imageToBase64(fullPath);
      
      const response = await zai.chat.completions.createVision({
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${base64}` }
              }
            ]
          }
        ],
        thinking: { type: 'disabled' }
      });
      
      return response.choices[0]?.message?.content?.trim() || 'EMPTY';
    } catch (error: any) {
      if (error?.message?.includes('429') || error?.message?.includes('Too many')) {
        const wait = 15 * (attempt + 1);
        console.error(`  Rate limited, waiting ${wait}s (attempt ${attempt + 1}/${maxRetries})...`);
        await sleep(wait * 1000);
        continue;
      }
      console.error(`  Error: ${error?.message?.slice(0, 100)}`);
      await sleep(5000);
      continue;
    }
  }
  return 'FAILED: max retries';
}

async function main() {
  // Load existing results
  let results: Record<string, string> = {};
  if (fs.existsSync(RESULTS_FILE)) {
    results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
    console.log(`Loaded ${Object.keys(results).length} existing results`);
  }
  
  const zai = await ZAI.create();
  console.log('SDK initialized');
  
  // Process product images
  console.log('\n=== PRODUCT IMAGES ===');
  for (let i = 0; i < PRODUCT_IMAGES.length; i++) {
    const img = PRODUCT_IMAGES[i];
    if (results[img]) {
      console.log(`[${i+1}/${PRODUCT_IMAGES.length}] ${img} → ${results[img]} (cached)`);
      continue;
    }
    console.log(`[${i+1}/${PRODUCT_IMAGES.length}] Analyzing ${img}...`);
    const content = await analyzeImage(zai, img, PRODUCT_PROMPT);
    results[img] = content;
    console.log(`  → ${content}`);
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    await sleep(3000);
  }
  
  // Process catalog pages
  console.log('\n=== CATALOG PAGES ===');
  for (let i = 0; i < CATALOG_PAGES.length; i++) {
    const img = CATALOG_PAGES[i];
    if (results[img]) {
      console.log(`[${i+1}/${CATALOG_PAGES.length}] ${img} → ${results[img]} (cached)`);
      continue;
    }
    console.log(`[${i+1}/${CATALOG_PAGES.length}] Analyzing ${img}...`);
    const content = await analyzeImage(zai, img, CATALOG_PROMPT);
    results[img] = content;
    console.log(`  → ${content}`);
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    await sleep(3000);
  }
  
  // Final summary
  console.log('\n=== COMPLETE MAPPING ===');
  const allKeys = [...PRODUCT_IMAGES, ...CATALOG_PAGES].sort();
  for (const k of allKeys) {
    console.log(`  ${k} → ${results[k] || 'NOT ANALYZED'}`);
  }
}

main().catch(console.error);

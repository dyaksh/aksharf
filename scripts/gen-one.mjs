import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images/room-transformation/ai';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Get filename from command line args
const filename = process.argv[2];
const prompt = process.argv[3];

if (!filename || !prompt) {
  console.error('Usage: node gen-one.mjs <filename> <prompt>');
  process.exit(1);
}

const outputPath = path.join(OUTPUT_DIR, filename);

if (fs.existsSync(outputPath)) {
  const stat = fs.statSync(outputPath);
  if (stat.size > 10000) {
    console.log(`SKIP: ${filename} already exists (${(stat.size/1024).toFixed(1)} KB)`);
    process.exit(0);
  }
}

async function main() {
  const zai = await ZAI.create();
  
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      console.log(`Attempt ${attempt}: ${filename}`);
      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1344x768'
      });
      
      if (!response.data?.[0]?.base64) throw new Error('No image data');
      
      const buffer = Buffer.from(response.data[0].base64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`OK: ${filename} (${(buffer.length/1024).toFixed(1)} KB)`);
      return;
    } catch (err) {
      console.log(`FAIL attempt ${attempt}: ${(err.message||'').substring(0, 100)}`);
      if (attempt < 4) {
        const wait = 15 * attempt;
        console.log(`Waiting ${wait}s...`);
        await new Promise(r => setTimeout(r, wait * 1000));
      }
    }
  }
  console.error(`FAILED: ${filename} after 4 attempts`);
  process.exit(1);
}

main();
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './public/images/room-transformation/ai';

const beforePrompts = [
  { id: 'before-guest-room', prompt: 'Empty hotel guest room under construction, bare grey walls, concrete floor, no furniture, exposed ceiling ducts, dim lighting, realistic interior photography, wide angle, no people' },
  { id: 'before-suite', prompt: 'Empty luxury hotel suite before furnishing, bare walls, unfinished floor, no furniture, exposed pipes, grey concrete, realistic interior photography, wide angle, no people' },
  { id: 'before-bathroom', prompt: 'Empty hotel bathroom before renovation, bare walls, unfinished plumbing, no vanity no mirror, exposed pipes, grey concrete floor, realistic interior photography, wide angle, no people' },
  { id: 'before-lobby', prompt: 'Empty hotel lobby before furnishing, vast empty space, bare walls, concrete floor, no reception desk no seating, exposed ceiling, realistic interior photography, wide angle, no people' },
  { id: 'before-dining', prompt: 'Empty hotel restaurant space before furnishing, bare walls, no tables no chairs, concrete floor, exposed ceiling, dim lighting, realistic interior photography, wide angle, no people' },
  { id: 'before-lighting', prompt: 'Empty hotel corridor before lighting installation, bare walls, temporary construction lights, no fixtures, exposed wiring, grey concrete, realistic interior photography, wide angle, no people' },
];

const afterPrompts = [
  { id: 'after-guest-room', prompt: 'Luxurious hotel guest room fully furnished, elegant dark wood headboard, crisp white bedding, modern nightstands with lamps, desk with task chair, floor lamp, artwork on walls, warm ambient lighting, plush carpet, realistic interior photography, wide angle, no people' },
  { id: 'after-suite', prompt: 'Stunning luxury hotel executive suite fully furnished, upholstered sofa and armchairs, coffee table, king bed with tufted headboard panel, chandelier, decorative mirrors and art, warm ambient lighting, realistic interior photography, wide angle, no people' },
  { id: 'after-bathroom', prompt: 'Elegant hotel bathroom fully furnished, modern vanity with basin, framed mirror, towel rack with white towels, soap dispenser, vanity lighting, marble countertop, chrome fixtures, realistic interior photography, wide angle, no people' },
  { id: 'after-lobby', prompt: 'Grand hotel lobby fully furnished, elegant reception desk, plush lobby seating ensemble, statement chandelier, planters, accent tables, feature wall art, marble floor, warm ambient lighting, realistic interior photography, wide angle, no people' },
  { id: 'after-dining', prompt: 'Elegant hotel restaurant fully furnished, dining tables with chairs, pendant lighting, upholstered banquettes, buffet station, decorative partitions, warm ambient lighting, realistic interior photography, wide angle, no people' },
  { id: 'after-lighting', prompt: 'Beautifully lit hotel corridor with installed lighting fixtures, wall sconces, ceiling pendant lights, ambient LED accent lighting, warm glow, elegant wall panels, carpet runner, realistic interior photography, wide angle, no people' },
];

async function generateImage(zai, prompt, outputPath, maxRetries = 10) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Generating ${path.basename(outputPath)} (attempt ${attempt})...`);
      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1344x768'
      });
      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`  ✓ Generated: ${path.basename(outputPath)} (${(buffer.length / 1024).toFixed(0)}KB)`);
      return true;
    } catch (e) {
      const msg = e?.message || String(e);
      if (msg.includes('429') || msg.includes('rate') || msg.includes('Rate')) {
        const waitSec = 60 + (attempt * 30); // 60s, 90s, 120s...
        console.log(`  Rate limited. Waiting ${waitSec}s (attempt ${attempt}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, waitSec * 1000));
      } else {
        console.error(`  ✗ Failed: ${path.basename(outputPath)} - ${msg}`);
        return false;
      }
    }
  }
  console.error(`  ✗ All retries exhausted for: ${path.basename(outputPath)}`);
  return false;
}

async function main() {
  console.log('Starting room image generation...');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let zai;
  try {
    zai = await ZAI.create();
    console.log('Z-AI SDK initialized');
  } catch(e) {
    console.error('Failed to initialize SDK:', e?.message);
    process.exit(1);
  }

  const allPrompts = [...beforePrompts, ...afterPrompts];
  let generated = 0;
  let skipped = 0;

  for (const item of allPrompts) {
    const outputPath = path.join(OUTPUT_DIR, `${item.id}.png`);

    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 10000) {
      console.log(`  ⏭ Skipping (exists): ${item.id}.png`);
      skipped++;
      continue;
    }

    const success = await generateImage(zai, item.prompt, outputPath);
    if (success) generated++;

    // Delay between requests to avoid rate limits
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\n✅ Done! Generated: ${generated}, Skipped: ${skipped}, Total: ${allPrompts.length}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`Files in output: ${files.join(', ')}`);
}

main().catch(e => {
  console.error('Fatal error:', e?.message || e);
  process.exit(1);
});

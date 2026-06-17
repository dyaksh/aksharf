import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './public/images/room-transformation/ai';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const images = [
  { name: 'before-guest-room.png', prompt: 'Photorealistic wide-angle photograph of an empty hotel guest room under construction, bare concrete walls, exposed electrical wiring, no furniture, no flooring, dust on windowsill, industrial ceiling lights, raw unfinished state, 8K quality, no text no watermark' },
  { name: 'after-guest-room.png', prompt: 'Photorealistic wide-angle photograph of a luxurious furnished hotel guest room, plush king bed with elegant headboard, two nightstands with lamps, dresser with mirror, desk with chair, warm ambient lighting, modern interior design, high-end hospitality, 8K quality, no text no watermark' },
  { name: 'before-suite.png', prompt: 'Photorealistic wide-angle photograph of an empty luxury hotel suite under construction, large bare room with concrete floor, no walls finished, exposed ductwork on ceiling, window with plastic covering, no furniture, raw construction state, 8K quality, no text no watermark' },
  { name: 'after-suite.png', prompt: 'Photorealistic wide-angle photograph of a beautifully furnished executive hotel suite living area, L-shaped sofa, coffee table, modern armchairs, console table, chandelier, large windows with city view, elegant decor, luxury hospitality interior, 8K quality, no text no watermark' },
  { name: 'before-bathroom.png', prompt: 'Photorealistic wide-angle photograph of an unfinished hotel bathroom, bare concrete walls, exposed plumbing pipes, no fixtures installed, rough floor drain, cement board on walls, construction lights, raw state, 8K quality, no text no watermark' },
  { name: 'after-bathroom.png', prompt: 'Photorealistic wide-angle photograph of an elegant luxury hotel bathroom, marble vanity with modern basin, framed mirror with backlight, glass-enclosed walk-in shower, towel rack with white towels, contemporary fixtures, warm lighting, 5-star hotel quality, 8K quality, no text no watermark' },
  { name: 'before-lobby.png', prompt: 'Photorealistic wide-angle photograph of an empty hotel lobby under construction, large open space with concrete pillars, bare floors, no furniture, ceiling grid exposed, temporary construction lighting, no decoration, raw building state, 8K quality, no text no watermark' },
  { name: 'after-lobby.png', prompt: 'Photorealistic wide-angle photograph of a grand hotel lobby reception area, marble flooring, modern front desk, stylish lounge seating, large chandelier, potted plants, art on walls, welcoming atmosphere, luxury hotel interior, 8K quality, no text no watermark' },
  { name: 'before-dining.png', prompt: 'Photorealistic wide-angle photograph of an empty restaurant dining room under construction, bare concrete floor, no tables or chairs, exposed ceiling, walls unfinished, no lighting fixtures, construction site, 8K quality, no text no watermark' },
  { name: 'after-dining.png', prompt: 'Photorealistic wide-angle photograph of an elegant hotel restaurant dining area, well-set dining tables with chairs, pendant lights above tables, upholstered banquettes, warm ambient lighting, wine display, sophisticated interior design, 8K quality, no text no watermark' },
  { name: 'before-lighting.png', prompt: 'Photorealistic wide-angle photograph of a dark hotel corridor with no light fixtures, bare ceiling with electrical boxes, concrete walls, no flooring finished, gloomy atmosphere, under construction, no furniture, 8K quality, no text no watermark' },
  { name: 'after-lighting.png', prompt: 'Photorealistic wide-angle photograph of a beautifully lit luxury hotel corridor, elegant wall sconces, recessed ceiling lights, warm ambient glow, carpeted floor, framed art on walls, decorative console table, inviting atmosphere, 8K quality, no text no watermark' },
];

const targetName = process.argv[2];
const target = images.find(i => i.name === targetName);

if (!target) {
  console.error(`Usage: node generate-one.mjs <filename>\nAvailable: ${images.map(i => i.name).join(', ')}`);
  process.exit(1);
}

const outPath = path.join(OUTPUT_DIR, target.name);
if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
  console.log(`SKIP: ${target.name} already exists`);
  process.exit(0);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  const zai = await ZAI.create();
  console.log(`Generating: ${target.name}`);

  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const result = await zai.createImageGeneration({
        prompt: target.prompt,
        size: '1344x768',
        n: 1,
      });

      // The SDK returns { data: [{ base64, format }] }
      if (result?.data?.[0]?.base64) {
        const buffer = Buffer.from(result.data[0].base64, 'base64');
        fs.writeFileSync(outPath, buffer);
        console.log(`SUCCESS: ${target.name} (${(buffer.length / 1024).toFixed(0)}KB)`);
        process.exit(0);
      } else {
        console.log(`No base64 in result, retrying... (${attempt}/8)`);
        await sleep(30000);
      }
    } catch (err) {
      const msg = err?.message || String(err);
      if (msg.includes('429')) {
        const wait = 60000 * attempt;
        console.log(`Rate limited. Waiting ${wait/1000}s (attempt ${attempt}/8)...`);
        await sleep(wait);
      } else {
        console.error(`Error: ${msg}`);
        if (attempt < 8) {
          await sleep(30000);
        } else {
          process.exit(1);
        }
      }
    }
  }
  console.error(`FAILED: ${target.name} after 8 attempts`);
  process.exit(1);
}

main();
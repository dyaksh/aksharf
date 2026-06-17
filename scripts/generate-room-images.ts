import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const images = [
  {
    name: 'before-guest-room.png',
    prompt: 'Photorealistic wide-angle photograph of an empty hotel guest room under construction, bare concrete walls, exposed electrical wiring, no furniture, no flooring installed, dust on windowsill, industrial ceiling lights, raw unfinished state, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-guest-room.png',
    prompt: 'Photorealistic wide-angle photograph of a luxurious furnished hotel guest room, plush king bed with elegant headboard, two nightstands with lamps, dresser with mirror, desk with chair, warm ambient lighting, modern interior design, high-end hospitality, 8K quality, no text no watermark',
  },
  {
    name: 'before-suite.png',
    prompt: 'Photorealistic wide-angle photograph of an empty luxury hotel suite under construction, large bare room with concrete floor, no walls finished, exposed ductwork on ceiling, window with plastic covering, no furniture, raw construction state, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-suite.png',
    prompt: 'Photorealistic wide-angle photograph of a beautifully furnished executive hotel suite living area, L-shaped sofa, coffee table, modern armchairs, console table, chandelier, large windows with city view, elegant decor, luxury hospitality interior, 8K quality, no text no watermark',
  },
  {
    name: 'before-bathroom.png',
    prompt: 'Photorealistic wide-angle photograph of an unfinished hotel bathroom, bare concrete walls, exposed plumbing pipes, no fixtures installed, rough floor drain, cement board on walls, construction lights, raw state, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-bathroom.png',
    prompt: 'Photorealistic wide-angle photograph of an elegant luxury hotel bathroom, marble vanity with modern basin, framed mirror with backlight, glass-enclosed walk-in shower, towel rack with white towels, contemporary fixtures, warm lighting, 5-star hotel quality, 8K quality, no text no watermark',
  },
  {
    name: 'before-lobby.png',
    prompt: 'Photorealistic wide-angle photograph of an empty hotel lobby under construction, large open space with concrete pillars, bare floors, no furniture, ceiling grid exposed, temporary construction lighting, no decoration, raw building state, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-lobby.png',
    prompt: 'Photorealistic wide-angle photograph of a grand hotel lobby reception area, marble flooring, modern front desk, stylish lounge seating, large chandelier, potted plants, art on walls, welcoming atmosphere, luxury hotel interior design, 8K quality, no text no watermark',
  },
  {
    name: 'before-dining.png',
    prompt: 'Photorealistic wide-angle photograph of an empty restaurant dining room under construction, bare concrete floor, no tables or chairs, exposed ceiling, walls unfinished, no lighting fixtures, no decoration, construction site, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-dining.png',
    prompt: 'Photorealistic wide-angle photograph of an elegant hotel restaurant dining area, well-set dining tables with chairs, pendant lights above tables, upholstered banquettes, warm ambient lighting, wine display, sophisticated interior design, fine dining atmosphere, 8K quality, no text no watermark',
  },
  {
    name: 'before-lighting.png',
    prompt: 'Photorealistic wide-angle photograph of a dark hotel corridor with no light fixtures, bare ceiling with electrical boxes, concrete walls, no flooring finished, gloomy atmosphere, under construction, no furniture, no decor, architectural photography, 8K quality, no text no watermark',
  },
  {
    name: 'after-lighting.png',
    prompt: 'Photorealistic wide-angle photograph of a beautifully lit luxury hotel corridor, elegant wall sconces, recessed ceiling lights, warm ambient glow, carpeted floor, framed art on walls, decorative console table, inviting atmosphere, hospitality interior design, 8K quality, no text no watermark',
  },
];

const OUTPUT_DIR = './public/images/room-transformation/ai';
const SIZE = '1344x768';
const RETRY_DELAY = 60000; // 60s between attempts
const MAX_RETRIES = 5;

async function generateImage(zai: any, name: string, prompt: string): Promise<boolean> {
  const outPath = `${OUTPUT_DIR}/${name}`;
  if (existsSync(outPath)) {
    console.log(`✅ SKIP (exists): ${name}`);
    return true;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🎨 [${attempt}/${MAX_RETRIES}] Generating: ${name}`);
      const result = await zai.image.generate({
        prompt,
        size: SIZE,
        output: outPath,
      });
      if (result && existsSync(outPath)) {
        console.log(`✅ DONE: ${name}`);
        return true;
      }
      console.log(`⚠️ No output file for: ${name}, retrying...`);
    } catch (err: any) {
      if (err.message?.includes('429')) {
        const wait = RETRY_DELAY * attempt;
        console.log(`⏳ Rate limited. Waiting ${wait / 1000}s before retry...`);
        await new Promise(r => setTimeout(r, wait));
      } else {
        console.error(`❌ Error for ${name}: ${err.message}`);
        return false;
      }
    }
  }
  console.log(`❌ FAILED after ${MAX_RETRIES} attempts: ${name}`);
  return false;
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const zai = await ZAI.create();
  console.log(`🚀 Starting generation of ${images.length} images...`);

  const results: { name: string; success: boolean }[] = [];

  for (const img of images) {
    const success = await generateImage(zai, img.name, img.prompt);
    results.push({ name: img.name, success });
    // Wait between images to avoid rate limits
    if (img !== images[images.length - 1]) {
      console.log('⏳ Waiting 15s before next image...');
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  console.log('\n📊 Results:');
  results.forEach(r => console.log(`  ${r.success ? '✅' : '❌'} ${r.name}`));
  const success = results.filter(r => r.success).length;
  console.log(`\n${success}/${images.length} images generated successfully.`);
}

main().catch(console.error);
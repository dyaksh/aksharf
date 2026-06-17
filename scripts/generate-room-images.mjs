import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images/room-transformation/ai';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const images = [
  {
    filename: 'before-guest-room.png',
    prompt: 'Photorealistic empty hotel guest room under construction, bare concrete walls, exposed electrical conduits on wall, no furniture, bare cement floor, window opening without glass or curtains, harsh fluorescent overhead lighting, wide angle interior photography, realistic construction site atmosphere'
  },
  {
    filename: 'after-guest-room.png',
    prompt: 'Photorealistic luxurious hotel guest room, king size bed with white linen and decorative pillows, modern wooden furniture, warm ambient lighting, wall art, carpeted floor, large window with sheer curtains, bedside lamps, professional interior photography, elegant hospitality design'
  },
  {
    filename: 'before-suite.png',
    prompt: 'Photorealistic empty executive hotel suite under renovation, bare drywall walls, exposed pipes and wiring, concrete subfloor, no furniture, plastic sheeting, construction dust, fluorescent construction lights, wide angle interior shot, realistic renovation site'
  },
  {
    filename: 'after-suite.png',
    prompt: 'Photorealistic luxurious executive hotel suite, separate living area with plush sofa and coffee table, king bed with premium bedding, dining area with table for four, warm ambient lighting, modern artwork on walls, hardwood floor, floor-to-ceiling windows with city view, professional interior photography, five-star hospitality design'
  },
  {
    filename: 'before-bathroom.png',
    prompt: 'Photorealistic unfinished hotel bathroom, bare concrete walls, exposed plumbing pipes, rough floor without tiles, empty space where bathtub should go, no fixtures installed, raw construction state, harsh overhead lighting, wide angle interior photography'
  },
  {
    filename: 'after-bathroom.png',
    prompt: 'Photorealistic elegant luxury hotel bathroom, marble tiles floor to ceiling, modern freestanding bathtub, glass-enclosed rainfall shower, double vanity with backlit mirror, warm LED accent lighting, fluffy white towels, potted plant, premium fixtures in brushed gold, professional interior photography, spa-like atmosphere'
  },
  {
    filename: 'before-lobby.png',
    prompt: 'Photorealistic empty hotel lobby under construction, bare concrete pillars, unfinished ceiling with exposed ductwork, bare concrete floor, no furniture or decoration, temporary construction lighting, wide angle shot from entrance, realistic construction site, empty and unfinished'
  },
  {
    filename: 'after-lobby.png',
    prompt: 'Photorealistic grand luxury hotel lobby reception area, polished marble floor, elegant reception desk, stylish lobby seating with modern sofas and armchairs, large chandelier, fresh flower arrangements, warm ambient lighting, artwork on walls, high ceiling with decorative moldings, professional interior photography, five-star hotel atmosphere'
  },
  {
    filename: 'before-dining.png',
    prompt: 'Photorealistic empty restaurant space under construction, bare concrete walls, exposed ceiling joists, bare cement floor, no tables or chairs, industrial lighting, wide angle interior shot, empty unfinished commercial space'
  },
  {
    filename: 'after-dining.png',
    prompt: 'Photorealistic elegant hotel restaurant dining area, well-set tables with white linen tablecloths and fine dinnerware, modern pendant lights above each table, upholstered dining chairs, warm ambient lighting, decorative wall panels, potted greenery, professional interior photography, upscale dining atmosphere'
  },
  {
    filename: 'before-lighting.png',
    prompt: 'Photorealistic dark hotel corridor hallway, no light fixtures installed, bare walls, exposed ceiling with conduit wiring, no carpet or baseboards, dim and gloomy atmosphere, wide angle shot looking down the hallway, unfinished construction state'
  },
  {
    filename: 'after-lighting.png',
    prompt: 'Photorealistic beautifully lit hotel corridor hallway, elegant wall sconces with warm light, recessed ceiling downlights creating even illumination, stylish carpet with subtle pattern, framed artwork on walls, decorative baseboards, warm inviting atmosphere, wide angle shot looking down the hallway, professional interior photography, luxury hotel design'
  }
];

async function generateWithRetry(zai, prompt, outputPath, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxRetries}...`);
      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1344x768'
      });

      if (!response.data || !response.data[0] || !response.data[0].base64) {
        throw new Error('Invalid response - no image data');
      }

      const buffer = Buffer.from(response.data[0].base64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      
      const sizeKB = (buffer.length / 1024).toFixed(1);
      console.log(`  ✓ Saved: ${path.basename(outputPath)} (${sizeKB} KB)`);
      return { success: true, path: outputPath, sizeKB };
    } catch (error) {
      const msg = error.message || String(error);
      console.log(`  ✗ Attempt ${attempt} failed: ${msg.substring(0, 120)}`);
      
      if (attempt < maxRetries) {
        // Exponential backoff: 30s, 60s, 120s, 240s
        const waitSecs = 30 * Math.pow(2, attempt - 1);
        console.log(`  Waiting ${waitSecs}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitSecs * 1000));
      }
    }
  }
  return { success: false, error: 'Max retries exceeded' };
}

async function main() {
  // Check which images already exist
  const existing = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`Already existing images: ${existing.length > 0 ? existing.join(', ') : 'none'}`);
  
  const toGenerate = images.filter(img => !fs.existsSync(path.join(OUTPUT_DIR, img.filename)));
  console.log(`Images to generate: ${toGenerate.length}`);
  
  if (toGenerate.length === 0) {
    console.log('All images already generated! Nothing to do.');
    return;
  }

  const zai = await ZAI.create();
  console.log('ZAI SDK initialized\n');

  let successes = 0;
  let failures = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    const img = toGenerate[i];
    console.log(`[${i + 1}/${toGenerate.length}] Generating: ${img.filename}`);
    
    const outputPath = path.join(OUTPUT_DIR, img.filename);
    const result = await generateWithRetry(zai, img.prompt, outputPath);
    
    if (result.success) {
      successes++;
    } else {
      failures++;
    }

    // Wait between images to avoid rate limiting (except after last one)
    if (i < toGenerate.length - 1) {
      const delay = 45;
      console.log(`  Waiting ${delay}s before next image...\n`);
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }
  }

  console.log('\n===== GENERATION COMPLETE =====');
  console.log(`Successes: ${successes}`);
  console.log(`Failures: ${failures}`);
  console.log(`Total: ${toGenerate.length}`);
  
  // Final check
  const finalFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\nFiles in ${OUTPUT_DIR}:`);
  finalFiles.forEach(f => {
    const stat = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  });
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
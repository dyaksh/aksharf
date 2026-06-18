/**
 * ServerSEOContent — Server-rendered SEO content block
 *
 * This component renders crawlable HTML content that search engines and AI crawlers
 * can read without executing JavaScript. It uses visually hidden (sr-only) styling
 * so it does not affect the visual design of the page.
 *
 * DO NOT add 'use client' to this file.
 */

export default function ServerSEOContent() {
  return (
    <div className="sr-only" aria-hidden="false" data-seo-content>
      {/* Primary H1 — crawlable, visually hidden */}
      <h1>
        Akshar Foshan — Hospitality FF&amp;E Manufacturer in Foshan, China
      </h1>

      {/* Answer-first introductory paragraph — targets "hospitality FF&E supplier" */}
      <p>
        Akshar Foshan is a vertically integrated hospitality FF&amp;E manufacturer based in
        Foshan, Guangdong, China — the global center of furniture production. We design,
        engineer, and manufacture premium furniture, fixtures, and equipment for hotels
        worldwide, serving 240+ hotel brands across 5+ continents. Our product range
        includes casegoods (nightstands, dressers, desks, armoires), upholstery
        (headboards, sofas, chairs, ottomans), lighting (chandeliers, sconces, lamps,
        pendants), bathroom FF&amp;E (mirrors, vanities, towel racks, hardware), and art
        &amp; decor (wall art, sculptures, accent pieces). Trusted by IHG, Hilton,
        Marriott, Choice Hotels, Wyndham, Hyatt, Best Western, and Radisson, we deliver
        brand-compliant FF&amp;E with 100% finished-goods inspection and third-party QC
        available through SGS, Bureau Veritas, and TUV. Standard lead time is 8–12 weeks;
        repeat programs ship in 6–8 weeks. We offer FOB and DDP shipping with on-the-ground
        representatives in Dubai and Riyadh. Minimum order is typically 25–30 rooms, with
        flexibility for boutique projects.
      </p>

      {/* Sub-section: Hotel Furniture Manufacturer China */}
      <h2>Hotel Furniture Manufacturer in Foshan, China</h2>
      <p>
        Foshan is the world&apos;s largest furniture manufacturing cluster. Akshar Foshan
        operates 13+ vertically integrated facilities here, controlling every step from
        raw material sourcing through finishing, QC, and container loading — ensuring
        consistent quality, competitive pricing, and on-time delivery for hotel projects
        of any scale.
      </p>

      {/* Sub-section: FF&E Procurement for Hotels */}
      <h2>FF&amp;E Procurement for Hotels</h2>
      <p>
        We streamline hotel FF&amp;E procurement by offering a single-source solution:
        design development, prototyping, bulk production, quality control, and logistics.
        Procurement teams work with one partner instead of coordinating dozens of vendors,
        reducing lead times and eliminating communication gaps.
      </p>

      {/* Sub-section: Custom Hotel Furniture Design */}
      <h2>Custom Hotel Furniture Design</h2>
      <p>
        Our in-house design team translates brand standards and designer concepts into
        fully engineered shop drawings and prototype units. Every project receives custom
        material swatches, finish samples, and a complete sign-off process before
        production begins — ensuring the final product matches the approved design intent.
      </p>

      {/* Sub-section: Hotel Casegoods Supplier */}
      <h2>Hotel Casegoods Supplier</h2>
      <p>
        Akshar Foshan manufactures durable, brand-compliant casegoods — nightstands,
        dressers, desks, armoires, and media consoles — using solid wood, veneer, and
        engineered substrates. All casegoods undergo 100% finished-goods inspection with
        photographic documentation before packing.
      </p>

      {/* Sub-section: Hospitality Lighting Manufacturer */}
      <h2>Hospitality Lighting Manufacturer</h2>
      <p>
        From chandeliers and pendant lights to wall sconces and table lamps, our lighting
        division produces hospitality-grade fixtures that meet UL/CE safety standards.
        Custom designs are available to match any brand or interior design scheme.
      </p>

      {/* Sub-section: Bathroom FF&E for Hotels */}
      <h2>Bathroom FF&amp;E for Hotels</h2>
      <p>
        We supply complete bathroom FF&amp;E packages including vanity units, mirrors,
        towel racks, robe hooks, and hardware — all finished to withstand the demands of
        commercial hospitality environments while meeting brand specifications.
      </p>

      {/* GEO: Last updated date */}
      <p>
        Last updated: 2026-06-18
      </p>
    </div>
  );
}

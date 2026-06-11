'use client';

import { FileText, Hammer, Truck } from 'lucide-react';

const acts = [
  {
    number: '01',
    title: 'ACT I: Brief',
    icon: FileText,
    description:
      "We translate brand standards, brief decks and floor plans into FF&E reality — across casegoods, upholstery, lighting and bath.",
  },
  {
    number: '02',
    title: 'ACT II: Craft',
    icon: Hammer,
    description:
      "Our Foshan workshops mill, upholster, finish and inspect every piece against the property's specification book.",
  },
  {
    number: '03',
    title: 'ACT III: Deliver',
    icon: Truck,
    description:
      "FOB or DDP, we orchestrate consolidation, documentation and on-site install with one accountable team.",
  },
];

export default function ProcessSection() {
  return (
    <section id="about" className="bg-[#F8F5F2] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body">
            HOW A PROJECT UNFOLDS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] max-w-3xl mx-auto">
            Three acts.{' '}
            <span className="text-[#4A2364]">One accountable team.</span>{' '}
            From brief to install.
          </h2>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {acts.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.number}
                className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl font-bold text-gray-100 font-serif-display group-hover:text-[#4A2364]/10 transition-colors">
                    {act.number}
                  </span>
                  <div className="mt-2">
                    <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 flex items-center justify-center mb-3 group-hover:bg-[#4A2364]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#4A2364]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] font-sans-body">
                      {act.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-sans-body">
                  {act.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

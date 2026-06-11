'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What does FF&E stand for?',
    answer:
      'FF&E stands for Furniture, Fixtures & Equipment. It encompasses all movable furniture, decorative items, lighting, bathroom accessories, and operational equipment that are not permanently attached to a building\'s structure. In hospitality, FF&E is the layer that transforms a bare room into a branded guest experience — from the headboard and desk to the towel rack and artwork.',
  },
  {
    question: 'What hotel brands do you work with?',
    answer:
      'We partner with a broad spectrum of hospitality brands, ranging from global flagships like Marriott, Hilton, IHG, and Hyatt to boutique and lifestyle brands such as Ace, 1 Hotels, and Soho House. Our team is experienced in interpreting and executing to each brand\'s specific design standards, specification books, and procurement guidelines — whether it\'s a select-service prototype or a luxury full-service property.',
  },
  {
    question: 'What is your typical lead time?',
    answer:
      'Standard production lead time is 8–12 weeks from approved shop drawings and material confirmation. For repeat programs with pre-established specs, we can compress to 6–8 weeks. Rush orders may be accommodated depending on factory capacity — we recommend engaging us as early as possible in the project timeline so we can align production slots with your on-site dates.',
  },
  {
    question: 'Do you provide samples before production?',
    answer:
      'Absolutely. We provide material swatches, finish chips, and fully finished prototype units for client sign-off before bulk production begins. This includes fabric cuts, wood finish samples, metal finish references, and a complete room mock-up when the project scope calls for it. No production run starts until you have approved every detail.',
  },
  {
    question: 'What is your minimum order quantity?',
    answer:
      'Our minimums are project-driven rather than rigidly set. For casegoods and upholstered items, we typically ask for a minimum of 25–30 rooms to justify tooling and production setup. However, for prototype or boutique projects, we can accommodate smaller quantities — just reach out and we will work out a practical plan that fits your scope and budget.',
  },
  {
    question: 'Do you handle logistics and shipping?',
    answer:
      'Yes — we offer both FOB and DDP shipping options. Our logistics team manages container consolidation, customs documentation, freight booking, and coordination with your general contractor for on-site delivery schedules. We can also arrange warehousing and staged deliveries so that product arrives exactly when the install team is ready, minimizing on-site storage needs.',
  },
  {
    question: 'How do you ensure quality control?',
    answer:
      'Quality control is embedded at every stage: incoming raw-material inspection, in-process checks during machining and upholstery, and a final pre-packing audit on 100 % of finished goods. We photograph every item before packing, generate detailed inspection reports, and can arrange for third-party QC agencies (SGS, Bureau Veritas, TUV) for independent verification when required.',
  },
  {
    question: 'What geographic areas do you serve?',
    answer:
      'While our manufacturing is based in Foshan, China — the heart of global furniture production — we ship worldwide. Our primary markets include the Middle East (UAE, Saudi Arabia, Qatar), Southeast Asia, Africa, Europe, and the Americas. We have on-the-ground representatives in Dubai and Riyadh, and we are accustomed to navigating the import regulations, certification requirements, and logistics nuances of each region.',
  },
];

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
    >
      <div
        className={`
          bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden
          border transition-all duration-500
          ${
            isOpen
              ? 'border-[#4A2364]/20 dark:border-[#6B3F8E]/30 shadow-lg shadow-[#4A2364]/5 dark:shadow-[#6B3F8E]/10'
              : 'border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#4A2364]/10 dark:hover:border-[#6B3F8E]/20'
          }
        `}
      >
        {/* Question — clickable header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2364]/40 dark:focus-visible:ring-[#6B3F8E]/40 focus-visible:rounded-xl
                     transition-colors duration-300"
          aria-expanded={isOpen}
        >
          <span
            className={`text-[15px] sm:text-base font-semibold font-sans-body leading-snug transition-colors duration-300 ${
              isOpen
                ? 'text-[#4A2364] dark:text-[#D4AF37]'
                : 'text-[#1A1A1A] dark:text-gray-200 group-hover:text-[#4A2364] dark:group-hover:text-[#D4AF37]'
            }`}
          >
            {item.question}
          </span>

          {/* Expand / Collapse indicator */}
          <span
            className={`
              flex-shrink-0 flex items-center justify-center
              w-8 h-8 rounded-full transition-all duration-300
              ${
                isOpen
                  ? 'bg-[#4A2364] dark:bg-[#6B3F8E] text-white'
                  : 'bg-[#4A2364]/10 dark:bg-[#6B3F8E]/15 text-[#4A2364] dark:text-[#6B3F8E] group-hover:bg-[#4A2364]/20 dark:group-hover:bg-[#6B3F8E]/25'
              }
            `}
          >
            {isOpen ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </span>
        </button>

        {/* Answer — animated */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 flex gap-4">
                {/* Decorative purple line on the left of the answer */}
                <div className="flex-shrink-0 w-[3px] rounded-full bg-gradient-to-b from-[#4A2364] via-[#4A2364]/60 to-[#D4AF37]/40 dark:from-[#6B3F8E] dark:via-[#6B3F8E]/60 dark:to-[#D4AF37]/40" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans-body pt-0.5">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="bg-[#F8F5F2] dark:bg-[#121212] py-20 lg:py-32 relative overflow-hidden transition-colors duration-300"
      ref={sectionRef}
    >
      {/* Subtle decorative background shapes */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,35,100,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4 font-sans-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            COMMON QUESTIONS
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Frequently Asked{' '}
            <span className="text-[#4A2364] dark:text-[#6B3F8E]">Questions</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Everything you need to know about working with Akshar Foshan — from
            our capabilities to logistics and quality assurance.
          </motion.p>

          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#4A2364] via-[#D4AF37] to-[#4A2364]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          />
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqItems.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-[#4A2364] dark:text-[#D4AF37] font-semibold hover:underline underline-offset-2 transition-colors"
            >
              Get in touch with our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

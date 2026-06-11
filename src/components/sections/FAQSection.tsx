'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';

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
          border transition-all duration-500 relative
          ${
            isOpen
              ? 'border-[#5d2c86]/20 dark:border-[#7d44a8]/30 shadow-lg shadow-[#5d2c86]/5 dark:shadow-[#7d44a8]/10'
              : 'border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#5d2c86]/10 dark:hover:border-[#7d44a8]/20'
          }
        `}
      >
        {/* Left border accent - gold on active, subtle on hover */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-500 ${
            isOpen
              ? 'bg-gradient-to-b from-[#5d2c86] via-[#D4AF37] to-[#5d2c86] dark:from-[#7d44a8] dark:via-[#D4AF37] dark:to-[#7d44a8]'
              : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-[#D4AF37]/50 dark:group-hover:bg-[#D4AF37]/30'
          }`}
        />

        {/* Question — clickable header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 pl-7 text-left cursor-pointer
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5d2c86]/40 dark:focus-visible:ring-[#7d44a8]/40 focus-visible:rounded-xl
                     transition-colors duration-300"
          aria-expanded={isOpen}
        >
          <span
            className={`text-[15px] sm:text-base font-semibold font-sans-body leading-snug transition-colors duration-300 ${
              isOpen
                ? 'text-[#5d2c86] dark:text-[#D4AF37]'
                : 'text-[#1A1A1A] dark:text-gray-200 group-hover:text-[#5d2c86] dark:group-hover:text-[#D4AF37]'
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
                  ? 'bg-[#5d2c86] dark:bg-[#7d44a8] text-white shadow-md shadow-[#5d2c86]/20 dark:shadow-[#7d44a8]/20'
                  : 'bg-[#5d2c86]/10 dark:bg-[#7d44a8]/15 text-[#5d2c86] dark:text-[#7d44a8] group-hover:bg-[#5d2c86]/20 dark:group-hover:bg-[#7d44a8]/25'
              }
            `}
          >
            {isOpen ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Minus className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
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
              <div className="px-6 pb-5 pl-7 flex gap-4 bg-gradient-to-r from-[#5d2c86]/[0.03] via-transparent to-transparent dark:from-[#5d2c86]/[0.06] dark:via-transparent dark:to-transparent rounded-b-xl">
                {/* Decorative gradient line on the left of the answer */}
                <div className="flex-shrink-0 w-[3px] rounded-full bg-gradient-to-b from-[#5d2c86] via-[#5d2c86]/60 to-[#D4AF37]/40 dark:from-[#7d44a8] dark:via-[#7d44a8]/60 dark:to-[#D4AF37]/40" />
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans-body pt-0.5">
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
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [allExpanded, setAllExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter FAQ items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const query = searchQuery.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const hasResults = filteredItems.length > 0;

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    if (allExpanded) {
      setOpenIndices(new Set());
      setAllExpanded(false);
    } else {
      setOpenIndices(new Set(filteredItems.map((_, i) => i)));
      setAllExpanded(true);
    }
  };

  // Sync allExpanded state with actual open indices
  const isAllExpanded = filteredItems.length > 0 && filteredItems.every((_, i) => openIndices.has(i));

  return (
    <section
      className="bg-[#f8f3ed] dark:bg-[#121212] py-20 lg:py-32 relative overflow-hidden transition-colors duration-300"
      ref={sectionRef}
    >
      {/* Subtle decorative background shapes */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(93,44,134,0.04) 0%, transparent 70%)',
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
            <span className="text-[#5d2c86] dark:text-[#7d44a8]">Questions</span>
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
            className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#5d2c86] via-[#D4AF37] to-[#5d2c86]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          />
        </div>

        {/* Search and Controls Bar */}
        <motion.div
          className="mb-6 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 text-sm font-sans-body text-[#1A1A1A] dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d2c86]/30 dark:focus:ring-[#7d44a8]/30 focus:border-[#5d2c86]/50 dark:focus:border-[#7d44a8]/50 transition-all duration-300"
              />
            </div>

            {/* Expand All / Collapse All Toggle */}
            {hasResults && (
              <button
                onClick={handleExpandAll}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 text-xs font-medium font-sans-body text-gray-500 dark:text-gray-400 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] hover:border-[#5d2c86]/20 dark:hover:border-[#7d44a8]/20 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {isAllExpanded ? (
                  <>
                    <ChevronsDownUp className="w-3.5 h-3.5" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ChevronsUpDown className="w-3.5 h-3.5" />
                    Expand All
                  </>
                )}
              </button>
            )}
          </div>

          {/* Count badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-sans-body">
              {searchQuery.trim() ? (
                <>
                  {filteredItems.length} of {faqItems.length} question{faqItems.length !== 1 ? 's' : ''}
                </>
              ) : (
                <>
                  {faqItems.length} question{faqItems.length !== 1 ? 's' : ''}
                </>
              )}
            </span>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#5d2c86] dark:text-[#7d44a8] font-medium font-sans-body hover:underline underline-offset-2 transition-colors cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        {hasResults ? (
          <div className="flex flex-col gap-3 sm:gap-4">
            {filteredItems.map((item, filteredIndex) => {
              // Find the original index for proper toggling
              const originalIndex = faqItems.indexOf(item);
              return (
                <FAQAccordionItem
                  key={originalIndex}
                  item={item}
                  index={filteredIndex}
                  isOpen={openIndices.has(originalIndex)}
                  onToggle={() => handleToggle(originalIndex)}
                />
              );
            })}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body mb-1">
              No questions match your search.
            </p>
            <a
              href="#contact"
              className="text-sm text-[#5d2c86] dark:text-[#D4AF37] font-semibold font-sans-body hover:underline underline-offset-2 transition-colors"
            >
              Contact us for help.
            </a>
          </motion.div>
        )}

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
              className="text-[#5d2c86] dark:text-[#D4AF37] font-semibold hover:underline underline-offset-2 transition-colors"
            >
              Get in touch with our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

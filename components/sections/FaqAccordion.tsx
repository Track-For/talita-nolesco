"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="faq-list" data-reveal>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const answerId = `faq-answer-${index}`;
        const buttonId = `faq-question-${index}`;

        return (
          <article className="faq-item" data-open={isOpen} key={item.question}>
            <h3>
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                id={buttonId}
                onClick={() => toggleItem(index)}
                type="button"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="faq-icon" />
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={buttonId}
              className="faq-answer-shell"
              id={answerId}
              role="region"
            >
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

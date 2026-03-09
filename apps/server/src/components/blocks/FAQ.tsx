interface FAQItem {
  question?: string;
  answer?: string;
}

interface FAQContent {
  title?: string;
  description?: string;
  items?: FAQItem[];
}

interface FAQProps {
  content: FAQContent;
}

export const FAQ = (props: FAQProps) => {
  const {
    title = "Frequently Asked Questions",
    description = "Find answers to common questions",
    items = [],
  } = props.content;

  const defaultItems: FAQItem[] = [
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and follow the onboarding guide. You'll be up and running in minutes.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial on all plans. No credit card required.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no questions asked.",
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section class="bg-white dark:bg-gray-900 py-16 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            {title}
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto">
          {displayItems.map((item, i) => (
            <details
              key={i}
              class="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
            >
              <summary class="flex items-center justify-between cursor-pointer font-semibold list-none text-gray-900 dark:text-white">
                <span>{item.question || "Question"}</span>
                <span class="ml-4 transition-transform duration-200 group-open:rotate-180">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {item.answer || "Answer"}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

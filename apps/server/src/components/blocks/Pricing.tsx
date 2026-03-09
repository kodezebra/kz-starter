interface PricingPlan {
  name?: string;
  price?: string;
  period?: string;
  description?: string;
  features?: string[];
  featured?: boolean;
}

interface PricingContent {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
}

interface PricingProps {
  content: PricingContent;
}

export const Pricing = (props: PricingProps) => {
  const {
    title = "Simple Pricing",
    description = "Choose the plan that fits your needs",
    plans = [],
  } = props.content;

  const defaultPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for getting started",
      features: ["5 Projects", "10GB Storage", "Email Support"],
      featured: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Best for growing teams",
      features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      features: ["Everything in Pro", "Unlimited Storage", "24/7 Support", "Custom Integrations"],
      featured: false,
    },
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

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

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {displayPlans.map((plan, i) => (
            <div
              key={i}
              class={`relative flex flex-col p-8 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                plan.featured
                  ? "border-blue-600 shadow-lg bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              }`}
            >
              {plan.featured && (
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">{plan.name || "Plan"}</h3>
              <div class="flex items-baseline gap-1 mb-4">
                <span class="text-4xl font-bold text-gray-900 dark:text-white">{plan.price || "$0"}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{plan.period || "/month"}</span>
              </div>
              <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">{plan.description || ""}</p>
              <ul class="flex-1 space-y-3 mb-8">
                {(plan.features || []).map((feature, fi) => (
                  <li key={fi} class="flex items-start gap-2 text-sm">
                    <svg class="mt-0.5 w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                class={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItem {
  value?: string;
  label?: string;
  suffix?: string;
}

interface StatsContent {
  title?: string;
  description?: string;
  items?: StatItem[];
}

interface StatsProps {
  content: StatsContent;
}

export const Stats = (props: StatsProps) => {
  const {
    title = "Our Impact",
    description = "Numbers that speak for themselves",
    items = [],
  } = props.content;

  const defaultItems: StatItem[] = [
    { value: "10K+", label: "Active Users", suffix: "" },
    { value: "99.9", label: "Uptime SLA", suffix: "%" },
    { value: "500+", label: "Enterprise Clients", suffix: "" },
    { value: "24/7", label: "Customer Support", suffix: "" },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section class="bg-white dark:bg-gray-900 py-16 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            {title}
          </h2>
          <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8 md:grid-cols-4 max-w-4xl mx-auto">
          {displayItems.map((stat, i) => (
            <div key={i} class="text-center">
              <div class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
                {stat.value || "0"}
                <span class="text-2xl md:text-3xl">{stat.suffix || ""}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{stat.label || "Label"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialItem {
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
}

interface TestimonialsContent {
  title?: string;
  description?: string;
  items?: TestimonialItem[];
}

interface TestimonialsProps {
  content: TestimonialsContent;
}

export const Testimonials = (props: TestimonialsProps) => {
  const {
    title = "What Our Customers Say",
    description = "Trusted by thousands of businesses worldwide",
    items = [],
  } = props.content;

  const defaultItems: TestimonialItem[] = [
    {
      quote: "This product has transformed how we work. Absolutely essential for our team.",
      author: "Sarah Johnson",
      role: "CEO at TechCorp",
      avatar: "",
    },
    {
      quote: "The best investment we've made this year. Highly recommended!",
      author: "Mike Chen",
      role: "Founder at StartupXYZ",
      avatar: "",
    },
    {
      quote: "Outstanding support and incredible features. Five stars!",
      author: "Emily Davis",
      role: "Marketing Director",
      avatar: "",
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section class="bg-gray-50 dark:bg-gray-800 py-16 px-4">
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
          {displayItems.map((item, i) => {
            const initial = (item.author || "?").charAt(0).toUpperCase();
            return (
              <div
                key={i}
                class="flex flex-col p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
              >
                <svg
                  class="w-8 h-8 mb-4 text-blue-600 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-3.95c0-1.055.22-2.078.637-3.007.418-.929 1.018-1.73 1.78-2.383l.437-.375c.59-.507.99-1.087 1.187-1.723.197-.637.295-1.42.295-2.33V5.001h-4.96c-.66 0-1.28.17-1.83.483-.55.313-1.01.75-1.347 1.273-.337.523-.573 1.147-.687 1.833-.113.687-.137 1.427-.06 2.183l.22 1.14c.077.38.177.733.293 1.053.117.32.247.607.387.853.14.247.28.46.413.634l.24.306c.134.17.26.33.374.474.113.143.213.28.293.406.08.127.14.25.173.367.034.117.047.23.034.333l-.02.127c-.077.447-.267.847-.553 1.18-.287.333-.653.593-1.08.767l-.44.16c-.427.147-.887.22-1.367.22-.48 0-.933-.073-1.36-.22l-.44-.16c-.427-.173-.793-.433-1.08-.767-.287-.333-.477-.733-.553-1.18l-.02-.127c-.014-.103 0-.216.033-.333.033-.117.093-.24.173-.367.08-.126.18-.263.294-.406.113-.144.24-.304.373-.474l.24-.306c.133-.174.273-.387.413-.634.14-.246.27-.533.387-.853.116-.32.216-.673.293-1.053l.22-1.14c.077-.756.053-1.496-.06-2.183-.114-.686-.35-1.31-.687-1.833-.337-.523-.797-.96-1.347-1.273-.55-.313-1.17-.483-1.83-.483h-4.96v4.233c0 .91.098 1.693.295 2.33.197.636.597 1.216 1.187 1.723l.437.375c.762.653 1.362 1.454 1.78 2.383.417.929.637 1.952.637 3.007V21h14.017z" />
                </svg>
                <blockquote class="flex-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {item.quote || "Quote text goes here."}
                </blockquote>
                <div class="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.author}
                      class="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-sm">
                      {initial}
                    </div>
                  )}
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{item.author || "Author"}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{item.role || "Role"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

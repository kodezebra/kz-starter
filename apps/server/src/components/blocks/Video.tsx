interface VideoContent {
  url?: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  showControls?: boolean;
}

interface VideoProps {
  content: VideoContent;
}

export const Video = (props: VideoProps) => {
  const {
    url = "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title = "Product Demo",
    description = "Watch our quick demo to see how it works",
    autoplay = false,
    showControls = true,
  } = props.content;

  const autoplayParam = autoplay ? "?autoplay=1" : "";
  const controlsParam = showControls ? "" : "&controls=0";

  return (
    <section class="bg-white dark:bg-gray-900 py-16 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl mb-2">
            {title}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        <div class="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg max-w-4xl mx-auto">
          <iframe
            src={`${url}${autoplayParam}${controlsParam}`}
            title={title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            class="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

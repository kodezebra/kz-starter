interface GalleryImage {
  url?: string;
  alt?: string;
  caption?: string;
}

interface GalleryContent {
  title?: string;
  description?: string;
  columns?: number;
  images?: GalleryImage[];
}

interface GalleryProps {
  content: GalleryContent;
}

export const Gallery = (props: GalleryProps) => {
  const {
    title = "Our Work",
    description = "Browse through our latest projects",
    columns = 3,
    images = [],
  } = props.content;

  const defaultImages: GalleryImage[] = [
    { url: "https://picsum.photos/seed/gallery1/600/400", alt: "Project 1", caption: "Project One" },
    { url: "https://picsum.photos/seed/gallery2/600/400", alt: "Project 2", caption: "Project Two" },
    { url: "https://picsum.photos/seed/gallery3/600/400", alt: "Project 3", caption: "Project Three" },
    { url: "https://picsum.photos/seed/gallery4/600/400", alt: "Project 4", caption: "Project Four" },
    { url: "https://picsum.photos/seed/gallery5/600/400", alt: "Project 5", caption: "Project Five" },
    { url: "https://picsum.photos/seed/gallery6/600/400", alt: "Project 6", caption: "Project Six" },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };
  const selectedGridClass = gridClasses[columns as keyof typeof gridClasses] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

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

        <div class={`grid gap-4 md:gap-6 ${selectedGridClass} max-w-6xl mx-auto`}>
          {displayImages.map((img, i) => (
            <figure key={i} class="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <img
                src={img.url}
                alt={img.alt || "Gallery image"}
                class="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {img.caption && (
                <figcaption class="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-medium text-white bg-black/50">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ImageContent {
  url?: string;
  alt?: string;
}

interface ImageProps {
  content: ImageContent;
}

export const Image = (props: ImageProps) => {
  const { url = "https://picsum.photos/seed/placeholder/800/400", alt = "Image" } = props.content;

  return (
    <section class="bg-white dark:bg-gray-900 py-12 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="w-full">
          <img
            src={url}
            alt={alt}
            class="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

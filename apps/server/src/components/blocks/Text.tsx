interface TextContent {
  body?: string;
}

interface TextProps {
  content: TextContent;
}

export const Text = (props: TextProps) => {
  const { body = "Enter your text content here..." } = props.content;

  return (
    <section class="bg-white dark:bg-gray-900 py-12 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          {body}
        </div>
      </div>
    </section>
  );
};

interface SpacerContent {
  height?: number;
}

interface SpacerProps {
  content: SpacerContent;
}

export const Spacer = (props: SpacerProps) => {
  const { height = 50 } = props.content;

  return (
    <div style={{ height: `${height}px` }} class="w-full" />
  );
};

import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface SpacerBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const SpacerBlock = ({ block, isSelected, onClick }: SpacerBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const height = c.height || 50;
  const contentStyle: React.CSSProperties = { height: `${height}px`, backgroundColor: 'var(--muted)' };

  const innerContent = (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">
      Spacer ({height}px)
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface TextBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const TextBlock = ({ block, isSelected, onClick }: TextBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = { padding: '20px 40px' };

  const innerContent = (
    <div style={{ lineHeight: '1.6', fontSize: '1rem' }}>
      {c.body || 'Text content...'}
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface ImageBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const ImageBlock = ({ block, isSelected, onClick }: ImageBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const resolvedUrl = useAssetUrl(c.url);

  const contentStyle: React.CSSProperties = { padding: '20px 0' };

  const innerContent = (
    <img
      src={resolvedUrl || 'https://picsum.photos/seed/placeholder/800/400'}
      alt={c.alt || 'Placeholder'}
      style={{ width: '100%', display: 'block' }}
    />
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

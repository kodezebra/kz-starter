import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface GalleryBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const GalleryImage = ({ img }: { img: any }) => {
  const resolvedImageUrl = useAssetUrl(img.url);

  return (
    <figure className="group relative overflow-hidden rounded-xl bg-muted">
      <img
        src={resolvedImageUrl || 'https://picsum.photos/seed/placeholder/600/400'}
        alt={img.alt || 'Image'}
        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {img.caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-medium text-white bg-black/50">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
};

export const GalleryBlock = ({ block, isSelected, onClick }: GalleryBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const columns = c.columns || 3;

  const contentStyle: React.CSSProperties = {
    padding: '80px 40px',
    backgroundColor: 'var(--background)',
  };

  const gridColumns: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  const selectedGridColumns = gridColumns[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const innerContent = (
    <div>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {c.title || 'Gallery'}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {c.description || 'Browse through our latest work.'}
        </p>
      </div>

      <div className={`grid gap-4 md:gap-6 ${selectedGridColumns} max-w-6xl mx-auto`}>
        {(c.images || []).map((img: any, i: number) => (
          <GalleryImage key={img.id || i} img={img} />
        ))}
      </div>
    </div>
  );

  return (
    <BaseBlock
      isSelected={isSelected}
      onClick={onClick}
      config={config}
      contentStyle={contentStyle}
    >
      {innerContent}
    </BaseBlock>
  );
};

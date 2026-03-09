import { Button } from '@/components/ui/button';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface HeaderBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const HeaderBlock = ({ block, isSelected, onClick }: HeaderBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const resolvedLogo = useAssetUrl(c.logo);

  const contentStyle: React.CSSProperties = {
    padding: '0',
    position: c.sticky ? 'sticky' : 'relative',
    top: 0,
    zIndex: 50,
    backgroundColor: 'var(--background)',
    borderBottom: '1px solid var(--border)',
  };

  const innerContent = (
    <header className="w-full py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {resolvedLogo ? (
          <img src={resolvedLogo} alt="Logo" className="h-8 w-auto" />
        ) : (
          <span className="text-xl font-bold tracking-tight text-foreground">{c.title || 'Brand'}</span>
        )}
      </div>
      <nav className="flex items-center gap-6">
        {(c.links || []).map((link: any, i: number) => (
          <a
            key={link.href || i}
            href={link.href || '#'}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
        {c.buttonText && (
          <Button size="sm" className="ml-2">
            {c.buttonText}
          </Button>
        )}
      </nav>
    </header>
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

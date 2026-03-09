import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface FooterBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const FooterBlock = ({ block, isSelected, onClick }: FooterBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = {
    padding: '0',
    position: 'relative',
    backgroundColor: 'var(--background)',
    borderTop: '1px solid var(--border)',
  };

  const innerContent = (
    <footer className="w-full py-8 px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            {c.logo ? (
              <img src={c.logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <span className="text-xl font-bold tracking-tight text-foreground">{c.brandName || 'Brand'}</span>
            )}
            <p className="text-sm text-muted-foreground">{c.description || 'Your company description'}</p>
          </div>

          {/* Links columns */}
          {(c.columns || []).map((column: any, i: number) => (
            <div key={i} className="space-y-4">
              <h4 className="font-semibold text-foreground">{column.title}</h4>
              <ul className="space-y-2">
                {(column.links || []).map((link: any, j: number) => (
                  <li key={j}>
                    <a
                      href={link.href || '#'}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {c.brandName || 'Brand'}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {(c.socialLinks || []).map((social: any, i: number) => (
              <a
                key={i}
                href={social.href || '#'}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
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

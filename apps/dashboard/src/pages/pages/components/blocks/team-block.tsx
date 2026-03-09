import { Twitter, Linkedin } from 'lucide-react';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface TeamBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const TeamBlock = ({ block, isSelected, onClick }: TeamBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = { padding: '80px 40px', backgroundColor: 'var(--background)' };

  const innerContent = (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">{c.title || 'Our Team'}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-12">{c.description || 'Description'}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {(c.members || []).map((member: any, i: number) => {
          const resolvedImage = useAssetUrl(member.image);
          return (
            <div key={i} className="p-6 bg-card rounded-2xl border text-center group hover:shadow-md transition-shadow">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                <img src={resolvedImage || 'https://picsum.photos/seed/person/300/300'} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg mb-1">{member.name || 'Name'}</h3>
              <p className="text-sm text-primary mb-3">{member.role || 'Role'}</p>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{member.bio || 'Bio'}</p>
              <div className="flex items-center justify-center gap-2">
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter}`}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <Twitter size={14} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <Linkedin size={14} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

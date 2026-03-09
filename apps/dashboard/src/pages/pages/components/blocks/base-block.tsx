import { cn } from '@/lib/utils';

interface BaseBlockProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  config: {
    label: string;
  };
  contentStyle?: React.CSSProperties;
}

export const BaseBlock = ({
  isSelected,
  onClick,
  children,
  config,
  contentStyle = {},
}: BaseBlockProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative group transition-all duration-200 border-2',
        isSelected ? 'border-primary z-10' : 'border-transparent hover:border-primary/50'
      )}
      style={contentStyle}
    >
      <div
        className={cn(
          'absolute -top-6 left-0 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-t-sm pointer-events-none transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      >
        {config.label}
      </div>
      {children}
    </div>
  );
};

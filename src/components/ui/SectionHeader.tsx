import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

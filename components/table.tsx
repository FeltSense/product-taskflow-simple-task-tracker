import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full', className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return (
    <thead className={cn('bg-neutral-50 border-b border-neutral-200', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={cn('divide-y divide-neutral-100', className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr className={cn('hover:bg-neutral-50 transition-colors', className)}>
      {children}
    </tr>
  );
}

interface TableCellProps extends TableProps {
  header?: boolean;
}

export function TableCell({ children, className, header }: TableCellProps) {
  const Component = header ? 'th' : 'td';
  return (
    <Component
      className={cn(
        'px-4 py-3 text-left',
        header
          ? 'text-xs font-medium text-neutral-500 uppercase tracking-wider'
          : 'text-sm text-neutral-900',
        className
      )}
    >
      {children}
    </Component>
  );
}

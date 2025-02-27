
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}

const ProgressBar = ({ 
  value, 
  max, 
  className = '',
  size = 'md',
  showValue = true,
  animated = true
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-secondary rounded-full overflow-hidden',
        heightClasses[size]
      )}>
        <div
          className={cn(
            'bg-primary rounded-full',
            heightClasses[size],
            animated && 'transition-all duration-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showValue && (
        <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
          <span>{Math.round(percentage)}% complete</span>
          <span>{value}/{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

import { LogoOriginal } from './LogoOriginal';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'badge-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
}

export function Logo({
  className = '',
  variant = 'full',
  size = 'md',
  showSubtext = true,
}: LogoProps) {
  const badgeSizes = {
    sm: 36,
    md: 46,
    lg: 58,
    xl: 74,
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  if (variant === 'badge-only' || variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoOriginal size={badgeSizes[size]} showGlow />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Original High-Resolution Round Logo with Transparent Surroundings */}
      <LogoOriginal size={badgeSizes[size]} showGlow />

      {/* Brand Typography Lockup for maximum legibility */}
      <div className="flex flex-col leading-tight select-none">
        <div className="flex items-center gap-1.5 font-black tracking-tight text-white font-display">
          <span className={`text-yellow-400 font-black ${titleSizes[size]}`}>DR.</span>
          <span className={`text-white font-black ${titleSizes[size]}`}>MULTAS</span>
        </div>
        {showSubtext && (
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-widest text-yellow-400 uppercase ${subSizes[size]}`}
            >
              Nova Odessa
            </span>
            <span className={`text-zinc-600 ${subSizes[size]}`}>•</span>
            <span className={`font-bold tracking-wider text-zinc-400 uppercase ${subSizes[size]}`}>
              SP
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface RoadDividerProps {
  className?: string;
  variant?: 'dashed' | 'stripes' | 'solid-yellow';
}

export function RoadDivider({ className = '', variant = 'dashed' }: RoadDividerProps) {
  if (variant === 'stripes') {
    return (
      <div className={`w-full overflow-hidden flex items-center justify-center py-2 ${className}`}>
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-3">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-yellow-500/80" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-yellow-500/40 text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
            <span>DR MULTAS • DEFESA DE TRÂNSITO</span>
          </div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-yellow-500/30 to-yellow-500/80" />
        </div>
      </div>
    );
  }

  if (variant === 'solid-yellow') {
    return (
      <div className={`w-full h-1 bg-gradient-to-r from-yellow-500/20 via-yellow-400 to-yellow-500/20 ${className}`} />
    );
  }

  // Default: Road dashed yellow center line
  return (
    <div className={`w-full py-1 flex items-center justify-center overflow-hidden opacity-80 ${className}`}>
      <div className="w-full flex items-center justify-between gap-4 max-w-6xl mx-auto px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-yellow-500/70 to-yellow-400"
          />
        ))}
      </div>
    </div>
  );
}

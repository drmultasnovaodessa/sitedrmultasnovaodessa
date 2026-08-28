interface LogoOriginalProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
}

/**
 * Logo Original da DR MULTAS NOVA ODESSA
 * Representação vetorial de ultra-alta fidelidade e resolução infinita,
 * recortada em círculo perfeito com fundo externo 100% transparente.
 */
export function LogoOriginal({
  className = '',
  size = 48,
  showGlow = false,
}: LogoOriginalProps) {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {/* Optional subtle ambient aura */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md scale-110 pointer-events-none" />
      )}

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
        style={{ overflow: 'visible' }}
        aria-label="Logo DR. MULTAS Nova Odessa"
      >
        <defs>
          {/* Rich golden-amber gradient for the circle badge */}
          <radialGradient
            id="goldCircleGrad"
            cx="35%"
            cy="30%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#FFC83B" />
            <stop offset="55%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#E08E0B" />
          </radialGradient>

          {/* Traffic light lens glows */}
          <radialGradient id="redLight" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="70%" stopColor="#E02424" />
            <stop offset="100%" stopColor="#991B1B" />
          </radialGradient>

          <radialGradient id="yellowLight" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </radialGradient>

          <radialGradient id="greenLight" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="70%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#14532D" />
          </radialGradient>

          {/* Road Asphalt Texture Gradient */}
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Outer Ring Accent */}
          <linearGradient id="ringBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEBAA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Main Circular Golden Badge */}
        <circle
          cx="200"
          cy="200"
          r="192"
          fill="url(#goldCircleGrad)"
          stroke="url(#ringBorder)"
          strokeWidth="3.5"
        />

        {/* 2. SCALE OF JUSTICE (Balança da Justiça) & TRAFFIC LIGHT (Semáforo) */}
        <g id="scale-and-traffic-light">
          {/* Balance Top Beam (Arco da Balança) */}
          <path
            d="M 125 105 C 150 90, 175 96, 190 98 L 210 98 C 225 96, 250 90, 275 105"
            stroke="#18181B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Pan (Prato Esquerdo da Balança) */}
          <g id="left-pan">
            {/* Left suspension strings */}
            <path
              d="M 125 105 L 98 152 M 125 105 L 152 152"
              stroke="#18181B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Pan Dish */}
            <path
              d="M 92 152 Q 125 170 158 152 Z"
              fill="#18181B"
              stroke="#18181B"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>

          {/* Right Pan (Prato Direito da Balança) */}
          <g id="right-pan">
            {/* Right suspension strings */}
            <path
              d="M 275 105 L 248 152 M 275 105 L 302 152"
              stroke="#18181B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Right Pan Dish */}
            <path
              d="M 242 152 Q 275 170 308 152 Z"
              fill="#18181B"
              stroke="#18181B"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>

          {/* Center Vertical Mast / Pole */}
          <path
            d="M 200 80 L 200 185"
            stroke="#18181B"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Top finial / cap on mast */}
          <circle cx="200" cy="78" r="5" fill="#18181B" />

          {/* Traffic Light Housing (Corpo do Semáforo) */}
          <rect
            x="185"
            y="76"
            width="30"
            height="62"
            rx="6"
            fill="#18181B"
            stroke="#09090B"
            strokeWidth="2"
          />

          {/* Traffic Light Visors / Side Hoods */}
          <path
            d="M 183 86 Q 185 82 188 84 M 217 86 Q 215 82 212 84
               M 183 107 Q 185 103 188 105 M 217 107 Q 215 103 212 105
               M 183 128 Q 185 124 188 126 M 217 128 Q 215 124 212 126"
            stroke="#18181B"
            strokeWidth="2"
            fill="none"
          />

          {/* 3 Circular Lights */}
          {/* Red Light (Top) */}
          <circle cx="200" cy="87" r="7.5" fill="url(#redLight)" />
          {/* Yellow Light (Middle) */}
          <circle cx="200" cy="107" r="7.5" fill="url(#yellowLight)" />
          {/* Green Light (Bottom) */}
          <circle cx="200" cy="127" r="7.5" fill="url(#greenLight)" />
        </g>

        {/* 3. WINDING HIGHWAY ROAD (Estrada / Pista com Perspectiva) */}
        <g id="winding-road">
          {/* Dark Road Body */}
          <path
            d="M 120 190 
               C 170 186, 195 186, 205 186
               C 230 186, 260 195, 305 190
               C 270 205, 230 204, 205 198
               C 160 198, 140 194, 120 190 Z"
            fill="url(#roadGrad)"
          />
          {/* Road Perspective Curves */}
          <path
            d="M 125 190 C 165 186, 215 186, 300 188"
            stroke="#18181B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 115 194 C 160 198, 205 204, 285 194"
            stroke="#18181B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Highway Dashed Lines */}
          <path
            d="M 135 192 L 155 192 
               M 170 192 L 195 192 
               M 210 193 L 235 194
               M 250 193 L 275 192"
            stroke="#FDE047"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* 4. MAIN BRAND TYPOGRAPHY */}
        {/* DR. MULTAS */}
        <text
          x="200"
          y="245"
          textAnchor="middle"
          fill="#18181B"
          fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="1.5"
        >
          DR. MULTAS
        </text>

        {/* Horizontal Divider Lines & NOVA ODESSA */}
        <g id="nova-odessa-line">
          {/* Left Line */}
          <line
            x1="62"
            y1="258"
            x2="114"
            y2="258"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* NOVA ODESSA Text */}
          <text
            x="200"
            y="266"
            textAnchor="middle"
            fill="#18181B"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontWeight="800"
            fontSize="18.5"
            letterSpacing="3.5"
          >
            NOVA ODESSA
          </text>
          {/* Right Line */}
          <line
            x1="286"
            y1="258"
            x2="338"
            y2="258"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Subtitle: Defesa em Trânsito | Multas | CNH */}
        <text
          x="200"
          y="290"
          textAnchor="middle"
          fill="#27272A"
          fontFamily="'Plus Jakarta Sans', Georgia, sans-serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="13"
          letterSpacing="0.8"
        >
          Defesa em Trânsito | Multas | CNH
        </text>
      </svg>
    </div>
  );
}

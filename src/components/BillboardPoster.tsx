export function BillboardPoster() {
  return (
    <section className="py-16 sm:py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Section Badge */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400/90 bg-zinc-900 border border-yellow-500/40 px-3.5 py-1.5 rounded-full shadow-sm">
            Painel Oficial • DR Multas Nova Odessa
          </span>
        </div>

        {/* Outer Billboard Frame with realistic industrial styling */}
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-zinc-800 p-2 sm:p-3.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(250,204,21,0.08)] border-2 border-zinc-700">
          {/* Metallic Screws / Rivets in the frame corners and edges */}
          <div className="absolute top-2 left-3 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700" />
          </div>
          <div className="absolute top-2 right-3 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700 rotate-90" />
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700" />
          </div>
          <div className="absolute bottom-2 left-3 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700 rotate-45" />
          </div>
          <div className="absolute bottom-2 right-3 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700 -rotate-45" />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-zinc-700" />
          </div>

          {/* Yellow Billboard Canvas */}
          <div className="relative rounded-xl bg-[#F5BA0B] text-zinc-950 p-4 sm:p-7 md:p-9 overflow-hidden shadow-inner border border-yellow-600/60 select-none">
            {/* Subtle inner ambient gradient and edge shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/20 via-transparent to-black/10 pointer-events-none" />

            {/* Main Poster Layout: 3 Columns on tablet/desktop, cleanly stacked on small mobile */}
            <div className="relative z-10 grid grid-cols-12 items-center gap-4 sm:gap-6">
              {/* LEFT GRAPHIC: PARE Sign (CONTRAN Standard Octagon) */}
              <div className="col-span-12 sm:col-span-3 flex justify-center sm:justify-start">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
                  {/* Outer White Octagon Border */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Red Octagonal Plate */}
                    <polygon
                      points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30"
                      fill="#DC2626"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    {/* Inner White Octagon Ring */}
                    <polygon
                      points="31.5,8 68.5,8 92,31.5 92,68.5 68.5,92 31.5,92 8,68.5 8,31.5"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.2"
                    />
                    {/* PARE Bold White Typography */}
                    <text
                      x="50"
                      y="59"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="24"
                      fontWeight="900"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      letterSpacing="0.5"
                    >
                      PARE
                    </text>
                  </svg>
                </div>
              </div>

              {/* CENTER CONTENT: Typography and Hierarchy */}
              <div className="col-span-12 sm:col-span-6 text-center flex flex-col items-center justify-center space-y-1 sm:space-y-1.5">
                {/* Headline: FOI MULTADO? */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none font-sans scale-y-105">
                  FOI MULTADO?
                </h3>

                {/* Subheadline: EU RESOLVO. */}
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none font-sans scale-y-105">
                  EU RESOLVO.
                </h4>

                {/* Brand Name: DR. MULTAS NOVA ODESSA */}
                <div className="pt-1.5 pb-0.5">
                  <p className="text-base sm:text-lg md:text-xl font-black tracking-wide uppercase text-black font-sans">
                    DR. MULTAS NOVA ODESSA
                  </p>
                </div>

                {/* Cursive Subtitle: Centro de Defesa do Condutor */}
                <p
                  className="text-lg sm:text-xl md:text-2xl text-black font-bold tracking-normal leading-tight"
                  style={{ fontFamily: "'Caveat', 'Satisfy', cursive" }}
                >
                  Centro de Defesa do Condutor
                </p>

                {/* Bottom Badges / Services */}
                <div className="pt-2">
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-wider text-black/90 font-mono">
                    CASSAÇÃO &bull; SUSPENSÃO &bull; BAFÔMETRO &bull; RECURSOS DE MULTA
                  </p>
                </div>
              </div>

              {/* RIGHT GRAPHIC: Road Warning Diamond with Traffic Light */}
              <div className="col-span-12 sm:col-span-3 flex justify-center sm:justify-end">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Yellow Warning Diamond Plate */}
                    <g transform="rotate(45 50 50)">
                      <rect
                        x="16"
                        y="16"
                        width="68"
                        height="68"
                        rx="7"
                        fill="#F5BA0B"
                        stroke="#18181B"
                        strokeWidth="3.5"
                      />
                      {/* Inner Black Border */}
                      <rect
                        x="20"
                        y="20"
                        width="60"
                        height="60"
                        rx="4"
                        fill="none"
                        stroke="#18181B"
                        strokeWidth="1.8"
                      />
                    </g>

                    {/* Traffic Light Housing (Black vertical box with visor hoods) */}
                    <rect x="42" y="24" width="16" height="52" rx="4" fill="#18181B" />
                    {/* Visor hoods on sides */}
                    <path d="M40 31 L42 29 L42 35 Z" fill="#18181B" />
                    <path d="M58 29 L60 31 L58 35 Z" fill="#18181B" />
                    <path d="M40 49 L42 47 L42 53 Z" fill="#18181B" />
                    <path d="M58 47 L60 49 L58 53 Z" fill="#18181B" />
                    <path d="M40 67 L42 65 L42 71 Z" fill="#18181B" />
                    <path d="M58 65 L60 67 L58 71 Z" fill="#18181B" />

                    {/* RED LIGHT */}
                    <circle cx="50" cy="33" r="5.2" fill="#EF4444" />
                    <circle cx="48.5" cy="31.5" r="1.5" fill="#FCA5A5" opacity="0.8" />

                    {/* YELLOW LIGHT */}
                    <circle cx="50" cy="50" r="5.2" fill="#F59E0B" />
                    <circle cx="48.5" cy="48.5" r="1.5" fill="#FDE68A" opacity="0.8" />

                    {/* GREEN LIGHT */}
                    <circle cx="50" cy="67" r="5.2" fill="#10B981" />
                    <circle cx="48.5" cy="65.5" r="1.5" fill="#A7F3D0" opacity="0.8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Realistic Metallic Billboard Support Posts at bottom */}
          <div className="flex justify-between px-16 sm:px-24 -mb-3 pt-1 pointer-events-none">
            <div className="w-4 sm:w-5 h-5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-800 rounded-b-sm border-x border-b border-zinc-900" />
            <div className="w-4 sm:w-5 h-5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-800 rounded-b-sm border-x border-b border-zinc-900" />
          </div>
        </div>
      </div>
    </section>
  );
}

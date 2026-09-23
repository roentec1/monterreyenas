import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, Clock, ShieldAlert, Facebook, Instagram } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { ScheduleOverride } from '../types';

interface HeaderProps {
  onOpenCart: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { totalItemsCount, isOpen, scheduleOverride, setScheduleOverride } = useOrder();
  const [showScheduleMenu, setShowScheduleMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#131313]/90 backdrop-blur-xl border-b border-[#242323] transition-all">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1Vodo25Nz4caAaFOy5osCm1uuvcCKfHCE4XFtSifWNFquVTmt4dNBRnItf--w39xXovBHGkCC243M_uCo-7LVOP8N7T2cp9tZE01kXqOSSRAohTYi-4u7e7bdLhBPGtFYK03rH5VFN5PFkMpp_IYeX8fVnpyhs1VSjjiNRAATeQFpPIreEpPZhhLkMCA8Ifrdy9IxHrvDcz5kwwYl3C5EoxWwjfenXuyva4CWRcJVjPi2a5Ja5thuRpeb_R5Kbt9Rwh2iA5ZCn39Q"
            alt="Monterreyenas Logo"
            className="h-9 w-auto object-contain shrink-0 drop-shadow"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-oswald text-[16px] leading-tight text-[#ffdca1] tracking-wider uppercase truncate">
              MONTERREYENAS
            </span>

            {/* Dynamic Open / Closed Status Pill with testing selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowScheduleMenu(!showScheduleMenu)}
                className="flex items-center gap-1.5 mt-0.5 group text-left"
                title="Horario de atención: 6:00 PM a 11:00 PM (Clic para opciones)"
              >
                {isOpen ? (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#5efd8a] animate-pulse shadow-[0_0_8px_rgba(94,253,138,0.8)] shrink-0"></span>
                    <span className="text-[10px] font-bold text-[#5efd8a] tracking-wide uppercase group-hover:underline">
                      Abierto ahora
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#ffb4ac] shrink-0"></span>
                    <span className="text-[10px] font-bold text-[#ffb4ac] tracking-wide uppercase group-hover:underline">
                      Cerrado • Abre 6 PM
                    </span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-[#a0a0a0] group-hover:text-white" />
              </button>

              {/* Schedule Simulator Dropdown */}
              {showScheduleMenu && (
                <div className="absolute top-7 left-0 z-50 w-56 bg-[#1a1a19] border border-[#383531] rounded-xl p-2 shadow-2xl space-y-1 anim-fade-in">
                  <div className="px-2 py-1 border-b border-[#242323] text-[10px] text-[#a0a0a0] flex items-center justify-between">
                    <span className="font-bold uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#ffb800]" />
                      Horario: 6 PM - 11 PM
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setScheduleOverride('auto');
                      setShowScheduleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      scheduleOverride === 'auto'
                        ? 'bg-[#ffb800]/15 text-[#ffdca1] font-bold'
                        : 'text-[#d5c4ab] hover:bg-[#242323]'
                    }`}
                  >
                    <span>Hora Real (Automático)</span>
                    {scheduleOverride === 'auto' && <span className="text-[10px]">✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScheduleOverride('open');
                      setShowScheduleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      scheduleOverride === 'open'
                        ? 'bg-[#3ae071]/15 text-[#5efd8a] font-bold'
                        : 'text-[#d5c4ab] hover:bg-[#242323]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5efd8a]"></span>
                      Probar como ABIERTO
                    </span>
                    {scheduleOverride === 'open' && <span className="text-[10px]">✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScheduleOverride('closed');
                      setShowScheduleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      scheduleOverride === 'closed'
                        ? 'bg-[#a90111]/20 text-[#ffb4ac] font-bold'
                        : 'text-[#d5c4ab] hover:bg-[#242323]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ac]"></span>
                      Probar como CERRADO
                    </span>
                    {scheduleOverride === 'closed' && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions: Socials + Cart */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://www.facebook.com/lamonterreyenaburguer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de La Monterreyena"
            title="Facebook"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#242323] hover:bg-[#1877F2]/20 text-[#a0a0a0] hover:text-[#1877F2] transition-colors"
          >
            <Facebook className="w-4 h-4 fill-current" />
          </a>

          <a
            href="https://www.instagram.com/lamonterreyenaburguer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de La Monterreyena"
            title="Instagram"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#242323] hover:bg-[#E4405F]/20 text-[#a0a0a0] hover:text-[#E4405F] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenCart}
            aria-label="Ver carrito"
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#242323] text-[#ffdca1] hover:bg-[#333231] active:scale-95 transition-all shadow-md ml-0.5"
          >
            <ShoppingBag className="w-4 h-4 transition-transform" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ffb800] text-[#412d00] text-[10px] font-black flex items-center justify-center shadow-lg animate-scale">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

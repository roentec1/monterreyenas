import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, PartyPopper } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

interface BottomNavProps {
  activeTab: 'inicio' | 'menu' | 'pedido' | 'eventos';
  setActiveTab: (tab: 'inicio' | 'menu' | 'pedido' | 'eventos') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { totalItemsCount } = useOrder();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-[#242323] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.7)]">
      <div className="max-w-md mx-auto h-16 px-3 flex items-center justify-around">
        {/* Tab 1: Inicio */}
        <button
          type="button"
          onClick={() => setActiveTab('inicio')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-all duration-200 ${
            activeTab === 'inicio'
              ? 'text-[#ffb800] font-bold scale-105'
              : 'text-[#a0a0a0] hover:text-[#ffdca1]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Inicio</span>
          {activeTab === 'inicio' && (
            <span className="absolute bottom-1 w-6 h-1 rounded-full bg-[#ffb800] shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
          )}
        </button>

        {/* Tab 2: Menú */}
        <button
          type="button"
          onClick={() => setActiveTab('menu')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-all duration-200 ${
            activeTab === 'menu'
              ? 'text-[#ffb800] font-bold scale-105'
              : 'text-[#a0a0a0] hover:text-[#ffdca1]'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Menú</span>
          {activeTab === 'menu' && (
            <span className="absolute bottom-1 w-6 h-1 rounded-full bg-[#ffb800] shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
          )}
        </button>

        {/* Tab 3: Eventos */}
        <button
          type="button"
          onClick={() => setActiveTab('eventos')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-all duration-200 ${
            activeTab === 'eventos'
              ? 'text-[#ffb800] font-bold scale-105'
              : 'text-[#a0a0a0] hover:text-[#ffdca1]'
          }`}
        >
          <PartyPopper className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Eventos</span>
          {activeTab === 'eventos' && (
            <span className="absolute bottom-1 w-6 h-1 rounded-full bg-[#ffb800] shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
          )}
        </button>

        {/* Tab 4: Mi Pedido */}
        <button
          type="button"
          onClick={() => setActiveTab('pedido')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-all duration-200 ${
            activeTab === 'pedido'
              ? 'text-[#ffb800] font-bold scale-105'
              : 'text-[#a0a0a0] hover:text-[#ffdca1]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-[17px] h-[17px] px-1 rounded-full bg-[#ffb800] text-[#412d00] text-[10px] font-black flex items-center justify-center shadow-md">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold">Mi Pedido</span>
          {activeTab === 'pedido' && (
            <span className="absolute bottom-1 w-6 h-1 rounded-full bg-[#ffb800] shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
          )}
        </button>
      </div>
    </nav>
  );
};

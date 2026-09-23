import React from 'react';
import {
  Flame,
  Star,
  ArrowRight,
  Plus,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Sparkles,
  Utensils,
  AlertCircle,
  PartyPopper,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { CategoryType, Product } from '../types';
import { useOrder } from '../context/OrderContext';
import { PRODUCTS, HERO_PRODUCT_ID, PROMO_PRODUCT_ID } from '../data/products';

interface HomeViewProps {
  onSelectCategory: (category: CategoryType) => void;
  onOpenProductModal: (product: Product) => void;
  onNavigateTab: (tab: 'inicio' | 'menu' | 'pedido' | 'eventos') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectCategory,
  onOpenProductModal,
  onNavigateTab,
}) => {
  const { addItem, totalItemsCount, total, isOpen, nextOpeningText } = useOrder();

  const heroProduct = PRODUCTS.find(p => p.id === HERO_PRODUCT_ID) || PRODUCTS[0];
  const promoProduct = PRODUCTS.find(p => p.id === PROMO_PRODUCT_ID) || PRODUCTS[1];
  const burgerProducts = PRODUCTS.filter(p => p.category === 'hamburguesas');

  return (
    <div className="flex flex-col w-full pb-28 anim-fade-in">
      {/* Ticker / Welcome Bar */}
      <section className="w-full bg-[#171616] px-4 py-2 flex items-center justify-between border-b border-[#242323]">
        <div className="flex items-center gap-2 min-w-0">
          <Flame className="w-4 h-4 text-[#ffb800] shrink-0 animate-bounce" />
          <p className="font-oswald text-[12px] text-[#ffdca1] uppercase tracking-widest truncate">
            El Nuevo Sabor Regio
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {isOpen ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-[#5efd8a] animate-ping"></span>
              <span className="text-[11px] font-bold text-[#5efd8a] uppercase tracking-wider">
                Activo
              </span>
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-[#ffb4ac]"></span>
              <span className="text-[11px] font-bold text-[#ffb4ac] uppercase tracking-wider whitespace-nowrap">
                Cerrado
              </span>
            </>
          )}
        </div>
      </section>

      {/* Closed Notice Banner if outside business hours */}
      {!isOpen && (
        <section className="px-4 pt-3 pb-1">
          <div className="p-3 rounded-2xl bg-[#a90111]/20 border border-[#a90111]/50 text-[#ffb4ac] text-xs flex items-center gap-2.5 shadow-md">
            <AlertCircle className="w-5 h-5 text-[#ffb4ac] shrink-0" />
            <div>
              <p className="font-bold text-[12px] uppercase">
                Horario de atención: 6:00 PM a 11:00 PM
              </p>
              <p className="text-[11px] text-[#ffdca1]/80 mt-0.5">
                {nextOpeningText}. Puedes explorar el menú y armar tu pedido con anticipación.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Hero Highlight: La Vaquera */}
      <section className="px-4 pt-3 pb-2">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1a1a19] shadow-xl border border-[#242323] transition-all group">
          {/* Image Showcase */}
          <div className="relative w-full aspect-square bg-[#0e0e0e] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-[#ffb800]/25 via-[#a90111]/20 to-transparent blur-3xl burger-ambient-glow" />
            </div>

            <img
              src={heroProduct.image}
              alt="Hamburguesa La Vaquera"
              className="relative z-10 w-full h-full object-cover hero-burger-img transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a19] via-transparent to-black/40 pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 items-center">
              <span className="fav-badge-glow bg-[#a90111] text-[#ffb3ab] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                <Star className="w-3.5 h-3.5 fill-[#ffb3ab]" />
                La Favorita
              </span>
              <span className="bg-[#333231]/90 backdrop-blur-md text-[#ffdca1] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                Aros de Cebolla + BBQ
              </span>
            </div>

            {/* Price pill */}
            <div className="absolute bottom-3 right-3 z-20 bg-[#0e0e0e]/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-baseline gap-1 border border-[#ffba20]/20">
              <span className="text-[12px] text-[#a0a0a0]">Individual</span>
              <span className="font-oswald text-2xl text-[#ffba20] font-bold">
                ${heroProduct.price}
              </span>
            </div>
          </div>

          {/* Hero Description & CTA */}
          <div className="p-4 flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h1 className="font-oswald text-3xl text-[#e5e2e1] uppercase tracking-wide group-hover:text-[#ffdca1] transition-colors">
                  {heroProduct.name}
                </h1>
                <div className="flex items-center gap-1 text-[#ffba20] bg-[#242323] px-2 py-0.5 rounded-md font-semibold text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#ffba20]" />
                  <span>4.9</span>
                </div>
              </div>
              <p className="text-sm text-[#d5c4ab] leading-snug">
                {heroProduct.description}
              </p>
            </div>

            {/* Quick Actions for Hero Burger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenProductModal(heroProduct)}
                className="w-full h-12 py-2.5 px-4 rounded-xl bg-[#242323] hover:bg-[#333231] active:scale-[0.98] text-[#ffdca1] font-oswald text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#383531] transition-all"
              >
                <Plus className="w-4 h-4 text-[#ffb800]" />
                Personalizar y Pedir
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('menu')}
                className="shimmer-btn w-full h-12 py-2.5 px-4 rounded-xl bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald text-base font-bold uppercase tracking-wider flex items-center justify-between shadow-[0_4px_18px_rgba(255,184,0,0.28)] active:scale-[0.98] transition-all"
              >
                <span className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Ver 6 Hamburguesas
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Burgers Spotlight Showcase */}
      <section className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-oswald text-xl text-[#e5e2e1] uppercase tracking-wide">
              Hamburguesas Individuales
            </h2>
            <p className="text-[11px] text-[#a0a0a0]">Las 6 especialidades de la casa</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('hamburguesas')}
            className="text-xs font-bold text-[#ffb800] hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Burgers 2-column Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {burgerProducts.map(burger => (
            <div
              key={burger.id}
              className="rounded-2xl bg-[#1a1a19] border border-[#242323] p-2.5 flex flex-col justify-between hover:border-[#ffb800]/40 transition-all shadow-md group"
            >
              <div>
                {/* Thumbnail */}
                <div
                  onClick={() => onOpenProductModal(burger)}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0e0e0e] cursor-pointer mb-2"
                >
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {burger.badges && burger.badges.length > 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-[#a90111] text-[#ffb3ab] px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide shadow">
                      {burger.badges[0]}
                    </span>
                  )}
                  <div className="absolute bottom-1.5 right-1.5 bg-[#0e0e0e]/85 backdrop-blur-sm px-1.5 py-0.5 rounded font-oswald text-xs font-bold text-[#ffba20]">
                    ${burger.price}
                  </div>
                </div>

                {/* Info */}
                <h3
                  onClick={() => onOpenProductModal(burger)}
                  className="font-oswald text-sm text-[#e5e2e1] uppercase tracking-wide leading-tight group-hover:text-[#ffdca1] transition-colors cursor-pointer"
                >
                  {burger.name}
                </h3>
                <p className="text-[11px] text-[#a0a0a0] line-clamp-2 mt-0.5 leading-snug">
                  {burger.description}
                </p>
              </div>

              {/* Order Button */}
              <div className="mt-2 pt-2 border-t border-[#242323] flex items-center justify-between gap-1">
                <span className="font-oswald text-base font-bold text-[#ffba20]">
                  ${burger.price}
                </span>
                <button
                  type="button"
                  onClick={() => addItem(burger, 1)}
                  className="h-7 px-2.5 rounded-lg bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all shadow"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>Pedir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo del Día Card */}
      <section className="px-4 py-2">
        <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#1a1a19] to-[#242323] p-3.5 shadow-lg flex items-center gap-3 overflow-hidden border border-[#ffb800]/20 hover:border-[#ffb800]/40 transition-all">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#ffb800]/15 blur-2xl pointer-events-none burger-ambient-glow" />

          {/* Thumbnail */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#0e0e0e] shadow-md group">
            <img
              src={promoProduct.image}
              alt="Combo Vaquera del Día"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-1 left-1 bg-[#a90111] text-[#ffb3ab] px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-extrabold shadow animate-pulse">
              Hoy
            </span>
          </div>

          {/* Promo Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5efd8a]" />
                <span className="text-[10px] text-[#5efd8a] uppercase tracking-wider font-extrabold">
                  Promoción Especial
                </span>
              </div>
              <h3 className="font-oswald text-lg text-[#e5e2e1] uppercase leading-tight truncate">
                {promoProduct.name}
              </h3>
              <p className="text-xs text-[#d5c4ab] line-clamp-2 mt-0.5">
                {promoProduct.description}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-oswald text-xl text-[#ffba20] font-bold">
                  ${promoProduct.price}
                </span>
                {promoProduct.originalPrice && (
                  <span className="text-xs text-[#a0a0a0] line-through">
                    ${promoProduct.originalPrice}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => addItem(promoProduct, 1)}
                className="px-3 py-1.5 rounded-lg bg-[#333231] hover:bg-[#ffb800] text-[#ffdca1] hover:text-[#412d00] text-xs uppercase tracking-wide font-bold flex items-center gap-1 transition-all active:scale-95 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                Pedir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catering & Eventos Banner */}
      <section className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a1c0d] to-[#1c1611] border border-[#ffb800]/30 p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffb800]/20 text-[#ffdca1] text-[10px] font-bold uppercase tracking-wider">
                <PartyPopper className="w-3 h-3 text-[#ffb800]" />
                Eventos & Fiestas
              </div>
              <h3 className="font-oswald text-xl uppercase tracking-wider text-[#ffdca1]">
                ¿Tienes un Evento o Festejo?
              </h3>
              <p className="text-xs text-[#d5c4ab] max-w-[280px] leading-snug">
                Llevamos nuestras hamburguesas al carbón a tu fiesta, posada o reunión. Cotiza con nosotros.
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#ffb800]/15 flex items-center justify-center text-[#ffb800] shrink-0 border border-[#ffb800]/30">
              <PartyPopper className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => onNavigateTab('eventos')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span>Formulario de Eventos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/528136430081?text=Hola%20La%20Monterreyena%2C%20quisiera%20pedir%20informes%20para%20un%20evento%20especial%20%F0%9F%8D%94%F0%9F%8E%89"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-oswald text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Info & Horarios */}
      <section className="px-4 py-2">
        <div className="w-full rounded-2xl bg-[#1a1a19] p-4 shadow-md flex flex-col gap-3.5 border border-[#242323]">
          {/* Status & Schedule Row */}
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isOpen ? 'bg-[#242323] text-[#5efd8a]' : 'bg-[#242323] text-[#ffb4ac]'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-xs text-[#e5e2e1] uppercase tracking-wider">
                  Horario de Atención
                </span>
                {isOpen ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#3ae071]/20 text-[#5efd8a] text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5efd8a] animate-pulse"></span>
                    Abierto Ahora para Pedidos
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#a90111]/20 text-[#ffb4ac] text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ac]"></span>
                    Cerrado por Ahora
                  </div>
                )}
              </div>
              <p className="text-xs text-[#d5c4ab]">
                Lunes a Domingo:{' '}
                <span className="text-[#e5e2e1] font-semibold">6:00 PM – 11:00 PM</span>
              </p>
              {!isOpen && (
                <p className="text-[11px] text-[#ffb800] mt-1">
                  ⏰ {nextOpeningText}. Las órdenes se reciben únicamente en este rango de horario.
                </p>
              )}
            </div>
          </div>

          {/* Location Row */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#242323]">
            <div className="w-10 h-10 rounded-xl bg-[#242323] flex items-center justify-center text-[#ffba20] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-[#e5e2e1] uppercase tracking-wider mb-0.5">
                Ubicación & Servicio
              </h4>
              <p className="text-xs font-semibold text-[#ffb800] mb-0.5">
                Plutarco E Calles #1250, Gpe NL
              </p>
              <p className="text-xs text-[#d5c4ab] leading-relaxed">
                Servicio para llevar y entrega a domicilio. Caliente y rápido hasta tu puerta.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#242323]">
            <span className="text-xs font-medium text-[#a0a0a0]">Síguenos en redes:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=100087675398991"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#242323] hover:bg-[#1877F2]/20 text-[#d5c4ab] hover:text-[#1877F2] text-xs font-semibold border border-[#383531] transition-all"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/monterreyenas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#242323] hover:bg-[#E4405F]/20 text-[#d5c4ab] hover:text-[#E4405F] text-xs font-semibold border border-[#383531] transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Order / Checkout Guide CTA */}
      <section className="px-4 pt-2 pb-2">
        <button
          type="button"
          onClick={() => onNavigateTab(totalItemsCount > 0 ? 'pedido' : 'menu')}
          className="w-full min-h-[56px] py-3 px-4 rounded-2xl bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald shadow-xl shadow-[#ffb800]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <ShoppingBag className="w-5 h-5 shrink-0" />
          <div className="flex flex-col items-center justify-center text-center min-w-0">
            {totalItemsCount > 0 ? (
              <>
                <span className="text-base font-bold uppercase tracking-wider leading-tight">
                  Revisar Mi Pedido ({totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'})
                </span>
                <span className="text-xs font-black font-sans bg-[#412d00]/15 px-2.5 py-0.5 rounded-md mt-0.5">
                  Total a Pagar: ${total}
                </span>
              </>
            ) : isOpen ? (
              <>
                <span className="text-base font-bold uppercase tracking-wider leading-tight">
                  Explorar Menú Completo
                </span>
                <span className="text-[11px] font-sans font-semibold text-[#412d00]/80">
                  Comienza tu orden aquí
                </span>
              </>
            ) : (
              <>
                <span className="text-base font-bold uppercase tracking-wider leading-tight">
                  Explorar Menú Completo
                </span>
                <span className="text-[11px] font-sans font-bold text-[#412d00]/95 bg-[#412d00]/10 px-2 py-0.5 rounded-md mt-0.5">
                  ⏰ Pedidos de 6:00 PM a 11:00 PM
                </span>
              </>
            )}
          </div>
        </button>
      </section>
    </div>
  );
};

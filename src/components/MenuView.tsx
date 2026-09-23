import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Star, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';
import { CategoryType, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useOrder } from '../context/OrderContext';

interface MenuViewProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenProductModal: (product: Product) => void;
  onNavigateTab: (tab: 'inicio' | 'menu' | 'pedido') => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenProductModal,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { items, addItem, updateQuantity, totalItemsCount, total, isOpen, nextOpeningText } = useOrder();

  // Find quantity of a product currently in the order (summing across extras if any)
  const getProductQuantityInCart = (productId: string) => {
    return items
      .filter(item => item.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const getFirstCartItemId = (productId: string) => {
    const item = items.find(i => i.productId === productId);
    return item ? item.cartItemId : null;
  };

  const categories: { id: CategoryType; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'todos', label: 'Todos', count: PRODUCTS.length },
      {
        id: 'hamburguesas',
        label: 'Hamburguesas',
        count: PRODUCTS.filter(p => p.category === 'hamburguesas').length,
      },
      {
        id: 'combos',
        label: 'Combos',
        count: PRODUCTS.filter(p => p.category === 'combos').length,
      },
      {
        id: 'complementos',
        label: 'Complementos',
        count: PRODUCTS.filter(p => p.category === 'complementos').length,
      },
      {
        id: 'bebidas',
        label: 'Bebidas',
        count: PRODUCTS.filter(p => p.category === 'bebidas').length,
      },
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags &&
          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-20 anim-fade-in">
      {/* Top Banner / Search Header */}
      <div className="sticky top-16 z-30 bg-[#131313]/95 backdrop-blur-xl px-4 pt-3 pb-2 border-b border-[#242323]">
        {/* Search Input */}
        <div className="relative w-full mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0a0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar hamburguesas, combos, bebidas..."
            className="w-full bg-[#1a1a19] border border-[#333231] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#e5e2e1] placeholder-[#7a7671] focus:outline-none focus:border-[#ffb800] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a0a0a0] hover:text-white bg-[#242323] px-1.5 py-0.5 rounded"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#ffb800] text-[#412d00] shadow-md font-bold'
                    : 'bg-[#1a1a19] text-[#d5c4ab] hover:bg-[#242323] border border-[#2e2d2b]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#412d00]/20 text-[#412d00]' : 'bg-[#242323] text-[#a0a0a0]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="px-4 pt-4 flex flex-col gap-4">
        {!isOpen && (
          <div className="p-3 rounded-xl bg-[#a90111]/15 border border-[#a90111]/40 text-[#ffb4ac] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb4ac] shrink-0"></span>
            <div>
              <p className="font-bold">Cocina cerrada por ahora (Horario: 6:00 PM – 11:00 PM)</p>
              <p className="text-[11px] text-[#ffdca1]/80 mt-0.5">
                {nextOpeningText}. Puedes agregar productos y guardar tu orden.
              </p>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-[#a0a0a0] flex flex-col items-center justify-center">
            <SlidersHorizontal className="w-10 h-10 text-[#555] mb-2" />
            <p className="font-semibold text-sm">No encontramos productos con ese filtro</p>
            <p className="text-xs text-[#777] mt-1">Intenta con otra búsqueda o categoría</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('todos');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-[#242323] text-xs text-[#ffdca1] font-semibold"
            >
              Ver todo el menú
            </button>
          </div>
        ) : (
          filteredProducts.map(product => {
            const qtyInCart = getProductQuantityInCart(product.id);
            const cartItemId = getFirstCartItemId(product.id);

            return (
              <div
                key={product.id}
                className="w-full rounded-2xl bg-[#1a1a19] border border-[#242323] overflow-hidden shadow-md transition-all hover:border-[#ffb800]/30 flex flex-col sm:flex-row group"
              >
                {/* Product Image */}
                <div
                  onClick={() => onOpenProductModal(product)}
                  className="relative w-full sm:w-44 aspect-video sm:aspect-square bg-[#0e0e0e] shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a19] via-transparent to-transparent sm:hidden" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {product.isPromo && (
                      <span className="bg-[#a90111] text-[#ffb3ab] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shadow animate-pulse">
                        {product.promoBadge || 'Promo'}
                      </span>
                    )}
                    {product.badges && product.badges.length > 0 && !product.isPromo && (
                      <span className="bg-[#242323]/90 backdrop-blur-md text-[#ffdca1] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                        {product.badges[0]}
                      </span>
                    )}
                  </div>

                  {product.rating && (
                    <div className="absolute bottom-2 left-2 bg-[#0e0e0e]/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[11px] font-bold text-[#ffba20] flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-[#ffba20]" />
                      <span>{product.rating}</span>
                    </div>
                  )}
                </div>

                {/* Info & Order Controls */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div
                      onClick={() => onOpenProductModal(product)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-oswald text-lg text-[#e5e2e1] uppercase tracking-wide group-hover:text-[#ffdca1] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#d5c4ab] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Tag chips */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-2">
                        {product.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#242323] text-[#a0a0a0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Quantity Controls Row */}
                  <div className="mt-3 pt-2.5 border-t border-[#242323] flex items-center justify-between gap-2">
                    {/* Price with promo strike */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-oswald text-xl text-[#ffba20] font-bold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#888] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add / Quantity Stepper */}
                    <div className="flex items-center gap-1.5">
                      {product.availableExtras && product.availableExtras.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onOpenProductModal(product)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#242323] hover:bg-[#333231] text-[11px] font-semibold text-[#ffdca1] border border-[#383531] transition-all"
                        >
                          Personalizar
                        </button>
                      )}

                      {qtyInCart > 0 ? (
                        /* Interactive inline stepper */
                        <div className="flex items-center gap-1 bg-[#242323] border border-[#ffb800]/40 rounded-xl p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => {
                              if (cartItemId) {
                                updateQuantity(cartItemId, -1);
                              }
                            }}
                            className="w-7 h-7 rounded-lg bg-[#1a1a19] text-[#e5e2e1] hover:text-[#ffb800] flex items-center justify-center active:scale-90 transition-all"
                            aria-label="Quitar una unidad"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-[#ffdca1]">
                            {qtyInCart}
                          </span>
                          <button
                            type="button"
                            onClick={() => addItem(product, 1)}
                            className="w-7 h-7 rounded-lg bg-[#ffb800] text-[#412d00] flex items-center justify-center active:scale-90 transition-all"
                            aria-label="Agregar otra unidad"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        /* Initial Add Button */
                        <button
                          type="button"
                          onClick={() => addItem(product, 1)}
                          className="h-8 px-3 rounded-xl bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow transition-all active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pedir</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Sticky Total Order Bar if items exist */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-30 p-3 bg-gradient-to-t from-[#131313] via-[#131313]/95 to-transparent pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              type="button"
              onClick={() => onNavigateTab('pedido')}
              className="w-full h-12 px-4 rounded-xl bg-[#ffb800] text-[#412d00] font-oswald text-sm font-bold uppercase tracking-wider flex items-center justify-between shadow-2xl shadow-[#ffb800]/30 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#412d00] text-[#ffb800] px-2 py-0.5 rounded-full text-xs font-black">
                  {totalItemsCount}
                </span>
                <span>Ver Mi Pedido</span>
              </div>
              <span className="font-sans font-black text-base">
                Total: ${total}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

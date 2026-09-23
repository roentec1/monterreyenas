import React, { useState } from 'react';
import { X, Star, Plus, Minus, Check, Flame, Clock } from 'lucide-react';
import { CartItemExtra, Product } from '../types';
import { useOrder } from '../context/OrderContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<CartItemExtra[]>([]);
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const toggleExtra = (extra: CartItemExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      }
      return [...prev, extra];
    });
  };

  const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = product.price + extrasSum;
  const itemTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedExtras, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm anim-fade-in">
      {/* Background overlay click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh] flex flex-col bg-[#1a1a19] border border-[#333231] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pb-4">
          {/* Product Image */}
          <div className="relative w-full aspect-4/3 bg-[#0e0e0e] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a19] via-transparent to-black/30 pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-[#a90111] text-[#ffb3ab] text-[11px] font-bold tracking-wider uppercase shadow"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Price Tag */}
            <div className="absolute bottom-3 right-3 bg-[#0e0e0e]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#ffba20]/20 shadow-lg flex items-baseline gap-1">
              <span className="text-[12px] text-[#a0a0a0]">Precio</span>
              <span className="font-oswald text-2xl font-bold text-[#ffba20]">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-oswald text-2xl font-bold text-[#e5e2e1] uppercase tracking-wide">
                  {product.name}
                </h2>
                {product.rating && (
                  <div className="flex items-center gap-1 bg-[#242323] px-2 py-0.5 rounded-md text-[#ffba20] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#ffba20]" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-[#d5c4ab] mt-1.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#242323] text-xs text-[#d5c4ab]"
                  >
                    {tag.includes('Carbón') || tag.includes('Grill') ? (
                      <Flame className="w-3.5 h-3.5 text-[#ffb800]" />
                    ) : tag.includes('Min') ? (
                      <Clock className="w-3.5 h-3.5 text-[#ffb800]" />
                    ) : null}
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Extras Selection */}
            {product.availableExtras && product.availableExtras.length > 0 && (
              <div className="pt-3 border-t border-[#242323]">
                <h3 className="font-oswald text-sm text-[#ffdca1] uppercase tracking-wider mb-2">
                  Personalizar / Ingredientes Extra
                </h3>
                <div className="space-y-2">
                  {product.availableExtras.map(extra => {
                    const isSelected = selectedExtras.some(e => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#ffb800]/10 border-[#ffb800] text-[#ffdca1]'
                            : 'bg-[#242323] border-transparent hover:border-[#383531] text-[#e5e2e1]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'bg-[#ffb800] border-[#ffb800] text-[#131313]'
                                : 'border-[#4a4744] bg-[#1a1a19]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-medium">{extra.name}</span>
                        </div>
                        <span className="text-xs font-bold text-[#ffba20]">
                          +${extra.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Notes */}
            <div className="pt-2 border-t border-[#242323]">
              <label className="block text-xs font-semibold text-[#d5c4ab] uppercase tracking-wide mb-1.5">
                Instrucciones para cocina (opcional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Ej. Sin cebolla, aderezo aparte, bien dorada..."
                rows={2}
                className="w-full bg-[#242323] border border-[#383531] rounded-xl px-3 py-2 text-sm text-[#e5e2e1] placeholder-[#736e67] focus:outline-none focus:border-[#ffb800]"
              />
            </div>
          </div>
        </div>

        {/* Footer Fixed Bar inside Modal */}
        <div className="p-4 bg-[#141413] border-t border-[#242323] flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-[#242323] rounded-xl p-1 shrink-0 border border-[#383531]">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#e5e2e1] disabled:opacity-30 hover:bg-[#333231] active:scale-90 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-7 text-center font-bold text-sm text-[#ffdca1]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#e5e2e1] hover:bg-[#333231] active:scale-90 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 px-4 rounded-xl bg-[#ffb800] hover:bg-[#ffba20] active:scale-95 text-[#412d00] font-oswald text-base font-bold uppercase tracking-wider flex items-center justify-between shadow-lg shadow-[#ffb800]/20 transition-all"
          >
            <span>Agregar al Pedido</span>
            <span className="font-sans text-sm font-extrabold bg-[#412d00]/15 px-2 py-0.5 rounded-md">
              ${itemTotal}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

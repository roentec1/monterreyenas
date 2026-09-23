import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Store,
  Clock,
  Sparkles,
  ArrowLeft,
  Phone,
  User,
  AlertCircle,
  Banknote,
  Building2,
  Copy,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { DeliveryMethod, PaymentMethod } from '../types';

interface CartViewProps {
  onNavigateTab: (tab: 'inicio' | 'menu' | 'pedido') => void;
  onOrderConfirmed: () => void;
}

export const BANK_DETAILS = {
  bank: 'BBVA México',
  beneficiary: 'Las Monterreyenas Burgers',
  clabe: '012 580 015489347281',
  cardNumber: '4152 3140 8921 5472',
};

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
  </svg>
);

export const CartView: React.FC<CartViewProps> = ({ onNavigateTab, onOrderConfirmed }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryCost,
    deliveryMethod,
    setDeliveryMethod,
    promoSavings,
    total,
    customerInfo,
    updateCustomerInfo,
    submitOrder,
    isOpen,
    nextOpeningText,
  } = useOrder();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    cash?: string;
  }>({});

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  // Generate suggested cash chips
  const suggestedCashAmounts = React.useMemo(() => {
    const amounts = [total];
    const nextHundred = Math.ceil(total / 100) * 100;
    if (nextHundred > total && !amounts.includes(nextHundred)) {
      amounts.push(nextHundred);
    }
    if (total < 500 && !amounts.includes(500)) amounts.push(500);
    if (total < 1000 && !amounts.includes(1000)) amounts.push(1000);
    return amounts.slice(0, 4);
  }, [total]);

  // Generate URL for WhatsApp with exact structure requested
  const buildWhatsAppUrl = (): string => {
    if (items.length === 0) return '';

    const lines: string[] = [];
    // 1. Saludo inicial
    lines.push('Hola Monterreyenas, Quiero hacer un Pedido!');
    lines.push('');

    // 2. Cada producto elegido con su cantidad y precio
    items.forEach(item => {
      const itemTotalPrice = item.finalUnitPrice * item.quantity;
      let line = `• ${item.quantity}x ${item.name} ($${itemTotalPrice})`;
      if (item.selectedExtras.length > 0) {
        line += `\n  (Extras: ${item.selectedExtras.map(e => e.name).join(', ')})`;
      }
      if (item.notes && item.notes.trim()) {
        line += `\n  (Nota: ${item.notes.trim()})`;
      }
      lines.push(line);
    });

    if (deliveryMethod === 'delivery' && deliveryCost > 0) {
      lines.push(`• Costo de Envío: $${deliveryCost}`);
    }

    // 3. El Total
    lines.push('');
    lines.push(`Total: $${total}`);

    // Datos del cliente validados
    if (customerInfo.name.trim()) {
      lines.push(`Nombre: ${customerInfo.name.trim()}`);
    }
    if (customerInfo.phone.trim()) {
      lines.push(`Teléfono: ${customerInfo.phone.trim()}`);
    }
    if (deliveryMethod === 'delivery') {
      if (customerInfo.address.trim()) {
        lines.push(`Dirección de Entrega: ${customerInfo.address.trim()}`);
      }
    } else {
      lines.push('Modalidad: Para recoger en sucursal (Plutarco E Calles #1250)');
    }

    // Método de Pago
    lines.push('');
    if (customerInfo.paymentMethod === 'efectivo') {
      const isExact =
        customerInfo.cashAmount === 'exacto' ||
        Number(customerInfo.cashAmount) === total;

      if (isExact) {
        lines.push(`Método de Pago: Efectivo (Pago exacto: $${total})`);
      } else {
        const cashVal = Number(customerInfo.cashAmount) || total;
        const change = Math.max(0, cashVal - total);
        lines.push(`Método de Pago: Efectivo`);
        lines.push(`Paga con: $${cashVal} (Cambio a entregar: $${change})`);
      }
    } else {
      lines.push(`Método de Pago: Transferencia Bancaria (SPEI BBVA)`);
      lines.push(`*Anexo comprobante de transferencia bancaria*`);
    }

    // 4. Saludo final
    lines.push('');
    lines.push('¿Me Confirmas Disponibilidad?');

    const fullMessage = lines.join('\n');
    return `https://wa.me/528136430081?text=${encodeURIComponent(fullMessage)}`;
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    if (items.length === 0) {
      e.preventDefault();
      setValidationError('El pedido está vacío. Agrega productos para ordenar.');
      return;
    }

    const errors: { name?: string; phone?: string; address?: string; cash?: string } = {};

    // Validar nombre no vacío
    if (!customerInfo.name.trim()) {
      errors.name = 'Por favor ingresa tu nombre completo.';
    }

    // Validar teléfono no vacío
    const digits = customerInfo.phone.replace(/\D/g, '');
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Por favor ingresa un número de teléfono de contacto.';
    } else if (digits.length < 8) {
      errors.phone = 'Por favor ingresa un teléfono válido (al menos 8-10 dígitos).';
    }

    // Validar dirección si es a domicilio
    if (deliveryMethod === 'delivery' && !customerInfo.address.trim()) {
      errors.address = 'Por favor ingresa tu dirección completa (calle, número y colonia).';
    }

    // Validar pago en efectivo
    if (customerInfo.paymentMethod === 'efectivo') {
      const cashStr = (customerInfo.cashAmount || '').trim();
      if (!cashStr) {
        errors.cash = `Indica con cuánto pagarás o selecciona "Pago exacto ($${total})".`;
      } else if (cashStr !== 'exacto') {
        const numericVal = Number(cashStr);
        if (isNaN(numericVal) || numericVal < total) {
          errors.cash = `La cantidad en efectivo debe ser de al menos $${total} para cubrir el pedido.`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setFieldErrors(errors);
      setValidationError('Por favor completa los campos marcados en rojo antes de enviar tu pedido.');

      if (errors.name || errors.phone || errors.address) {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (errors.cash) {
        paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // All fields are valid
    setFieldErrors({});
    setValidationError(null);

    // Record internal order
    submitOrder();
    onOrderConfirmed();
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center anim-fade-in pb-28">
        <div className="w-20 h-20 rounded-full bg-[#1a1a19] border border-[#242323] flex items-center justify-center text-[#ffb800] mb-4 shadow-inner">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="font-oswald text-2xl text-[#e5e2e1] uppercase tracking-wide">
          Tu Pedido está Vacío
        </h2>
        <p className="text-sm text-[#a0a0a0] max-w-xs mt-2 leading-relaxed">
          Aún no has agregado productos a tu orden. ¡Descubre nuestras hamburguesas al carbón y combos especiales!
        </p>

        {/* Action to browse */}
        <button
          type="button"
          onClick={() => onNavigateTab('menu')}
          className="mt-6 px-6 py-3 rounded-xl bg-[#ffb800] hover:bg-[#ffba20] text-[#412d00] font-oswald text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#ffb800]/20 active:scale-95 transition-all"
        >
          Explorar Menú Completo
        </button>

        {/* Disabled WhatsApp Button as requested */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-3 w-full max-w-xs min-h-[50px] py-3 px-4 rounded-xl bg-[#242323] text-[#7a7671] border border-[#383531] font-oswald text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-50 shadow-none"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#7a7671]" />
          <span>Pedir por WhatsApp (Vacío)</span>
        </button>
        <p className="text-[11px] text-[#7a7671] mt-2">
          Agrega hamburguesas o complementos para habilitar el botón de WhatsApp.
        </p>
      </div>
    );
  }

  const whatsAppUrl = buildWhatsAppUrl();

  return (
    <div className="flex flex-col w-full px-4 py-4 space-y-4 anim-fade-in pb-28">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#242323] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateTab('menu')}
            className="p-1.5 rounded-lg bg-[#242323] text-[#d5c4ab] hover:text-[#ffb800] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-oswald text-2xl text-[#e5e2e1] uppercase tracking-wide">
              Mi Pedido
            </h1>
            <p className="text-xs text-[#a0a0a0]">
              {items.reduce((sum, i) => sum + i.quantity, 0)} productos en tu orden
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-[#a90111] hover:text-[#ff8077] flex items-center gap-1 font-semibold px-2 py-1 rounded-lg hover:bg-[#a90111]/10 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Vaciar</span>
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {items.map(item => {
          const unitPrice = item.finalUnitPrice;
          const itemTotal = unitPrice * item.quantity;

          return (
            <div
              key={item.cartItemId}
              className="p-3.5 rounded-2xl bg-[#1a1a19] border border-[#242323] flex gap-3 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-18 h-18 rounded-xl object-cover shrink-0 bg-[#0e0e0e]"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h2 className="font-oswald text-base text-[#e5e2e1] uppercase leading-tight">
                      {item.name}
                    </h2>
                    <span className="font-oswald text-base text-[#ffba20] font-bold tabular-nums">
                      ${itemTotal}
                    </span>
                  </div>

                  {item.selectedExtras.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.selectedExtras.map(extra => (
                        <span
                          key={extra.id}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[#242323] text-[#ffdca1]"
                        >
                          +{extra.name} (${extra.price})
                        </span>
                      ))}
                    </div>
                  )}

                  {item.notes && (
                    <p className="text-[11px] text-[#a0a0a0] italic mt-1 line-clamp-1">
                      Nota: "{item.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#242323]">
                  <span className="text-[11px] text-[#a0a0a0]">
                    ${unitPrice} c/u
                  </span>

                  <div className="flex items-center gap-2 bg-[#242323] rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#d5c4ab] hover:text-[#e5e2e1] hover:bg-[#333231] transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-oswald text-sm text-[#e5e2e1] font-bold min-w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#ffb800] hover:bg-[#333231] transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Method Selector */}
      <div className="p-4 rounded-2xl bg-[#1a1a19] border border-[#242323] space-y-3 shadow-md">
        <h3 className="font-oswald text-sm text-[#e5e2e1] uppercase tracking-wide">
          Método de Entrega
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDeliveryMethod('delivery')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              deliveryMethod === 'delivery'
                ? 'bg-[#ffb800]/15 border-[#ffb800] text-[#ffb800]'
                : 'bg-[#242323] border-transparent text-[#d5c4ab] hover:text-[#e5e2e1]'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-oswald text-xs font-bold uppercase tracking-wider">
              A Domicilio
            </span>
            <span className="text-[10px] text-[#a0a0a0]">$30 costo fijo</span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod('pickup')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              deliveryMethod === 'pickup'
                ? 'bg-[#ffb800]/15 border-[#ffb800] text-[#ffb800]'
                : 'bg-[#242323] border-transparent text-[#d5c4ab] hover:text-[#e5e2e1]'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="font-oswald text-xs font-bold uppercase tracking-wider">
              Recoger en Local
            </span>
            <span className="text-[10px] text-[#a0a0a0]">Sin costo ($0)</span>
          </button>
        </div>

        {deliveryMethod === 'pickup' ? (
          <div className="p-2.5 rounded-xl bg-[#242323] text-xs text-[#d5c4ab] flex items-center gap-2">
            <Store className="w-4 h-4 text-[#ffb800] shrink-0" />
            <span>Sucursal: Plutarco E Calles #1250, Gpe NL.</span>
          </div>
        ) : (
          <p className="text-[11px] text-[#a0a0a0]">
            Entregas en Guadalupe y zona conurbada. Se envía caliente desde cocina.
          </p>
        )}
      </div>

      {/* Customer Info Form with Validation */}
      <div
        ref={formRef}
        className="p-4 rounded-2xl bg-[#1a1a19] border border-[#242323] space-y-3 shadow-md scroll-mt-20"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-oswald text-sm text-[#e5e2e1] uppercase tracking-wide flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#ffb800]" />
            Datos Obligatorios para tu Pedido
          </h3>
          <span className="text-[10px] text-[#a0a0a0]">
            * Campos obligatorios
          </span>
        </div>

        <div className="space-y-3">
          {/* Nombre */}
          <div>
            <label className="text-[11px] font-semibold text-[#d5c4ab] block mb-1 flex items-center justify-between">
              <span>Nombre de quien recibe <span className="text-[#ff8077]">*</span></span>
              {fieldErrors.name && (
                <span className="text-[10px] text-[#ff8077] font-normal">Requerido</span>
              )}
            </label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={e => {
                updateCustomerInfo({ name: e.target.value });
                if (fieldErrors.name) {
                  setFieldErrors(prev => ({ ...prev, name: undefined }));
                }
              }}
              placeholder="Ej. Roberto Rayas"
              className={`w-full px-3 py-2 rounded-xl text-xs text-[#e5e2e1] focus:outline-none transition-all ${
                fieldErrors.name
                  ? 'bg-[#a90111]/15 border-2 border-[#ff8077] placeholder-[#ffb4ac]/50'
                  : 'bg-[#242323] border border-[#383531] focus:border-[#ffb800]'
              }`}
            />
            {fieldErrors.name && (
              <p className="text-[11px] text-[#ff8077] flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{fieldErrors.name}</span>
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-[11px] font-semibold text-[#d5c4ab] block mb-1 flex items-center justify-between">
              <span>Teléfono de contacto <span className="text-[#ff8077]">*</span></span>
              {fieldErrors.phone && (
                <span className="text-[10px] text-[#ff8077] font-normal">Requerido</span>
              )}
            </label>
            <div className="relative">
              <Phone className={`w-3.5 h-3.5 absolute left-3 top-3 ${fieldErrors.phone ? 'text-[#ff8077]' : 'text-[#a0a0a0]'}`} />
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={e => {
                  updateCustomerInfo({ phone: e.target.value });
                  if (fieldErrors.phone) {
                    setFieldErrors(prev => ({ ...prev, phone: undefined }));
                  }
                }}
                placeholder="81 1234 5678"
                className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs text-[#e5e2e1] focus:outline-none transition-all ${
                  fieldErrors.phone
                    ? 'bg-[#a90111]/15 border-2 border-[#ff8077] placeholder-[#ffb4ac]/50'
                    : 'bg-[#242323] border border-[#383531] focus:border-[#ffb800]'
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-[11px] text-[#ff8077] flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{fieldErrors.phone}</span>
              </p>
            )}
          </div>

          {/* Dirección si es Delivery */}
          {deliveryMethod === 'delivery' && (
            <div>
              <label className="text-[11px] font-semibold text-[#d5c4ab] block mb-1 flex items-center justify-between">
                <span>Dirección completa (Calle, Número, Colonia) <span className="text-[#ff8077]">*</span></span>
                {fieldErrors.address && (
                  <span className="text-[10px] text-[#ff8077] font-normal">Requerido</span>
                )}
              </label>
              <input
                type="text"
                value={customerInfo.address}
                onChange={e => {
                  updateCustomerInfo({ address: e.target.value });
                  if (fieldErrors.address) {
                    setFieldErrors(prev => ({ ...prev, address: undefined }));
                  }
                }}
                placeholder="Ej. Av. Linda Vista #340, Col. Libertad, Guadalupe"
                className={`w-full px-3 py-2 rounded-xl text-xs text-[#e5e2e1] focus:outline-none transition-all ${
                  fieldErrors.address
                    ? 'bg-[#a90111]/15 border-2 border-[#ff8077] placeholder-[#ffb4ac]/50'
                    : 'bg-[#242323] border border-[#383531] focus:border-[#ffb800]'
                }`}
              />
              {fieldErrors.address && (
                <p className="text-[11px] text-[#ff8077] flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{fieldErrors.address}</span>
                </p>
              )}
            </div>
          )}

          {/* Instrucciones opcionales */}
          <div>
            <label className="text-[11px] text-[#a0a0a0] block mb-1">
              Comentarios o instrucciones especiales (opcional)
            </label>
            <input
              type="text"
              value={customerInfo.notes}
              onChange={e => updateCustomerInfo({ notes: e.target.value })}
              placeholder="Ej. Tocar timbre blanco, salsas extra"
              className="w-full px-3 py-2 rounded-xl bg-[#242323] border border-[#383531] text-xs text-[#e5e2e1] focus:outline-none focus:border-[#ffb800]"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selector & Details */}
      <div
        ref={paymentRef}
        className="p-4 rounded-2xl bg-[#1a1a19] border border-[#242323] space-y-3.5 shadow-md scroll-mt-20"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-oswald text-sm text-[#e5e2e1] uppercase tracking-wide flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-[#ffb800]" />
            Forma de Pago
          </h3>
          <span className="text-[10px] text-[#ffb800] font-semibold">
            {customerInfo.paymentMethod === 'efectivo' ? '💵 Efectivo' : '🏦 Transferencia'}
          </span>
        </div>

        {/* Tab Selection between Cash vs Transfer */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              updateCustomerInfo({ paymentMethod: 'efectivo' });
              if (fieldErrors.cash) {
                setFieldErrors(prev => ({ ...prev, cash: undefined }));
              }
            }}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
              customerInfo.paymentMethod === 'efectivo'
                ? 'bg-[#ffb800]/15 border-[#ffb800] text-[#ffb800] shadow-sm'
                : 'bg-[#242323] border-transparent text-[#d5c4ab] hover:text-[#e5e2e1]'
            }`}
          >
            <Banknote className="w-5 h-5" />
            <span className="font-oswald text-xs font-bold uppercase tracking-wider">
              En Efectivo
            </span>
            <span className="text-[10px] text-[#a0a0a0]">Al recibir / entregar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              updateCustomerInfo({ paymentMethod: 'transferencia' });
              if (fieldErrors.cash) {
                setFieldErrors(prev => ({ ...prev, cash: undefined }));
              }
            }}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
              customerInfo.paymentMethod === 'transferencia'
                ? 'bg-[#ffb800]/15 border-[#ffb800] text-[#ffb800] shadow-sm'
                : 'bg-[#242323] border-transparent text-[#d5c4ab] hover:text-[#e5e2e1]'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-oswald text-xs font-bold uppercase tracking-wider">
              Transferencia
            </span>
            <span className="text-[10px] text-[#a0a0a0]">SPEI BBVA</span>
          </button>
        </div>

        {/* Option A: EFECTIVO */}
        {customerInfo.paymentMethod === 'efectivo' && (
          <div className="pt-2 border-t border-[#242323] space-y-2.5 anim-fade-in">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#d5c4ab] block">
                ¿Con qué cantidad vas a pagar? <span className="text-[#ff8077]">*</span>
              </label>
              <span className="text-[10px] text-[#a0a0a0]">
                Para llevar tu cambio exacto
              </span>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  updateCustomerInfo({ cashAmount: 'exacto' });
                  if (fieldErrors.cash) {
                    setFieldErrors(prev => ({ ...prev, cash: undefined }));
                  }
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  customerInfo.cashAmount === 'exacto' ||
                  customerInfo.cashAmount === String(total)
                    ? 'bg-[#ffb800] text-[#412d00] border-[#ffb800] font-bold'
                    : 'bg-[#242323] text-[#d5c4ab] border-[#383531] hover:bg-[#333231]'
                }`}
              >
                Pago Exacto (${total})
              </button>

              {suggestedCashAmounts
                .filter(amt => amt > total)
                .map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      updateCustomerInfo({ cashAmount: String(amt) });
                      if (fieldErrors.cash) {
                        setFieldErrors(prev => ({ ...prev, cash: undefined }));
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      customerInfo.cashAmount === String(amt)
                        ? 'bg-[#ffb800] text-[#412d00] border-[#ffb800] font-bold'
                        : 'bg-[#242323] text-[#d5c4ab] border-[#383531] hover:bg-[#333231]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
            </div>

            {/* Input for custom cash amount */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-[#a0a0a0] font-bold">
                $
              </span>
              <input
                type="number"
                min={total}
                step="1"
                value={
                  customerInfo.cashAmount === 'exacto' ? total : customerInfo.cashAmount || ''
                }
                onChange={e => {
                  updateCustomerInfo({ cashAmount: e.target.value });
                  if (fieldErrors.cash) {
                    setFieldErrors(prev => ({ ...prev, cash: undefined }));
                  }
                }}
                placeholder={`Monto en efectivo (ej. ${Math.max(total, 500)})`}
                className={`w-full pl-7 pr-3 py-2 rounded-xl text-xs text-[#e5e2e1] focus:outline-none transition-all ${
                  fieldErrors.cash
                    ? 'bg-[#a90111]/15 border-2 border-[#ff8077] placeholder-[#ffb4ac]/50'
                    : 'bg-[#242323] border border-[#383531] focus:border-[#ffb800]'
                }`}
              />
            </div>

            {/* Change Feedback calculation */}
            {(() => {
              if (!customerInfo.cashAmount) return null;
              if (customerInfo.cashAmount === 'exacto') {
                return (
                  <div className="p-2 rounded-xl bg-[#5efd8a]/10 border border-[#5efd8a]/30 text-[#5efd8a] text-[11px] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Pago exacto. El repartidor no requerirá cambio.</span>
                  </div>
                );
              }
              const val = Number(customerInfo.cashAmount);
              if (isNaN(val)) return null;

              if (val < total) {
                return (
                  <div className="p-2 rounded-xl bg-[#a90111]/15 border border-[#ff8077]/40 text-[#ff8077] text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Faltan ${total - val} para cubrir el total de tu pedido (${total}).
                    </span>
                  </div>
                );
              }

              const change = val - total;
              return (
                <div className="p-2.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/40 text-[#ffdca1] text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ffb800]" />
                    <span>Cambio a devolverte:</span>
                  </span>
                  <span className="font-oswald text-base text-[#ffb800] font-bold tabular-nums">
                    {change === 0 ? 'Sin cambio ($0)' : `$${change}`}
                  </span>
                </div>
              );
            })()}

            {fieldErrors.cash && (
              <p className="text-[11px] text-[#ff8077] flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{fieldErrors.cash}</span>
              </p>
            )}
          </div>
        )}

        {/* Option B: TRANSFERENCIA */}
        {customerInfo.paymentMethod === 'transferencia' && (
          <div className="pt-2 border-t border-[#242323] space-y-2.5 anim-fade-in">
            <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#ffb800]/40 space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#242323] pb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#ffb800]" />
                  <span className="font-oswald text-xs text-[#e5e2e1] uppercase tracking-wide">
                    Datos Bancarios Oficiales
                  </span>
                </div>
                <span className="text-[10px] bg-[#ffb800]/15 text-[#ffb800] px-2 py-0.5 rounded font-bold">
                  {BANK_DETAILS.bank}
                </span>
              </div>

              {/* Titular */}
              <div className="text-xs">
                <span className="text-[10px] text-[#a0a0a0] block">Titular / Beneficiario:</span>
                <span className="font-semibold text-[#e5e2e1]">{BANK_DETAILS.beneficiary}</span>
              </div>

              {/* CLABE */}
              <div className="flex items-center justify-between bg-[#1a1a19] p-2 rounded-lg border border-[#242323]">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-[#a0a0a0] block">CLABE Interbancaria (SPEI):</span>
                  <span className="font-mono text-xs text-[#ffb800] font-bold tracking-wider select-all">
                    {BANK_DETAILS.clabe}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(BANK_DETAILS.clabe, 'clabe')}
                  className="px-2.5 py-1 rounded-md bg-[#242323] hover:bg-[#333231] text-[#ffdca1] text-[11px] font-semibold flex items-center gap-1 shrink-0 border border-[#383531] active:scale-95 transition-all"
                >
                  {copiedKey === 'clabe' ? (
                    <>
                      <Check className="w-3 h-3 text-[#5efd8a]" />
                      <span className="text-[#5efd8a]">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tarjeta Débito opcional */}
              <div className="flex items-center justify-between bg-[#1a1a19] p-2 rounded-lg border border-[#242323]">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-[#a0a0a0] block">Número de Tarjeta (Débito):</span>
                  <span className="font-mono text-xs text-[#e5e2e1] tracking-wider select-all">
                    {BANK_DETAILS.cardNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(BANK_DETAILS.cardNumber.replace(/\s/g, ''), 'card')}
                  className="px-2.5 py-1 rounded-md bg-[#242323] hover:bg-[#333231] text-[#ffdca1] text-[11px] font-semibold flex items-center gap-1 shrink-0 border border-[#383531] active:scale-95 transition-all"
                >
                  {copiedKey === 'card' ? (
                    <>
                      <Check className="w-3 h-3 text-[#5efd8a]" />
                      <span className="text-[#5efd8a]">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Concepto */}
              <div className="text-xs pt-1 border-t border-[#242323] flex items-center justify-between">
                <span className="text-[10px] text-[#a0a0a0]">Concepto sugerido:</span>
                <span className="text-[11px] font-semibold text-[#ffdca1]">
                  {customerInfo.name.trim() ? `Pedido ${customerInfo.name.trim()}` : 'Pedido Hamburguesas'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 text-[#ffdca1] text-[11px] leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#ffb800] shrink-0 mt-0.5" />
              <span>
                Realiza tu transferencia por <strong>${total}</strong> y adjunta la captura de tu comprobante bancario al abrir el chat de WhatsApp para agilizar la preparación en cocina.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Price Summary Breakdown */}
      <div className="p-4 rounded-2xl bg-[#1a1a19] border border-[#242323] space-y-2.5 shadow-md">
        <h3 className="font-oswald text-sm text-[#e5e2e1] uppercase tracking-wide">
          Resumen de Cuenta
        </h3>

        <div className="flex justify-between text-xs text-[#d5c4ab]">
          <span>Subtotal de productos</span>
          <span className="font-bold text-[#e5e2e1] tabular-nums">${subtotal}</span>
        </div>

        {promoSavings > 0 && (
          <div className="flex justify-between text-xs text-[#5efd8a]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Ahorro por promociones
            </span>
            <span className="font-bold tabular-nums">-${promoSavings}</span>
          </div>
        )}

        <div className="flex justify-between text-xs text-[#d5c4ab]">
          <span>Costo de entrega</span>
          <span className="font-bold text-[#e5e2e1] tabular-nums">
            {deliveryCost === 0 ? 'Gratis ($0)' : `$${deliveryCost}`}
          </span>
        </div>

        <div className="pt-2 border-t border-[#242323] flex justify-between items-baseline">
          <div>
            <span className="font-oswald text-base text-[#e5e2e1] uppercase tracking-wide">
              Total a Pagar
            </span>
            <p className="text-[10px] text-[#a0a0a0]">
              {customerInfo.paymentMethod === 'efectivo'
                ? 'Pago en efectivo'
                : 'Transferencia bancaria SPEI'}
            </p>
          </div>
          <span className="font-oswald text-3xl font-bold text-[#ffb800] tabular-nums">
            ${total}
          </span>
        </div>
      </div>

      {/* Validation alert if any */}
      {validationError && (
        <div className="p-3.5 rounded-xl bg-[#a90111]/20 border-2 border-[#ff8077] text-[#ffb4ac] text-xs flex items-start gap-2.5 shadow-lg anim-fade-in">
          <AlertCircle className="w-5 h-5 text-[#ff8077] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-[#ffdca1] text-xs uppercase tracking-wide">
              Faltan Datos para tu Pedido
            </p>
            <p className="text-[11px] text-[#ffb4ac] mt-0.5 leading-relaxed">
              {validationError}
            </p>
          </div>
        </div>
      )}

      {/* Closed schedule notice if outside 6pm-11pm */}
      {!isOpen && (
        <div className="p-3.5 rounded-2xl bg-[#a90111]/20 border border-[#a90111]/60 text-[#ffb4ac] text-xs flex items-start gap-3 shadow-md">
          <Clock className="w-5 h-5 text-[#ffb4ac] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-[#ffdca1] uppercase font-oswald tracking-wide">
              Cocina Cerrada en este Momento
            </p>
            <p className="mt-1 leading-relaxed text-[#ffdca1]/90">
              Nuestro horario de atención es de <strong>6:00 PM a 11:00 PM</strong> (Lunes a Domingo).
            </p>
            <p className="mt-1 text-[#ffb800] font-semibold">
              ⏰ {nextOpeningText}. Al presionar el botón se enviará tu mensaje a WhatsApp con la pregunta de disponibilidad.
            </p>
          </div>
        </div>
      )}

      {/* Primary WhatsApp Order Button */}
      <div className="pt-1">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppOrder}
          className="w-full min-h-[56px] py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white font-oswald text-base font-bold uppercase tracking-wider flex items-center justify-between shadow-xl shadow-[#25D366]/30 active:scale-[0.98] transition-all no-underline group"
        >
          <span className="flex items-center gap-2.5">
            <WhatsAppIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>Pedir por WhatsApp</span>
          </span>
          <span className="font-sans font-black text-lg bg-black/25 px-2.5 py-0.5 rounded-lg text-white">
            ${total}
          </span>
        </a>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#a0a0a0]">
          <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
          <span>
            {customerInfo.paymentMethod === 'efectivo'
              ? 'Comanda con desglose y cambio lista para enviar al +52 81 3643 0081'
              : 'Comanda lista para enviar al +52 81 3643 0081 (anexa tu comprobante)'}
          </span>
        </div>
      </div>
    </div>
  );
};

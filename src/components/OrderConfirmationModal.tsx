import React from 'react';
import { CheckCircle, Clock, MapPin, Store, Receipt, ArrowRight } from 'lucide-react';
import { ConfirmedOrder } from '../types';

interface OrderConfirmationModalProps {
  order: ConfirmedOrder | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md anim-fade-in">
      <div className="relative w-full max-w-md bg-[#1a1a19] border border-[#ffb800]/30 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#3ae071]/20 border border-[#5efd8a] flex items-center justify-center text-[#5efd8a] mb-4 shadow-[0_0_20px_rgba(94,253,138,0.3)]">
          <CheckCircle className="w-9 h-9 stroke-[2.2]" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold text-[#ffb800] uppercase tracking-widest bg-[#242323] px-3 py-1 rounded-full">
            Pedido Confirmado
          </span>
          <h2 className="font-oswald text-3xl text-[#e5e2e1] uppercase tracking-wide mt-2">
            ¡Gracias!
          </h2>
          <p className="text-xs text-[#a0a0a0] mt-1">
            Orden #{order.orderId} • Registrada a las {order.createdAt}
          </p>
        </div>

        {/* Status Bar */}
        <div className="p-3.5 rounded-2xl bg-[#242323] border border-[#383531] flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#ffb800]/20 flex items-center justify-center text-[#ffb800] shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#ffdca1] uppercase">
              En Preparación en Cocina
            </h4>
            <p className="text-xs text-[#d5c4ab]">
              Tiempo estimado: {order.customerInfo.deliveryMethod === 'delivery' ? '25-35 min' : '15-20 min'}
            </p>
          </div>
        </div>

        {/* Delivery / Pickup Details */}
        <div className="p-3.5 rounded-2xl bg-[#171616] border border-[#2e2d2b] space-y-2 mb-4 text-xs">
          <div className="flex items-center gap-2 text-[#ffdca1] font-bold uppercase">
            {order.customerInfo.deliveryMethod === 'delivery' ? (
              <>
                <MapPin className="w-4 h-4 text-[#ffb800]" />
                <span>Entrega a Domicilio</span>
              </>
            ) : (
              <>
                <Store className="w-4 h-4 text-[#5efd8a]" />
                <span>Recoger en Sucursal</span>
              </>
            )}
          </div>
          <p className="text-[#e5e2e1]">
            <strong className="text-[#a0a0a0]">Cliente:</strong> {order.customerInfo.name} ({order.customerInfo.phone})
          </p>
          {order.customerInfo.deliveryMethod === 'delivery' ? (
            <p className="text-[#e5e2e1]">
              <strong className="text-[#a0a0a0]">Dirección:</strong> {order.customerInfo.address}
            </p>
          ) : (
            <p className="text-[#e5e2e1]">
              <strong className="text-[#a0a0a0]">Sucursal:</strong> Plutarco E Calles #1250, Gpe NL
            </p>
          )}
          {order.customerInfo.notes && (
            <p className="text-[#a0a0a0] italic">
              "Nota: {order.customerInfo.notes}"
            </p>
          )}
        </div>

        {/* Items Breakdown */}
        <div className="p-3.5 rounded-2xl bg-[#171616] border border-[#2e2d2b] space-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffdca1] uppercase mb-1">
            <Receipt className="w-4 h-4" />
            <span>Detalle del Pedido</span>
          </div>

          <div className="space-y-1.5 divide-y divide-[#242323]">
            {order.items.map(item => (
              <div key={item.cartItemId} className="pt-1.5 first:pt-0 flex justify-between text-xs">
                <div className="pr-2">
                  <p className="text-[#e5e2e1] font-medium">
                    <span className="text-[#ffb800] font-bold mr-1">{item.quantity}x</span>
                    {item.name}
                  </p>
                  {item.selectedExtras.length > 0 && (
                    <p className="text-[10px] text-[#ffba20]">
                      {item.selectedExtras.map(e => e.name).join(', ')}
                    </p>
                  )}
                </div>
                <span className="font-bold text-[#e5e2e1] shrink-0 tabular-nums">
                  ${item.finalUnitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#242323] space-y-1 text-xs text-[#a0a0a0]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-[#e5e2e1] tabular-nums">${order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#5efd8a]">
                <span>Descuento aplicado:</span>
                <span className="tabular-nums">-${order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Envío:</span>
              <span className="text-[#e5e2e1] tabular-nums">
                {order.deliveryCost === 0 ? 'Gratis' : `$${order.deliveryCost}`}
              </span>
            </div>
            <div className="flex justify-between font-oswald text-base text-[#ffb800] font-bold pt-1 border-t border-[#242323]">
              <span>TOTAL A PAGAR:</span>
              <span className="tabular-nums">${order.total}</span>
            </div>

            {/* Payment Method Details in Receipt */}
            <div className="pt-2 border-t border-[#242323] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#ffdca1] font-semibold">Forma de Pago:</span>
                <span className="text-[#e5e2e1] font-medium">
                  {order.customerInfo.paymentMethod === 'efectivo'
                    ? '💵 Efectivo'
                    : '🏦 Transferencia (SPEI)'}
                </span>
              </div>

              {order.customerInfo.paymentMethod === 'efectivo' ? (
                <div className="flex justify-between text-[11px] text-[#a0a0a0]">
                  <span>Monto con el que paga:</span>
                  <span className="text-[#e5e2e1] font-medium">
                    {order.customerInfo.cashAmount === 'exacto' ||
                    Number(order.customerInfo.cashAmount) === order.total
                      ? `Pago exacto ($${order.total})`
                      : `$${order.customerInfo.cashAmount || order.total} (Cambio: $${Math.max(0, (Number(order.customerInfo.cashAmount) || order.total) - order.total)})`}
                  </span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#242323] text-[11px] space-y-1 mt-1 text-[#d5c4ab]">
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Banco:</span>
                    <span className="text-[#e5e2e1] font-bold">BBVA México</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">CLABE:</span>
                    <span className="text-[#ffb800] font-mono font-bold select-all">012 580 015489347281</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Titular:</span>
                    <span className="text-[#e5e2e1]">Las Monterreyenas</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp & Dismiss Buttons */}
        <div className="space-y-2">
          {(() => {
            const lines: string[] = [];
            lines.push('Hola Monterreyenas, Quiero hacer un Pedido!');
            lines.push('');
            order.items.forEach(item => {
              let line = `• ${item.quantity}x ${item.name} ($${item.finalUnitPrice * item.quantity})`;
              if (item.selectedExtras.length > 0) {
                line += `\n  (Extras: ${item.selectedExtras.map(e => e.name).join(', ')})`;
              }
              lines.push(line);
            });
            if (order.deliveryCost > 0) {
              lines.push(`• Envío a domicilio: $${order.deliveryCost}`);
            }
            lines.push('');
            lines.push(`Total: $${order.total}`);
            if (order.customerInfo.name) {
              lines.push(`Cliente: ${order.customerInfo.name}`);
            }
            if (order.customerInfo.phone) {
              lines.push(`Teléfono: ${order.customerInfo.phone}`);
            }
            if (order.customerInfo.deliveryMethod === 'delivery' && order.customerInfo.address) {
              lines.push(`Dirección: ${order.customerInfo.address}`);
            } else {
              lines.push('Entrega: Para recoger en sucursal');
            }

            lines.push('');
            if (order.customerInfo.paymentMethod === 'efectivo') {
              const isExact =
                order.customerInfo.cashAmount === 'exacto' ||
                Number(order.customerInfo.cashAmount) === order.total;

              if (isExact) {
                lines.push(`Método de Pago: Efectivo (Pago exacto: $${order.total})`);
              } else {
                const cashVal = Number(order.customerInfo.cashAmount) || order.total;
                const change = Math.max(0, cashVal - order.total);
                lines.push(`Método de Pago: Efectivo`);
                lines.push(`Paga con: $${cashVal} (Cambio a entregar: $${change})`);
              }
            } else {
              lines.push('Método de Pago: Transferencia Bancaria (SPEI BBVA)');
              lines.push('*Anexo captura de comprobante de pago*');
            }

            lines.push('');
            lines.push('¿Me Confirmas Disponibilidad?');
            const waUrl = `https://wa.me/528136430081?text=${encodeURIComponent(lines.join('\n'))}`;

            return (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-oswald text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all no-underline"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
                </svg>
                <span>Enviar Comanda a WhatsApp</span>
              </a>
            );
          })()}

          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#242323] hover:bg-[#333231] text-[#ffdca1] font-oswald text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#383531] active:scale-95 transition-all"
          >
            <span>Realizar Otro Pedido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

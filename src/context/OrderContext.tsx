import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CartItem,
  CartItemExtra,
  ConfirmedOrder,
  DeliveryMethod,
  OrderCustomerInfo,
  Product,
  ScheduleOverride,
} from '../types';

interface OrderContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, extras?: CartItemExtra[], notes?: string) => void;
  updateQuantity: (cartItemId: string, deltaOrExact: number, isExact?: boolean) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryCost: number;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  total: number;
  promoSavings: number;
  customerInfo: OrderCustomerInfo;
  updateCustomerInfo: (info: Partial<OrderCustomerInfo>) => void;
  confirmedOrder: ConfirmedOrder | null;
  submitOrder: () => ConfirmedOrder | null;
  resetConfirmedOrder: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Schedule features (6:00 PM to 11:00 PM)
  isOpen: boolean;
  scheduleOverride: ScheduleOverride;
  setScheduleOverride: (override: ScheduleOverride) => void;
  nextOpeningText: string;
  currentTimeFormatted: string;
}

const STORAGE_KEY = 'monterreyenas_cart_state_v1';
const SCHEDULE_OVERRIDE_KEY = 'monterreyenas_schedule_override_v1';

const defaultCustomerInfo: OrderCustomerInfo = {
  name: '',
  phone: '',
  address: '',
  notes: '',
  deliveryMethod: 'delivery',
  paymentMethod: 'efectivo',
  cashAmount: '',
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from LocalStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>(defaultCustomerInfo);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Schedule Override state ('auto' | 'open' | 'closed')
  const [scheduleOverride, setScheduleOverrideState] = useState<ScheduleOverride>(() => {
    try {
      const saved = localStorage.getItem(SCHEDULE_OVERRIDE_KEY);
      if (saved === 'auto' || saved === 'open' || saved === 'closed') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'auto';
  });

  const setScheduleOverride = (override: ScheduleOverride) => {
    setScheduleOverrideState(override);
    try {
      localStorage.setItem(SCHEDULE_OVERRIDE_KEY, override);
    } catch {
      // ignore
    }
    if (override === 'open') {
      showToast('Simulador: Horario forzado a ABIERTO');
    } else if (override === 'closed') {
      showToast('Simulador: Horario forzado a CERRADO');
    } else {
      showToast('Horario automático según hora real');
    }
  };

  // Clock tick to evaluate schedule dynamically
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000); // check every 10 seconds
    return () => clearInterval(timer);
  }, []);

  // Determine if store is open:
  // Operating hours: 6:00 PM (18:00) to 11:00 PM (23:00)
  const isRealTimeOpen = useMemo(() => {
    const hour = now.getHours();
    return hour >= 18 && hour < 23;
  }, [now]);

  const isOpen = useMemo(() => {
    if (scheduleOverride === 'open') return true;
    if (scheduleOverride === 'closed') return false;
    return isRealTimeOpen;
  }, [scheduleOverride, isRealTimeOpen]);

  const currentTimeFormatted = useMemo(() => {
    return now.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [now]);

  const nextOpeningText = useMemo(() => {
    const hour = now.getHours();
    if (hour < 18) {
      return 'Abrimos hoy a las 6:00 PM';
    } else if (hour >= 23) {
      return 'Abrimos mañana a las 6:00 PM';
    }
    return 'Abierto ahora hasta las 11:00 PM';
  }, [now]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const addItem = (
    product: Product,
    quantity = 1,
    extras: CartItemExtra[] = [],
    notes = ''
  ) => {
    const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = product.price + extrasTotal;

    const extrasKey = extras
      .map(e => e.id)
      .sort()
      .join('-');
    const cartItemId = `${product.id}__${extrasKey}__${notes.trim().toLowerCase()}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        name: product.name,
        basePrice: product.price,
        finalUnitPrice: unitPrice,
        quantity,
        image: product.image,
        selectedExtras: extras,
        notes: notes.trim(),
      };
      return [...prevItems, newItem];
    });

    showToast(`✓ Se agregó ${product.name} al pedido`);
  };

  const updateQuantity = (cartItemId: string, deltaOrExact: number, isExact = false) => {
    setItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const nextQty = isExact ? deltaOrExact : item.quantity + deltaOrExact;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    showToast('Producto eliminado del pedido');
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateCustomerInfo = (info: Partial<OrderCustomerInfo>) => {
    setCustomerInfo(prev => ({ ...prev, ...info }));
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce(
    (acc, item) => acc + item.finalUnitPrice * item.quantity,
    0
  );

  const deliveryCost = items.length === 0 ? 0 : deliveryMethod === 'delivery' ? 30 : 0;

  const promoSavings = items.reduce((acc, item) => {
    if (item.productId === 'combo-vaquera') {
      return acc + (265 - 229) * item.quantity;
    }
    return acc;
  }, 0);

  const total = subtotal + deliveryCost;

  const submitOrder = (): ConfirmedOrder | null => {
    if (items.length === 0) return null;

    // Block orders outside schedule
    if (!isOpen) {
      showToast('⚠️ La cocina está cerrada. Pedidos de 6:00 PM a 11:00 PM');
      return null;
    }

    const orderId = `MTY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: ConfirmedOrder = {
      orderId,
      items: [...items],
      subtotal,
      deliveryCost,
      discount: promoSavings,
      total,
      customerInfo: { ...customerInfo, deliveryMethod },
      createdAt: new Date().toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConfirmedOrder(newOrder);
    setItems([]);
    return newOrder;
  };

  const resetConfirmedOrder = () => {
    setConfirmedOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryCost,
        deliveryMethod,
        setDeliveryMethod,
        total,
        promoSavings,
        customerInfo,
        updateCustomerInfo,
        confirmedOrder,
        submitOrder,
        resetConfirmedOrder,
        toastMessage,
        showToast,
        isOpen,
        scheduleOverride,
        setScheduleOverride,
        nextOpeningText,
        currentTimeFormatted,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

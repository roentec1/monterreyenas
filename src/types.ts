export type CategoryType = 'todos' | 'hamburguesas' | 'combos' | 'complementos' | 'bebidas';

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'hamburguesas' | 'combos' | 'complementos' | 'bebidas';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating?: number;
  badges?: string[];
  tags?: string[];
  isPromo?: boolean;
  promoBadge?: string;
  availableExtras?: ProductExtra[];
}

export interface CartItemExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string; // unique identifier including selected options
  productId: string;
  name: string;
  basePrice: number;
  finalUnitPrice: number;
  quantity: number;
  image: string;
  selectedExtras: CartItemExtra[];
  notes?: string;
}

export type DeliveryMethod = 'pickup' | 'delivery';
export type ScheduleOverride = 'auto' | 'open' | 'closed';
export type PaymentMethod = 'efectivo' | 'transferencia';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  cashAmount?: string; // monto con el que pagará si es efectivo (ej. "500" o "exacto")
  changeAmount?: number; // cambio resultante
}

export interface ConfirmedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  discount: number;
  total: number;
  customerInfo: OrderCustomerInfo;
  createdAt: string;
}

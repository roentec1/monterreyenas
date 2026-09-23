import { Product } from '../types';
import laVaqueraImg from '../assets/images/la_vaquera_real.jpg';
import monterreyenaImg from '../assets/images/monterreyena.jpg';
import bonelessBurgerImg from '../assets/images/boneless.jpg';
import hawaianaImg from '../assets/images/hawaiana.jpg';
import polacaImg from '../assets/images/polaca.jpg';
import nachaImg from '../assets/images/nacha.jpg';

// Combos
import comboVaqueraImg from '../assets/images/combovaquera.jpg';
import comboMonterreyenaImg from '../assets/images/combomonterreyena.jpg';
import comboPolacaImg from '../assets/images/combopolaca.jpg';
import comboHawaianaImg from '../assets/images/combohawaiana.jpg';
import comboNachaImg from '../assets/images/combonacha.jpg';
import comboBonelessImg from '../assets/images/comboboneless.jpg';

// Complementos & Bebidas
import papasFritasImg from '../assets/images/papasfritas.jpg';
import papasConQuesoImg from '../assets/images/papaspop.jpg';
import arosCebollaImg from '../assets/images/aros.jpg';
import refrescoImg from '../assets/images/refresco.jpg';
import aguaImg from '../assets/images/agua.jpg';

export const HERO_PRODUCT_ID = 'la-vaquera';
export const PROMO_PRODUCT_ID = 'combo-vaquera';

export const COMMON_BURGER_EXTRAS = [
  { id: 'extra-carne', name: 'Carne de Res Casera Extra', price: 45 },
  { id: 'extra-queso-oaxaca', name: 'Queso Oaxaca Fundido Extra', price: 20 },
  { id: 'extra-queso-amarillo', name: 'Queso Americano Fundido Extra', price: 15 },
  { id: 'extra-tocino', name: 'Doble Tocino Ahumado', price: 25 },
  { id: 'extra-aros', name: 'Aros de Cebolla Extra', price: 20 },
  { id: 'extra-jalapenos', name: 'Jalapeños Toreados', price: 15 },
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // LAS 6 HAMBURGUESAS PARA PEDIDO INDIVIDUAL
  // ==========================================
  {
    id: 'la-monterreyena',
    name: 'La Monterreyena',
    category: 'hamburguesas',
    price: 132,
    description:
      'Inspirada en el mejor estilo americano; carne 100% casera de res, queso fundido, lechuga y tomate en pan brioche.',
    image: monterreyenaImg,
    rating: 5.0,
    badges: ['Más Vendida', 'Estilo Americano'],
    tags: ['Carne 100% Casera', 'Pan Brioche', '10-12 Min'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'la-vaquera',
    name: 'La Vaquera',
    category: 'hamburguesas',
    price: 145,
    description:
      'Aros de cebolla, tocino, queso Oaxaca y americano, salsa BBQ sobre jugosa carne de res a la parrilla.',
    image: laVaqueraImg,
    rating: 4.9,
    badges: ['La Favorita', 'Aros + BBQ'],
    tags: ['Aros Crujientes', 'Tocino Ahumado', 'Queso Oaxaca'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'la-de-boneless',
    name: 'La de Boneless',
    category: 'hamburguesas',
    price: 145,
    description:
      'Bites de pollo boneless en la salsa que elijas, con lechuga y tomate en delicioso pan suave.',
    image: bonelessBurgerImg,
    rating: 4.9,
    badges: ['Pollo Crujiente', 'En Salsa a Elegir'],
    tags: ['Boneless Bites', 'Búfalo o BBQ', 'Fresca'],
    availableExtras: [
      { id: 'extra-salsa-bufalo', name: 'Salsa Búfalo Extra', price: 15 },
      { id: 'extra-salsa-bbq', name: 'Salsa BBQ Extra', price: 15 },
      { id: 'extra-salsa-habanero', name: 'Salsa Mango Habanero', price: 15 },
      { id: 'extra-queso', name: 'Queso Fundido Extra', price: 20 },
      { id: 'extra-tocino', name: 'Tocino Crujiente Extra', price: 25 },
    ],
  },
  {
    id: 'la-hawaiana',
    name: 'La Hawaiana',
    category: 'hamburguesas',
    price: 145,
    description:
      'Piña, tocino, queso Oaxaca y salsa. Te va a encantar.',
    image: hawaianaImg,
    rating: 4.8,
    badges: ['Piña Asada', 'Queso Oaxaca'],
    tags: ['Piña Caramelizada', 'Tocino', 'Queso Derretido'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'la-polaca',
    name: 'La Polaca',
    category: 'hamburguesas',
    price: 145,
    description:
      'Más proteína, más sabor: salchicha polaca con nuestra carne de res.',
    image: polacaImg,
    rating: 4.9,
    badges: ['Más Proteína', 'Salchicha Polaca'],
    tags: ['Salchicha Polaca Asada', 'Carne de Res', 'Sabor Regio'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'la-nacha',
    name: 'La Nacha',
    category: 'hamburguesas',
    price: 145,
    description:
      'Deliciosa y única: nuestra carne de res, Nacho Doritos y queso.',
    image: nachaImg,
    rating: 4.9,
    badges: ['Crunchy Doritos', 'Queso Nacho'],
    tags: ['Nacho Doritos', 'Queso Fundido', 'Exclusiva'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },

  // ==========================================
  // COMBOS
  // ==========================================
  {
    id: 'combo-vaquera',
    name: 'Combo Vaquera',
    category: 'combos',
    price: 229,
    originalPrice: 265,
    isPromo: true,
    promoBadge: 'Hoy',
    description:
      'Incluye hamburguesa La Vaquera (aros de cebolla, tocino, quesos y BBQ), papas y refresco.',
    image: comboVaqueraImg,
    rating: 5.0,
    badges: ['Promoción Especial', 'Ahorras $36'],
    tags: ['Papas + Refresco', 'Completo'],
    availableExtras: [
      { id: 'extra-queso', name: 'Queso Cheddar Extra en Hamburguesa', price: 20 },
      { id: 'extra-tocino', name: 'Tocino Ahumado Extra', price: 25 },
      { id: 'cambio-aros', name: 'Cambiar papas por Aros de Cebolla', price: 15 },
    ],
  },
  {
    id: 'combo-monterreyena',
    name: 'Combo Monterreyena',
    category: 'combos',
    price: 215,
    description:
      'La hamburguesa más vendida La Monterreyena acompañada de papas rústicas sazonadas y refresco frío de 600ml.',
    image: comboMonterreyenaImg,
    rating: 4.9,
    badges: ['Favorito', 'Completo'],
    tags: ['Papas + Refresco 600ml'],
    availableExtras: [
      { id: 'extra-queso', name: 'Queso Extra Fundido', price: 20 },
      { id: 'extra-tocino', name: 'Tocino Crujiente', price: 25 },
    ],
  },
  {
    id: 'combo-polaca',
    name: 'Combo Polaca',
    category: 'combos',
    price: 209,
    description:
      'Incluye: Polaca (salchicha polaca asada + res) + Papas + Refresco 400ml.',
    image: comboPolacaImg,
    rating: 4.9,
    badges: ['Completo', 'Polaca + Papas + Refresco'],
    tags: ['Polaca', 'Papas', 'Refresco 400ml'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'combo-hawaiana',
    name: 'Combo Hawaiana',
    category: 'combos',
    price: 209,
    description:
      'Incluye: Hawaiana (piña caramelizada, tocino, queso Oaxaca) + Papas + Refresco 400ml.',
    image: comboHawaianaImg,
    rating: 4.9,
    badges: ['Completo', 'Hawaiana + Papas + Refresco'],
    tags: ['Hawaiana', 'Papas', 'Refresco 400ml'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'combo-nacha',
    name: 'Combo Nacha',
    category: 'combos',
    price: 209,
    description:
      'Incluye: Nacha (Nacho Doritos crujientes, queso fundido y res) + Papas + Refresco 400ml.',
    image: comboNachaImg,
    rating: 4.9,
    badges: ['Completo', 'Nacha + Papas + Refresco'],
    tags: ['Nacha', 'Papas', 'Refresco 400ml'],
    availableExtras: COMMON_BURGER_EXTRAS,
  },
  {
    id: 'combo-burger-boneless',
    name: 'Combo Burger Boneless',
    category: 'combos',
    price: 209,
    description:
      'Incluye: Burger Boneless (pollo crujiente en salsa a elegir) + Papas + Refresco 400ml.',
    image: bonelessBurgerImg,
    rating: 4.9,
    badges: ['Completo', 'Burger Boneless + Papas + Refresco'],
    tags: ['Burger Boneless', 'Papas', 'Refresco 400ml'],
    availableExtras: [
      { id: 'extra-salsa-bufalo', name: 'Salsa Búfalo Extra', price: 15 },
      { id: 'extra-salsa-bbq', name: 'Salsa BBQ Extra', price: 15 },
      { id: 'extra-salsa-habanero', name: 'Salsa Mango Habanero', price: 15 },
      { id: 'extra-queso', name: 'Queso Fundido Extra', price: 20 },
      { id: 'extra-tocino', name: 'Tocino Crujiente Extra', price: 25 },
    ],
  },
  {
    id: 'combo-boneless',
    name: 'Combo Boneless',
    category: 'combos',
    price: 209,
    description:
      'Incluye: Orden Boneless (trozos de pechuga crujiente en tu salsa favorita) + Papas + Refresco 400ml.',
    image: comboBonelessImg,
    rating: 4.9,
    badges: ['Completo', 'Orden Boneless + Papas + Refresco'],
    tags: ['Orden Boneless', 'Papas', 'Refresco 400ml'],
    availableExtras: [
      { id: 'extra-ranch', name: 'Aderezo Ranch Extra', price: 15 },
      { id: 'extra-salsa', name: 'Porción Extra de Salsa', price: 15 },
      { id: 'extra-queso', name: 'Dip Queso Cheddar Caliente', price: 25 },
    ],
  },

  // ==========================================
  // COMPLEMENTOS
  // ==========================================
  {
    id: 'orden-papas-francesa',
    name: 'Orden de Papas a la Francesa',
    category: 'complementos',
    price: 69,
    description:
      'Papas a la francesa doraditas y crujientes por fuera, suaves por dentro, sazonadas al estilo de la casa.',
    image: papasFritasImg,
    rating: 4.8,
    badges: ['Crujientes', 'Clásicas'],
    tags: ['Con Catsup & Ranch', 'Porción Generosa'],
    availableExtras: [
      { id: 'dip-queso', name: 'Dip de Queso Cheddar Caliente', price: 25 },
      { id: 'dip-bbq', name: 'Dip BBQ Artesanal Extra', price: 15 },
    ],
  },
  {
    id: 'papas-con-queso-amarillo',
    name: 'Papas con queso amarillo',
    category: 'complementos',
    price: 79,
    description:
      'Papas a la francesa doradas y crujientes, bañadas en abundante queso cheddar amarillo fundido.',
    image: papasConQuesoImg,
    rating: 4.9,
    badges: ['Con Mucho Queso', 'Favoritas'],
    tags: ['Queso Amarillo Derretido', 'Crujientes'],
    availableExtras: [
      { id: 'extra-tocino', name: 'Tocino Crujiente Picado', price: 25 },
      { id: 'extra-jalapenos', name: 'Jalapeños Toreados', price: 15 },
    ],
  },
  {
    id: 'boneless-bufalo-bbq',
    name: 'Orden de Boneless (300g)',
    category: 'complementos',
    price: 129,
    description:
      'Trozos jugosos de pechuga de pollo empanizados al momento, bañados en tu salsa favorita (Búfalo clásico, BBQ ahumada o Mango Habanero).',
    image: comboBonelessImg,
    rating: 4.9,
    badges: ['Pechuga 100%', 'Crujientes'],
    tags: ['Con Apio & Ranch', '300g'],
    availableExtras: [
      { id: 'extra-ranch', name: 'Aderezo Ranch Extra', price: 15 },
      { id: 'extra-salsa', name: 'Porción Extra de Salsa', price: 15 },
    ],
  },
  {
    id: 'aros-de-cebolla',
    name: 'Aros de Cebolla',
    category: 'complementos',
    price: 69,
    description:
      'Aros de cebolla enteros dorados y crujientes con empanizado especial, acompañados con aderezo dip.',
    image: arosCebollaImg,
    rating: 4.8,
    badges: ['Dorados', 'Crujientes'],
    tags: ['Aros Crujientes', 'Con Dip'],
    availableExtras: [
      { id: 'dip-chipotle', name: 'Dip Chipotle Cremoso', price: 15 },
      { id: 'dip-bbq', name: 'Dip BBQ Artesanal Extra', price: 15 },
    ],
  },

  // ==========================================
  // BEBIDAS
  // ==========================================
  {
    id: 'coca-cola-original-600',
    name: 'Coca-Cola Original 600ml',
    category: 'bebidas',
    price: 32,
    description: 'Refresco Coca-Cola botella bien fría.',
    image: refrescoImg,
    rating: 5.0,
    tags: ['Fría', 'Botella 600ml'],
  },
  {
    id: 'coca-cola-sin-azucar-600',
    name: 'Coca-Cola Sin Azúcar 600ml',
    category: 'bebidas',
    price: 32,
    description: 'Refresco Coca-Cola Zero / Sin Azúcar botella bien fría.',
    image: refrescoImg,
    rating: 4.9,
    tags: ['0% Azúcar', 'Botella 600ml'],
  },
  {
    id: 'joya-manzana-600',
    name: 'Joya Manzana 600ml (Clásico Regio)',
    category: 'bebidas',
    price: 32,
    description: 'El tradicional refresco Joya sabor Manzana, imprescindible con hamburguesas regias.',
    image: refrescoImg,
    rating: 5.0,
    badges: ['Orgullo Regio'],
    tags: ['Sabor Manzana', 'Botella 600ml'],
  },
  {
    id: 'agua-purificada-600',
    name: 'Agua Purificada Ciel 600ml',
    category: 'bebidas',
    price: 22,
    description: 'Agua purificada natural embotellada bien fría.',
    image: aguaImg,
    rating: 4.8,
    tags: ['Natural', 'Botella 600ml'],
  },
];

import React, { useState } from 'react';
import { OrderProvider, useOrder } from './context/OrderContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { CartView } from './components/CartView';
import { EventsView } from './components/EventsView';
import { ProductModal } from './components/ProductModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CategoryType, Product } from './types';
import { Check } from 'lucide-react';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'menu' | 'pedido' | 'eventos'>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todos');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const { confirmedOrder, resetConfirmedOrder, toastMessage } = useOrder();

  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const handleOrderConfirmed = () => {
    setShowOrderConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowOrderConfirmation(false);
    resetConfirmedOrder();
    setActiveTab('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center justify-start">
      {/* Centered Mobile Frame Wrapper */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#131313] relative border-x border-[#201f1f] shadow-2xl">
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          onOpenCart={() => {
            setActiveTab('pedido');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Views Container (pt-16 for header spacing) */}
        <main className="flex-1 pt-16 flex flex-col w-full">
          {activeTab === 'inicio' && (
            <HomeView
              onSelectCategory={handleSelectCategory}
              onOpenProductModal={handleOpenProductModal}
              onNavigateTab={tab => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'menu' && (
            <MenuView
              selectedCategory={selectedCategory}
              onSelectCategory={cat => setSelectedCategory(cat)}
              onOpenProductModal={handleOpenProductModal}
              onNavigateTab={tab => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'pedido' && (
            <CartView
              onNavigateTab={tab => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOrderConfirmed={handleOrderConfirmed}
            />
          )}

          {activeTab === 'eventos' && (
            <EventsView
              onNavigateTab={tab => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={tab => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Product Customization Modal */}
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />

        {/* Order Confirmation Screen Modal */}
        {showOrderConfirmation && (
          <OrderConfirmationModal
            order={confirmedOrder}
            onClose={handleCloseConfirmation}
          />
        )}

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4 py-2.5 rounded-full bg-[#ffb800] text-[#412d00] font-bold text-xs shadow-xl flex items-center gap-2 anim-fade-in border border-[#ffdca1]">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <OrderProvider>
      <MainApp />
    </OrderProvider>
  );
}

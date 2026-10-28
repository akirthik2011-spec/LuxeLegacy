/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Sparkles, CheckCircle, ArrowUpDown } from 'lucide-react';
import { initialProducts } from './data/products';
import { Product, CartItem, CustomerDetails } from './types';
import {
  addItemToCart,
  updateCartQuantity,
  removeFromCart,
  calculateCartTotals,
  WHATSAPP_PHONE_NUMBER
} from './utils/cartLogic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartSection } from './components/CartSection';
import { CartDrawer } from './components/CartDrawer';
import { CustomOrderModal } from './components/CustomOrderModal';
import { StorySection } from './components/StorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxelegacy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem('luxelegacy_customer');
      return saved ? JSON.parse(saved) : { name: '', phone: '', city: '', giftNote: '' };
    } catch {
      return { name: '', phone: '', city: '', giftNote: '' };
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('luxelegacy_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cart]);

  // Sync customer details to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('luxelegacy_customer', JSON.stringify(customer));
    } catch (e) {
      console.warn('Could not save customer', e);
    }
  }, [customer]);

  const { totalCount, subtotal } = useMemo(() => calculateCartTotals(cart), [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => addItemToCart(prev, product, quantity));
    setJustAddedId(product.id);
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart`);
    setTimeout(() => {
      setJustAddedId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prev) => updateCartQuantity(prev, productId, delta));
  };

  const handleRemoveItem = (productId: number) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => removeFromCart(prev, productId));
    if (item) {
      showToast(`Removed "${item.name}" from cart`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  // Filtered & sorted products
  const categories = ['All', 'Gifts', 'Art & Decor', 'Accessories', 'Home & Living'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf3] text-[#3c3028]">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 bg-[#674832] text-white px-4 py-2.5 rounded-lg shadow-xl font-sans-ui text-xs flex items-center gap-2 border border-[#dfba78]/40 animate-slideDown"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCount}
        cartTotal={subtotal}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomOrderClick={() => setIsCustomOrderOpen(true)}
        />

        {/* Shop / Products Section */}
        <section id="shop" className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="section-title text-3xl sm:text-4xl font-serif font-bold text-[#674832] mb-2">
              Our Collection
            </h2>
            <p className="section-subtitle font-serif text-[#796858]">
              Little creations, made with a lot of love.
            </p>
          </div>

          {/* Filters, Search & Sort Toolbar */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 font-sans-ui text-xs">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                      activeCategory === category
                        ? 'bg-[#674832] text-white shadow-xs'
                        : 'bg-white border border-[#d8c3aa] text-[#674832] hover:bg-[#f5eadc]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto font-sans-ui text-xs">
                {/* Search Input */}
                <div className="relative flex-1 md:w-60">
                  <Search className="w-3.5 h-3.5 text-[#796858] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search creations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#d8c3aa] rounded-md text-xs text-[#3c3028] placeholder-[#796858]/60 focus:outline-[#c49a55]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white border border-[#d8c3aa] rounded-md py-2 pl-3 pr-8 text-xs text-[#674832] font-medium cursor-pointer focus:outline-[#c49a55]"
                    aria-label="Sort products by"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ArrowUpDown className="w-3 h-3 text-[#796858] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid (matches id="products") */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#eee0cf] rounded-xl p-8">
              <Sparkles className="w-10 h-10 text-[#c49a55] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-xl font-bold text-[#674832] mb-1">
                No creations found
              </h3>
              <p className="font-serif text-sm text-[#796858] mb-4">
                We couldn't find matches for "{searchQuery}". Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="bg-[#674832] hover:bg-[#c49a55] text-white text-xs font-sans-ui px-4 py-2 rounded cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="products">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setSelectedQuickViewProduct(p)}
                  isAddedJustNow={justAddedId === product.id}
                />
              ))}
            </div>
          )}
        </section>

        {/* Shopping Cart Section (matches id="cart" & class="cart-section") */}
        <CartSection
          cart={cart}
          customer={customer}
          onCustomerChange={setCustomer}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onExploreProducts={() => {
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About / Story Section (matches id="about") */}
        <StorySection />

        {/* Testimonials / Reviews Section */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* Modals & Drawers */}
      <ProductQuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={(p, qty) => {
          handleAddToCart(p, qty);
        }}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        customer={customer}
        onCustomerChange={setCustomer}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
      />
    </div>
  );
}

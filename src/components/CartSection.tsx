import React from 'react';
import { MessageCircle, Trash2, Gift, MapPin, User, Phone, Sparkles } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/cartLogic';

interface CartSectionProps {
  cart: CartItem[];
  customer: CustomerDetails;
  onCustomerChange: (customer: CustomerDetails) => void;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onExploreProducts: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cart,
  customer,
  onCustomerChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreProducts
}) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderWhatsApp = () => {
    if (cart.length === 0) return;
    const url = generateWhatsAppOrderUrl(cart, customer);
    window.open(url, '_blank');
  };

  return (
    <section className="cart-section bg-[#f5eadc] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#eadbc8]" id="cart">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-[#674832] mb-2">
          Your Shopping Cart
        </h2>
        <p className="text-center font-serif text-[#796858] mb-8">
          Your favourite creations, all in one place.
        </p>

        <div className="cart-box bg-white p-6 sm:p-8 rounded-xl border border-[#eadbc8] shadow-sm">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4" id="cart-items">
              <div className="w-16 h-16 bg-[#f5eadc] rounded-full flex items-center justify-center mx-auto mb-4 text-[#674832]">
                <Gift className="w-8 h-8 text-[#c49a55]" />
              </div>
              <p className="empty-cart text-lg font-serif text-[#796858] mb-5">
                Your cart is empty. Explore our collection!
              </p>
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 bg-[#674832] hover:bg-[#c49a55] text-white px-6 py-2.5 rounded font-sans-ui text-sm font-semibold transition-colors cursor-pointer"
              >
                Browse Creations
              </button>
            </div>
          ) : (
            <div>
              {/* Cart Items List */}
              <div className="divide-y divide-[#eee0cf] mb-8" id="cart-items">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-[#eee0cf] shrink-0"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-lg text-[#674832]">
                          {item.name}
                        </h4>
                        <div className="text-xs font-sans-ui text-[#796858]">
                          {formatCurrency(item.price)} each
                        </div>
                        <span className="text-[11px] font-sans-ui text-[#c49a55]">
                          {item.dispatchTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#d8c3aa] rounded bg-[#fffaf3]">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-[#f5eadc] text-[#674832] font-semibold text-sm cursor-pointer transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm font-sans-ui font-semibold text-[#3c3028] min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-[#f5eadc] text-[#674832] font-semibold text-sm cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <div className="text-base font-bold font-serif text-[#3c3028]">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[11px] font-sans-ui text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer mt-0.5 ml-auto"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personalization & Delivery Details (Optional, adds elegance to WhatsApp message) */}
              <div className="bg-[#fffaf3] p-4 sm:p-5 rounded-lg border border-[#eee0cf] mb-6">
                <div className="flex items-center gap-2 mb-3 text-sm font-serif font-bold text-[#674832]">
                  <Sparkles className="w-4 h-4 text-[#c49a55]" />
                  <span>Order Details (Included in your WhatsApp message)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-xs font-sans-ui">
                  <div>
                    <label className="block text-[#796858] mb-1 font-medium flex items-center gap-1">
                      <User className="w-3 h-3 text-[#c49a55]" /> Your Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanshu Sharma"
                      value={customer.name}
                      onChange={(e) => onCustomerChange({ ...customer, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#796858] mb-1 font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#c49a55]" /> Phone / WhatsApp:
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customer.phone}
                      onChange={(e) => onCustomerChange({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#796858] mb-1 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#c49a55]" /> City / Pincode:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru 560001"
                      value={customer.city}
                      onChange={(e) => onCustomerChange({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#796858] text-xs font-medium mb-1 font-sans-ui flex items-center gap-1">
                    <Gift className="w-3 h-3 text-[#c49a55]" /> Free Handwritten Gift Note (Optional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a message to be hand-lettered on handmade paper included inside your order..."
                    value={customer.giftNote || ''}
                    onChange={(e) => onCustomerChange({ ...customer, giftNote: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-xs font-serif focus:outline-[#c49a55]"
                  />
                </div>
              </div>

              {/* Total & Summary */}
              <div className="cart-total flex flex-col sm:flex-row items-end sm:items-center justify-between py-4 border-t border-[#eee0cf] mb-6">
                <div className="text-xs font-sans-ui text-[#796858] mb-2 sm:mb-0">
                  <span>{totalCount} item{totalCount !== 1 ? 's' : ''} in cart</span>
                  <span className="mx-2">•</span>
                  <span className="text-emerald-700">Free artisan gift wrapping included</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#3c3028]">
                  Total: <span id="cart-total">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="cart-actions flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="px-5 py-2.5 rounded border border-[#d8c3aa] hover:bg-stone-50 text-[#674832] font-sans-ui font-medium text-sm transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>

                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-2.5 rounded font-sans-ui font-semibold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

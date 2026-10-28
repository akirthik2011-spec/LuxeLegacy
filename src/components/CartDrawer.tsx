import React from 'react';
import { X, MessageCircle, Trash2, Gift, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/cartLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  customer: CustomerDetails;
  onCustomerChange: (customer: CustomerDetails) => void;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  customer,
  onCustomerChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderWhatsApp = () => {
    if (cart.length === 0) return;
    const url = generateWhatsAppOrderUrl(cart, customer);
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Cart Drawer"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fffdf9] border-l border-[#eadbc8] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#eee0cf] flex items-center justify-between bg-[#fffaf3]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#674832]" />
              <h2 className="font-serif font-bold text-xl text-[#674832]">
                Your Cart ({totalCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#796858] hover:text-[#3c3028] rounded-md hover:bg-[#f5eadc] cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <Gift className="w-12 h-12 text-[#c49a55] mx-auto mb-3 opacity-80" />
                <p className="font-serif text-[#796858] text-base mb-4">
                  Your cart is empty. Explore our collection!
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#674832] hover:bg-[#c49a55] text-white px-5 py-2 rounded text-xs font-sans-ui font-semibold cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-[#eee0cf]">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-[#eee0cf] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#674832] truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs font-sans-ui text-[#796858]">
                          {formatCurrency(item.price)}
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center border border-[#d8c3aa] rounded bg-white text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-0.5 hover:bg-[#f5eadc] text-[#674832] font-bold"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              −
                            </button>
                            <span className="px-2 py-0.5 font-sans-ui font-semibold text-[#3c3028]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-0.5 hover:bg-[#f5eadc] text-[#674832] font-bold"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[11px] font-sans-ui text-stone-400 hover:text-rose-600 ml-auto"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right font-serif font-bold text-sm text-[#3c3028]">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Quick note */}
                <div className="bg-[#fffaf3] p-3 rounded border border-[#eee0cf] text-xs font-sans-ui">
                  <label className="block text-[#674832] font-semibold mb-1 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-[#c49a55]" />
                    <span>Free Handwritten Gift Message:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Short message for recipient..."
                    value={customer.giftNote || ''}
                    onChange={(e) => onCustomerChange({ ...customer, giftNote: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#d8c3aa] rounded bg-white text-xs font-serif"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#eee0cf] bg-[#fffaf3] space-y-3">
              <div className="flex items-center justify-between text-base font-serif font-bold text-[#3c3028]">
                <span>Total Amount:</span>
                <span className="text-xl text-[#674832]">{formatCurrency(total)}</span>
              </div>

              <div className="text-[11px] font-sans-ui text-[#796858] flex items-center justify-between">
                <span>Direct artisan order via WhatsApp</span>
                <button
                  onClick={onClearCart}
                  className="hover:text-rose-700 underline cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              <button
                onClick={handleOrderWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded font-sans-ui font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

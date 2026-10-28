import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Clock, Ruler, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, WHATSAPP_PHONE_NUMBER } from '../utils/cartLogic';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsAppInquireUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Luxelegacy! I'm interested in the "${product.name}" (₹${product.price}). Could you tell me more about customization and availability?`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.name}`}
    >
      <div className="bg-[#fffdf9] border border-[#eadbc8] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#796858] hover:text-[#3c3028] bg-white/80 rounded-full border border-[#eee0cf] cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#f5eadc] min-h-[300px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#674832] text-white text-xs font-sans-ui font-semibold px-3 py-1 rounded-sm shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#c49a55] font-semibold uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-[#3c3028]">
                  <Star className="w-3.5 h-3.5 fill-[#c49a55] text-[#c49a55]" />
                  <span>{product.rating}</span>
                  <span className="text-[#796858]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#674832] mb-3">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold font-serif text-[#3c3028]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-sans-ui line-through text-[#796858]">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-sans-ui text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  All taxes included
                </span>
              </div>

              <p className="text-sm font-serif text-[#796858] leading-relaxed mb-4">
                {product.detailedStory || product.description}
              </p>

              {/* Specifications */}
              <div className="space-y-2 py-3 border-y border-[#eee0cf] text-xs font-sans-ui text-[#674832]">
                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#c49a55]" />
                    <span className="font-semibold">Dimensions:</span>
                    <span className="text-[#796858]">{product.dimensions}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c49a55]" />
                  <span className="font-semibold">Lead Time:</span>
                  <span className="text-[#796858]">{product.dispatchTime}</span>
                </div>
              </div>

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-sans-ui font-semibold text-[#674832] block mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#c49a55]" /> Materials & Craft:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f5eadc] text-[#674832] text-[11px] font-sans-ui px-2 py-0.5 rounded"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#eee0cf]">
              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans-ui font-semibold text-[#674832]">Quantity:</span>
                <div className="flex items-center border border-[#d8c3aa] rounded bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 hover:bg-[#f5eadc] text-[#674832] font-semibold text-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-sm font-sans-ui font-semibold text-[#3c3028] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 hover:bg-[#f5eadc] text-[#674832] font-semibold text-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-sans-ui text-[#796858]">
                  Subtotal: {formatCurrency(product.price * quantity)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded text-sm font-sans-ui font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    added ? 'bg-emerald-700 text-white' : 'bg-[#674832] hover:bg-[#c49a55] text-white shadow-sm'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsAppInquireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded text-sm font-sans-ui font-medium border border-emerald-600 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

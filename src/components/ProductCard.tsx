import React from 'react';
import { Eye, Plus, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/cartLogic';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isAddedJustNow = false
}) => {
  return (
    <article className="group bg-white border border-[#eee0cf] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#f5eadc] aspect-[4/3] sm:h-60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#fffaf3]/95 text-[#674832] border border-[#eadbc8] text-[11px] font-sans-ui font-semibold px-2.5 py-1 rounded shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Quick View Button (hover or mobile touch) */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#674832] p-2 rounded-full shadow-md transition-all hover:scale-110 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
          aria-label={`Quick view details for ${product.name}`}
          title="Quick View"
        >
          <Eye className="w-4 h-4 text-[#674832]" />
        </button>
      </div>

      {/* Info container */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs font-sans-ui text-[#796858] mb-1.5">
            <span className="uppercase tracking-wider text-[10px] font-semibold text-[#c49a55]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#c49a55] text-[#c49a55]" />
              <span className="font-medium text-[#3c3028]">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            className="text-xl font-serif font-bold text-[#674832] mb-1.5 group-hover:text-[#c49a55] transition-colors cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            {product.name}
          </h3>

          <p className="text-sm font-serif text-[#796858] mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold font-serif text-[#3c3028]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs font-sans-ui line-through text-[#796858]/70">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="ml-auto text-[11px] font-sans-ui text-[#c49a55] font-medium">
              {product.dispatchTime}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-2.5 px-4 rounded text-sm font-sans-ui font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAddedJustNow
                ? 'bg-emerald-700 text-white'
                : 'bg-[#674832] hover:bg-[#c49a55] text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAddedJustNow ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { reviewsData } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#f5eadc]/50 border-t border-[#eee0cf]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans-ui font-semibold uppercase tracking-widest text-[#c49a55] block mb-2">
            Loved by Our Patrons
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#674832] mb-3">
            Words of Love & Gratitude
          </h2>
          <p className="text-sm font-serif text-[#796858]">
            Real stories from people who brought handmade warmth into their lives and homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl border border-[#eadbc8] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c49a55] text-[#c49a55]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#c49a55]/30" />
                </div>

                <p className="font-serif text-sm text-[#3c3028] leading-relaxed mb-4 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#eee0cf] flex items-center justify-between text-xs font-sans-ui">
                <div>
                  <div className="font-semibold text-[#674832] flex items-center gap-1">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle className="w-3 h-3 text-emerald-600" aria-label="Verified Customer" />
                      </span>
                    )}
                  </div>
                  <span className="text-[#796858] text-[11px]">{review.city}</span>
                </div>
                <span className="text-[10px] text-[#c49a55] font-medium bg-[#f5eadc] px-2 py-0.5 rounded">
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

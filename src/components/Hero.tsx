import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Gift } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomOrderClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[500px] lg:min-h-[560px] flex items-center py-16 px-6 sm:px-10 lg:px-16 border-b border-[#eee0cf]"
      style={{
        background: `linear-gradient(90deg, rgba(255,250,243,0.96) 0%, rgba(255,250,243,0.92) 45%, rgba(255,250,243,0.72) 100%), url("https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat`
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#f5eadc] border border-[#eadbc8] text-[#674832] px-3.5 py-1.5 rounded-full text-xs font-sans-ui font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Pure Artisan Craftsmanship & Gifts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#674832] font-serif font-bold tracking-tight leading-[1.15] mb-6">
            Handmade with Love, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#c49a55] tracking-wide">Made for Premium.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#796858] font-serif leading-relaxed mb-8 max-w-xl">
            Discover beautiful handmade creations, thoughtful gifts, and unique pieces made with creativity and care.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 bg-[#674832] hover:bg-[#c49a55] text-white px-7 py-3.5 rounded-md font-sans-ui font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onCustomOrderClick}
              className="inline-flex items-center gap-2 bg-[#fffdf9] hover:bg-[#f5eadc] text-[#674832] border border-[#d8c3aa] px-6 py-3.5 rounded-md font-sans-ui font-medium text-sm transition-all duration-200 cursor-pointer"
            >
              <span>Request Custom Piece</span>
            </button>
          </div>

          {/* Value Props Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#eadbc8]/80 text-[#674832] font-sans-ui text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c49a55] shrink-0" />
              <span className="font-medium">100% Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#c49a55] shrink-0" />
              <span className="font-medium">Free Gift Note</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#c49a55] shrink-0" />
              <span className="font-medium">Customizable</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c49a55] shrink-0" />
              <span className="font-medium">Safe Packing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

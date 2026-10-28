import React from 'react';
import { Sparkles, HeartHandshake, Leaf, Truck, CheckCircle2 } from 'lucide-react';
import { storyMilestones } from '../data/products';

export const StorySection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#fffaf3] border-t border-[#eee0cf]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-sans-ui font-semibold uppercase tracking-widest text-[#c49a55] block mb-2">
            Behind the Creations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#674832] mb-4">
            The Story of Luxelegacy
          </h2>
          <div className="w-16 h-0.5 bg-[#c49a55] mx-auto mb-6"></div>
          <p className="text-lg font-serif text-[#796858] leading-relaxed mb-4">
            At Luxelegacy, we believe that handmade things carry a special kind of magic. Every creation is inspired by imagination, crafted with care, and designed to make ordinary moments feel extraordinary.
          </p>
          <p className="text-base font-serif text-[#796858] leading-relaxed italic">
            Thank you for supporting creativity and choosing handmade.
          </p>
        </div>

        {/* 2-Column Visual & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative rounded-xl overflow-hidden border border-[#eadbc8] shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80"
              alt="Artisan working in studio"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs uppercase font-sans-ui font-semibold tracking-wider text-[#dfba78]">
                  Our Studio Philosophy
                </span>
                <p className="font-serif text-lg">
                  Slow, thoughtful craft honoring natural textures & human touch.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#674832]">
              Why Handmade Treasures Matter
            </h3>
            <p className="text-sm font-serif text-[#796858] leading-relaxed">
              In a world of mass-produced plastic items that lose meaning, handmade creations carry the warmth, patience, and fingerprint of the maker. Each brushstroke, weave, and knot is a deliberate act of affection.
            </p>
            <ul className="space-y-2.5 pt-2 text-xs font-sans-ui text-[#674832]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c49a55] shrink-0" />
                <span>Small batch production with rigorous quality inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c49a55] shrink-0" />
                <span>Custom personalized orders tailored on WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c49a55] shrink-0" />
                <span>Complimentary handwritten calligraphed notes included</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyMilestones.map((item, index) => {
            const icons = [Sparkles, HeartHandshake, Leaf, Truck];
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-lg border border-[#eee0cf] shadow-xs hover:border-[#c49a55] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#f5eadc] flex items-center justify-center text-[#674832] mb-3">
                  <Icon className="w-5 h-5 text-[#c49a55]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#674832] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs font-serif text-[#796858] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

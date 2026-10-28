import React, { useState } from 'react';
import { MessageCircle, Heart, Mail, Check } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_PHONE_NUMBER } from '../utils/cartLogic';

interface FooterProps {
  onOpenCustomOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomOrder }) => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#674832] text-white pt-16 pb-12 px-6 sm:px-10 border-t border-[#876246]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-3xl font-serif font-bold tracking-wider text-white">
              Luxe<span className="text-[#dfba78]">legacy</span>
            </h2>
            <p className="text-sm font-serif text-[#f5eadc]/80 leading-relaxed">
              Handmade treasures. Timeless memories.
            </p>
            <p className="text-xs font-sans-ui text-[#f5eadc]/70">
              For orders and enquiries, contact us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-1.5 rounded-full text-xs font-sans-ui font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{WHATSAPP_DISPLAY_NUMBER}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-sans-ui text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[#dfba78] text-xs">
              Explore
            </h4>
            <ul className="space-y-2 text-[#f5eadc]/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Our Collection
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Reviews & Love
                </a>
              </li>
              <li>
                <a href="#cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Artisan Services */}
          <div className="space-y-3 font-sans-ui text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[#dfba78] text-xs">
              Artisan Services
            </h4>
            <ul className="space-y-2 text-[#f5eadc]/80">
              <li>
                <button
                  onClick={onOpenCustomOrder}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Custom Made-to-Order Pieces
                </button>
              </li>
              <li>Wedding & Event Return Favors</li>
              <li>Personalized Resin & Floral Art</li>
              <li>Complimentary Calligraphy Notes</li>
              <li>Pan-India Safe Fragile Shipping</li>
            </ul>
          </div>

          {/* Studio Updates Newsletter */}
          <div className="space-y-3 font-sans-ui text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[#dfba78] text-xs">
              Studio Releases
            </h4>
            <p className="text-[#f5eadc]/80 leading-relaxed">
              Be the first to hear about fresh seasonal batch drops and holiday gift editions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs px-3 py-2 rounded-l focus:outline-[#dfba78] w-full"
                />
                <button
                  type="submit"
                  className="bg-[#c49a55] hover:bg-[#dfba78] text-stone-900 font-semibold px-4 py-2 rounded-r transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-emerald-300 text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#876246] flex flex-col sm:flex-row items-center justify-between text-xs font-sans-ui text-[#f5eadc]/60 gap-4">
          <p>
            © <span id="year">{currentYear}</span> Luxelegacy. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#dfba78] text-[#dfba78]" />
            <span>for people who cherish handmade artistry.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

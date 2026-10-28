import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Heart } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_PHONE_NUMBER } from '../utils/cartLogic';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCustomOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenCustomOrder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Our Story', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Cart', href: '#cart' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#674832] text-[#fffaf3] text-xs py-2 px-4 font-sans-ui tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Complimentary handwritten calligraphy note with every gift order</span>
            <span className="hidden sm:inline text-white/50">•</span>
            <span className="hidden sm:inline text-[#dfba78]">Pan-India Shipping</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#dfba78] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {WHATSAPP_DISPLAY_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#eadbc8] transition-shadow duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl sm:text-3xl font-bold tracking-widest text-[#674832] transition-transform hover:scale-[1.01]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Luxe<span className="text-[#c49a55]">legacy</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans-ui text-sm font-medium text-[#674832]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#c49a55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#c49a55] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenCustomOrder}
              className="text-[#674832] hover:text-[#c49a55] flex items-center gap-1 text-sm font-medium transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-[#c49a55]" />
              <span>Custom Piece</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCustomOrder}
              className="hidden lg:inline-flex items-center gap-1.5 bg-[#f5eadc] text-[#674832] hover:bg-[#c49a55] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans-ui transition-all"
            >
              <Sparkles className="w-3 h-3 text-[#c49a55] group-hover:text-white" />
              Custom Order
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#674832] hover:bg-[#c49a55] text-white px-4 py-2 rounded-md font-sans-ui text-sm font-medium shadow-sm transition-all"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#c49a55] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
              {cartTotal > 0 && (
                <span className="hidden md:inline pl-1 text-xs text-[#f5eadc]">
                  • ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#674832] hover:text-[#c49a55] rounded-md border border-[#eadbc8]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fffdf9] border-b border-[#eadbc8] px-5 py-4 space-y-3 font-sans-ui animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#674832] hover:text-[#c49a55] py-2 font-medium border-b border-[#eee0cf]/60"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomOrder();
              }}
              className="w-full text-left py-2 text-[#674832] hover:text-[#c49a55] font-medium flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#c49a55]" />
              <span>Request Custom Handcrafted Piece</span>
            </button>
            <div className="pt-2 text-xs text-[#796858] flex items-center justify-between">
              <span>Orders: WhatsApp {WHATSAPP_DISPLAY_NUMBER}</span>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold"
              >
                Chat Now →
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

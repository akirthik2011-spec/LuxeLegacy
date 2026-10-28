import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_DISPLAY_NUMBER } from '../utils/cartLogic';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#3c3028] p-3 rounded-lg border border-[#eadbc8] shadow-lg max-w-xs text-xs font-sans-ui animate-fadeIn relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-stone-400 hover:text-stone-700"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-semibold text-[#674832] mb-0.5">Need help or a custom creation?</p>
          <p className="text-[#796858]">Chat directly with our studio on WhatsApp ({WHATSAPP_DISPLAY_NUMBER}).</p>
        </div>
      )}

      {/* WhatsApp float button */}
      <a
        className="whatsapp-float group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
          'Hello Luxelegacy! I visited your website and would like to inquire about your handmade creations.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Luxelegacy on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="font-sans-ui font-semibold text-sm tracking-wide">WhatsApp Us</span>
      </a>
    </div>
  );
};

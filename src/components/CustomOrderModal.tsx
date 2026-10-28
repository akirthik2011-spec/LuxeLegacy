import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Heart, Send } from 'lucide-react';
import { CustomOrderRequest } from '../types';
import { generateCustomOrderWhatsAppUrl } from '../utils/cartLogic';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CustomOrderRequest>({
    fullName: '',
    phone: '',
    category: 'Custom Gift Box',
    budget: '₹500 - ₹1,500',
    description: '',
    needByDate: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.description.trim()) {
      return;
    }
    const url = generateCustomOrderWhatsAppUrl(formData);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Request a Custom Handcrafted Piece"
    >
      <div className="bg-[#fffdf9] border border-[#eadbc8] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#796858] hover:text-[#3c3028] rounded-full border border-[#eee0cf] cursor-pointer"
          aria-label="Close custom order modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-sans-ui text-[#c49a55] font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Bespoke Artisan Creations</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#674832] mb-2">
          Request a Custom Piece
        </h3>
        <p className="text-sm font-serif text-[#796858] mb-6">
          Have a specific gift idea, personalized names, anniversary keepsake, or event favors in mind? Let us know your vision and we will craft it with love!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans-ui text-xs">
          <div>
            <label className="block text-[#674832] font-semibold mb-1">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Radhika Menon"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#674832] font-semibold mb-1">
                WhatsApp Phone <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9448620389"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
              />
            </div>

            <div>
              <label className="block text-[#674832] font-semibold mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
              >
                <option value="Custom Gift Box">Custom Gift Box</option>
                <option value="Personalized Resin Artwork">Personalized Resin Keepsake</option>
                <option value="Handmade Clay & Ceramic Decor">Clay & Ceramic Decor</option>
                <option value="Handcrafted Floral Hoop">Floral Embroidery Hoop</option>
                <option value="Event / Wedding Favors">Bulk / Wedding Favors</option>
                <option value="Other Bespoke Piece">Other Unique Creation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#674832] font-semibold mb-1">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
              >
                <option value="₹500 - ₹1,000">₹500 - ₹1,000</option>
                <option value="₹1,000 - ₹2,500">₹1,000 - ₹2,500</option>
                <option value="₹2,500 - ₹5,000">₹2,500 - ₹5,000</option>
                <option value="₹5,000+ (Bulk / Event)">₹5,000+ (Bulk / Event)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#674832] font-semibold mb-1">
                Needed By (Date)
              </label>
              <input
                type="text"
                placeholder="e.g. Next Saturday"
                value={formData.needByDate}
                onChange={(e) => setFormData({ ...formData, needByDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm focus:outline-[#c49a55]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#674832] font-semibold mb-1">
              Describe What You Have in Mind <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us color preferences, custom names/dates to engrave, themes, or special details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#d8c3aa] rounded bg-white text-sm font-serif focus:outline-[#c49a55]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded font-sans-ui font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Custom Inquiry via WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-[#796858] mt-2">
              Opens WhatsApp with your details prefilled for direct artisan consultation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

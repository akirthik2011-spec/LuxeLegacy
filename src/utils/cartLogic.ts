import { CartItem, Product, CustomerDetails, CustomOrderRequest } from '../types';

export const WHATSAPP_PHONE_NUMBER = '919448620389';
export const WHATSAPP_DISPLAY_NUMBER = '+91 94486 20389';

/**
 * Format numbers into Indian Rupee currency format (e.g. ₹1,499)
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate total quantity and subtotal of cart items
 */
export function calculateCartTotals(items: CartItem[]): { totalCount: number; subtotal: number } {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalCount, subtotal };
}

/**
 * Add product to cart or increment quantity if already present
 */
export function addItemToCart(cart: CartItem[], product: Product, qty: number = 1): CartItem[] {
  if (qty <= 0) return cart;
  const existingIndex = cart.findIndex((item) => item.id === product.id);
  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
    );
  }
  return [...cart, { ...product, quantity: qty }];
}

/**
 * Update quantity by delta (+1 or -1); removes item if quantity becomes <= 0
 */
export function updateCartQuantity(cart: CartItem[], productId: number, delta: number): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
}

/**
 * Remove an item completely from cart
 */
export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
  return cart.filter((item) => item.id !== productId);
}

/**
 * Build personalized WhatsApp message and return direct wa.me link
 */
export function generateWhatsAppOrderUrl(cart: CartItem[], customer?: CustomerDetails): string {
  if (cart.length === 0) return `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;

  const { subtotal } = calculateCartTotals(cart);

  let message = `*Hello Luxelegacy!* 🌸\nI would like to place an order from your handmade collection:\n\n`;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} × ${formatCurrency(item.price)} = *${formatCurrency(itemTotal)}*\n`;
  });

  message += `\n*Total Order Amount:* *${formatCurrency(subtotal)}*\n`;

  if (customer?.name?.trim()) {
    message += `\n👤 *Customer Name:* ${customer.name.trim()}`;
  }
  if (customer?.phone?.trim()) {
    message += `\n📞 *Contact Phone:* ${customer.phone.trim()}`;
  }
  if (customer?.city?.trim()) {
    message += `\n📍 *Delivery City / Address:* ${customer.city.trim()}`;
  }
  if (customer?.giftNote?.trim()) {
    message += `\n💌 *Complimentary Gift Note:* "${customer.giftNote.trim()}"`;
  }

  message += `\n\nPlease confirm availability, payment details, and estimated dispatch. Thank you! ✨`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Build WhatsApp URL for custom bespoke handcrafted requests
 */
export function generateCustomOrderWhatsAppUrl(request: CustomOrderRequest): string {
  let message = `*Hello Luxelegacy!* ✨\nI would love to inquire about a *Custom Handcrafted Order*:\n\n`;
  message += `👤 *Name:* ${request.fullName}\n`;
  message += `📞 *Phone:* ${request.phone}\n`;
  message += `🎨 *Category:* ${request.category}\n`;
  if (request.budget) {
    message += `💰 *Target Budget:* ${request.budget}\n`;
  }
  if (request.needByDate) {
    message += `📅 *Needed By:* ${request.needByDate}\n`;
  }
  message += `\n📝 *Order Idea & Details:*\n${request.description}\n\n`;
  message += `Could you let me know if this can be crafted and share estimated pricing and timeline? Thank you! 🌿`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  calculateCartTotals,
  addItemToCart,
  updateCartQuantity,
  removeFromCart,
  generateWhatsAppOrderUrl,
  WHATSAPP_PHONE_NUMBER
} from './cartLogic';
import { Product, CartItem } from '../types';

const mockProductA: Product = {
  id: 1,
  name: 'Handmade Gift Box',
  category: 'Gifts',
  description: 'A thoughtful gift for someone special.',
  price: 499,
  image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
  rating: 4.9,
  reviewsCount: 38,
  materials: ['Handmade paper', 'Satin ribbon', 'Dried florals'],
  dispatchTime: 'Ready to ship'
};

const mockProductB: Product = {
  id: 2,
  name: 'Creative Art Piece',
  category: 'Art & Decor',
  description: 'A unique piece to brighten your space.',
  price: 699,
  image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
  rating: 5.0,
  reviewsCount: 22,
  materials: ['Linen canvas', 'Acrylic pigments', 'Pine wood frame'],
  dispatchTime: '2-3 days'
};

test('formatCurrency formats Indian Rupee amounts correctly', () => {
  assert.equal(formatCurrency(499), '₹499');
  assert.equal(formatCurrency(12500), '₹12,500');
});

test('calculateCartTotals calculates total quantity and subtotal accurately', () => {
  const cart: CartItem[] = [
    { ...mockProductA, quantity: 2 },
    { ...mockProductB, quantity: 1 }
  ];
  const { totalCount, subtotal } = calculateCartTotals(cart);
  assert.equal(totalCount, 3);
  assert.equal(subtotal, 499 * 2 + 699); // 998 + 699 = 1697
});

test('addItemToCart adds new item or increments existing', () => {
  let cart: CartItem[] = [];
  cart = addItemToCart(cart, mockProductA, 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  cart = addItemToCart(cart, mockProductA, 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);

  cart = addItemToCart(cart, mockProductB, 1);
  assert.equal(cart.length, 2);
  assert.equal(cart[1].id, 2);
});

test('updateCartQuantity adjusts quantities and drops items reaching 0', () => {
  let cart: CartItem[] = [{ ...mockProductA, quantity: 2 }];
  cart = updateCartQuantity(cart, 1, 1);
  assert.equal(cart[0].quantity, 3);

  cart = updateCartQuantity(cart, 1, -2);
  assert.equal(cart[0].quantity, 1);

  cart = updateCartQuantity(cart, 1, -1);
  assert.equal(cart.length, 0);
});

test('removeFromCart deletes item by id', () => {
  const cart: CartItem[] = [
    { ...mockProductA, quantity: 1 },
    { ...mockProductB, quantity: 2 }
  ];
  const updated = removeFromCart(cart, 1);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, 2);
});

test('generateWhatsAppOrderUrl creates valid WhatsApp link with phone and encoded details', () => {
  const cart: CartItem[] = [{ ...mockProductA, quantity: 2 }];
  const url = generateWhatsAppOrderUrl(cart, {
    name: 'Ananya Sharma',
    phone: '9876543210',
    city: 'Bengaluru',
    giftNote: 'Happy Birthday Mom!'
  });

  assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=`));
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('Handmade Gift Box'));
  assert.ok(decoded.includes('Qty: 2'));
  assert.ok(decoded.includes('Ananya Sharma'));
  assert.ok(decoded.includes('Bengaluru'));
  assert.ok(decoded.includes('Happy Birthday Mom!'));
  assert.ok(decoded.includes('₹998'));
});

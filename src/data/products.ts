import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Handmade Gift Box',
    category: 'Gifts',
    description: 'A thoughtful gift for someone special.',
    detailedStory:
      'Curated with love, this signature gift box features handcrafted artisan treasures, delicate dried florals, a fragrant wax tablet, and a hand-tied raw silk ribbon. Each box is assembled individually, ensuring no two are exactly alike.',
    price: 499,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 48,
    materials: ['Recycled craft board', 'Raw silk ribbon', 'Preserved dried baby\'s breath', 'Scented wax tablet'],
    dimensions: '18 cm × 18 cm × 9 cm',
    dispatchTime: 'Ready to ship'
  },
  {
    id: 2,
    name: 'Creative Art Piece',
    category: 'Art & Decor',
    description: 'A unique piece to brighten your space.',
    detailedStory:
      'Each artwork is an original, textured acrylic composition on hand-stretched unbleached linen. Featuring warm earthy tones and gold leaf highlights that catch morning light.',
    price: 699,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80',
    badge: 'Artisan Pick',
    rating: 5.0,
    reviewsCount: 32,
    materials: ['Heavy-body acrylic', '100% Belgian linen canvas', 'Gold leaf accents', 'Natural pine floating frame'],
    dimensions: '25 cm × 30 cm (framed)',
    dispatchTime: 'Dispatches in 2 days'
  },
  {
    id: 3,
    name: 'Handmade Accessories',
    category: 'Accessories',
    description: 'Beautiful details, made with care.',
    detailedStory:
      'Delicately woven glass seed beads, freshwater pearls, and brass accents strung on durable silk cord. Lightweight, hypoallergenic, and versatile for festive occasions or everyday elegance.',
    price: 349,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
    badge: 'Hand-woven',
    rating: 4.8,
    reviewsCount: 27,
    materials: ['Freshwater pearls', 'Czech glass beads', '14k gold-plated brass lock', 'Braided silk thread'],
    dimensions: 'Length: 42 cm with 5 cm extender',
    dispatchTime: 'Ready to ship'
  },
  {
    id: 4,
    name: 'Decorative Creation',
    category: 'Home & Living',
    description: 'A charming addition to your home.',
    detailedStory:
      'Hand-molded stoneware clay piece sculpted slowly on our studio wheel and hand-finished with a tactile sand glaze. Perfect as a mantle ornament, dry floral display, or desktop sanctuary.',
    price: 599,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80',
    badge: 'Studio Classic',
    rating: 4.9,
    reviewsCount: 41,
    materials: ['Stoneware ceramic clay', 'Matte speckled sand glaze', 'Cork protective base'],
    dimensions: '14 cm height × 11 cm diameter',
    dispatchTime: 'Ready to ship'
  },
  {
    id: 5,
    name: 'Botanical Floral Hoop',
    category: 'Art & Decor',
    description: 'Intricate hand-stitched floral embroidery on natural linen.',
    detailedStory:
      'Over 20 hours of delicate French knots and satin embroidery stitches depicting wildflower meadows. Mounted in a smooth natural beechwood hoop ready to hang.',
    price: 549,
    originalPrice: 700,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80',
    badge: 'Limited Batch',
    rating: 4.9,
    reviewsCount: 19,
    materials: ['DMC Egyptian cotton floss', 'Pure handloom linen', 'Beechwood embroidery hoop'],
    dimensions: '20 cm diameter',
    dispatchTime: 'Dispatches in 2-3 days'
  },
  {
    id: 6,
    name: 'Handcrafted Macramé Hanging',
    category: 'Home & Living',
    description: 'Boho statement wall tapestry woven from organic cotton.',
    detailedStory:
      'Knotted with rhythmic meditation using single-twist organic cotton rope suspended from naturally fallen forest driftwood collected and treated responsibly.',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&w=700&q=80',
    badge: 'Statement Piece',
    rating: 5.0,
    reviewsCount: 15,
    materials: ['100% natural organic cotton cord', 'Sterilized wild driftwood branch', 'Brass hanging loop'],
    dimensions: '45 cm width × 70 cm length',
    dispatchTime: 'Ready to ship'
  },
  {
    id: 7,
    name: 'Artisan Scented Candle Vessel',
    category: 'Gifts',
    description: 'Hand-poured pure soy wax with warm amber and sandalwood.',
    detailedStory:
      'Infused with therapeutic essential oils and crackling wooden wicks in a reusable handcrafted ceramic jar that can be repurposed as a succulent pot afterwards.',
    price: 449,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    badge: 'Pure Soy',
    rating: 4.9,
    reviewsCount: 36,
    materials: ['Golden soy wax', 'Natural sandalwood & vanilla oils', 'FSC certified wood wick', 'Glazed ceramic pot'],
    dimensions: 'Burn time: 45+ hours (220g)',
    dispatchTime: 'Ready to ship'
  },
  {
    id: 8,
    name: 'Personalized Botanical Plaque',
    category: 'Gifts',
    description: 'Custom resin keepsake with pressed blooms and gold lettering.',
    detailedStory:
      'Real garden flowers individually pressed for 3 weeks and preserved in UV-stable crystal resin with custom hand-lettered names or anniversary dates in gold foil.',
    price: 749,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    badge: 'Customizable',
    rating: 5.0,
    reviewsCount: 29,
    materials: ['Jewellery-grade clear resin', 'Pressed real wildflowers', 'Gold leaf foil', 'Solid oak easel stand'],
    dimensions: '15 cm × 15 cm × 1.5 cm',
    dispatchTime: 'Made to order: 3-4 days'
  }
];

export const reviewsData = [
  {
    id: 1,
    name: 'Pooja Venkatesh',
    city: 'Bengaluru',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'Ordered the Handmade Gift Box for my sister’s milestone birthday. The packaging, dried floral bouquet, and personal handwritten card made her tear up! Communication on WhatsApp was so smooth and polite.',
    verified: true,
    product: 'Handmade Gift Box'
  },
  {
    id: 2,
    name: 'Rohit Kulkarni',
    city: 'Pune',
    rating: 5,
    date: '1 month ago',
    comment:
      'The Creative Art Piece arrived safely in sturdy packaging. The textures and gold highlights look far richer in person than photos can capture. Truly heirloom quality work!',
    verified: true,
    product: 'Creative Art Piece'
  },
  {
    id: 3,
    name: 'Meera Nambiar',
    city: 'Kochi',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'I requested a customized botanical plaque for our 5th wedding anniversary with our wedding date. They shared progress updates on WhatsApp and dispatched it right on time. Thank you Luxelegacy!',
    verified: true,
    product: 'Personalized Botanical Plaque'
  }
];

export const storyMilestones = [
  {
    icon: 'Sparkles',
    title: '100% Handmade with Soul',
    description: 'Every creation is formed, painted, knotted, or poured by human hands in our studio with mindful devotion.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Custom Made Just for You',
    description: 'Have a special idea or gift theme? We customize colors, names, and bespoke requests directly over WhatsApp.'
  },
  {
    icon: 'Leaf',
    title: 'Mindful & Sustainable',
    description: 'We prioritize plastic-free biodegradable packaging, recycled paper, organic cotton, and zero-waste material re-use.'
  },
  {
    icon: 'Truck',
    title: 'Safe Pan-India Delivery',
    description: 'Multi-layer protective artisan packaging ensuring your fragile treasures arrive safely anywhere in India.'
  }
];

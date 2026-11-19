interface SeedMenuCategory {
  id: string;
  slug: string;
  name: string;
  scriptLabel: string;
  description: string;
}

interface SeedMenuItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  pairingNote?: string;
}

export const menuCategories: SeedMenuCategory[] = [
  {
    id: 'cat-coffee',
    slug: 'coffee-brews',
    name: 'Coffee & Brews',
    scriptLabel: 'Morning & All-Day Coffee House',
    description:
      'Freshly pulled espresso, hand-textured cappuccinos, and classic brews prepared on our Italian La Cimbali M23 UP.',
  },
  {
    id: 'cat-grill',
    slug: 'grill',
    name: 'Grill & Eve Specials',
    scriptLabel: 'From the Grill & Specials Board',
    description:
      'House evening grill favorites including Mutton Cheese Finger, Chicken Khumbi, Singapore Mushroom, and Stuffed Grill Paneer.',
  },
  {
    id: 'cat-mains',
    slug: 'mains',
    name: 'Mains & Café Classics',
    scriptLabel: 'All-Day Kitchen Favorites',
    description:
      'Grilled club sandwiches, classic Nepali momos, stone-baked pizzas, and hearty platters made fresh to order.',
  },
  {
    id: 'cat-sides',
    slug: 'sides',
    name: 'Sides & Quick Bites',
    scriptLabel: 'Shareable Garden Plates',
    description:
      'Tangy spiced chatpate, crisp golden fries, and café bites made for unhurried table conversations.',
  },
  {
    id: 'cat-drinks',
    slug: 'drinks',
    name: 'Drinks & Bar Specials',
    scriptLabel: 'Iced Teas, Mocktails & Cocktails',
    description:
      'Chilled iced mint tea, house-crafted Devil Mojito mocktails, and signature bar cocktails poured every evening.',
  },
  {
    id: 'cat-desserts',
    slug: 'desserts',
    name: 'Desserts & Sweets',
    scriptLabel: 'Sweet Finales',
    description:
      'Warm baked treats and classic café desserts designed to pair effortlessly with freshly brewed espresso.',
  },
];

export const menuItems: SeedMenuItem[] = [
  // 1. COFFEE & BREWS
  {
    id: 'cb-1',
    slug: 'double-shot-espresso',
    name: 'Double Shot Espresso',
    category: 'coffee-brews',
    price: 180,
    description:
      'Rich, aromatic double espresso extracted fresh on our La Cimbali M23 UP machine with a thick golden crema.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
    featured: true,
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
    pairingNote: 'Available from 7:30 AM daily in our Airport Road Coffee House',
  },
  {
    id: 'cb-2',
    slug: 'signature-cappuccino',
    name: 'Signature Cappuccino',
    category: 'coffee-brews',
    price: 260,
    description:
      'Fresh double espresso balanced with steamed milk and silky latte-art micro-foam served warm in classic porcelain.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069455/classico-brew-and-grill/cappuccino-closeup.jpg',
    featured: true,
    tags: ['Signature', 'Vegetarian'],
    pairingNote: 'Pairs wonderfully with Grilled Club Sandwich or Warm Brownie',
  },
  {
    id: 'cb-3',
    slug: 'classic-americano',
    name: 'Classic Americano',
    category: 'coffee-brews',
    price: 210,
    description:
      'Bold double espresso lengthened with hot filtered water, crowned with natural golden espresso crema.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069452/classico-brew-and-grill/americano-closeup.jpg',
    featured: true,
    tags: ['Single Origin', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'cb-4',
    slug: 'creamy-cafe-latte',
    name: 'Creamy Café Latte',
    category: 'coffee-brews',
    price: 280,
    description:
      'Smooth espresso folded into lightly textured steamed milk for an easygoing morning or afternoon cup.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069454/classico-brew-and-grill/cappuccino-americano-duo.jpg',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'cb-5',
    slug: 'iced-black-americano',
    name: 'Iced Black Americano',
    category: 'coffee-brews',
    price: 230,
    description:
      'Double espresso poured over crystal ice and chilled spring water—crisp, smooth, and refreshing on warm afternoons.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069452/classico-brew-and-grill/americano-closeup.jpg',
    tags: ['Vegan', 'Gluten-Free'],
  },

  // 2. GRILL & EVE SPECIALS (Includes Classico Chalkboard Specials)
  {
    id: 'gr-1',
    slug: 'mutton-cheese-finger',
    name: 'Mutton Cheese Finger',
    category: 'grill',
    price: 520,
    description:
      'House Eve Special: spiced minced mutton rolled around melted cheese, seared crisp and served hot with house dip.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Wood-Fired'],
    pairingNote: 'Featured on Classico’s Evening Specials Board',
  },
  {
    id: 'gr-2',
    slug: 'chicken-khumbi',
    name: 'Chicken Khumbi',
    category: 'grill',
    price: 450,
    description:
      'House Eve Special: tender marinated chicken seared with button mushrooms, cracked black pepper, garlic, and herbs.',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Gluten-Free'],
  },
  {
    id: 'gr-3',
    slug: 'singapore-mushroom',
    name: 'Singapore Mushroom',
    category: 'grill',
    price: 360,
    description:
      'House Eve Special: wok-seared mushrooms tossed in a savory, spiced aromatic glaze with peppers and scallions.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian'],
  },
  {
    id: 'gr-4',
    slug: 'stuffed-grill-paneer',
    name: 'Stuffed Grill Paneer',
    category: 'grill',
    price: 420,
    description:
      'House Eve Special: soft cottage cheese slabs layered with spiced herb filling and chargrilled golden to order.',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Wood-Fired', 'Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'gr-5',
    slug: 'chargrilled-chicken-bbq-platter',
    name: 'Chargrilled Chicken BBQ Platter',
    category: 'grill',
    price: 650,
    description:
      'Smoky marinated chicken cuts grilled over high heat with charred bell peppers, onions, and mint-coriander chutney.',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
    tags: ['Wood-Fired', 'Gluten-Free'],
  },

  // 3. MAINS & CAFÉ CLASSICS
  {
    id: 'mn-1',
    slug: 'grilled-club-sandwich-fries',
    name: 'Grilled Club Sandwich & Fries',
    category: 'mains',
    price: 380,
    description:
      'Golden-toasted sandwich triangles layered with seasoned vegetables, tomatoes, and creamy filling, served with fries and house sauce.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069457/classico-brew-and-grill/club-sandwich-fries.jpg',
    featured: true,
    tags: ['Signature'],
    pairingNote: 'Pairs smoothly with Signature Cappuccino or Iced Lemon Mint Tea',
  },
  {
    id: 'mn-2',
    slug: 'classic-nepali-chicken-momo',
    name: 'Classic Nepali Chicken Momo',
    category: 'mains',
    price: 260,
    description:
      'Hand-pleated steamed dumplings stuffed with juicy spiced chicken, ginger, and spring onion, served with roasted tomato achar.',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature'],
  },
  {
    id: 'mn-3',
    slug: 'classic-chicken-cheese-pizza',
    name: 'Classic Chicken & Cheese Pizza',
    category: 'mains',
    price: 580,
    description:
      'Crisp baked crust topped with tangy house tomato sauce, spiced grilled chicken, bell peppers, and melted mozzarella.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    tags: [],
  },
  {
    id: 'mn-4',
    slug: 'aromatic-chicken-biryani',
    name: 'Aromatic Chicken Biryani',
    category: 'mains',
    price: 480,
    description:
      'Fragrant long-grain basmati rice layered with spiced tender chicken, caramelized onions, fresh mint, and cool raita.',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    tags: ['Gluten-Free'],
  },

  // 4. SIDES & QUICK BITES
  {
    id: 'sd-1',
    slug: 'spiced-nepali-chatpate',
    name: 'Spiced Nepali Chatpate',
    category: 'sides',
    price: 220,
    description:
      'Crunchy puffed rice and crushed noodles tossed with ripe tomato, red onion, fresh cilantro, lime, and aromatic spices.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069456/classico-brew-and-grill/chatpate-sadeko.jpg',
    featured: true,
    tags: ['Signature', 'Vegan'],
    pairingNote: 'A favorite Restro Garden starter with Iced Lemon Mint Tea',
  },
  {
    id: 'sd-2',
    slug: 'crispy-seasoned-french-fries',
    name: 'Crispy Seasoned French Fries',
    category: 'sides',
    price: 210,
    description:
      'Golden potato fries cooked crisp to order, dusted with sea salt and mild herbs alongside house tomato dip.',
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegan', 'Gluten-Free'],
  },
  {
    id: 'sd-3',
    slug: 'toasted-herb-cheese-bread',
    name: 'Toasted Herb & Cheese Bread',
    category: 'sides',
    price: 240,
    description:
      'Warm oven-toasted bread brushed with roasted garlic butter, fresh herbs, and bubbling mozzarella.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian'],
  },

  // 5. DRINKS & BAR SPECIALS
  {
    id: 'dr-1',
    slug: 'iced-lemon-mint-tea',
    name: 'Chilled Iced Lemon Mint Tea',
    category: 'drinks',
    price: 240,
    description:
      'Amber brewed tea shaken over ice with bright lemon juice and muddled fresh mint leaves for warm Biratnagar afternoons.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069464/classico-brew-and-grill/iced-mint-tea.jpg',
    featured: true,
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'dr-2',
    slug: 'devil-mojito-mocktail',
    name: 'Devil Mojito (Mocktail)',
    category: 'drinks',
    price: 290,
    description:
      'House Bar Special: crisp garden mint, fresh squeezed lime, subtle spiced chili heat, and sparkling soda over crushed ice.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
    pairingNote: 'Featured on Classico’s Bar Specials Board',
  },
  {
    id: 'dr-3',
    slug: 'pink-lady-cocktail',
    name: 'Pink Lady (Cocktail)',
    category: 'drinks',
    price: 550,
    description:
      'House Bar Special: smooth classic evening cocktail shaken chilled with tart citrus, berry sweetness, and silky foam finish.',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Gluten-Free'],
  },
  {
    id: 'dr-4',
    slug: 'fresh-mint-lime-cooler',
    name: 'Fresh Mint Lime Cooler',
    category: 'drinks',
    price: 190,
    description:
      'Cool pressed lime, hand-torn spearmint, light cane syrup, and sparkling chilled soda.',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegan', 'Gluten-Free'],
  },

  // 6. DESSERTS & SWEETS
  {
    id: 'ds-1',
    slug: 'warm-dark-chocolate-brownie',
    name: 'Warm Dark Chocolate Brownie',
    category: 'desserts',
    price: 320,
    description:
      'Fudgy rich cocoa brownie served warm with vanilla ice cream and a drizzle of dark chocolate.',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Vegetarian'],
  },
  {
    id: 'ds-2',
    slug: 'espresso-tiramisu-classico',
    name: 'Espresso Tiramisu Classico',
    category: 'desserts',
    price: 360,
    description:
      'Layered sponge biscuits dipped in freshly pulled espresso, topped with whipped cream cheese and dark cocoa.',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian'],
  },
  {
    id: 'ds-3',
    slug: 'baked-vanilla-cheesecake',
    name: 'Baked Vanilla Cheesecake',
    category: 'desserts',
    price: 380,
    description:
      'Creamy caramelized baked cheesecake served chilled with fresh berry compote.',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
];

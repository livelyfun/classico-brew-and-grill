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
    scriptLabel: 'Morning & All-Day Roastery',
    description:
      'Small-batch single-origin beans, botanical house syrups, and slow-steeped cold brews pulled to order.',
  },
  {
    id: 'cat-grill',
    slug: 'grill',
    name: 'Grill',
    scriptLabel: 'From the White-Oak Hearth',
    description:
      'Pasture-raised cuts and sustainable seafood kissed by glowing hardwood embers and herb-infused butter.',
  },
  {
    id: 'cat-mains',
    slug: 'mains',
    name: 'Mains',
    scriptLabel: 'Kitchen Classics',
    description:
      'Thoughtfully composed plates celebrating seasonal market produce, handmade pasta, and coastal flavors.',
  },
  {
    id: 'cat-sides',
    slug: 'sides',
    name: 'Sides',
    scriptLabel: 'Shared Accompaniments',
    description:
      'Wood-roasted vegetables, artisan breads, and crisp golden accompaniments crafted for the table.',
  },
  {
    id: 'cat-desserts',
    slug: 'desserts',
    name: 'Desserts',
    scriptLabel: 'Sweet Finales',
    description:
      'House-baked pastries, espresso-soaked classics, and warm delicacies designed to linger over.',
  },
  {
    id: 'cat-drinks',
    slug: 'drinks',
    name: 'Drinks',
    scriptLabel: 'Botanical Elixirs & Refreshers',
    description:
      'Zero-proof garden spritzes, cold-pressed juices, and aromatic house sodas crafted with fresh herbs.',
  },
];

export const menuItems: SeedMenuItem[] = [
  // 1. COFFEE & BREWS
  {
    id: 'cb-1',
    slug: 'pistachio-sage-latte',
    name: 'Classico Pistachio Sage Latte',
    category: 'coffee-brews',
    price: 6.75,
    description:
      'Double-shot house espresso steamed with silky oat or whole milk, roasted Sicilian pistachio cream, and garden sage syrup.',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Signature', 'Vegetarian'],
    pairingNote: 'Pairs wonderfully with Almond Croissant or Basque Cheesecake',
  },
  {
    id: 'cb-2',
    slug: 'ethiopian-yirgacheffe-pourover',
    name: 'Ethiopian Yirgacheffe Pour-Over',
    category: 'coffee-brews',
    price: 6.25,
    description:
      'Hand-poured V60 single origin highlighting bright bergamot, jasmine blossom, and honeyed stone-fruit clarity.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Single Origin', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'cb-3',
    slug: 'rosemary-cold-brew-tonic',
    name: 'Rosemary Cold Brew Tonic',
    category: 'coffee-brews',
    price: 6.50,
    description:
      '18-hour slow-steeped Colombian cold brew layered over artisanal quinine tonic, charred rosemary sprig, and expressed grapefruit peel.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'cb-4',
    slug: 'ceremonial-matcha-cloud',
    name: 'Ceremonial Uji Matcha Cloud',
    category: 'coffee-brews',
    price: 6.95,
    description:
      'First-harvest stone-ground Uji matcha whisked over chilled milk and crowned with lightly salted vanilla botanical foam.',
    image:
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'cb-5',
    slug: 'smoked-maple-cortado',
    name: 'Smoked Maple Espresso Cortado',
    category: 'coffee-brews',
    price: 5.50,
    description:
      'Equal parts ristretto espresso and velvety micro-foam kissed with barrel-aged Vermont maple and sea salt.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },

  // 2. GRILL
  {
    id: 'gr-1',
    slug: 'wood-fired-prime-ribeye',
    name: 'Wood-Fired Prime Ribeye (12oz)',
    category: 'grill',
    price: 42.00,
    description:
      '28-day dry-aged pasture-raised ribeye seared over white oak embers, finished with roasted garlic, thyme, and cultured sea-salt butter.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Signature', 'Wood-Fired', 'Gluten-Free'],
    pairingNote: 'Recommended with Creamed Spinach & Charred Broccolini',
  },
  {
    id: 'gr-2',
    slug: 'chargrilled-atlantic-salmon',
    name: 'Cedar-Seared Atlantic Salmon',
    category: 'grill',
    price: 31.00,
    description:
      'Crisp-skin Atlantic salmon grilled over aromatic cedar and applewood, served with preserved lemon, dill oil, and blistered heirloom tomatoes.',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Wood-Fired', 'Gluten-Free'],
  },
  {
    id: 'gr-3',
    slug: 'herb-crusted-lamb-rack',
    name: 'Herb-Crusted Lamb Cutlets',
    category: 'grill',
    price: 38.00,
    description:
      'Tender rack of lamb crusted with rosemary, mint, and Dijon mustard, flame-kissed to medium-rare with roasted shallot jus.',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Wood-Fired'],
  },
  {
    id: 'gr-4',
    slug: 'smoked-peri-peri-half-chicken',
    name: 'Hearth-Roasted Lemon Herb Chicken',
    category: 'grill',
    price: 26.50,
    description:
      'Free-range half chicken brined for 24 hours in citrus and oregano, slow-charred under brick with roasted garlic pan drippings.',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80',
    tags: ['Wood-Fired', 'Gluten-Free'],
  },
  {
    id: 'gr-5',
    slug: 'charred-cauliflower-steak',
    name: 'Harissa & Chimichurri Cauliflower Steak',
    category: 'grill',
    price: 22.00,
    description:
      'Thick-cut heirloom cauliflower seared on the open hearth, glazed with smoky rose harissa over whipped tahini and herb chimichurri.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    tags: ['Wood-Fired', 'Vegan', 'Gluten-Free'],
  },

  // 3. MAINS
  {
    id: 'mn-1',
    slug: 'wild-mushroom-truffle-risotto',
    name: 'Wild Mushroom & Black Truffle Risotto',
    category: 'mains',
    price: 27.00,
    description:
      'Acquerello Carnaroli rice slowly simmered in roasted porcini broth with chanterelles, aged Parmigiano-Reggiano, and fresh thyme.',
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Signature', 'Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'mn-2',
    slug: 'braised-short-rib-pappardelle',
    name: 'Braised Short Rib Pappardelle',
    category: 'mains',
    price: 29.50,
    description:
      'Silky handmade egg ribbons tossed in espresso-red wine braised beef short rib ragù, finished with gremolata and aged pecorino.',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature'],
  },
  {
    id: 'mn-3',
    slug: 'pan-seared-sea-bass',
    name: 'Pan-Seared Sea Bass & Saffron Velouté',
    category: 'mains',
    price: 34.00,
    description:
      'Crispy skin Mediterranean sea bass resting over braised fennel, baby artichokes, and delicate saffron citrus emulsion.',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
    tags: ['Gluten-Free'],
  },
  {
    id: 'mn-4',
    slug: 'harvest-halloumi-grain-bowl',
    name: 'Harvest Quinoa & Grilled Halloumi Bowl',
    category: 'mains',
    price: 21.50,
    description:
      'Warm heirloom quinoa, charred baby carrots, avocado, pomegranate seeds, and golden seared halloumi dressed in mint vinaigrette.',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },

  // 4. SIDES
  {
    id: 'sd-1',
    slug: 'truffle-parmesan-fries',
    name: 'Truffle & Aged Parmesan Pommes Frites',
    category: 'sides',
    price: 10.50,
    description:
      'Twice-cooked Kennebec potato frites tossed with white truffle oil, crisp rosemary needles, and 24-month Parmigiano.',
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'sd-2',
    slug: 'charred-broccolini-almonds',
    name: 'Hearth-Charred Broccolini & Almonds',
    category: 'sides',
    price: 11.00,
    description:
      'Tender broccolini blistered over embers with crushed Calabrian chili, preserved Meyer lemon, and toasted Marcona almonds.',
    image:
      'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Wood-Fired', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'sd-3',
    slug: 'wood-fired-rosemary-focaccia',
    name: 'Warm Sea-Salt & Rosemary Focaccia',
    category: 'sides',
    price: 9.00,
    description:
      '48-hour fermented sourdough focaccia baked crisp on the hearth stone, served with whipped cultured butter and aged balsamic.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian'],
  },
  {
    id: 'sd-4',
    slug: 'creamed-spinach-gruyere',
    name: 'Velvet Spinach & Cave-Aged Gruyère',
    category: 'sides',
    price: 11.50,
    description:
      'Baby spinach folded into nutmeg-scented cream and gratinéed until golden under melted Swiss Gruyère.',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },

  // 5. DESSERTS
  {
    id: 'ds-1',
    slug: 'basque-burnt-cheesecake',
    name: 'Basque Burnt Cheesecake',
    category: 'desserts',
    price: 13.00,
    description:
      'Caramelized vanilla-bean custard center with a rich toasted crust, served alongside macerated seasonal berries.',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Signature', 'Vegetarian', 'Gluten-Free'],
  },
  {
    id: 'ds-2',
    slug: 'espresso-tiramisu-classico',
    name: 'Espresso Tiramisu Classico',
    category: 'desserts',
    price: 12.50,
    description:
      'Savoiardi biscuits steeped in Classico’s signature espresso roast, layered with whipped mascarpone and Valrhona cocoa dust.',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Vegetarian'],
  },
  {
    id: 'ds-3',
    slug: 'warm-dark-chocolate-fondant',
    name: 'Warm 70% Dark Chocolate Fondant',
    category: 'desserts',
    price: 14.00,
    description:
      'Molten single-origin cacao cake baked to order, paired with Madagascar vanilla bean gelato and sea-salt caramel.',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian'],
  },
  {
    id: 'ds-4',
    slug: 'pistachio-cardamom-creme-brulee',
    name: 'Pistachio & Cardamom Crème Brûlée',
    category: 'desserts',
    price: 12.00,
    description:
      'Silky green cardamom custard beneath a crackling caramelized sugar glass, garnished with crushed pistachios.',
    image:
      'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },

  // 6. DRINKS
  {
    id: 'dr-1',
    slug: 'botanical-cucumber-mint-cooler',
    name: 'Botanical Cucumber & Mint Cooler',
    category: 'drinks',
    price: 8.50,
    description:
      'Cold-pressed English cucumber, garden spearmint, fresh lime juice, and sparkling mineral water over crystal ice.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    featured: true,
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 'dr-2',
    slug: 'smoked-rosemary-paloma-spritz',
    name: 'Smoked Rosemary Grapefruit Spritz',
    category: 'drinks',
    price: 9.50,
    description:
      'Ruby red grapefruit juice, botanical agave nectar, zero-proof citrus distillate, and charred rosemary aroma.',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegan', 'Gluten-Free'],
  },
  {
    id: 'dr-3',
    slug: 'hibiscus-berry-artisan-soda',
    name: 'Hibiscus & Wild Berry Spritz',
    category: 'drinks',
    price: 8.75,
    description:
      'Steeped organic hibiscus petals, crushed blackberries, ginger root essence, and fine effervescence.',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegan', 'Gluten-Free'],
  },
  {
    id: 'dr-4',
    slug: 'valencia-orange-ginger-press',
    name: 'Valencia Orange & Ginger Elixir',
    category: 'drinks',
    price: 8.00,
    description:
      'Fresh-pressed California Valencia oranges, raw turmeric, spicy ginger juice, and a touch of wildflower honey.',
    image:
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
];

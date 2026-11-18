interface SeedGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  aspect?: string;
}

export const galleryCategories = [
  { key: 'all', label: 'All Moments' },
  { key: 'atmosphere', label: 'Atmosphere & Interior' },
  { key: 'brews', label: 'Coffee & Brews' },
  { key: 'grill', label: 'Wood-Fired Grill' },
  { key: 'desserts', label: 'Desserts & Drinks' },
] as const;

export const galleryItems: SeedGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Botanical Conservatory',
    caption: 'Sunlit mornings beneath indoor olive canopies and soft sage seating.',
    category: 'atmosphere',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Precision Latte Art',
    caption: 'Our signature espresso textured to velvet micro-foam each morning.',
    category: 'brews',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    aspect: 'portrait',
  },
  {
    id: 'gal-3',
    title: 'White-Oak Hearth Ribeye',
    caption: '28-day dry-aged prime beef seared over aromatic hardwood flames.',
    category: 'grill',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Candlelit Evening Sanctuary',
    caption: 'Intimate tables set for unhurried dinners and warm conversations.',
    category: 'atmosphere',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'gal-5',
    title: 'Single-Origin Pour Over',
    caption: 'Hand-brewed Ethiopian harvests highlighting delicate jasmine aromatics.',
    category: 'brews',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
  },
  {
    id: 'gal-6',
    title: 'Botanical Garden Spritzes',
    caption: 'Fresh cucumber, rosemary, and citrus elixirs crafted at our bar.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    aspect: 'portrait',
  },
  {
    id: 'gal-7',
    title: 'Cedar-Seared Coastal Salmon',
    caption: 'Wild salmon finished with Meyer lemon, dill oil, and blistered tomatoes.',
    category: 'grill',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
  },
  {
    id: 'gal-8',
    title: 'Espresso Tiramisu & Pastry Counter',
    caption: 'Handcrafted Italian-inspired desserts dusted with rich dark cacao.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
  },
  {
    id: 'gal-9',
    title: 'The Morning Espresso Bar',
    caption: 'Where our head baristas dial in fresh roasts from 7:30 AM daily.',
    category: 'brews',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'gal-10',
    title: 'Live-Fire Kitchen Craft',
    caption: 'Chef Marco finishing hearth-roasted dishes with fresh herb infusions.',
    category: 'grill',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'gal-11',
    title: 'Covered Garden Terrace',
    caption: 'Dappled daylight and warm evening lanterns on the stone courtyard.',
    category: 'atmosphere',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    aspect: 'portrait',
  },
  {
    id: 'gal-12',
    title: 'Basque Burnt Cheesecake',
    caption: 'Caramelized vanilla bean cheesecake served with macerated berries.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
  },
];

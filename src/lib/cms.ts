import { menuCategories, menuItems } from '@/data/menuData';
import { galleryItems } from '@/data/galleryData';
import {
  brandValues,
  craftLeaders,
  seatingZones,
  siteConfig,
  storyChapters,
  testimonials,
} from '@/data/siteData';
import {
  GalleryCategory,
  GalleryItem,
  MenuCategory,
  MenuCategorySlug,
  MenuItem,
} from '@/types/cms';

/**
 * CMS Adapter Layer (Phase 1: Static Data)
 *
 * All page components consume data through these functions.
 * In Phase 2 (Payload, Sanity, or custom API), replace the bodies
 * of these functions with async CMS fetches without modifying UI components.
 */

export function getSiteConfig() {
  return siteConfig;
}

export function getMenuCategories(): MenuCategory[] {
  return menuCategories;
}

export function getAllMenuItems(): MenuItem[] {
  return menuItems;
}

export function getFeaturedMenuItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

export function getMenuItemsByCategory(
  category: MenuCategorySlug | 'all'
): MenuItem[] {
  if (category === 'all') return menuItems;
  return menuItems.filter((item) => item.category === category);
}

export function getGalleryItems(category: GalleryCategory = 'all'): GalleryItem[] {
  if (category === 'all') return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}

export function getAboutContent() {
  return {
    values: brandValues,
    chapters: storyChapters,
    leaders: craftLeaders,
    testimonials,
  };
}

export function getSeatingZones() {
  return seatingZones;
}

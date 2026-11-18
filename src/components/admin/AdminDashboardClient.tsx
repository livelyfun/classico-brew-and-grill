'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  FolderKanban,
  HelpCircle,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Phone,
  Plus,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CloudinaryImageInput } from '@/components/admin/CloudinaryImageInput';
import { PaginationControls } from '@/components/admin/PaginationControls';
import { BlogTab } from '@/components/admin/BlogTab';
import { FaqTab } from '@/components/admin/FaqTab';
import { ReviewsTab } from '@/components/admin/ReviewsTab';
import { HeroHomeTab } from '@/components/admin/HeroHomeTab';
import { PagesVisualTab } from '@/components/admin/PagesVisualTab';
import { SettingsVisualTab } from '@/components/admin/SettingsVisualTab';
import {
  BlogPost,
  CustomerReview,
  FaqItem,
  GalleryItem,
  HeroContentData,
  MenuCategory,
  MenuItem,
  PageSectionData,
  ReservationRecord,
  SiteSettingsData,
} from '@/types/cms';
import { cn, formatPrice } from '@/lib/utils';

export interface AdminBundle {
  settings: SiteSettingsData | null;
  hero: HeroContentData | null;
  categories: MenuCategory[];
  items: MenuItem[];
  gallery: GalleryItem[];
  pages: PageSectionData[];
  reservations: ReservationRecord[];
  blogPosts?: BlogPost[];
  faqItems?: FaqItem[];
  reviews?: CustomerReview[];
}

type TabKey =
  | 'overview'
  | 'reservations'
  | 'reviews'
  | 'menu'
  | 'categories'
  | 'gallery'
  | 'blog'
  | 'faq'
  | 'hero'
  | 'pages'
  | 'settings';

const dietaryTagPresets = [
  'Signature',
  'Wood-Fired',
  'Single Origin',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
] as const;

interface NavGroup {
  groupLabel: string;
  items: Array<{
    key: TabKey;
    label: string;
    guide: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

const navGroups: NavGroup[] = [
  {
    groupLabel: 'Daily Operations',
    items: [
      {
        key: 'overview',
        label: 'Dashboard Home',
        guide: 'A quick summary of your restaurant website, bookings, and tasks.',
        icon: LayoutDashboard,
      },
      {
        key: 'reservations',
        label: 'Table Bookings',
        guide: 'Check upcoming table reservations, party sizes, and seating notes.',
        icon: CalendarCheck,
      },
      {
        key: 'reviews',
        label: 'Guest Reviews',
        guide: 'Approve customer reviews so they appear on your live website.',
        icon: MessageSquare,
      },
    ],
  },
  {
    groupLabel: 'Menu Management',
    items: [
      {
        key: 'menu',
        label: 'Dishes & Drinks',
        guide: 'Add dishes, adjust prices, upload food photos, or hide seasonal items.',
        icon: UtensilsCrossed,
      },
      {
        key: 'categories',
        label: 'Menu Sections',
        guide: 'Organize menu sections like Coffee & Brews, Grill, Mains, and Desserts.',
        icon: FolderKanban,
      },
    ],
  },
  {
    groupLabel: 'Stories & Media',
    items: [
      {
        key: 'gallery',
        label: 'Photo Gallery',
        guide: 'Manage atmosphere, coffee, and wood-fired kitchen photos.',
        icon: ImageIcon,
      },
      {
        key: 'blog',
        label: 'Blog & Articles',
        guide: 'Write and publish stories from your roastery and kitchen.',
        icon: BookOpen,
      },
      {
        key: 'faq',
        label: 'Common Questions (FAQ)',
        guide: 'Answer common guest questions about reservations, allergies, and parking.',
        icon: HelpCircle,
      },
    ],
  },
  {
    groupLabel: 'Website Setup',
    items: [
      {
        key: 'hero',
        label: 'Homepage Banner',
        guide: 'Edit your welcome headlines, front-page photo, and booking banners.',
        icon: Home,
      },
      {
        key: 'pages',
        label: 'Page Content',
        guide: 'Update your About Us story, team profiles, contact text, and dining zones.',
        icon: FileText,
      },
      {
        key: 'settings',
        label: 'Restaurant Info & Hours',
        guide: 'Keep your phone number, address, opening hours, and social links up to date.',
        icon: Settings,
      },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

function FormRailContainer({
  isOpen,
  onExpand,
  onQuickCreate,
  quickAddTitle,
  verticalLabel,
  count,
  children,
}: {
  isOpen: boolean;
  onExpand: () => void;
  onQuickCreate: () => void;
  quickAddTitle: string;
  verticalLabel: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        'shrink-0 rounded-3xl border border-brand-mint/45 bg-white shadow-soft transition-all duration-300 ease-in-out lg:h-full lg:overflow-y-auto overflow-x-hidden',
        isOpen
          ? 'w-full p-6 lg:w-[400px] xl:w-[420px]'
          : 'w-full p-3 lg:w-[72px]'
      )}
    >
      {isOpen ? (
        children
      ) : (
        <div className="flex flex-row items-center justify-between gap-3 lg:h-full lg:flex-col lg:py-1">
          <div className="flex flex-row items-center gap-2 lg:flex-col lg:gap-3">
            <button
              type="button"
              onClick={onExpand}
              title="Expand Form Sidebar"
              aria-label="Expand Form Sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg text-brand-dark transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onQuickCreate}
              title={quickAddTitle}
              aria-label={quickAddTitle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white shadow-soft transition-colors hover:bg-brand-teal-dark"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onExpand}
            title={`Click to expand: ${verticalLabel}`}
            className="text-xs font-semibold uppercase tracking-wider text-brand-sage transition-colors hover:text-brand-teal lg:py-2 lg:[writing-mode:vertical-rl] lg:rotate-180"
          >
            {verticalLabel}
          </button>

          <span
            title={`${count} total items`}
            className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-full border border-brand-mint/35 bg-brand-bg px-2 text-xs font-bold text-brand-sage"
          >
            {count}
          </span>
        </div>
      )}
    </aside>
  );
}

export function AdminDashboardClient({
  initialBundle,
  username,
  adminBasePath,
}: {
  initialBundle: AdminBundle;
  username: string;
  adminBasePath: string;
}) {
  const router = useRouter();
  const [bundle, setBundle] = useState<AdminBundle>(initialBundle);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Collapsible Sidebar States
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true);
  const [menuFormOpen, setMenuFormOpen] = useState(true);
  const [catFormOpen, setCatFormOpen] = useState(true);
  const [galleryFormOpen, setGalleryFormOpen] = useState(true);

  const [toast, setToast] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [busy, setBusy] = useState(false);

  // Filter & Pagination States
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCatFilter, setMenuCatFilter] = useState('all');
  const [menuStatusFilter, setMenuStatusFilter] = useState<
    'all' | 'published' | 'draft'
  >('all');
  const [menuPage, setMenuPage] = useState(1);
  const [menuPageSize, setMenuPageSize] = useState(6);

  const [catPage, setCatPage] = useState(1);
  const [catPageSize, setCatPageSize] = useState(6);

  const [galleryCatFilter, setGalleryCatFilter] = useState('all');
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryPageSize, setGalleryPageSize] = useState(6);

  const [resStatusFilter, setResStatusFilter] = useState('all');
  const [resPage, setResPage] = useState(1);
  const [resPageSize, setResPageSize] = useState(6);

  // Derived Pending Counts for Action Badges
  const pendingReviewsCount = useMemo(
    () => (bundle.reviews ?? []).filter((r) => !r.approved).length,
    [bundle.reviews]
  );
  const pendingReservationsCount = useMemo(
    () => bundle.reservations.filter((r) => r.status === 'Pending').length,
    [bundle.reservations]
  );

  // Filtered & Paginated Lists
  const filteredMenuItems = useMemo(() => {
    const q = menuSearch.trim().toLowerCase();
    return bundle.items.filter((item) => {
      const matchCat =
        menuCatFilter === 'all' || item.categoryId === menuCatFilter;
      const matchStatus =
        menuStatusFilter === 'all' ||
        (menuStatusFilter === 'published' ? item.published : !item.published);
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [bundle.items, menuSearch, menuCatFilter, menuStatusFilter]);

  const paginatedMenuItems = useMemo(() => {
    const start = (menuPage - 1) * menuPageSize;
    return filteredMenuItems.slice(start, start + menuPageSize);
  }, [filteredMenuItems, menuPage, menuPageSize]);

  const paginatedCategories = useMemo(() => {
    const start = (catPage - 1) * catPageSize;
    return bundle.categories.slice(start, start + catPageSize);
  }, [bundle.categories, catPage, catPageSize]);

  const filteredGallery = useMemo(() => {
    if (galleryCatFilter === 'all') return bundle.gallery;
    return bundle.gallery.filter((g) => g.category === galleryCatFilter);
  }, [bundle.gallery, galleryCatFilter]);

  const paginatedGallery = useMemo(() => {
    const start = (galleryPage - 1) * galleryPageSize;
    return filteredGallery.slice(start, start + galleryPageSize);
  }, [filteredGallery, galleryPage, galleryPageSize]);

  const filteredReservations = useMemo(() => {
    if (resStatusFilter === 'all') return bundle.reservations;
    return bundle.reservations.filter((r) => r.status === resStatusFilter);
  }, [bundle.reservations, resStatusFilter]);

  const paginatedReservations = useMemo(() => {
    const start = (resPage - 1) * resPageSize;
    return filteredReservations.slice(start, start + resPageSize);
  }, [filteredReservations, resPage, resPageSize]);

  // Menu Item Form State (uses string[] for dietary tags!)
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    categoryId: initialBundle.categories[0]?.id ?? '',
    price: '12.00',
    description: '',
    imageUrl: '',
    tags: ['Signature'] as string[],
    pairingNote: '',
    featured: false,
    published: true,
    sortOrder: 0,
  });

  // Category Form State
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    scriptLabel: '',
    description: '',
    sortOrder: 0,
    published: true,
  });

  // Gallery Form State
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    caption: '',
    category: 'atmosphere',
    imageUrl: '',
    aspect: 'square',
    sortOrder: 0,
    published: true,
  });

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const notify = (message: string, isError = false) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, isError });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const mutateCms = async (payload: {
    entity:
      | 'category'
      | 'menuItem'
      | 'gallery'
      | 'settings'
      | 'hero'
      | 'page'
      | 'reservation'
      | 'blog'
      | 'faq'
      | 'review';
    action:
      | 'create'
      | 'update'
      | 'delete'
      | 'togglePublish'
      | 'approveReview';
    id?: string;
    data?: Record<string, unknown>;
  }) => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        bundle?: AdminBundle;
      };
      if (!res.ok || !json.bundle) {
        notify(
          json.error || 'Could not save your changes. Please try again.',
          true
        );
        return false;
      }
      setBundle(json.bundle);
      notify('Your changes are saved and live on the website!');
      return true;
    } catch {
      notify('Could not reach the server. Please check your connection.', true);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push(`${adminBasePath}/login`);
    router.refresh();
  };

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleMenuTag = (tag: string) => {
    setItemForm((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists
          ? prev.tags.filter((t) => t !== tag)
          : [...prev.tags, tag],
      };
    });
  };

  // --- SAVE HANDLERS ---

  const saveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await mutateCms({
      entity: 'menuItem',
      action: editingItemId ? 'update' : 'create',
      id: editingItemId ?? undefined,
      data: {
        ...itemForm,
        price: parseFloat(itemForm.price) || 0,
      },
    });
    if (ok) {
      setEditingItemId(null);
      setItemForm({
        name: '',
        categoryId: bundle.categories[0]?.id ?? '',
        price: '12.00',
        description: '',
        imageUrl: '',
        tags: ['Signature'],
        pairingNote: '',
        featured: false,
        published: true,
        sortOrder: 0,
      });
    }
  };

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await mutateCms({
      entity: 'category',
      action: editingCatId ? 'update' : 'create',
      id: editingCatId ?? undefined,
      data: catForm,
    });
    if (ok) {
      setEditingCatId(null);
      setCatForm({
        name: '',
        slug: '',
        scriptLabel: '',
        description: '',
        sortOrder: 0,
        published: true,
      });
    }
  };

  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await mutateCms({
      entity: 'gallery',
      action: editingGalleryId ? 'update' : 'create',
      id: editingGalleryId ?? undefined,
      data: galleryForm,
    });
    if (ok) {
      setEditingGalleryId(null);
      setGalleryForm({
        title: '',
        caption: '',
        category: 'atmosphere',
        imageUrl: '',
        aspect: 'square',
        sortOrder: 0,
        published: true,
      });
    }
  };

  const activeNavMeta =
    allNavItems.find((item) => item.key === activeTab) ?? allNavItems[0];

  const renderSidebarContent = (isCollapsed = false) => (
    <div
      className={cn(
        'flex h-full flex-col justify-between transition-all duration-300',
        isCollapsed ? 'p-3' : 'p-5'
      )}
    >
      <div className="space-y-6">
        {/* Workspace Brand Strip */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-3 border-b border-brand-mint/30 pb-4">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-brand-mint/45 bg-white p-0.5 shadow-sm">
              <img
                src={bundle.settings?.logoUrl || '/images/logo.png'}
                alt="Classico Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setMainSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/70 text-brand-dark transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
              title="Expand Navigation Sidebar"
              aria-label="Expand Navigation Sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-brand-mint/30 pb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-brand-mint/45 bg-white p-0.5 shadow-sm">
                <img
                  src={bundle.settings?.logoUrl || '/images/logo.png'}
                  alt="Classico Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight min-w-0">
                <p className="font-heading text-base font-semibold text-brand-dark truncate">
                  Classico Manager
                </p>
                <p className="text-[11px] font-medium text-brand-sage truncate">
                  Signed in as {username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setMainSidebarOpen(false)}
                className="hidden lg:inline-flex items-center justify-center rounded-lg border border-brand-mint/40 bg-brand-bg/60 p-1.5 text-brand-dark/70 transition-colors hover:border-brand-teal hover:text-brand-teal"
                title="Minimize to Icon Rail"
                aria-label="Minimize to Icon Rail"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-brand-dark/60 hover:bg-brand-bg lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Grouped Navigation */}
        <nav
          className={cn(isCollapsed ? 'space-y-2' : 'space-y-5')}
          aria-label="Manager Navigation"
        >
          {navGroups.map((group, gIdx) => (
            <div key={group.groupLabel} className="space-y-1.5">
              {isCollapsed ? (
                gIdx > 0 && <div className="my-2 border-t border-brand-mint/25" />
              ) : (
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-brand-sage/85">
                  {group.groupLabel}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;

                  const badgeCount =
                    item.key === 'reviews'
                      ? pendingReviewsCount
                      : item.key === 'reservations'
                      ? pendingReservationsCount
                      : 0;

                  if (isCollapsed) {
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => switchTab(item.key)}
                        title={item.label}
                        aria-label={item.label}
                        className={cn(
                          'relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl transition-all',
                          isActive
                            ? 'bg-brand-sage text-white shadow-soft'
                            : 'text-brand-dark/80 hover:bg-brand-bg hover:text-brand-teal'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-5 w-5',
                            isActive ? 'text-white' : 'text-brand-sage'
                          )}
                        />
                        {badgeCount > 0 && (
                          <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-brand-dark ring-2 ring-white">
                            {badgeCount}
                          </span>
                        )}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => switchTab(item.key)}
                      className={cn(
                        'flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all',
                        isActive
                          ? 'bg-brand-sage text-white shadow-soft'
                          : 'text-brand-dark/80 hover:bg-brand-bg hover:text-brand-teal'
                      )}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            'h-4 w-4 shrink-0',
                            isActive ? 'text-white' : 'text-brand-sage'
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </span>

                      {badgeCount > 0 && (
                        <span
                          className={cn(
                            'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-bold',
                            isActive
                              ? 'bg-amber-400 text-brand-dark'
                              : 'bg-amber-100 text-amber-800'
                          )}
                        >
                          {badgeCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Help / Sign Out */}
      <div className="mt-8 space-y-2 border-t border-brand-mint/30 pt-4">
        {isCollapsed ? (
          <>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              title="View Live Website"
              aria-label="View Live Website"
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/50 text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign Out"
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-between rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3.5 py-2.5 text-xs font-semibold text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-brand-bg flex">
      {/* Persistent Desktop Left Sidebar / Mini-Rail */}
      <aside
        className={cn(
          'hidden lg:block lg:shrink-0 border-r border-brand-mint/35 bg-white transition-all duration-300 ease-in-out',
          mainSidebarOpen ? 'lg:w-72' : 'lg:w-[76px]'
        )}
      >
        <div className="h-screen overflow-y-auto overflow-x-hidden">
          {renderSidebarContent(!mainSidebarOpen)}
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm"
          />
          <aside className="relative z-10 h-full w-72 max-w-[85vw] overflow-y-auto bg-white shadow-elevated">
            {renderSidebarContent(false)}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-hidden">
        {/* Top Action Bar */}
        <header className="sticky top-0 z-30 shrink-0 border-b border-brand-mint/35 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg text-brand-dark hover:border-brand-teal lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <h1 className="font-heading text-xl sm:text-2xl font-semibold text-brand-dark truncate">
                  {activeNavMeta.label}
                </h1>
                <p className="text-xs text-brand-dark/65 truncate">
                  {activeNavMeta.guide}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-mint/50 bg-white px-4 py-2 text-xs font-semibold text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
              >
                <span>View Live Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Tab Workspace */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:overflow-y-auto">
          {/* 1. DASHBOARD HOME (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome & Quick Actions Card */}
              <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Welcome to Your Restaurant Workspace</span>
                    </div>
                    <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-semibold text-brand-dark">
                      Hello, {username} — What would you like to update today?
                    </h2>
                    <p className="mt-2 text-sm text-brand-dark/70 leading-relaxed">
                      Every change you save here updates your live restaurant
                      website right away. Use the shortcuts below or pick any
                      section on the left.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => switchTab('menu')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-teal px-4 py-3 text-xs font-semibold text-white shadow-soft transition-colors hover:bg-brand-teal-dark"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add a Dish or Drink</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab('reviews')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-mint/55 bg-brand-bg/60 px-4 py-3 text-xs font-semibold text-brand-dark transition-colors hover:border-brand-teal hover:bg-white"
                    >
                      <MessageSquare className="h-4 w-4 text-brand-teal" />
                      <span>
                        Approve Guest Reviews
                        {pendingReviewsCount > 0
                          ? ` (${pendingReviewsCount})`
                          : ''}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab('reservations')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-mint/55 bg-brand-bg/60 px-4 py-3 text-xs font-semibold text-brand-dark transition-colors hover:border-brand-teal hover:bg-white"
                    >
                      <CalendarCheck className="h-4 w-4 text-brand-sage" />
                      <span>View Table Bookings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab('settings')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-mint/55 bg-brand-bg/60 px-4 py-3 text-xs font-semibold text-brand-dark transition-colors hover:border-brand-teal hover:bg-white"
                    >
                      <Clock className="h-4 w-4 text-brand-sage" />
                      <span>Update Opening Hours</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Required Banner */}
              {(pendingReviewsCount > 0 || pendingReservationsCount > 0) && (
                <div className="rounded-3xl border border-amber-300 bg-amber-50 p-5 shadow-sm">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-amber-950">
                          Action Needed Today
                        </h3>
                        <p className="mt-0.5 text-xs text-amber-900">
                          {pendingReviewsCount > 0 &&
                            `${pendingReviewsCount} guest review${
                              pendingReviewsCount > 1 ? 's are' : ' is'
                            } waiting for your approval. `}
                          {pendingReservationsCount > 0 &&
                            `${pendingReservationsCount} table booking${
                              pendingReservationsCount > 1 ? 's are' : ' is'
                            } marked as Pending.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pendingReviewsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => switchTab('reviews')}
                          className="rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-700"
                        >
                          Check Reviews ({pendingReviewsCount})
                        </button>
                      )}
                      {pendingReservationsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => switchTab('reservations')}
                          className="rounded-xl border border-amber-400 bg-white px-3.5 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                        >
                          Check Bookings ({pendingReservationsCount})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: 'Dishes & Drinks',
                    total: bundle.items.length,
                    detail: `${
                      bundle.items.filter((i) => i.published).length
                    } visible on menu`,
                    tab: 'menu' as TabKey,
                    Icon: UtensilsCrossed,
                  },
                  {
                    title: 'Menu Sections',
                    total: bundle.categories.length,
                    detail: `${
                      bundle.categories.filter((c) => c.published).length
                    } active sections`,
                    tab: 'categories' as TabKey,
                    Icon: FolderKanban,
                  },
                  {
                    title: 'Table Bookings',
                    total: bundle.reservations.length,
                    detail: `${
                      bundle.reservations.filter(
                        (r) => r.status === 'Confirmed'
                      ).length
                    } confirmed`,
                    tab: 'reservations' as TabKey,
                    Icon: CalendarCheck,
                  },
                  {
                    title: 'Guest Reviews',
                    total: bundle.reviews?.length ?? 0,
                    detail:
                      pendingReviewsCount > 0
                        ? `${pendingReviewsCount} waiting approval`
                        : `${
                            bundle.reviews?.filter(
                              (r) => r.approved && r.published
                            ).length ?? 0
                          } live on site`,
                    tab: 'reviews' as TabKey,
                    Icon: MessageSquare,
                  },
                  {
                    title: 'Gallery Photos',
                    total: bundle.gallery.length,
                    detail: `${
                      bundle.gallery.filter((g) => g.published).length
                    } shown in gallery`,
                    tab: 'gallery' as TabKey,
                    Icon: ImageIcon,
                  },
                  {
                    title: 'Blog & Articles',
                    total: bundle.blogPosts?.length ?? 0,
                    detail: `${
                      bundle.blogPosts?.filter((b) => b.published).length ?? 0
                    } published stories`,
                    tab: 'blog' as TabKey,
                    Icon: BookOpen,
                  },
                  {
                    title: 'Common Questions',
                    total: bundle.faqItems?.length ?? 0,
                    detail: `${
                      bundle.faqItems?.filter((f) => f.published).length ?? 0
                    } answered on FAQ`,
                    tab: 'faq' as TabKey,
                    Icon: HelpCircle,
                  },
                  {
                    title: 'Website Pages',
                    total: bundle.pages.length,
                    detail: 'About, Menu, Contact & more',
                    tab: 'pages' as TabKey,
                    Icon: FileText,
                  },
                ].map((stat) => {
                  const Icon = stat.Icon;
                  return (
                    <button
                      key={stat.title}
                      type="button"
                      onClick={() => switchTab(stat.tab)}
                      className="group rounded-2xl border border-brand-mint/40 bg-white p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-teal"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
                          {stat.title}
                        </p>
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-bg text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="mt-2 font-heading text-4xl font-semibold text-brand-dark">
                        {stat.total}
                      </p>
                      <p className="mt-1 text-xs font-medium text-brand-teal">
                        {stat.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. DISHES & DRINKS (MENU ITEMS) */}
          {activeTab === 'menu' && (
            <div className="flex flex-col gap-6 lg:h-[calc(100vh-7.5rem)] lg:flex-row lg:items-start lg:overflow-hidden">
              <FormRailContainer
                isOpen={menuFormOpen}
                onExpand={() => setMenuFormOpen(true)}
                onQuickCreate={() => {
                  setEditingItemId(null);
                  setItemForm({
                    name: '',
                    categoryId: bundle.categories[0]?.id ?? '',
                    price: '12.00',
                    description: '',
                    imageUrl: '',
                    tags: ['Signature'],
                    pairingNote: '',
                    featured: false,
                    published: true,
                    sortOrder: 0,
                  });
                  setMenuFormOpen(true);
                }}
                quickAddTitle="Add New Dish or Drink"
                verticalLabel={
                  editingItemId ? 'Editing Dish' : 'Add or Edit Dish'
                }
                count={bundle.items.length}
              >
                <form onSubmit={saveMenuItem} className="space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-brand-mint/25 pb-3">
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-brand-dark">
                        {editingItemId
                          ? 'Edit Dish or Drink'
                          : 'Add a New Dish or Drink'}
                      </h2>
                      <p className="text-xs text-brand-dark/60">
                        Fill in the dish details below and click save to add it to your menu.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMenuFormOpen(false)}
                      title="Minimize Form to Rail"
                      aria-label="Minimize Dish Form"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/60 text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
                    >
                      <PanelLeftClose className="h-4 w-4" />
                    </button>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Dish or Drink Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={itemForm.name}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, name: e.target.value })
                    }
                    placeholder="e.g. Pistachio Sage Latte"
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark">
                      Menu Section *
                    </label>
                    <select
                      value={itemForm.categoryId}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, categoryId: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                    >
                      {bundle.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark">
                      Price ($) *
                    </label>
                    <input
                      required
                      type="number"
                      step="0.25"
                      value={itemForm.price}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, price: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Short Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={itemForm.description}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, description: e.target.value })
                    }
                    placeholder="Describe the ingredients, flavors, and how it is prepared..."
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <CloudinaryImageInput
                  label="Dish or Drink Photo"
                  value={itemForm.imageUrl}
                  onChange={(url) =>
                    setItemForm({ ...itemForm, imageUrl: url })
                  }
                />

                {/* Clickable Dietary & Highlight Tags */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Dietary &amp; Special Badges
                  </label>
                  <p className="text-xs text-brand-dark/55 mb-2">
                    Tap to turn badges on or off for this item:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dietaryTagPresets.map((tag) => {
                      const active = itemForm.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleMenuTag(tag)}
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                            active
                              ? 'border-brand-teal bg-brand-teal text-white shadow-sm'
                              : 'border-brand-mint/50 bg-brand-bg/50 text-brand-dark/75 hover:border-brand-teal'
                          )}
                        >
                          {active && <Check className="h-3 w-3" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Drink or Side Pairing Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={itemForm.pairingNote}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, pairingNote: e.target.value })
                    }
                    placeholder="e.g. Pairs wonderfully with warm focaccia"
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-5 rounded-2xl border border-brand-mint/35 bg-brand-bg/40 p-3.5 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itemForm.featured}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, featured: e.target.checked })
                      }
                      className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                    />
                    <span className="font-medium text-brand-dark">
                      Feature on Homepage
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itemForm.published}
                      onChange={(e) =>
                        setItemForm({
                          ...itemForm,
                          published: e.target.checked,
                        })
                      }
                      className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                    />
                    <span className="font-medium text-brand-dark">
                      Show on Live Menu
                    </span>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={busy}
                    leftIcon={
                      editingItemId ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )
                    }
                  >
                    {editingItemId ? 'Save Changes' : 'Add to Menu'}
                  </Button>
                  {editingItemId && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setEditingItemId(null);
                        setItemForm({
                          name: '',
                          categoryId: bundle.categories[0]?.id ?? '',
                          price: '12.00',
                          description: '',
                          imageUrl: '',
                          tags: ['Signature'],
                          pairingNote: '',
                          featured: false,
                          published: true,
                          sortOrder: 0,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
              </FormRailContainer>

              <div className="min-w-0 flex-1 space-y-3 lg:h-full lg:overflow-y-auto lg:pr-1">
                {/* Filter & Search Toolbar */}
                <div className="flex flex-col gap-2.5 rounded-2xl border border-brand-mint/40 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-sage" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => {
                        setMenuSearch(e.target.value);
                        setMenuPage(1);
                      }}
                      placeholder="Search dishes or ingredients..."
                      className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 py-2 pl-9 pr-3 text-xs text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                  <select
                    value={menuCatFilter}
                    onChange={(e) => {
                      setMenuCatFilter(e.target.value);
                      setMenuPage(1);
                    }}
                    className="rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3 py-2 text-xs font-medium text-brand-dark focus:border-brand-teal focus:outline-none"
                  >
                    <option value="all">All Menu Sections</option>
                    {bundle.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={menuStatusFilter}
                    onChange={(e) => {
                      setMenuStatusFilter(
                        e.target.value as 'all' | 'published' | 'draft'
                      );
                      setMenuPage(1);
                    }}
                    className="rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3 py-2 text-xs font-medium text-brand-dark focus:border-brand-teal focus:outline-none"
                  >
                    <option value="all">All Visibility</option>
                    <option value="published">Visible on Site</option>
                    <option value="draft">Hidden Drafts</option>
                  </select>
                </div>

                {paginatedMenuItems.length === 0 ? (
                  <div className="rounded-2xl border border-brand-mint/40 bg-white p-8 text-center text-sm text-brand-dark/70">
                    No dishes or drinks match your filter.
                  </div>
                ) : (
                  paginatedMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'flex flex-col justify-between gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center transition-all',
                        item.published
                          ? 'border-brand-mint/40'
                          : 'border-amber-300/70 bg-amber-50/20'
                      )}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={item.imageUrl || '/images/hero-latte.png'}
                          alt={item.name}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover bg-brand-bg border border-brand-mint/30"
                        />
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-heading text-lg font-semibold text-brand-dark truncate">
                              {item.name}
                            </h3>
                            <span className="rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-semibold text-brand-teal">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-xs text-brand-sage">
                            {item.categoryName}
                            {item.featured ? ' • Featured on Homepage' : ''}
                          </p>
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-brand-mint-light/35 px-2 py-0.5 text-[10px] font-medium text-brand-dark/80"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() =>
                            void mutateCms({
                              entity: 'menuItem',
                              action: 'togglePublish',
                              id: item.id,
                              data: { published: !item.published },
                            })
                          }
                          title={
                            item.published
                              ? 'Click to hide from live menu'
                              : 'Click to show on live menu'
                          }
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                            item.published
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          )}
                        >
                          {item.published ? (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              Visible
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              Hidden
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setMenuFormOpen(true);
                            setEditingItemId(item.id);
                            setItemForm({
                              name: item.name,
                              categoryId: item.categoryId,
                              price: item.price.toString(),
                              description: item.description,
                              imageUrl: item.imageUrl,
                              tags: item.tags,
                              pairingNote: item.pairingNote ?? '',
                              featured: item.featured,
                              published: item.published,
                              sortOrder: item.sortOrder,
                            });
                          }}
                          className="rounded-full border border-brand-mint/45 p-2 text-brand-dark hover:border-brand-teal hover:text-brand-teal"
                          aria-label="Edit dish"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to remove "${item.name}" from the menu?`
                              )
                            ) {
                              void mutateCms({
                                entity: 'menuItem',
                                action: 'delete',
                                id: item.id,
                              });
                            }
                          }}
                          className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          aria-label="Delete dish"
                          title="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                <PaginationControls
                  totalItems={filteredMenuItems.length}
                  currentPage={menuPage}
                  pageSize={menuPageSize}
                  onPageChange={setMenuPage}
                  onPageSizeChange={setMenuPageSize}
                />
              </div>
            </div>
          )}

          {/* 3. MENU SECTIONS (CATEGORIES) */}
          {activeTab === 'categories' && (
            <div className="flex flex-col gap-6 lg:h-[calc(100vh-7.5rem)] lg:flex-row lg:items-start lg:overflow-hidden">
              <FormRailContainer
                isOpen={catFormOpen}
                onExpand={() => setCatFormOpen(true)}
                onQuickCreate={() => {
                  setEditingCatId(null);
                  setCatForm({
                    name: '',
                    slug: '',
                    scriptLabel: '',
                    description: '',
                    sortOrder: 0,
                    published: true,
                  });
                  setCatFormOpen(true);
                }}
                quickAddTitle="Create New Menu Section"
                verticalLabel={
                  editingCatId ? 'Editing Section' : 'Create Menu Section'
                }
                count={bundle.categories.length}
              >
                <form onSubmit={saveCategory} className="space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-brand-mint/25 pb-3">
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-brand-dark">
                        {editingCatId
                          ? 'Edit Menu Section'
                          : 'Create a Menu Section'}
                      </h2>
                      <p className="text-xs text-brand-dark/60">
                        Sections organize your menu into clear tabs for your guests.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCatFormOpen(false)}
                      title="Minimize Form to Rail"
                      aria-label="Minimize Section Form"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/60 text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
                    >
                      <PanelLeftClose className="h-4 w-4" />
                    </button>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Section Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={catForm.name}
                    onChange={(e) =>
                      setCatForm({ ...catForm, name: e.target.value })
                    }
                    placeholder="e.g. Weekend Brunch"
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-brand-dark/55">
                    The website link will be created automatically from this name.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Small Cursive Subtitle
                  </label>
                  <input
                    type="text"
                    value={catForm.scriptLabel}
                    onChange={(e) =>
                      setCatForm({ ...catForm, scriptLabel: e.target.value })
                    }
                    placeholder="e.g. Slow Mornings & Fresh Pastries"
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Section Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={catForm.description}
                    onChange={(e) =>
                      setCatForm({ ...catForm, description: e.target.value })
                    }
                    placeholder="A short welcoming note shown above dishes in this section..."
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-mint/35 bg-brand-bg/40 p-3.5">
                  <div className="w-32">
                    <label className="block text-xs font-medium text-brand-dark">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={catForm.sortOrder}
                      onChange={(e) =>
                        setCatForm({
                          ...catForm,
                          sortOrder: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-brand-mint/45 bg-white px-3 py-1.5 text-sm"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-dark cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={catForm.published}
                      onChange={(e) =>
                        setCatForm({ ...catForm, published: e.target.checked })
                      }
                      className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                    />
                    <span>Visible on Website</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={busy}
                    leftIcon={
                      editingCatId ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )
                    }
                  >
                    {editingCatId ? 'Save Section' : 'Create Section'}
                  </Button>
                  {editingCatId && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setEditingCatId(null);
                        setCatForm({
                          name: '',
                          slug: '',
                          scriptLabel: '',
                          description: '',
                          sortOrder: 0,
                          published: true,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
              </FormRailContainer>

              <div className="min-w-0 flex-1 space-y-3 lg:h-full lg:overflow-y-auto lg:pr-1">
                {paginatedCategories.map((cat) => {
                  const dishCount = bundle.items.filter(
                    (i) => i.categoryId === cat.id
                  ).length;

                  return (
                    <div
                      key={cat.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-brand-mint/40 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-brand-dark">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-brand-sage">
                          {dishCount} dish{dishCount === 1 ? '' : 'es'} • Position #
                          {cat.sortOrder}
                        </p>
                        {cat.description && (
                          <p className="mt-1 text-xs text-brand-dark/65 line-clamp-1">
                            {cat.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() =>
                            void mutateCms({
                              entity: 'category',
                              action: 'togglePublish',
                              id: cat.id,
                              data: { published: !cat.published },
                            })
                          }
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                            cat.published
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          )}
                        >
                          {cat.published ? (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              Visible
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              Hidden
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCatFormOpen(true);
                            setEditingCatId(cat.id);
                            setCatForm({
                              name: cat.name,
                              slug: cat.slug,
                              scriptLabel: cat.scriptLabel,
                              description: cat.description,
                              sortOrder: cat.sortOrder,
                              published: cat.published,
                            });
                          }}
                          className="rounded-full border border-brand-mint/45 p-2 text-brand-dark hover:border-brand-teal hover:text-brand-teal"
                          title="Edit section"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const warning =
                              dishCount > 0
                                ? `Warning: Deleting "${cat.name}" will also remove ${dishCount} dish(es) inside it. Continue?`
                                : `Are you sure you want to delete the "${cat.name}" section?`;
                            if (confirm(warning)) {
                              void mutateCms({
                                entity: 'category',
                                action: 'delete',
                                id: cat.id,
                              });
                            }
                          }}
                          className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          title="Remove section"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <PaginationControls
                  totalItems={bundle.categories.length}
                  currentPage={catPage}
                  pageSize={catPageSize}
                  onPageChange={setCatPage}
                  onPageSizeChange={setCatPageSize}
                />
              </div>
            </div>
          )}

          {/* 4. PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-6 lg:h-[calc(100vh-7.5rem)] lg:flex-row lg:items-start lg:overflow-hidden">
              <FormRailContainer
                isOpen={galleryFormOpen}
                onExpand={() => setGalleryFormOpen(true)}
                onQuickCreate={() => {
                  setEditingGalleryId(null);
                  setGalleryForm({
                    title: '',
                    caption: '',
                    category: 'atmosphere',
                    imageUrl: '',
                    aspect: 'square',
                    sortOrder: 0,
                    published: true,
                  });
                  setGalleryFormOpen(true);
                }}
                quickAddTitle="Add Photo to Gallery"
                verticalLabel={
                  editingGalleryId ? 'Editing Photo' : 'Add Gallery Photo'
                }
                count={bundle.gallery.length}
              >
                <form onSubmit={saveGallery} className="space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-brand-mint/25 pb-3">
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-brand-dark">
                        {editingGalleryId
                          ? 'Edit Gallery Photo'
                          : 'Add Photo to Gallery'}
                      </h2>
                      <p className="text-xs text-brand-dark/60">
                        Share your dining room, latte art, and wood-fired kitchen moments.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGalleryFormOpen(false)}
                      title="Minimize Form to Rail"
                      aria-label="Minimize Gallery Form"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/60 text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
                    >
                      <PanelLeftClose className="h-4 w-4" />
                    </button>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Photo Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, title: e.target.value })
                    }
                    placeholder="e.g. Sunlit Conservatory Morning"
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark">
                    Short Caption *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={galleryForm.caption}
                    onChange={(e) =>
                      setGalleryForm({
                        ...galleryForm,
                        caption: e.target.value,
                      })
                    }
                    placeholder="A short note describing this photo..."
                    className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark">
                      Photo Album
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          category: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                    >
                      <option value="atmosphere">Atmosphere &amp; Interior</option>
                      <option value="brews">Coffee &amp; Brews</option>
                      <option value="grill">Wood-Fired Grill</option>
                      <option value="desserts">Desserts &amp; Drinks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark">
                      Frame Shape
                    </label>
                    <select
                      value={galleryForm.aspect}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          aspect: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3 py-2.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                    >
                      <option value="square">Square</option>
                      <option value="landscape">Wide (Landscape)</option>
                      <option value="portrait">Tall (Portrait)</option>
                    </select>
                  </div>
                </div>

                <CloudinaryImageInput
                  label="Choose Photo"
                  value={galleryForm.imageUrl}
                  onChange={(url) =>
                    setGalleryForm({ ...galleryForm, imageUrl: url })
                  }
                />

                <label className="flex items-center gap-2 rounded-2xl border border-brand-mint/35 bg-brand-bg/40 p-3.5 text-sm font-medium text-brand-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={galleryForm.published}
                    onChange={(e) =>
                      setGalleryForm({
                        ...galleryForm,
                        published: e.target.checked,
                      })
                    }
                    className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                  />
                  <span>Visible on Public Gallery</span>
                </label>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={busy}
                    leftIcon={
                      editingGalleryId ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )
                    }
                  >
                    {editingGalleryId ? 'Save Photo' : 'Add Photo'}
                  </Button>
                  {editingGalleryId && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setEditingGalleryId(null);
                        setGalleryForm({
                          title: '',
                          caption: '',
                          category: 'atmosphere',
                          imageUrl: '',
                          aspect: 'square',
                          sortOrder: 0,
                          published: true,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
              </FormRailContainer>

              <div className="min-w-0 flex-1 space-y-4 lg:h-full lg:overflow-y-auto lg:pr-1">
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-brand-mint/40 bg-white p-3.5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
                    Filter by Album
                  </span>
                  <select
                    value={galleryCatFilter}
                    onChange={(e) => {
                      setGalleryCatFilter(e.target.value);
                      setGalleryPage(1);
                    }}
                    className="rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3 py-1.5 text-xs font-medium text-brand-dark focus:border-brand-teal focus:outline-none"
                  >
                    <option value="all">All Albums</option>
                    <option value="atmosphere">Atmosphere &amp; Interior</option>
                    <option value="brews">Coffee &amp; Brews</option>
                    <option value="grill">Wood-Fired Grill</option>
                    <option value="desserts">Desserts &amp; Drinks</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {paginatedGallery.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-brand-mint/40 bg-white shadow-sm"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-44 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-heading text-lg font-semibold text-brand-dark">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-brand-dark/70 line-clamp-2">
                          {item.caption}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() =>
                              void mutateCms({
                                entity: 'gallery',
                                action: 'togglePublish',
                                id: item.id,
                                data: { published: !item.published },
                              })
                            }
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
                              item.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            )}
                          >
                            {item.published ? (
                              <>
                                <Eye className="h-3 w-3" />
                                Visible
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3" />
                                Hidden
                              </>
                            )}
                          </button>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setGalleryFormOpen(true);
                                setEditingGalleryId(item.id);
                                setGalleryForm({
                                  title: item.title,
                                  caption: item.caption,
                                  category: item.category,
                                  imageUrl: item.imageUrl,
                                  aspect: item.aspect,
                                  sortOrder: item.sortOrder,
                                  published: item.published,
                                });
                              }}
                              className="rounded-full border border-brand-mint/45 p-1.5 hover:border-brand-teal hover:text-brand-teal"
                              title="Edit photo"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Remove photo "${item.title}" from the gallery?`
                                  )
                                ) {
                                  void mutateCms({
                                    entity: 'gallery',
                                    action: 'delete',
                                    id: item.id,
                                  });
                                }
                              }}
                              className="rounded-full border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                              title="Remove photo"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <PaginationControls
                  totalItems={filteredGallery.length}
                  currentPage={galleryPage}
                  pageSize={galleryPageSize}
                  onPageChange={setGalleryPage}
                  onPageSizeChange={setGalleryPageSize}
                />
              </div>
            </div>
          )}

          {/* 5. HOMEPAGE BANNER (VISUAL ZERO-JSON) */}
          {activeTab === 'hero' && (
            <HeroHomeTab
              hero={bundle.hero}
              busy={busy}
              onSave={async (updatedHero) => {
                await mutateCms({
                  entity: 'hero',
                  action: 'update',
                  id: updatedHero.id,
                  data: updatedHero as unknown as Record<string, unknown>,
                });
              }}
            />
          )}

          {/* 6. PAGE CONTENT (VISUAL ZERO-JSON) */}
          {activeTab === 'pages' && (
            <PagesVisualTab
              pages={bundle.pages}
              busy={busy}
              onSavePage={async (pageId, payload) => {
                await mutateCms({
                  entity: 'page',
                  action: 'update',
                  id: pageId,
                  data: payload,
                });
              }}
            />
          )}

          {/* 7. RESTAURANT INFO & HOURS (VISUAL ZERO-JSON) */}
          {activeTab === 'settings' && (
            <SettingsVisualTab
              settings={bundle.settings}
              busy={busy}
              onSave={async (updatedSettings) => {
                await mutateCms({
                  entity: 'settings',
                  action: 'update',
                  id: updatedSettings.id,
                  data: updatedSettings as unknown as Record<string, unknown>,
                });
              }}
            />
          )}

          {/* 8. TABLE BOOKINGS (RESERVATIONS) */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-mint/40 bg-white p-4 shadow-sm">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-brand-dark">
                    Guest Table Bookings ({filteredReservations.length})
                  </h2>
                  <p className="text-xs text-brand-dark/60">
                    Click a guest&apos;s phone number or email to contact them directly.
                  </p>
                </div>

                <select
                  value={resStatusFilter}
                  onChange={(e) => {
                    setResStatusFilter(e.target.value);
                    setResPage(1);
                  }}
                  className="rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3.5 py-2 text-xs font-medium text-brand-dark focus:border-brand-teal focus:outline-none"
                >
                  <option value="all">All Bookings</option>
                  <option value="Confirmed">Confirmed Only</option>
                  <option value="Pending">Pending Only</option>
                  <option value="Cancelled">Cancelled Only</option>
                </select>
              </div>

              {paginatedReservations.length === 0 ? (
                <div className="rounded-3xl border border-brand-mint/40 bg-white p-12 text-center text-sm text-brand-dark/70">
                  No table bookings match this filter right now.
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedReservations.map((res) => (
                    <div
                      key={res.id}
                      className={cn(
                        'flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm lg:flex-row lg:items-center',
                        res.status === 'Pending'
                          ? 'border-amber-300 bg-amber-50/25'
                          : res.status === 'Cancelled'
                          ? 'border-red-200/70 bg-red-50/15'
                          : 'border-brand-mint/40'
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-brand-teal/12 px-2.5 py-0.5 text-xs font-semibold text-brand-teal">
                            #{res.referenceCode}
                          </span>
                          <h3 className="font-heading text-xl font-semibold text-brand-dark">
                            {res.fullName}
                          </h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-semibold text-brand-sage">
                            <Users className="h-3 w-3" />
                            {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-brand-dark/80">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-brand-teal" />
                            {res.date} at {res.timeSlot}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-brand-sage" />
                            {res.seatingZone}
                          </span>
                          <span className="inline-flex items-center gap-1 text-brand-sage">
                            <Sparkles className="h-3.5 w-3.5" />
                            {res.occasion}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-dark/70">
                          <a
                            href={`tel:${res.phone}`}
                            className="inline-flex items-center gap-1 font-medium text-brand-teal hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {res.phone}
                          </a>
                          <a
                            href={`mailto:${res.email}`}
                            className="inline-flex items-center gap-1 font-medium text-brand-teal hover:underline"
                          >
                            <Mail className="h-3 w-3" />
                            {res.email}
                          </a>
                        </div>

                        {res.notes && (
                          <p className="rounded-xl bg-brand-bg/70 px-3 py-2 text-xs italic text-brand-dark/80">
                            Guest Note: &ldquo;{res.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end lg:self-center">
                        <select
                          value={res.status}
                          onChange={(e) =>
                            void mutateCms({
                              entity: 'reservation',
                              action: 'update',
                              id: res.id,
                              data: { status: e.target.value },
                            })
                          }
                          aria-label="Booking Status"
                          className={cn(
                            'rounded-full border px-3.5 py-2 text-xs font-semibold focus:outline-none',
                            res.status === 'Confirmed'
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                              : res.status === 'Pending'
                              ? 'border-amber-300 bg-amber-50 text-amber-800'
                              : 'border-red-300 bg-red-50 text-red-700'
                          )}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              confirm(
                                `Delete table booking for "${res.fullName}" permanently?`
                              )
                            ) {
                              void mutateCms({
                                entity: 'reservation',
                                action: 'delete',
                                id: res.id,
                              });
                            }
                          }}
                          className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          title="Delete booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <PaginationControls
                totalItems={filteredReservations.length}
                currentPage={resPage}
                pageSize={resPageSize}
                onPageChange={setResPage}
                onPageSizeChange={setResPageSize}
              />
            </div>
          )}

          {/* 9. BLOG POSTS */}
          {activeTab === 'blog' && (
            <BlogTab
              posts={bundle.blogPosts ?? []}
              onMutate={mutateCms as any}
              busy={busy}
            />
          )}

          {/* 10. FAQ ITEMS */}
          {activeTab === 'faq' && (
            <FaqTab
              faqs={bundle.faqItems ?? []}
              onMutate={mutateCms as any}
              busy={busy}
            />
          )}

          {/* 11. CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={bundle.reviews ?? []}
              onMutate={mutateCms as any}
              busy={busy}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          className={cn(
            'fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium shadow-elevated transition-all',
            toast.isError
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-emerald-200 bg-white text-brand-dark'
          )}
        >
          {toast.isError ? (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          )}
          <span className="flex-1 text-xs sm:text-sm">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="rounded-lg p-1 text-brand-dark/50 hover:bg-brand-bg hover:text-brand-dark"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

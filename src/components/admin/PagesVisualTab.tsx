'use client';

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  CalendarCheck,
  Clock,
  Coffee,
  Eye,
  EyeOff,
  FileText,
  Flame,
  HeartHandshake,
  Image as ImageIcon,
  Leaf,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CloudinaryImageInput } from '@/components/admin/CloudinaryImageInput';
import {
  AboutPageContentJson,
  BrandValue,
  CraftLeader,
  PageSectionData,
  SeatingZone,
  StoryChapter,
} from '@/types/cms';
import { cn } from '@/lib/utils';

interface PagesVisualTabProps {
  pages: PageSectionData[];
  onSavePage: (
    pageId: string,
    payload: {
      scriptLabel: string;
      title: string;
      description: string;
      content: Record<string, unknown>;
      published: boolean;
    }
  ) => Promise<void>;
  busy: boolean;
}

const pageMeta: Record<
  string,
  {
    friendlyName: string;
    subtitle: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  about: {
    friendlyName: 'About Us Page',
    subtitle: 'Your story, values & team',
    Icon: Users,
  },
  menu: {
    friendlyName: 'Menu Page',
    subtitle: 'Menu header & pairing notes',
    Icon: UtensilsCrossed,
  },
  gallery: {
    friendlyName: 'Photo Gallery Page',
    subtitle: 'Gallery banner & home preview',
    Icon: ImageIcon,
  },
  contact: {
    friendlyName: 'Contact Us Page',
    subtitle: 'Inquiry form & desk header',
    Icon: MapPin,
  },
  reservations: {
    friendlyName: 'Table Reservations Page',
    subtitle: 'Dining zones, times & occasions',
    Icon: CalendarCheck,
  },
};

const inputClass =
  'mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-dark/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/15';

const labelClass = 'block text-sm font-medium text-brand-dark';

export function PagesVisualTab({
  pages,
  onSavePage,
  busy,
}: PagesVisualTabProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(
    pages[0]?.id ?? ''
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentPage =
    pages.find((p) => p.id === selectedPageId) ?? pages[0] ?? null;

  const [scriptLabel, setScriptLabel] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!currentPage) return;
    setSelectedPageId(currentPage.id);
    setScriptLabel(currentPage.scriptLabel);
    setTitle(currentPage.title);
    setDescription(currentPage.description);
    setPublished(currentPage.published);
    setContent((currentPage.content ?? {}) as Record<string, unknown>);
  }, [currentPage]);

  if (!currentPage) {
    return (
      <div className="rounded-3xl border border-brand-mint/40 bg-white p-10 text-center text-sm text-brand-dark/70">
        No website pages available to edit.
      </div>
    );
  }

  const updateContent = (patch: Record<string, unknown>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSavePage(currentPage.id, {
      scriptLabel,
      title,
      description,
      content,
      published,
    });
  };

  // About page typed helpers
  const aboutContent = content as Partial<AboutPageContentJson>;
  const chapters: StoryChapter[] = Array.isArray(aboutContent.chapters)
    ? aboutContent.chapters
    : [];
  const values: BrandValue[] = Array.isArray(aboutContent.values)
    ? aboutContent.values
    : [];
  const leaders: CraftLeader[] = Array.isArray(aboutContent.leaders)
    ? aboutContent.leaders
    : [];

  // Reservations page typed helpers
  const resZones: SeatingZone[] = Array.isArray(content.seatingZones)
    ? (content.seatingZones as SeatingZone[])
    : [];
  const timeGroups: Array<{ label: string; slots: string[] }> = Array.isArray(
    content.timeGroups
  )
    ? (content.timeGroups as Array<{ label: string; slots: string[] }>)
    : [];
  const occasions: string[] = Array.isArray(content.occasions)
    ? (content.occasions as string[])
    : [];

  const activeMeta = pageMeta[currentPage.slug] ?? {
    friendlyName: `${currentPage.slug} Page`,
    subtitle: 'Page banner and sections',
    Icon: FileText,
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-6 lg:h-[calc(100vh-7.5rem)] lg:flex-row lg:items-start lg:overflow-hidden">
      {/* Persistent Fixed & Collapsible Page Selector Rail / Sidebar */}
      <div className="sticky top-[77px] sm:top-[81px] z-20 -mx-4 -mt-5 bg-brand-bg/95 px-4 pt-5 pb-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:static lg:m-0 lg:h-full lg:shrink-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <aside
          className={cn(
            'max-h-[calc(100vh-7.5rem)] overflow-y-auto overflow-x-hidden shrink-0 rounded-3xl border border-brand-mint/45 bg-white shadow-soft transition-all duration-300 ease-in-out lg:max-h-none lg:h-full',
            isSidebarOpen
              ? 'w-full p-4 lg:w-72 xl:w-80'
              : 'w-full p-2.5 lg:w-[76px]'
          )}
        >
        {isSidebarOpen ? (
          <>
            <div className="mb-3 flex items-center justify-between border-b border-brand-mint/25 pb-3 px-1">
              <div>
                <h3 className="font-heading text-base font-semibold text-brand-dark">
                  Website Pages
                </h3>
                <p className="text-[11px] text-brand-dark/60">
                  Choose a page to edit
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                title="Minimize to Icon Rail"
                aria-label="Minimize Pages Sidebar"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-mint/45 bg-brand-bg/60 text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {pages.map((p) => {
                const meta = pageMeta[p.slug] ?? {
                  friendlyName: `${p.slug} Page`,
                  subtitle: 'Page settings',
                  Icon: FileText,
                };
                const Icon = meta.Icon;
                const isSelected = p.id === currentPage.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPageId(p.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-all',
                      isSelected
                        ? 'border-brand-teal bg-brand-bg/40 shadow-soft ring-2 ring-brand-teal/15'
                        : 'border-brand-mint/35 bg-white hover:border-brand-teal/50 hover:bg-brand-bg/25'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl mt-0.5',
                        isSelected
                          ? 'bg-brand-teal text-white'
                          : 'bg-brand-bg text-brand-sage'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-heading text-sm font-semibold text-brand-dark truncate">
                          {meta.friendlyName}
                        </p>
                        <span
                          className={cn(
                            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                            p.published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          )}
                        >
                          {p.published ? 'Live' : 'Hidden'}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-brand-dark/60 line-clamp-2">
                        {meta.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-row items-center justify-between gap-2 lg:flex-col lg:items-center lg:py-1">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              title="Expand Pages Sidebar"
              aria-label="Expand Pages Sidebar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-mint/50 bg-brand-bg text-brand-dark transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>

            <div className="hidden h-px w-8 bg-brand-mint/35 lg:block" />

            <div className="flex flex-row items-center gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible">
              {pages.map((p) => {
                const meta = pageMeta[p.slug] ?? {
                  friendlyName: `${p.slug} Page`,
                  subtitle: 'Page settings',
                  Icon: FileText,
                };
                const Icon = meta.Icon;
                const isSelected = p.id === currentPage.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPageId(p.id)}
                    title={`${meta.friendlyName} (${p.published ? 'Live' : 'Hidden'})`}
                    aria-label={meta.friendlyName}
                    className={cn(
                      'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all',
                      isSelected
                        ? 'border-brand-teal bg-brand-teal text-white shadow-soft ring-2 ring-brand-teal/25'
                        : 'border-brand-mint/35 bg-brand-bg/45 text-brand-sage hover:border-brand-teal/60 hover:bg-white hover:text-brand-teal'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={cn(
                        'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white',
                        p.published ? 'bg-emerald-500' : 'bg-amber-500'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        </aside>
      </div>

      {/* Right Scrollable Page Editor Pane */}
      <form
        onSubmit={handleSubmit}
        className="min-w-0 flex-1 space-y-6 lg:h-full lg:overflow-y-auto lg:pr-1"
      >
        {/* Top Banner & Visibility Card */}
        <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
          <div className="flex flex-col justify-between gap-4 border-b border-brand-mint/25 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                {activeMeta.friendlyName}
              </h2>
              <p className="text-xs text-brand-dark/65">
                Edit the header banner and sections visitors see on this page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPublished((prev) => !prev)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors',
                  published
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                )}
              >
                {published ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Visible on Website</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Hidden from Website</span>
                  </>
                )}
              </button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={busy}
                leftIcon={<Save className="h-4 w-4" />}
              >
                {busy ? 'Saving...' : 'Save This Page'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Top Cursive Greeting</label>
              <input
                type="text"
                value={scriptLabel}
                onChange={(e) => setScriptLabel(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Page Main Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Short Page Introduction</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* PAGE-SPECIFIC VISUAL BUILDERS */}
        {currentPage.slug === 'about' && (
          <>
            {/* 1. Our Story */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
              <div className="border-b border-brand-mint/25 pb-3">
                <h3 className="font-heading text-xl font-semibold text-brand-dark">
                  Our Story &amp; Timeline
                </h3>
                <p className="text-xs text-brand-dark/65">
                  Share how Classico began and the milestones along the way.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Story Cursive Subtitle</label>
                  <input
                    type="text"
                    value={aboutContent.storyScript ?? ''}
                    onChange={(e) =>
                      updateContent({ storyScript: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Story Section Headline</label>
                  <input
                    type="text"
                    value={aboutContent.storyHeadline ?? ''}
                    onChange={(e) =>
                      updateContent({ storyHeadline: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Photo Badge Title</label>
                  <input
                    type="text"
                    value={aboutContent.storyOverlayTitle ?? ''}
                    onChange={(e) =>
                      updateContent({ storyOverlayTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Photo Badge Subtitle</label>
                  <input
                    type="text"
                    value={aboutContent.storyOverlaySubtitle ?? ''}
                    onChange={(e) =>
                      updateContent({ storyOverlaySubtitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <CloudinaryImageInput
                label="About Page Story Photo"
                value={aboutContent.storyImageUrl ?? ''}
                onChange={(url) => updateContent({ storyImageUrl: url })}
              />

              {/* Story Timeline Chapters */}
              <div className="space-y-3 border-t border-brand-mint/25 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-brand-dark">
                    Story Milestones / Chapters
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      updateContent({
                        chapters: [
                          ...chapters,
                          {
                            year: '2026',
                            title: 'New Chapter',
                            content: '',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Chapter
                  </button>
                </div>

                <div className="space-y-3">
                  {chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sage">
                          <BookOpen className="h-3.5 w-3.5" /> Chapter #
                          {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateContent({
                              chapters: chapters.filter((_, i) => i !== idx),
                            })
                          }
                          className="rounded-lg p-1 text-red-500 hover:bg-red-50"
                          title="Remove chapter"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                        <div>
                          <label className="block text-xs font-medium text-brand-dark">
                            Year / Era
                          </label>
                          <input
                            type="text"
                            value={chap.year}
                            onChange={(e) => {
                              const next = [...chapters];
                              next[idx] = { ...chap, year: e.target.value };
                              updateContent({ chapters: next });
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-brand-dark">
                            Chapter Title
                          </label>
                          <input
                            type="text"
                            value={chap.title}
                            onChange={(e) => {
                              const next = [...chapters];
                              next[idx] = { ...chap, title: e.target.value };
                              updateContent({ chapters: next });
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-brand-dark">
                          Story Paragraph
                        </label>
                        <textarea
                          rows={2}
                          value={chap.content}
                          onChange={(e) => {
                            const next = [...chapters];
                            next[idx] = { ...chap, content: e.target.value };
                            updateContent({ chapters: next });
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Core Values */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
              <div className="flex flex-col justify-between gap-3 border-b border-brand-mint/25 pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-dark">
                    Restaurant Values &amp; Philosophy
                  </h3>
                  <p className="text-xs text-brand-dark/65">
                    The pillars that guide your sourcing, roasting, and hospitality.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({
                      values: [
                        ...values,
                        {
                          id: `val-${Date.now()}`,
                          title: 'New Value',
                          description: '',
                          iconName: 'Leaf',
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 self-start rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Value
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Section Cursive Label</label>
                  <input
                    type="text"
                    value={aboutContent.valuesScript ?? ''}
                    onChange={(e) =>
                      updateContent({ valuesScript: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input
                    type="text"
                    value={aboutContent.valuesTitle ?? ''}
                    onChange={(e) =>
                      updateContent({ valuesTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Section Description</label>
                  <textarea
                    rows={2}
                    value={aboutContent.valuesDescription ?? ''}
                    onChange={(e) =>
                      updateContent({ valuesDescription: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {values.map((val, idx) => (
                  <div
                    key={val.id || idx}
                    className="rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-sage">
                        Value #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            values: values.filter((_, i) => i !== idx),
                          })
                        }
                        className="rounded-lg p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: 'Flame', label: 'Wood Fire', Icon: Flame },
                          { id: 'Coffee', label: 'Coffee Craft', Icon: Coffee },
                          { id: 'Leaf', label: 'Botanical', Icon: Leaf },
                          {
                            id: 'HeartHandshake',
                            label: 'Hospitality',
                            Icon: HeartHandshake,
                          },
                        ] as const
                      ).map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            const next = [...values];
                            next[idx] = { ...val, iconName: id };
                            updateContent({ values: next });
                          }}
                          className={cn(
                            'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium',
                            val.iconName === id
                              ? 'border-brand-teal bg-brand-teal text-white'
                              : 'border-brand-mint/40 bg-white text-brand-dark'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Value Title
                      </label>
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) => {
                          const next = [...values];
                          next[idx] = { ...val, title: e.target.value };
                          updateContent({ values: next });
                        }}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={val.description}
                        onChange={(e) => {
                          const next = [...values];
                          next[idx] = { ...val, description: e.target.value };
                          updateContent({ values: next });
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Team & Craft Leaders */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
              <div className="flex flex-col justify-between gap-3 border-b border-brand-mint/25 pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-dark">
                    Team &amp; Culinary Leaders
                  </h3>
                  <p className="text-xs text-brand-dark/65">
                    Introduce your chefs, roasters, and hospitality leaders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({
                      leaders: [
                        ...leaders,
                        {
                          id: `leader-${Date.now()}`,
                          name: '',
                          role: '',
                          specialty: '',
                          bio: '',
                          imageUrl: '',
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 self-start rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Team Member
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Section Cursive Label</label>
                  <input
                    type="text"
                    value={aboutContent.leadersScript ?? ''}
                    onChange={(e) =>
                      updateContent({ leadersScript: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input
                    type="text"
                    value={aboutContent.leadersTitle ?? ''}
                    onChange={(e) =>
                      updateContent({ leadersTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Section Description</label>
                  <textarea
                    rows={2}
                    value={aboutContent.leadersDescription ?? ''}
                    onChange={(e) =>
                      updateContent({ leadersDescription: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {leaders.map((leader, idx) => (
                  <div
                    key={leader.id || idx}
                    className="rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-base font-semibold text-brand-dark">
                        {leader.name || `Team Member #${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            leaders: leaders.filter((_, i) => i !== idx),
                          })
                        }
                        className="rounded-lg p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-brand-dark">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={leader.name}
                          onChange={(e) => {
                            const next = [...leaders];
                            next[idx] = { ...leader, name: e.target.value };
                            updateContent({ leaders: next });
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-brand-dark">
                          Job Title / Role
                        </label>
                        <input
                          type="text"
                          value={leader.role}
                          onChange={(e) => {
                            const next = [...leaders];
                            next[idx] = { ...leader, role: e.target.value };
                            updateContent({ leaders: next });
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Specialty
                      </label>
                      <input
                        type="text"
                        value={leader.specialty}
                        onChange={(e) => {
                          const next = [...leaders];
                          next[idx] = { ...leader, specialty: e.target.value };
                          updateContent({ leaders: next });
                        }}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Short Bio
                      </label>
                      <textarea
                        rows={2}
                        value={leader.bio}
                        onChange={(e) => {
                          const next = [...leaders];
                          next[idx] = { ...leader, bio: e.target.value };
                          updateContent({ leaders: next });
                        }}
                        className={inputClass}
                      />
                    </div>

                    <CloudinaryImageInput
                      label="Portrait Photo"
                      value={leader.imageUrl}
                      onChange={(url) => {
                        const next = [...leaders];
                        next[idx] = { ...leader, imageUrl: url };
                        updateContent({ leaders: next });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {currentPage.slug === 'menu' && (
          <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
            <div className="border-b border-brand-mint/25 pb-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Featured Pairing Callout</span>
              </div>
              <h3 className="mt-1 font-heading text-xl font-semibold text-brand-dark">
                Sommelier &amp; Barista Pairings Box
              </h3>
              <p className="text-xs text-brand-dark/65">
                Shown on the Menu page to highlight favorite food and coffee combinations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Small Badge Label</label>
                <input
                  type="text"
                  value={String(content.pairingBadge ?? '')}
                  onChange={(e) =>
                    updateContent({ pairingBadge: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Callout Title</label>
                <input
                  type="text"
                  value={String(content.pairingTitle ?? '')}
                  onChange={(e) =>
                    updateContent({ pairingTitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Pairing Recommendation Text</label>
                <textarea
                  rows={3}
                  value={String(content.pairingDescription ?? '')}
                  onChange={(e) =>
                    updateContent({ pairingDescription: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Recommended Duo #1</label>
                <input
                  type="text"
                  value={String(content.pairingDuo1 ?? '')}
                  onChange={(e) =>
                    updateContent({ pairingDuo1: e.target.value })
                  }
                  placeholder="e.g. Pistachio Latte + Espresso Tiramisu"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Recommended Duo #2</label>
                <input
                  type="text"
                  value={String(content.pairingDuo2 ?? '')}
                  onChange={(e) =>
                    updateContent({ pairingDuo2: e.target.value })
                  }
                  placeholder="e.g. Prime Ribeye + Rosemary Spritz"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {currentPage.slug === 'gallery' && (
          <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
            <div className="border-b border-brand-mint/25 pb-3">
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Homepage Gallery Preview Section
              </h3>
              <p className="text-xs text-brand-dark/65">
                Text displayed above your photo gallery preview on the website homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Cursive Subtitle</label>
                <input
                  type="text"
                  value={String(content.homePreviewScript ?? '')}
                  onChange={(e) =>
                    updateContent({ homePreviewScript: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Section Headline</label>
                <input
                  type="text"
                  value={String(content.homePreviewTitle ?? '')}
                  onChange={(e) =>
                    updateContent({ homePreviewTitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Preview Description</label>
                <textarea
                  rows={3}
                  value={String(content.homePreviewDescription ?? '')}
                  onChange={(e) =>
                    updateContent({ homePreviewDescription: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {currentPage.slug === 'contact' && (
          <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
            <div className="border-b border-brand-mint/25 pb-3">
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Hospitality Desk &amp; Message Form Headings
              </h3>
              <p className="text-xs text-brand-dark/65">
                Customize the titles around your phone, address, and contact form.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Info Card Title</label>
                <input
                  type="text"
                  value={String(content.deskTitle ?? '')}
                  onChange={(e) => updateContent({ deskTitle: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Info Card Subtitle</label>
                <input
                  type="text"
                  value={String(content.deskSubtitle ?? '')}
                  onChange={(e) =>
                    updateContent({ deskSubtitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Form Cursive Greeting</label>
                <input
                  type="text"
                  value={String(content.formScript ?? '')}
                  onChange={(e) =>
                    updateContent({ formScript: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Form Title</label>
                <input
                  type="text"
                  value={String(content.formTitle ?? '')}
                  onChange={(e) => updateContent({ formTitle: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {currentPage.slug === 'reservations' && (
          <>
            {/* 1. Dining Spaces / Seating Zones */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
              <div className="flex flex-col justify-between gap-3 border-b border-brand-mint/25 pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-dark">
                    Dining Spaces / Seating Areas
                  </h3>
                  <p className="text-xs text-brand-dark/65">
                    Areas guests can pick when booking a table (for example, Restro Garden Courtyard or Mezzanine Deck).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({
                      seatingZones: [
                        ...resZones,
                        {
                          id: `zone-${Date.now()}`,
                          name: 'New Dining Space',
                          capacity: '2–6 Guests',
                          ambiance: 'Warm & Quiet',
                          description: '',
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 self-start rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Dining Space
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {resZones.map((zone, idx) => (
                  <div
                    key={zone.id || idx}
                    className="rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-base font-semibold text-brand-dark">
                        {zone.name || `Dining Space #${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            seatingZones: resZones.filter((_, i) => i !== idx),
                          })
                        }
                        className="rounded-lg p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Space Name
                      </label>
                      <input
                        type="text"
                        value={zone.name}
                        onChange={(e) => {
                          const next = [...resZones];
                          next[idx] = { ...zone, name: e.target.value };
                          updateContent({ seatingZones: next });
                        }}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-brand-dark">
                          Guest Capacity
                        </label>
                        <input
                          type="text"
                          value={zone.capacity}
                          onChange={(e) => {
                            const next = [...resZones];
                            next[idx] = { ...zone, capacity: e.target.value };
                            updateContent({ seatingZones: next });
                          }}
                          placeholder="e.g. 2–6 Guests"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-brand-dark">
                          Atmosphere Style
                        </label>
                        <input
                          type="text"
                          value={zone.ambiance}
                          onChange={(e) => {
                            const next = [...resZones];
                            next[idx] = { ...zone, ambiance: e.target.value };
                            updateContent({ seatingZones: next });
                          }}
                          placeholder="e.g. Sunlit Greenery"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-brand-dark">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={zone.description}
                        onChange={(e) => {
                          const next = [...resZones];
                          next[idx] = { ...zone, description: e.target.value };
                          updateContent({ seatingZones: next });
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Reservation Time Slots */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
              <div className="flex flex-col justify-between gap-3 border-b border-brand-mint/25 pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-dark">
                    Available Booking Time Slots
                  </h3>
                  <p className="text-xs text-brand-dark/65">
                    Add or adjust available times for Morning, Lunch, and Dinner seatings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({
                      timeGroups: [
                        ...timeGroups,
                        { label: 'New Time Period', slots: ['6:00 PM'] },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 self-start rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Meal Period
                </button>
              </div>

              <div className="space-y-4">
                {timeGroups.map((group, gIdx) => (
                  <div
                    key={gIdx}
                    className="rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-1 items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-teal shrink-0" />
                        <input
                          type="text"
                          value={group.label}
                          onChange={(e) => {
                            const next = [...timeGroups];
                            next[gIdx] = { ...group, label: e.target.value };
                            updateContent({ timeGroups: next });
                          }}
                          className="w-full max-w-sm rounded-xl border border-brand-mint/45 bg-white px-3 py-1.5 text-sm font-semibold text-brand-dark focus:border-brand-teal focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            timeGroups: timeGroups.filter((_, i) => i !== gIdx),
                          })
                        }
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                        title="Remove meal period"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {group.slots.map((slot, sIdx) => (
                        <div
                          key={sIdx}
                          className="inline-flex items-center gap-1 rounded-full border border-brand-mint/50 bg-white px-2.5 py-1"
                        >
                          <input
                            type="text"
                            value={slot}
                            onChange={(e) => {
                              const next = [...timeGroups];
                              const slots = [...group.slots];
                              slots[sIdx] = e.target.value;
                              next[gIdx] = { ...group, slots };
                              updateContent({ timeGroups: next });
                            }}
                            className="w-20 bg-transparent text-xs font-medium text-brand-dark focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...timeGroups];
                              next[gIdx] = {
                                ...group,
                                slots: group.slots.filter((_, i) => i !== sIdx),
                              };
                              updateContent({ timeGroups: next });
                            }}
                            className="text-red-400 hover:text-red-600"
                            title="Remove time"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const next = [...timeGroups];
                          next[gIdx] = {
                            ...group,
                            slots: [...group.slots, '8:00 PM'],
                          };
                          updateContent({ timeGroups: next });
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-dashed border-brand-teal/50 px-3 py-1 text-xs font-semibold text-brand-teal hover:bg-brand-teal/10"
                      >
                        <Plus className="h-3 w-3" /> Add Time
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Special Occasions */}
            <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-mint/25 pb-3">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-dark">
                    Celebration &amp; Occasion Options
                  </h3>
                  <p className="text-xs text-brand-dark/65">
                    Options guests can choose in the reservation dropdown.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({ occasions: [...occasions, 'Special Event'] })
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Occasion
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {occasions.map((occ, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-3 py-1.5"
                  >
                    <input
                      type="text"
                      value={occ}
                      onChange={(e) => {
                        const next = [...occasions];
                        next[idx] = e.target.value;
                        updateContent({ occasions: next });
                      }}
                      className="w-40 bg-transparent text-xs font-medium text-brand-dark focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateContent({
                          occasions: occasions.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={busy}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {busy ? 'Saving Page...' : `Save ${activeMeta.friendlyName}`}
          </Button>
        </div>
      </form>
    </div>
  );
}

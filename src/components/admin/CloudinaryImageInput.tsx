'use client';

import React, { useRef, useState } from 'react';
import {
  ImagePlus,
  Link2,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloudinaryImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function CloudinaryImageInput({
  label,
  value,
  onChange,
  placeholder = 'https://res.cloudinary.com/...',
  helperText,
}: CloudinaryImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [error, setError] = useState('');

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a photo file (JPG, PNG, or WebP).');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(
          data.error ||
            'Could not upload that photo. Please try a smaller image or another file.'
        );
      } else {
        onChange(data.url);
      }
    } catch {
      setError('Could not connect to upload your photo. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm font-medium text-brand-dark">
          {label}
        </label>

        <button
          type="button"
          onClick={() => setShowLinkInput((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-teal hover:text-brand-teal-dark focus:outline-none"
        >
          <Link2 className="h-3.5 w-3.5" />
          <span>{showLinkInput ? 'Hide web link' : 'Or paste an image web link'}</span>
        </button>
      </div>

      {helperText && (
        <p className="text-xs text-brand-dark/60">{helperText}</p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'relative overflow-hidden rounded-2xl border bg-brand-bg/50 p-3 transition-all',
            dragging
              ? 'border-brand-teal ring-2 ring-brand-teal/20'
              : 'border-brand-mint/50'
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-brand-mint/40 bg-white sm:w-36">
              <img
                src={value}
                alt={label}
                className="h-full w-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/60 text-white backdrop-blur-sm">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="mt-1 text-[11px] font-medium">
                    Uploading photo...
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between gap-2.5">
              <div>
                <p className="text-sm font-semibold text-brand-dark">
                  Photo Ready
                </p>
                <p className="text-xs text-brand-dark/65">
                  Drag a new photo here or use the buttons below to replace or remove it.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-teal px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading photo...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Change Photo</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => onChange('')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-all',
            dragging
              ? 'border-brand-teal bg-brand-teal-light/40'
              : 'border-brand-mint/60 bg-brand-bg/50 hover:border-brand-teal/60 hover:bg-brand-bg'
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-teal shadow-soft">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImagePlus className="h-5 w-5" />
            )}
          </div>

          <p className="mt-3 text-sm font-medium text-brand-dark">
            {uploading
              ? 'Uploading your photo...'
              : 'Drop a photo here, or click to browse'}
          </p>
          <p className="mt-0.5 text-xs text-brand-dark/55">
            Supports JPG, PNG, and WebP photos from your computer or phone
          </p>

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Uploading photo...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Photo from Computer</span>
              </>
            )}
          </button>
        </div>
      )}

      {showLinkInput && (
        <div className="rounded-xl border border-brand-mint/40 bg-white p-3">
          <label className="block text-xs font-medium text-brand-dark/75 mb-1">
            Image Web Link (URL)
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
          />
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

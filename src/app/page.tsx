import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { SignatureSplit } from '@/components/home/SignatureSplit';
import { FeaturedMenuSection } from '@/components/home/FeaturedMenuSection';
import { AtmospherePreview } from '@/components/home/AtmospherePreview';
import { LocationHoursSection } from '@/components/home/LocationHoursSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SignatureSplit />
      <FeaturedMenuSection />
      <AtmospherePreview />
      <LocationHoursSection />
      <CtaBanner />
    </>
  );
}

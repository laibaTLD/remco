"use client";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import ServicesSection from "@/sections/ServicesSection";

export default function ServicesListingSection() {
  const landingPageData = useLandingPageData();
  
  if (!landingPageData?.content?.services) {
    return null;
  }

  return (
    <ServicesSection
      title={landingPageData.content.services.title}
      description={landingPageData.content.services.description}
      services={landingPageData.content.services.services}
      images={landingPageData.images ?? []}
      theme={landingPageData.themeData}
    />
  );
}

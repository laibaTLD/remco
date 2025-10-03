"use client";

import Layout from "@/components/Layout";
import Banner from "../../../components/Banner";
import FooterSection from "@/sections/FooterSection";
import ServicesListingSection from "../../../sections/ServicesListingSection";
import FAQSection from "@/sections/FAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ServicesPage() {
  const landingPageData = useLandingPageData();

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <Banner title="Services" category="services" />
      <main>
        <ServicesListingSection />
        {landingPageData.content.faq && (
          <FAQSection 
            title={landingPageData.content.faq.title}
            description={landingPageData.content.faq.description}
            questions={landingPageData.content.faq.questions}
            themeData={landingPageData.themeData}
          />
        )}
        <FooterSection 
          footerTitle={landingPageData.seoData.title}
          socialsList={(landingPageData.businessData.socialLinks || []).map(s => ({ name: s.platform, url: s.url }))}
          originCity={landingPageData.businessData.address?.city || ''}
          workingScope={landingPageData.businessData.serviceAreas && landingPageData.businessData.serviceAreas.length
            ? `serving ${Array.from(new Set(landingPageData.businessData.serviceAreas.map(a => a.region))).filter(Boolean).join(', ')}`
            : ''}
          contactEmail={landingPageData.businessData.email}
          agencyName={landingPageData.businessName}
          currentYear={new Date().getFullYear()}
          themeData={landingPageData.themeData}
          businessName={landingPageData.businessName}
          businessData={landingPageData.businessData}
        />
      </main>
    </Layout>
  );
}



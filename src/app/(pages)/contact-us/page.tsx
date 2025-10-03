"use client";

import Layout from "@/components/Layout";
import Banner from "../../../components/Banner";
import FooterSection from "@/sections/FooterSection";
import MapAltSection from "./sections/MapAltSection";
import ContactInfoAltSection from "./sections/ContactInfoAltSection";
import BusinessHoursAltSection from "./sections/BusinessHoursAltSection";
import ContactForm from "./ContactForm";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ContactUsPage() {
  const landingPageData = useLandingPageData();

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <Banner title="Contact Us" slotName="contact-hero" />
      <main className="bg-gray-50">
        {/* Hero Section with Contact Form */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 w-screen overflow-x-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-heading-1 mb-4">
                  Contact Us
                </h1>
                <p className="text-body-large max-w-2xl mx-auto">
                  We&apos;d love to hear from you. Send us a message and we&apos;ll respond shortly.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <ContactInfoAltSection />

        {/* Business Hours Section */}
        <BusinessHoursAltSection />

        {/* Map Section */}
        <MapAltSection />

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



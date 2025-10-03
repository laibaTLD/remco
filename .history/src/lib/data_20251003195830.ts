import { cache } from "react";
import { query } from "@/lib/db";
import { fetchLandingPageForSSG } from "@/lib/database";

const getEnv = () => {
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const id = process.env.NEXT_PUBLIC_ID;
  if (!templateId || !id) {
    throw new Error("Missing NEXT_PUBLIC_TEMPLATE_ID or NEXT_PUBLIC_ID");
  }
  return { templateId, id };
};

export const getLandingPageData = cache(async () => {
  const { templateId, id } = getEnv();
  // Dev fallback: if NO_DB=true, return a minimal stub so the app renders
  if (process.env.NO_DB === 'true') {
    const now = new Date().toISOString();
    return {
      id: 'dev-stub',
      templateId,
      businessName: 'Dev Business',
      githubUrl: undefined,
      status: 'draft',
      content: {
        hero: {
          title: 'Welcome to Dev Business',
          subtitle: 'Professional services, rendered without DB',
          description: 'This is a development fallback. Connect your database to see live content.',
          ctaButton: { href: '#contact', label: 'Contact Us' },
        },
        about: {
          title: 'About Us',
          description: 'We provide high-quality services. This content is stubbed for development.',
          features: ['Reliable', 'Fast', 'Friendly'],
          ctaButton: { href: '#contact', label: 'Get in touch' },
        },
        services: {
          title: 'Our Services',
          description: 'Explore our offerings below.',
          services: [
            {
              name: 'standard-service',
              title: 'Standard Service',
              description: 'A baseline service example for development.',
              price: '$99',
              features: ['Feature A', 'Feature B'],
              ctaButton: { href: '#contact', label: 'Book now' },
            },
          ],
        },
        testimonials: {
          title: 'Testimonials',
          description: 'What our customers say.',
          testimonials: [
            { name: 'Alex', text: 'Great work!', rating: 5, role: 'Customer', company: 'Local Co' },
          ],
        },
        gallery: {
          title: 'Gallery',
          description: 'A selection of our work.',
        },
        faq: {
          title: 'FAQ',
          description: 'Common questions answered.',
          questions: [
            { question: 'Is this live data?', answer: 'No, this is a dev fallback while NO_DB=true.' },
          ],
        },
        businessOverview: {
          content: [
            { heading: 'Overview', description: 'High-level summary goes here.', ctaButton: { href: '#contact', label: 'Learn more' } },
          ],
        },
        companyDetails: {
          heading: 'Company Details',
          description: 'Information about our company.',
          sections: [
            { heading: 'Mission', description: 'Deliver great service.' },
            { heading: 'Vision', description: 'Delight customers.' },
          ],
        },
        footer: {
          copyright: `© ${new Date().getFullYear()} Dev Business`,
        },
        serviceHighlights: {
          title: 'Highlights',
          description: 'Key reasons to choose us.',
          services: [
            { name: 'fast', description: 'Quick turnaround' },
            { name: 'quality', description: 'Attention to detail' },
          ],
        },
        ctaSection: {
          heading: 'Ready to start?',
          subHeading: 'We are here to help',
          description: 'Reach out and tell us what you need.',
          ctaButton: { href: '#contact', label: 'Get Started' },
        },
      },
      seoData: {
        title: 'Dev Business – Professional Services',
        description: 'Development fallback content for local testing.',
        keywords: ['dev', 'fallback', 'local'],
        isIndex: false,
        canonicalUrl: 'http://localhost:3000',
        focusedKeywords: ['services', 'business'],
      },
      themeData: {
        primaryColor: '#0ea5e9',
        secondaryColor: '#111827',
        accentColor: '#22c55e',
      },
      businessData: {
        email: 'contact@devbusiness.local',
        phone: '+1 (555) 000-0000',
        emergencyPhone: undefined,
        emergencyEmail: undefined,
        address: { street: '123 Dev St', city: 'Localtown', state: 'CA', zipCode: '90000' },
        coordinates: { latitude: 34.05, longitude: -118.24 },
        socialLinks: [
          { platform: 'twitter', url: 'https://twitter.com/devbusiness' },
          { platform: 'linkedin', url: 'https://www.linkedin.com/company/devbusiness' },
        ],
        serviceAreas: [
          { city: 'Localtown', region: 'West', description: 'Primary service area.' },
        ],
        businessHours: [
          { day: 'Mon-Fri', hours: '9:00–17:00', isClosed: false },
          { day: 'Sat-Sun', hours: 'Closed', isClosed: true },
        ],
      },
      companyDetails: {
        heading: 'Company Details',
        description: 'More info about Dev Business.',
        sections: [
          { heading: 'History', description: 'Founded for development demos.' },
        ],
      },
      createdAt: now,
      updatedAt: now,
      publishedAt: undefined,
      images: [
        {
          id: 'img-hero-1',
          landingPageId: 'dev-stub',
          title: 'Hero Image 1',
          altText: 'Hero image',
          imageUrl: '/vercel.svg',
          slotName: 'hero-image-1',
          category: 'hero',
          createdAt: now,
        },
      ],
    };
  }
  return await fetchLandingPageForSSG(templateId, id);
});

export const getServices = cache(async () => {
  try {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "title", description, price FROM "Service" ORDER BY id DESC'
    );
  } catch {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "name" as title, description, price FROM "Service" ORDER BY id DESC'
    );
  }
});

export const getServiceById = cache(async (serviceId: string) => {
  try {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "title", description, price FROM "Service" WHERE id = $1 LIMIT 1',
      [serviceId]
    ).then(rows => rows[0] ?? null);
  } catch {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "name" as title, description, price FROM "Service" WHERE id = $1 LIMIT 1',
      [serviceId]
    ).then(rows => rows[0] ?? null);
  }
});

export const getAboutContent = cache(async () => {
  try {
    return await query<{
      title?: string | null;
      subtitle?: string | null;
      body?: string | null;
      mission?: string | null;
      vision?: string | null;
    }>(
      'SELECT title, subtitle, body, mission, vision FROM about_content LIMIT 1'
    ).then(rows => rows[0] ?? null);
  } catch {
    return await query<{
      title?: string | null;
      subtitle?: string | null;
      body?: string | null;
      mission?: string | null;
      vision?: string | null;
    }>(
      'SELECT title, subtitle, body, mission, vision FROM about LIMIT 1'
    ).then(rows => rows[0] ?? null);
  }
});

export const getReviews = cache(async () => {
  try {
    return await query<{
      id: string | number;
      author?: string | null;
      rating?: number | null;
      comment?: string | null;
      created_at?: string | Date | null;
    }>(
      'SELECT id, author, rating, comment, created_at FROM reviews ORDER BY created_at DESC'
    );
  } catch {
    try {
      return await query<{
        id: string | number;
        author?: string | null;
        rating?: number | null;
        comment?: string | null;
        created_at?: string | Date | null;
      }>(
        'SELECT id, author, rating, comment, createdAt as created_at FROM reviews ORDER BY createdAt DESC'
      );
    } catch {
      return [];
    }
  }
});

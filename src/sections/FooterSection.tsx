 'use client';

// Dark, minimalist footer matching the provided reference.

interface SocialItem {
  name: string;
  url: string;
}

interface ThemeData {
  primaryColor?: string; // bright accent for strokes/lines
  secondaryColor?: string; // subtle body text
  backgroundColor?: string; // deep black background
}

// Legacy shapes used elsewhere in the project
interface LegacyAddress { street?: string; city?: string; state?: string; zipCode?: string }
interface LegacySocialLink { platform: string; url: string }
interface LegacyServiceArea { city: string; region: string; description?: string }
interface LegacyBusinessData {
  email?: string;
  phone?: string;
  address?: LegacyAddress;
  socialLinks?: LegacySocialLink[];
  serviceAreas?: LegacyServiceArea[];
}

interface FooterSectionProps {
  sectionNumber?: string | number; // {{ section_number }} (optional)
  footerTitle: string; // {{ footer_title }}
  socialsList: SocialItem[]; // {{ socials_list }}
  originCity: string; // {{ origin_city }}
  workingScope: string; // {{ working_scope }}
  contactEmail: string; // {{ contact_email }}
  agencyName: string; // {{ agency_name }}
  currentYear?: number; // {{ current_year }}
  themeData?: ThemeData; // { primaryColor, secondaryColor, backgroundColor }
  // Legacy props found in other sections/files so we can auto-wire data
  businessName?: string; // used as a fallback for agency name
  businessData?: LegacyBusinessData;
}

export default function FooterSection({
  sectionNumber,
  footerTitle,
  socialsList,
  originCity,
  workingScope,
  contactEmail,
  agencyName,
  currentYear,
  themeData,
  businessName,
  businessData,
}: FooterSectionProps) {
  const primary = themeData?.primaryColor ?? '#E5E5E5';
  const secondary = themeData?.secondaryColor ?? '#A1A1A6';
  const background = themeData?.backgroundColor ?? '#0F0F10';

  // Derive values from either the new props or legacy data
  const computedAgencyName = agencyName ?? businessName ?? 'Agency';
  const computedYear = currentYear ?? new Date().getFullYear();
  const computedSocials: SocialItem[] =
    (socialsList && socialsList.length > 0)
      ? socialsList
      : (businessData?.socialLinks?.map((s) => ({ name: s.platform, url: s.url })) ?? []);
  const computedEmail = contactEmail || businessData?.email || '';
  const computedOriginCity = originCity || businessData?.address?.city || '';
  const computedScope = workingScope || (businessData?.serviceAreas && businessData.serviceAreas.length
    ? `serving ${Array.from(new Set(businessData.serviceAreas.map(a => a.region))).filter(Boolean).join(', ')}`
    : '');

  return (
    <footer
      className="relative"
      style={{ backgroundColor: background, color: secondary }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-16">
        {/* Header: section number + outlined title + arrow */}
        <div className="flex items-start gap-6 md:gap-8">
          {/* Section number (optional) */}
          {sectionNumber !== undefined && sectionNumber !== '' && (
            <div className="shrink-0">
              <div
                className="text-3xl md:text-4xl font-semibold leading-none tracking-tight"
                style={{ color: primary }}
              >
                {sectionNumber}
              </div>
            </div>
          )}

          {/* Outlined title + arrow */}
          <div className="flex w-full items-center justify-between">
            <h2
              className="pointer-events-none select-none text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.85] tracking-[-0.02em] outline-title"
              aria-label={footerTitle}
              style={{ ['--stroke' as any]: primary }}
            >
              {footerTitle}
            </h2>

            {/* Right arrow icon */}
            <div className="ml-4 hidden sm:block">
              <svg
                className="h-8 w-8 md:h-10 md:w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke={primary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top separator */}
        <hr className="mt-8 border-t" style={{ borderColor: `${primary}66` }} />

        {/* 3 columns */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Socials */}
          <div>
            <h3 className="text-sm font-medium" style={{ color : `${primary}b3`} }>Socials</h3>
            <ul className="mt-4 space-y-2">
              {computedSocials?.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    className="text-lg md:text-xl underline-offset-4 hover:underline transition-colors"
                    style={{ color: primary }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-medium" style={{ color: `${primary}B3` }}>Address</h3>
            <p className="mt-4 text-xl md:text-2xl font-medium" style={{ color: primary }}>
              {computedOriginCity ? (
                <>
                  Originally from {computedOriginCity},<br />
                </>
              ) : null}
              {computedScope}
            </p>
          </div>

          {/* Say Hi */}
          <div>
            <h3 className="text-sm font-medium" style={{ color: `${primary}B3` }}>Say Hi!</h3>
            <a
              href={`mailto:${computedEmail}`}
              className="mt-4 inline-block text-2xl md:text-3xl font-semibold underline-offset-4 hover:underline"
              style={{ color: primary }}
            >
              {computedEmail}
            </a>
          </div>
        </div>

        {/* Bottom separator */}
        <hr className="mt-10 border-t" style={{ borderColor: `${primary}66` }} />

        {/* Copyright */}
        <div className="mt-6 text-sm" style={{ color: secondary }}>
          {computedAgencyName} © {computedYear}
        </div>
      </div>

      {/* Local outline style for the big title */}
      <style jsx>{`
        .outline-title {
          color: transparent;
          -webkit-text-stroke: 1px var(--stroke, ${primary});
          text-stroke: 1px var(--stroke, ${primary});
          paint-order: stroke fill;
        }
        @media (min-width: 768px) {
          .outline-title { -webkit-text-stroke: 1.2px var(--stroke, ${primary}); }
        }
        @media (min-width: 1024px) {
          .outline-title { -webkit-text-stroke: 1.4px var(--stroke, ${primary}); }
        }
      `}</style>
    </footer>
  );
}

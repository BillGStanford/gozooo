import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fontVariables } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LanguageProvider from '@/components/layout/LanguageProvider';
import ServiceWorkerRegister from '@/components/layout/ServiceWorkerRegister';
import { siteIdentity, SITE_URL } from '@/lib/config';
import { organizationSchema } from '@/lib/schemas/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteIdentity.siteName.am} · ${siteIdentity.siteName.en}`,
    template: siteIdentity.seoDefaults.titleTemplate.en,
  },
  description: siteIdentity.seoDefaults.defaultDescription.en,
  icons: { icon: siteIdentity.favicon },
  openGraph: {
    siteName: siteIdentity.siteName.en,
    images: [siteIdentity.defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteIdentity.socialHandles.twitterSite,
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="am" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <LanguageProvider>
          <ServiceWorkerRegister />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

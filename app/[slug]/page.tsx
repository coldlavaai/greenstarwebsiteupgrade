import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity';
import SectionRenderer from '@/components/SectionRenderer';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';

// Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch page data
async function getPage(slug: string, isDraftMode: boolean) {
  const client = getClient(isDraftMode);

  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug && status == "published"][0]{
      _id,
      title,
      slug,
      sections[]{
        _type,
        _key,
        ...
      },
      seo,
      status
    }`,
    { slug }
  );

  return page;
}

// Fetch navigation and footer data
async function getLayoutData(isDraftMode: boolean) {
  const client = getClient(isDraftMode);

  const [navigationData, footerData] = await Promise.all([
    client.fetch(`*[_type == "navigationSection"][0]{
      _id,
      _type,
      title,
      navItems,
      ctaButton
    }`),
    client.fetch(`*[_type == "footerSection"][0]{
      _id,
      _type,
      companyName,
      description,
      columns,
      socialLinks,
      copyrightText,
      logo
    }`),
  ]);

  return { navigationData, footerData };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isDraftMode = draftMode().isEnabled;
  const page = await getPage(params.slug, isDraftMode);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo?.metaTitle || page.title || 'Greenstar Solar',
    description: page.seo?.metaDescription || '',
    openGraph: {
      title: page.seo?.metaTitle || page.title || 'Greenstar Solar',
      description: page.seo?.metaDescription || '',
      images: page.seo?.ogImage ? [{ url: page.seo.ogImage }] : [],
    },
    robots: {
      index: !page.seo?.noIndex,
      follow: !page.seo?.noIndex,
    },
    ...(page.seo?.canonicalUrl && {
      alternates: {
        canonical: page.seo.canonicalUrl,
      },
    }),
  };
}

// Generate static params for all published pages
export async function generateStaticParams() {
  const client = getClient(false);

  const pages = await client.fetch(
    `*[_type == "page" && status == "published"]{
      "slug": slug.current
    }`
  );

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

// Main page component
export default async function DynamicPage({ params }: PageProps) {
  const isDraftMode = draftMode().isEnabled;
  const page = await getPage(params.slug, isDraftMode);

  if (!page) {
    notFound();
  }

  // Get layout data
  const { navigationData, footerData } = await getLayoutData(isDraftMode);

  return (
    <PageWrapper>
      <Navigation data={navigationData} />

      <main className="min-h-screen">
        {page.sections && page.sections.length > 0 ? (
          page.sections.map((section: any, index: number) => (
            <SectionRenderer
              key={section._key || `section-${index}`}
              section={section}
              index={index}
            />
          ))
        ) : (
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
            <p className="text-white/60">No sections added yet. Edit this page in Sanity Studio.</p>
          </div>
        )}
      </main>

      <Footer data={footerData} />
    </PageWrapper>
  );
}

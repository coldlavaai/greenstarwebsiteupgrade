/**
 * Content Verification Script
 *
 * Verifies all content was properly populated in Sanity CMS
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kpz3fwyf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function verifyContent() {
  console.log('\n🔍 COMPREHENSIVE CONTENT VERIFICATION');
  console.log('=====================================\n');

  let issues: string[] = [];
  let warnings: string[] = [];

  // Check Navigation
  console.log('📋 Checking Navigation...');
  const nav = await client.fetch(`*[_type == "navigationSection"][0]`);
  if (!nav) {
    issues.push('❌ Navigation section not found');
  } else {
    console.log(`✅ Navigation exists`);
    console.log(`   - ${nav.navItems?.length || 0} menu items`);
    console.log(`   - CTA Button: ${nav.ctaButton?.text || 'N/A'}`);

    const systemsMenu = nav.navItems?.find((item: any) => item.label === 'Systems');
    if (systemsMenu?.dropdown?.length !== 5) {
      warnings.push(`⚠️  Systems submenu has ${systemsMenu?.dropdown?.length || 0} items (expected 5)`);
    }
  }

  // Check Hero Section
  console.log('\n🦸 Checking Hero Section...');
  const hero = await client.fetch(`*[_type == "heroSection"][0]`);
  if (!hero) {
    issues.push('❌ Hero section not found');
  } else {
    console.log(`✅ Hero exists`);
    console.log(`   - Heading: ${hero.heading}`);
    console.log(`   - Stats: ${hero.stats?.length || 0}`);
  }

  // Check About Section
  console.log('\n📖 Checking About Section...');
  const about = await client.fetch(`*[_type == "aboutSection"][0]`);
  if (!about) {
    issues.push('❌ About section not found');
  } else {
    console.log(`✅ About exists`);
    console.log(`   - Stats: ${about.stats?.length || 0}`);
    console.log(`   - Bullet points: ${about.bulletPoints?.length || 0}`);
  }

  // Check Process Steps
  console.log('\n⚙️  Checking Process Steps...');
  const processSteps = await client.fetch(`*[_type == "processStep"] | order(order asc)`);
  if (processSteps.length !== 5) {
    issues.push(`❌ Expected 5 process steps, found ${processSteps.length}`);
  } else {
    console.log(`✅ Found all 5 process steps:`);
    processSteps.forEach((step: any) => {
      console.log(`   ${step.order}. ${step.title}`);
      if (!step.frontReview?.text) warnings.push(`⚠️  Step ${step.order} missing front review`);
      if (!step.backReview?.text) warnings.push(`⚠️  Step ${step.order} missing back review`);
    });
  }

  // Check Process Section
  console.log('\n📋 Checking Process Section...');
  const processSection = await client.fetch(`*[_type == "processSection"][0]`);
  if (!processSection) {
    issues.push('❌ Process section not found');
  } else {
    console.log(`✅ Process section exists`);
    console.log(`   - Title: ${processSection.sectionTitle}`);
    console.log(`   - Linked steps: ${processSection.steps?.length || 0}`);
  }

  // Check Testimonials
  console.log('\n⭐ Checking Testimonials...');
  const testimonials = await client.fetch(`*[_type == "testimonial"]`);
  if (testimonials.length < 10) {
    warnings.push(`⚠️  Expected at least 10 testimonials, found ${testimonials.length}`);
  } else {
    console.log(`✅ Found ${testimonials.length} testimonials`);
    const featured = testimonials.filter((t: any) => t.featured);
    console.log(`   - Featured: ${featured.length}`);
  }

  // Check Gallery Items
  console.log('\n🖼️  Checking Gallery Items...');
  const galleryItems = await client.fetch(`*[_type == "galleryItem"]`);
  if (galleryItems.length < 6) {
    warnings.push(`⚠️  Expected at least 6 gallery items, found ${galleryItems.length}`);
  } else {
    console.log(`✅ Found ${galleryItems.length} gallery items`);
  }

  // Check Contact Section
  console.log('\n📞 Checking Contact Section...');
  const contact = await client.fetch(`*[_type == "contactSection"][0]`);
  if (!contact) {
    issues.push('❌ Contact section not found');
  } else {
    console.log(`✅ Contact section exists`);
    console.log(`   - Phone: ${contact.phone}`);
    console.log(`   - Email: ${contact.email}`);
  }

  // Check Footer
  console.log('\n🦶 Checking Footer...');
  const footer = await client.fetch(`*[_type == "footerSection"][0]`);
  if (!footer) {
    issues.push('❌ Footer section not found');
  } else {
    console.log(`✅ Footer exists`);
    console.log(`   - Social links: ${footer.socialLinks?.length || 0}`);
  }

  // Check Service Pages
  console.log('\n📄 Checking Service Pages...');
  const expectedPages = [
    'solar-panels-home',
    'battery-storage-home',
    'solar-panels-business',
    'battery-storage-business',
    'ev-charging',
    'case-studies',
  ];

  for (const slug of expectedPages) {
    const page = await client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug });
    if (!page) {
      issues.push(`❌ Page not found: /${slug}`);
    } else {
      console.log(`✅ /${slug}`);
      console.log(`   - Status: ${page.status}`);
      console.log(`   - Sections: ${page.sections?.length || 0}`);

      if (page.status !== 'published') {
        warnings.push(`⚠️  Page /${slug} is not published (status: ${page.status})`);
      }

      if (!page.sections || page.sections.length === 0) {
        issues.push(`❌ Page /${slug} has no sections`);
      }
    }
  }

  // Summary
  console.log('\n=====================================');
  console.log('📊 VERIFICATION SUMMARY');
  console.log('=====================================\n');

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ ALL CHECKS PASSED - Content is complete!\n');
  } else {
    if (issues.length > 0) {
      console.log(`❌ CRITICAL ISSUES (${issues.length}):`);
      issues.forEach(issue => console.log(`   ${issue}`));
      console.log('');
    }

    if (warnings.length > 0) {
      console.log(`⚠️  WARNINGS (${warnings.length}):`);
      warnings.forEach(warning => console.log(`   ${warning}`));
      console.log('');
    }
  }

  return { issues, warnings };
}

async function main() {
  try {
    const { issues } = await verifyContent();

    if (issues.length > 0) {
      console.log('❌ Verification failed with critical issues\n');
      process.exit(1);
    } else {
      console.log('✅ Verification complete!\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Fatal error during verification:', error);
    process.exit(1);
  }
}

main();

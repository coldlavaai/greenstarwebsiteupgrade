import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Greenstar Solar',
  description: 'Terms and Conditions for using Greenstar Solar website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#8cc63f]">Terms & Conditions</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Introduction</h2>
            <p>
              Welcome to Greenstar Solar. These Terms and Conditions govern your use of our website (greenstarsolar.co.uk) and the services we provide.
            </p>
            <p className="mt-4">
              By using our website, you accept these terms in full. If you disagree with any part of these terms, you must not use our website.
            </p>
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <p><strong>Greenstar Solar</strong></p>
              <p>Company No. 16038912</p>
              <p>Email: info@greenstarsolar.co.uk</p>
              <p>Phone: 023 8212 3763</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. Definitions</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>"We", "us", "our"</strong> refers to Greenstar Solar</li>
              <li><strong>"You", "your"</strong> refers to the user or visitor of our website</li>
              <li><strong>"Services"</strong> refers to solar panel installation, battery storage, EV charging, and related services</li>
              <li><strong>"Website"</strong> refers to greenstarsolar.co.uk</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Use of Website</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1 Permitted Use</h3>
            <p>You may use our website for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Viewing information about our services</li>
              <li>Requesting quotes and consultations</li>
              <li>Contacting us through the provided forms</li>
              <li>Using our chat widget for enquiries</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2 Prohibited Use</h3>
            <p>You must not:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Use the website in any unlawful manner or for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit any harmful code, viruses, or malicious software</li>
              <li>Use automated systems (bots) to scrape or download content</li>
              <li>Impersonate another person or entity</li>
              <li>Submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Information and Estimates</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Accuracy</h3>
            <p>
              We strive to ensure all information on our website is accurate and up-to-date. However, we cannot guarantee the accuracy, completeness, or timeliness of all content.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Estimates and Quotes</h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg mt-4">
              <p className="font-semibold text-yellow-200">Important Disclaimer:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                <li>Energy savings estimates are based on typical usage patterns and may vary significantly</li>
                <li>Actual savings depend on many factors including roof orientation, shading, weather, and energy consumption</li>
                <li>Solar panel performance can be affected by location, installation angle, and environmental conditions</li>
                <li>Return on investment (ROI) calculations are estimates only and not guarantees</li>
                <li>Government incentives and tariffs are subject to change</li>
                <li>All quotes are subject to survey and may change based on site conditions</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 No Guarantee of Results</h3>
            <p>
              While we use quality equipment and experienced installers, we cannot guarantee specific energy generation or savings. Actual results will vary based on individual circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Services and Installation</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.1 Quotations</h3>
            <p>
              Quotations provided through our website or chat widget are indicative only. Final pricing will be confirmed after a full site survey.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Contract Terms</h3>
            <p>
              Separate terms and conditions will apply to any installation contract you enter into with us. These will be provided before you commit to any service.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.3 Warranties</h3>
            <p>
              Warranty information for specific products and services will be provided in your installation contract. Manufacturer warranties are separate from our installation warranty.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Intellectual Property</h2>
            <p>
              Unless otherwise stated, we own the intellectual property rights in the website and material on the website, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Website design and layout</li>
              <li>Text content, images, and graphics</li>
              <li>Logos and branding</li>
              <li>Software and code</li>
            </ul>
            <p className="mt-4">
              You may view and print pages from the website for your own personal use, but you must not reproduce, modify, or distribute content without our permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Limitation of Liability</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.1 Website Use</h3>
            <p>
              We will not be liable for any loss or damage arising from:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Use of or inability to use our website</li>
              <li>Technical failures or interruptions</li>
              <li>Errors or omissions in website content</li>
              <li>Unauthorized access to our systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.2 Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.3 Maximum Liability</h3>
            <p>
              Nothing in these terms excludes or limits our liability for:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Death or personal injury caused by negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any liability which cannot be excluded under UK law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Data Protection</h2>
            <p>
              We process your personal data in accordance with UK data protection law. Please see our <a href="/privacy-policy" className="text-[#8cc63f] hover:underline">Privacy Policy</a> for full details on how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">9. Chat Widget (Sophie AI)</h2>
            <p>
              Our AI chat assistant is provided for your convenience to answer general questions about our services. Please note:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Responses are generated by AI and may occasionally be inaccurate</li>
              <li>The chat widget is not a substitute for professional advice</li>
              <li>Do not share sensitive personal information in the chat</li>
              <li>Conversations may be reviewed for quality and training purposes</li>
              <li>The chat service may be unavailable from time to time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">10. Changes to Terms</h2>
            <p>
              We may revise these terms from time to time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">11. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">12. Severability</h2>
            <p>
              If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">13. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] hover:underline">info@greenstarsolar.co.uk</a></p>
              <p><strong>Phone:</strong> 023 8212 3763</p>
              <p className="mt-2 text-sm text-gray-400">Registered in England and Wales | Company No. 16038912</p>
            </div>
          </section>

          <section className="mt-8 p-4 bg-[#8cc63f]/10 border border-[#8cc63f]/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
            <p className="text-xs text-gray-400">For information about how we handle your data, see our <a href="/privacy-policy" className="text-[#8cc63f] hover:underline">Privacy Policy</a> and <a href="/cookie-policy" className="text-[#8cc63f] hover:underline">Cookie Policy</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

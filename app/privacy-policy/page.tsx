import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import PrivacyHeader from './PrivacyHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy | Victorino Luxury Homes',
  description: 'How Victorino handles website enquiries, cookie preferences and third-party services.',
};

export default function PrivacyPolicy() {
  return <>
    <PrivacyHeader />
    <main className="vx-site-page vx-privacy">
      <div className="estate-wrap">
        <p className="estate-label">Victorino Luxury Homes · Your privacy</p>
        <h1>Privacy Policy</h1>
        <p className="vx-privacy__date">Last updated: 12 October 2026</p>
        <p className="vx-privacy__intro">This policy explains what happens to your information when you browse this website, prepare an enquiry, or contact Victorino Luxury Homes about a property in Goa.</p>
        <section><h2>1. Who to contact</h2><p>Victorino Luxury Homes is the business receiving property enquiries through this website. For questions about your information, or to request access, correction or deletion of information you have shared with our team, call <a href="tel:+919822144550">+91 98221 44550</a> or use our <Link href="/contact">contact page</Link>. Please do not include identity documents or other sensitive information in a website enquiry.</p></section>
        <section><h2>2. Information you choose to provide</h2><p>Our enquiry form asks for your name, email address and phone number. You may also provide your country of residence, the property you are interested in, a preferred visit date, an airport-transfer request and a message.</p><p>Reviewing an enquiry creates a draft in your browser. The form does not submit that draft to a website database, email service or Victorino server. Copying the draft places it on your device’s clipboard. The draft is not saved in local storage. It can remain in memory while the page is open or restored through browser navigation; reloading the page clears it.</p></section>
        <section><h2>3. What happens when you open WhatsApp</h2><p>Choosing “Continue in WhatsApp” opens a WhatsApp link containing your enquiry text. At that point the text is passed to WhatsApp through the link; it is no longer only in this website’s form. You must press Send in WhatsApp for our team to receive the message.</p><p>If you send an enquiry, our team uses the details to respond, discuss properties and coordinate requested visits or related arrangements. WhatsApp is a third-party service with its own privacy practices. Review <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp’s Privacy Policy</a> before using it.</p></section>
        <section><h2>4. Cookie preferences and device storage</h2><p>We save your cookie choice in your browser’s local storage under <code>victorino-consent-v1</code>. It records your choice, optional-category preferences and the time you made the choice. We treat it as current for 180 days, after which we ask you to choose again. You can also remove it by clearing this site’s browser storage.</p><ul><li><strong>Accept:</strong> permits optional analytics and marketing categories if they are introduced.</li><li><strong>Reject:</strong> keeps optional categories disabled.</li><li><strong>Essentials:</strong> keeps optional categories disabled while allowing essential functionality.</li></ul><p>No optional analytics, advertising pixels or marketing trackers are currently installed. You can change your choice using “Privacy settings” in the footer. If we introduce new services or change our data practices, we will update this policy and the relevant consent controls.</p></section>
        <section><h2>5. Technical requests and external services</h2><p>Your browser sends technical information, including its IP address and request headers, to the server that delivers this website. Hosting infrastructure may process request or security logs to deliver and protect the site; this website does not display or manage those logs.</p><p>Fonts are requested from Google Fonts, so your browser contacts Google’s font servers. Some property and editorial pages request images from external image providers, including Unsplash. These providers receive technical information needed to deliver their resources. Homepage background video and the homepage’s responsive photographs are served from this website.</p><p>External sites you open operate under their own policies. Cookie choices on this website do not control storage or processing on those sites.</p></section>
        <section><h2>6. Retention, sharing and security</h2><p>The enquiry form does not persist your draft in browser storage. Your consent choice stays in local storage until you clear it or replace it; its validity is checked against the 180-day period above.</p><p>Messages you send to our team are handled separately from the website, through the communication service you use. Contact us to ask how a particular enquiry is retained or to request its deletion. Service providers may process information to deliver the website or communications. We do not run an automated website process that sells enquiry information or adds you to a marketing list.</p><p>Avoid sending payment details, passwords or identity documents through enquiry messages. No website or messaging service can guarantee absolute security.</p></section>
        <section><h2>7. Your choices and policy updates</h2><p>You can browse without preparing an enquiry, choose Essentials or Reject, clear site storage, and contact our team about information you have shared. We may need to verify a request before discussing personal information. Any limits on a request will be explained when we respond.</p><p>Updates to this policy appear on this page with a revised date. Material changes to optional tracking should be reflected in the cookie banner before those services load.</p></section>
        <Link href="/" className="estate-text-link">Return to our homes <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
    <Footer />
  </>;
}

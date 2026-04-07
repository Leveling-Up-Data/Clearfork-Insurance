import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for SIG Clearfork Insurance Group website.",
  alternates: { canonical: "https://clearforkinsurance.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="mb-6 text-4xl font-bold text-[var(--navy)]">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>
            SIG Clearfork Insurance Group (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) is committed to protecting your privacy. This
            privacy policy explains how we collect, use, and protect your
            personal information when you visit our website.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect personal information you voluntarily provide, such
            as your name, email address, phone number, and insurance inquiry
            details when you submit a quote request or contact form.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries,
            provide insurance quotes, improve our services, and communicate
            with you about our products and services.
          </p>
          <h2>Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties.
            We may share your information with insurance carriers as necessary
            to provide quotes and coverage.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at{" "}
            <a href="mailto:clearfork@sig4you.com">clearfork@sig4you.com</a>{" "}
            or call <a href="tel:8172498683">(817) 249-8683</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

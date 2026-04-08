import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/page-shell";

const MAP_EMBED =
  "https://maps.google.com/maps?q=992+Winscott+Rd+Suite+B,+Benbrook,+TX+76126&z=14&output=embed";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <PageShell>
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <h2 className="text-3xl font-bold text-[var(--navy)] lg:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--slate)]">
            Ready to protect what matters most? Request your quote online, or
            reach our Benbrook team by phone or email.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-6 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Get a free quote
          </Link>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="space-y-5 text-sm">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--navy)]">Phone</p>
                <a
                  href="tel:8172498683"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  (817) 249-8683
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--navy)]">Email</p>
                <a
                  href="mailto:clearfork@sig4you.com"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  clearfork@sig4you.com
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--navy)]">Office</p>
                <p className="text-[var(--slate)]">
                  992 Winscott Rd Suite B
                  <br />
                  Benbrook, TX 76126
                </p>
              </div>
            </li>
          </ul>

          <div className="overflow-hidden rounded-xl border border-[var(--mist)] shadow-sm">
            <iframe
              title="SIG Clearfork Insurance Group office location"
              src={MAP_EMBED}
              className="h-56 w-full border-0 sm:h-72 lg:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </PageShell>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

const INSURANCE_TYPES = [
  "Home Insurance",
  "Auto Insurance",
  "Commercial Insurance",
  "Life Insurance",
  "Cyber Insurance",
  "Performance & Bid Bonds",
  "Other",
];

const MAP_EMBED =
  "https://maps.google.com/maps?q=992+Winscott+Rd+Suite+B,+Benbrook,+TX+76126&z=14&output=embed";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;

    let recaptchaToken: string | undefined;
    const win = window as unknown as {
      grecaptcha?: {
        execute: (key: string, opts: { action: string }) => Promise<string>;
      };
    };
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (win.grecaptcha && siteKey) {
      try {
        recaptchaToken = await win.grecaptcha.execute(siteKey, {
          action: "contact_submit",
        });
      } catch {
        /* reCAPTCHA may not be loaded yet */
      }
    }

    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      insuranceType: (form.elements.namedItem("insuranceType") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      recaptchaToken,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setError("Something went wrong. Please call us or try again.");
        return;
      }
      setSuccess(true);
      form.reset();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24">
      <PageShell>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-[var(--navy)] lg:text-4xl">
              Get Your Quote Today
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--slate)]">
              Ready to protect what matters most? Reach out for a personalized
              quote and guidance from our Benbrook team.
            </p>

            <ul className="mt-8 space-y-5 text-sm">
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

            <div className="mt-8 overflow-hidden rounded-xl border border-[var(--mist)] shadow-sm">
              <iframe
                title="SIG Clearfork Insurance Group office location"
                src={MAP_EMBED}
                className="h-56 w-full border-0 sm:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--mist)] bg-card p-6 shadow-sm sm:p-8">
            {success ? (
              <div
                className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
                role="status"
              >
                <p className="text-lg font-semibold text-[var(--navy)]">
                  Thank you!
                </p>
                <p className="mt-2 text-sm text-[var(--slate)]">
                  We&apos;ve received your message and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error ? (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    id="contact-firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="First name"
                    autoComplete="given-name"
                    className={cn(
                      "rounded-lg border border-[var(--mist)] px-4 py-3 text-sm",
                      "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    )}
                  />
                  <input
                    id="contact-lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last name"
                    autoComplete="family-name"
                    className={cn(
                      "rounded-lg border border-[var(--mist)] px-4 py-3 text-sm",
                      "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    )}
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  className={cn(
                    "w-full rounded-lg border border-[var(--mist)] px-4 py-3 text-sm",
                    "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                  )}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  autoComplete="tel"
                  className={cn(
                    "w-full rounded-lg border border-[var(--mist)] px-4 py-3 text-sm",
                    "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                  )}
                />
                <select
                  name="insuranceType"
                  required
                  className={cn(
                    "w-full rounded-lg border border-[var(--mist)] px-4 py-3 text-sm text-[var(--slate)]",
                    "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                  )}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Insurance type
                  </option>
                  {INSURANCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className={cn(
                    "w-full rounded-lg border border-[var(--mist)] px-4 py-3 text-sm",
                    "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                  )}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </PageShell>
    </section>
  );
}

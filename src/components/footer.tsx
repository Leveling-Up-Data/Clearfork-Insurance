import Link from "next/link";

const SERVICES = [
  { label: "Home/Auto", href: "/home-auto-insurance" },
  { label: "Commercial", href: "/commercial-insurance" },
  { label: "Life", href: "/life-insurance" },
  { label: "Bonds", href: "/bonds" },
  { label: "Cyber Insurance", href: "/cyber-insurance" },
];

const ABOUT = [
  { label: "Our Story", href: "/our-story" },
  { label: "Blog", href: "/blogs" },
];

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-[var(--green-primary)]">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <div className="mb-10 flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="shrink-0 lg:w-[280px]">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="SIG Clearfork Insurance Group" width={40} height={40} />
              <span className="text-sm font-bold leading-tight text-white">
                SIG Clearfork<br />Insurance Group
              </span>
            </Link>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-400">
              Your trusted insurance partner with 90 years of combined
              experience, providing comprehensive coverage solutions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/SIGClearforkInsurance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-gray-300 transition-colors hover:bg-[var(--green-primary)] hover:text-white"
                title="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/sig-clearfork-insurance-group"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-gray-300 transition-colors hover:bg-[var(--green-primary)] hover:text-white"
                title="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://g.page/clearfork-insurance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-gray-300 transition-colors hover:bg-[var(--green-primary)] hover:text-white"
                title="Google Maps"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C7.27 0 3.43 3.84 3.43 8.57c0 5.9 7.33 14.1 8.13 15.02a.56.56 0 00.88 0c.8-.92 8.13-9.12 8.13-15.02C20.57 3.84 16.73 0 12 0zm0 12.86a4.29 4.29 0 110-8.58 4.29 4.29 0 010 8.58z" />
                </svg>
              </a>
              <a
                href="https://www.yelp.com/biz/clearfork-insurance-group-benbrook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-gray-300 transition-colors hover:bg-[var(--green-primary)] hover:text-white"
                title="Yelp"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 7.285 7.285 0 011.96 3.2c.23.7-.06 1.44-.69 1.51h.4zm-8.92 5.79l.672-5.18c.124-.96 1.47-1.14 1.838-.24l1.91 4.69c.248.608-.104 1.3-.744 1.46a7.258 7.258 0 01-3.676-.73zm-1.4-7.39L5.15 8.6c-.856-.492-.578-1.77.38-1.828L10.69 6.4c.666-.04 1.195.506 1.114 1.17l-.452 3.648c-.09.712-1.02 1.058-1.516.424v-.048h.004zM7.3 13.62l4.8-1.96c.912-.372 1.776.64 1.3 1.53L10.65 18c-.33.618-1.2.624-1.48.02a7.27 7.27 0 01-.758-3.34c-.01-.4.15-.8.457-1.064l.432.004h-.001zm2.39-8.256a7.285 7.285 0 012.793-2.118c.64-.296 1.368.12 1.416.82l.244 5.216c.044.964-1.188 1.372-1.7.568L9.49 6.164c-.39-.616-.21-1.09.2-.8z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterGroup title="Insurance Services" links={SERVICES} />
            <FooterGroup title="About" links={ABOUT} />
            <div>
              <h4 className="mb-4 text-sm font-semibold text-[var(--green-primary)]">
                Contact Info
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <a href="tel:8172498683" className="transition-colors hover:text-white">
                    📞 (817) 249-8683
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:clearfork@sig4you.com"
                    className="transition-colors hover:text-white"
                  >
                    ✉️ clearfork@sig4you.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=992+Winscott+Rd+Suite+B+Benbrook+TX+76126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    📍 992 Winscott Rd Suite B<br />Benbrook, TX 76126
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SIG Clearfork Insurance Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-gray-300">
              Privacy Policy
            </Link>
            <a
              href="https://levelingupdata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              Powered by Leveling Up Data
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

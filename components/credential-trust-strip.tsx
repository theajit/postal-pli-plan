"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CredentialTrustStrip() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <aside className="credential-trust-strip" aria-label="PostalPlan professional credential">
      <div className="credential-trust-strip__inner">
        <span className="credential-trust-strip__badge" aria-hidden="true">✓</span>
        <p>
          <strong>Built with PLI domain training.</strong>{" "}
          15-hour Postal Life Insurance training completed and Licentiate examination passed (76%).
        </p>
        <Link href="/credentials/pli-training-certificate.pdf" target="_blank">
          View credential <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}

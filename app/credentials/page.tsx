import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Professional Credential',
  description: 'PostalPlan professional training credential and scope disclosure.',
  alternates: { canonical: '/credentials' },
};

export default function CredentialsPage() {
  return (
    <main className="plan-page">
      <header className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">प</span><span>PostalPlan</span></Link>
        <Link className="back-link" href="/#calculator">Open calculator</Link>
      </header>
      <article className="guide-article credential-page">
        <nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Professional credential</span></nav>
        <p className="eyebrow">PROFESSIONAL CREDENTIAL</p>
        <h1>Built with product knowledge, not just formulas</h1>
        <p className="lead">PostalPlan is independently developed by Ajit Satpathy. The credential below records completion of the prescribed Postal Life Insurance training and successful completion of the Licentiate examination.</p>

        <section>
          <p className="section-no">01</p>
          <h2>Credential summary</h2>
          <div className="license-grid credential-grid">
            <div><strong>Training</strong><p>15 hours of online Postal Life Insurance training completed on 12 September 2026.</p></div>
            <div><strong>Examination</strong><p>Licentiate examination passed on 12 September 2026 with a score of 76%.</p></div>
            <div><strong>Division</strong><p>Dhenkanal Division, Sambalpur Region, Odisha Circle.</p></div>
            <div><strong>Credential issuer</strong><p>Insurance Institute of India, under the training and examination framework prescribed by the Directorate of Postal Life Insurance.</p></div>
          </div>
        </section>

        <section>
          <p className="section-no">02</p>
          <h2>What this does - and does not - mean</h2>
          <div className="license-notice">
            <strong>Independent tool disclosure</strong>
            <p>This credential supports the developer's subject-matter familiarity. It does not make PostalPlan an official India Post calculator, quotation system or endorsed product. Final eligibility, premium, underwriting, bonus and policy benefits must be confirmed with India Post.</p>
          </div>
        </section>

        <section>
          <p className="section-no">03</p>
          <h2>Privacy-conscious public copy</h2>
          <p>The public credential copy is intentionally redacted to avoid publishing the agent identifier and verification QR code. The training date, examination result, division, region and circle remain visible as the relevant trust signals.</p>
        </section>
      </article>
    </main>
  );
}

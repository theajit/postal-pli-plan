import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy and Technology — How PostalPlan Handles Data',
  description: 'See the technology behind PostalPlan and how calculator inputs are processed locally without an account or application database.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <main className="plan-page"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">प</span><span>PostalPlan</span></Link><Link className="back-link" href="/#calculator">Open calculator</Link></header>
    <article className="guide-article"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Privacy and technology</span></nav><p className="eyebrow">TRANSPARENT BY DESIGN</p><h1>How PostalPlan handles your data</h1><p className="lead">Calculator values are processed in your browser. PostalPlan does not require an account and this application has no database or API endpoint that receives the values entered in the calculator.</p>
      <section><p className="section-no">01</p><h2>What happens when you calculate</h2><div className="data-flow" aria-label="Calculator data flow"><div><b>1</b><strong>You enter values</strong><span>Age, policy, sum assured and payment frequency stay in the active page.</span></div><i aria-hidden="true">→</i><div><b>2</b><strong>Your browser calculates</strong><span>JavaScript matches local premium tables and prepares the result on your device.</span></div><i aria-hidden="true">→</i><div><b>3</b><strong>You see the result</strong><span>The displayed estimate and generated PDF do not need an account or database save.</span></div></div></section>
      <section><p className="section-no">02</p><h2>Technology used</h2><div className="tech-grid"><div><strong>Next.js and React</strong><p>Build the interface and run the interactive calculator in the browser.</p></div><div><strong>TypeScript</strong><p>Adds type checks to calculation and policy-data code during development.</p></div><div><strong>Local policy tables</strong><p>Premium rows used by the calculator are bundled with the application code.</p></div><div><strong>jsPDF</strong><p>Creates a downloadable quotation PDF on the user’s device.</p></div><div><strong>No application database</strong><p>The current project contains no database client, account system or calculator-submission API.</p></div><div><strong>No form submission</strong><p>Changing calculator inputs updates in-memory React state instead of sending a form to a server.</p></div></div></section>
      <section><p className="section-no">03</p><h2>What this statement covers</h2><p>This describes the PostalPlan application code and its calculator workflow. Hosting providers may still process ordinary technical request data—such as an IP address or browser information—in infrastructure logs. Third-party resources loaded by the site may also receive normal web-request information. Those infrastructure activities are separate from PostalPlan storing calculator entries.</p><div className="warning"><strong>Accurate trust claim</strong><p>The architecture supports the statement that PostalPlan does not save calculator inputs in an application database. A technology list alone cannot prove that no network or hosting logs exist.</p></div></section>
    </article>
  </main>;
}

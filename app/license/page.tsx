import type { Metadata } from 'next';
import Link from 'next/link';

const repository = 'https://github.com/theajit/postal-pli-plan';

export const metadata: Metadata = {
  title: 'Open-Source License — GNU AGPL v3.0',
  description: 'Read how PostalPlan is licensed under the GNU Affero General Public License v3.0, including permissions, source-code obligations and warranty limitations.',
  alternates: { canonical: '/license' },
};

export default function LicensePage() {
  return <main className="plan-page">
    <header className="topbar"><Link className="brand" href="/"><span className="brand-mark">प</span><span>PostalPlan</span></Link><Link className="back-link" href="/#calculator">Open calculator</Link></header>
    <article className="guide-article license-page">
      <nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Open-source license</span></nav>
      <p className="eyebrow">OPEN SOURCE</p><h1>PostalPlan software license</h1>
      <p className="lead">PostalPlan is licensed under the GNU Affero General Public License version 3.0 (AGPL-3.0), a strong copyleft license designed to keep distributed and network-hosted modifications open.</p>
      <div className="license-notice"><strong>Plain-language overview</strong><p>This page helps explain the licence but is not legal advice and does not replace the complete AGPL-3.0 terms. If this summary and the full licence differ, the full licence controls.</p></div>
      <section><p className="section-no">01</p><h2>What you may do</h2><div className="license-grid"><div><strong>Use</strong><p>Run the software for personal, educational or commercial purposes.</p></div><div><strong>Study</strong><p>Inspect the public source code and understand how the calculator works.</p></div><div><strong>Modify</strong><p>Adapt the application, calculation logic, content or interface.</p></div><div><strong>Share</strong><p>Redistribute original or modified copies under the applicable terms.</p></div></div></section>
      <section><p className="section-no">02</p><h2>Important obligations</h2><ul className="check-list"><li>Keep copyright and licence notices with covered copies.</li><li>License covered modified versions under AGPL-3.0.</li><li>Provide the corresponding source code when distributing covered software.</li><li>If users interact with a modified version over a network, offer them access to its corresponding source code as required by the licence.</li><li>State significant changes made to modified versions.</li></ul></section>
      <section><p className="section-no">03</p><h2>Warranty and project independence</h2><p>The software is provided without warranty under the terms of AGPL-3.0. PostalPlan is an independent planning tool, is not affiliated with India Post and does not issue insurance policies or official quotations.</p></section>
      <section><p className="section-no">04</p><h2>Read the complete licence</h2><p>Review the authoritative licence text before using, modifying, hosting or redistributing the software.</p><div className="license-actions"><a href={`${repository}/blob/main/LICENSE`} rel="noreferrer">Read this repository’s LICENSE <span>↗</span></a><a href="https://www.gnu.org/licenses/agpl-3.0.html" rel="noreferrer">Read AGPL-3.0 on gnu.org <span>↗</span></a><a href={repository} rel="noreferrer">Browse the source code <span>↗</span></a></div></section>
      <section><p className="section-no">05</p><h2>Privacy is a separate promise</h2><p>An open-source licence defines permissions and obligations for the software. It does not itself guarantee how a deployed website handles visitor data. Read the separate <Link href="/privacy">privacy and technology explanation</Link> for PostalPlan’s calculator data flow.</p></section>
    </article>
  </main>;
}

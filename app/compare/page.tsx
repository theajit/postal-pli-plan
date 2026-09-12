import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonEngine } from './comparison-engine';

export const metadata: Metadata = {
  title: 'Compare PLI Policies or RPLI Policies',
  description: 'Compare two Postal Life Insurance policies or two Rural Postal Life Insurance policies side by side by term, entry age, premium basis and benefit pattern.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return <main className="plan-page"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">प</span><span>PostalPlan</span></Link><Link className="back-link" href="/#calculator">Open calculator</Link></header>
    <article className="guide-article comparison-page"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Compare policies</span></nav><p className="eyebrow">SIDE-BY-SIDE POLICY EXPLORER</p><h1>Compare PLI and RPLI policies</h1><p className="lead">Choose one insurance family, then inspect two policies side by side. PLI policies are compared only with PLI policies, while RPLI policies are compared only with RPLI policies.</p><ComparisonEngine /></article>
  </main>;
}

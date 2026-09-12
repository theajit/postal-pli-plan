import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { calculatorIdForPlan, findPlan, planPath, plans } from '@/lib/plans';
import { PolicyChecklist } from '@/components/policy-checklist';

type Props={params:Promise<{category:string;slug:string}>};
export function generateStaticParams(){return plans.map(({category,slug})=>({category,slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {category,slug}=await params; const plan=findPlan(category,slug); if(!plan)return {};
 const title=`${plan.name} Premium, Maturity & Policy Checklist`;
 const description=`${plan.description} Review benefits, premium details and a practical ${plan.category.toUpperCase()} policy checklist.`;
 return {title,description,alternates:{canonical:planPath(plan)},openGraph:{title,description,type:'website'}};
}
export default async function PlanPage({params}:Props){
 const {category,slug}=await params; const plan=findPlan(category,slug); if(!plan)notFound();
 const related=plans.filter(p=>p.category===plan.category&&p.slug!==plan.slug).slice(0,4);
 const schema={ '@context':'https://schema.org','@type':'FinancialProduct',name:plan.name,description:plan.description,provider:{'@type':'GovernmentOrganization',name:'Department of Posts, India'},areaServed:'IN' };
 return <main className="plan-page">
  <header className="topbar"><Link className="brand" href="/"><span className="brand-mark">प</span><span>PostalPlan</span></Link><Link className="back-link" href="/">Open calculator</Link></header>
  <article className="plan-article">
   <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{plan.category.toUpperCase()}</span><span>/</span><span>{plan.shortName}</span></nav>
   <p className="eyebrow">{plan.category.toUpperCase()} POLICY GUIDE</p><h1>{plan.name}</h1><p className="lead">{plan.description}</p>
   <div className="plan-cta"><div><strong>Estimate premium, maturity and gain</strong><span>Use the annexure-backed calculator with your age and sum assured.</span></div><Link href={`/?policy=${calculatorIdForPlan(plan)}#calculator`}>Calculate {plan.shortName} →</Link></div>
   <section><h2>Plan at a glance</h2><div className="facts"><div><span>Policy term</span><strong>{plan.term}</strong></div><div><span>Entry age</span><strong>{plan.entryAge}</strong></div><div><span>Sum assured basis</span><strong>{plan.sumAssured}</strong></div><div><span>Premium calculation</span><strong>{plan.premiumBasis}</strong></div></div></section>
   <section><h2>Key policy features</h2><ul className="feature-list">{plan.highlights.map(x=><li key={x}>{x}</li>)}</ul></section>
   <section><h2>Maturity and survival benefit</h2><p>{plan.payout}. Actual eligibility, bonuses, underwriting and final benefits remain subject to the policy rules and the quotation issued by India Post.</p></section>
   <section><h2>{plan.category.toUpperCase()} policyholder checklist</h2><PolicyChecklist family={plan.category.toUpperCase() as 'PLI' | 'RPLI'} /></section>
   <section className="seo-note"><h2>How the premium estimate works</h2><p>The calculator matches the selected age, maturity age or term against the supplied premium-table row. It scales the published rate to the chosen sum assured and applies the selected payment frequency, rebate and GST breakdown. If no matching table row is available, the result is explicitly labelled as an indicative estimate.</p></section>
   <aside className="related"><h2>Explore other {plan.category.toUpperCase()} plans</h2><div>{related.map(p=><Link key={p.slug} href={planPath(p)}>{p.shortName}<span>Read policy guide →</span></Link>)}</div></aside>
  </article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
 </main>;
}

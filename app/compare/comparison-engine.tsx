'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { planPath, plans } from '@/lib/plans';

type Family = 'pli' | 'rpli';

export function ComparisonEngine() {
  const [family, setFamily] = useState<Family>('pli');
  const familyPlans = useMemo(() => plans.filter(plan => plan.category === family), [family]);
  const [firstSlug, setFirstSlug] = useState('endowment-assurance-santosh');
  const [secondSlug, setSecondSlug] = useState('whole-life-assurance-suraksha');

  const switchFamily = (next: Family) => {
    const choices = plans.filter(plan => plan.category === next);
    setFamily(next);
    setFirstSlug(choices[0].slug);
    setSecondSlug(choices[1].slug);
  };

  const first = familyPlans.find(plan => plan.slug === firstSlug) ?? familyPlans[0];
  const second = familyPlans.find(plan => plan.slug === secondSlug) ?? familyPlans[1];
  const rows = [
    ['Policy type', first.description, second.description],
    ['Policy term', first.term, second.term],
    ['Entry age', first.entryAge, second.entryAge],
    ['Sum assured basis', first.sumAssured, second.sumAssured],
    ['Premium basis', first.premiumBasis, second.premiumBasis],
    ['Benefit pattern', first.payout, second.payout],
  ];

  return <>
    <div className="family-switch" aria-label="Select insurance family">
      <button className={family === 'pli' ? 'active' : ''} onClick={() => switchFamily('pli')} aria-pressed={family === 'pli'}>Compare PLI policies</button>
      <button className={family === 'rpli' ? 'active' : ''} onClick={() => switchFamily('rpli')} aria-pressed={family === 'rpli'}>Compare RPLI policies</button>
    </div>
    <p className="family-rule"><strong>{family.toUpperCase()} comparison:</strong> only policies in the same insurance family can be selected.</p>
    <div className="comparison-selectors">
      <label>First policy<select value={first.slug} onChange={event => setFirstSlug(event.target.value)}>{familyPlans.map(plan => <option key={plan.slug} value={plan.slug} disabled={plan.slug === second.slug}>{plan.shortName} — {plan.name}</option>)}</select></label>
      <span aria-hidden="true">VS</span>
      <label>Second policy<select value={second.slug} onChange={event => setSecondSlug(event.target.value)}>{familyPlans.map(plan => <option key={plan.slug} value={plan.slug} disabled={plan.slug === first.slug}>{plan.shortName} — {plan.name}</option>)}</select></label>
    </div>
    <div className="comparison-table" role="table" aria-label={`${first.shortName} and ${second.shortName} comparison`}>
      <div className="comparison-row comparison-head" role="row"><strong role="columnheader">Compare</strong><div role="columnheader"><small>{family.toUpperCase()}</small><b>{first.shortName}</b></div><div role="columnheader"><small>{family.toUpperCase()}</small><b>{second.shortName}</b></div></div>
      {rows.map(([label, a, b]) => <div className="comparison-row" role="row" key={label}><strong role="rowheader">{label}</strong><p role="cell">{a}</p><p role="cell">{b}</p></div>)}
      <div className="comparison-row comparison-actions" role="row"><strong role="rowheader">Detailed guide</strong><Link role="cell" href={planPath(first)}>View {first.shortName}</Link><Link role="cell" href={planPath(second)}>View {second.shortName}</Link></div>
    </div>
    <p className="comparison-note">This comparison explains structural differences; it does not rank policies or recommend one. Suitability depends on eligibility, cover needs, affordability and official policy conditions.</p>
  </>;
}

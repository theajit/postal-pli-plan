'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { planForCalculatorId, planPath, plans as planGuides } from '@/lib/plans';

type IconName='calculator'|'chevron'|'rupee'|'landmark'|'shield'|'trend';
function Icon({name,size=20}:{name:IconName;size?:number}){
 const paths:Record<IconName,React.ReactNode>={
  calculator:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/></>,
  chevron:<path d="m6 9 6 6 6-6"/>,
  rupee:<><path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a5 5 0 0 0 0-10"/></>,
  landmark:<><path d="m3 10 9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/></>,
  shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></>,
  trend:<><path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/></>
 };
 return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const policies = [
  { id:'santosh',group:'PLI',name:'Endowment Assurance',hindi:'Santosh',bonus:52,base:4.65 },
  { id:'sumangal',group:'PLI',name:'Anticipated Endowment',hindi:'Sumangal',bonus:48,base:5.15 },
  { id:'suraksha',group:'PLI',name:'Whole Life Assurance',hindi:'Suraksha',bonus:76,base:3.2 },
  { id:'suvidha',group:'PLI',name:'Convertible Whole Life',hindi:'Suvidha',bonus:76,base:3.55 },
  { id:'yugal',group:'PLI',name:'Joint Life Assurance',hindi:'Yugal Suraksha',bonus:52,base:5.05 },
  { id:'bal',group:'PLI',name:'Children Policy',hindi:'Bal Jeevan Bima',bonus:52,base:4.85 },
  { id:'gram-santosh',group:'RPLI',name:'Endowment Assurance',hindi:'Gram Santosh',bonus:48,base:4.55 },
  { id:'gram-suraksha',group:'RPLI',name:'Whole Life Assurance',hindi:'Gram Suraksha',bonus:60,base:3.05 },
  { id:'gram-suvidha',group:'RPLI',name:'Convertible Whole Life',hindi:'Gram Suvidha',bonus:60,base:3.35 },
  { id:'gram-priya',group:'RPLI',name:'10 Year Rural PLI',hindi:'Gram Priya',bonus:45,base:8.9,fixedTerm:10 },
  { id:'gram-sumangal',group:'RPLI',name:'Anticipated Endowment',hindi:'Gram Sumangal',bonus:45,base:5 },
  { id:'gram-bal',group:'RPLI',name:'Children Policy',hindi:'Gram Bal Jeevan Bima',bonus:48,base:4.7 },
];
const frequencies={Monthly:12,Quarterly:4,'Half-yearly':2,Yearly:1} as const;
type Frequency=keyof typeof frequencies;
const money=(v:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v);

// Official tables quote premiums for Rs 5,000 sum assured. Values are monthly.
const eaRows:Record<number,number[]>={
  35:[26,27,29,32,35,38,42,47,53,61,72,86],
  40:[19,20,21,22,24,26,27,29,32,35,38,42,47,53,61,72,86],
  45:[15,16,16,17,18,19,20,21,22,24,26,28,30,32,35,38,42,47,53,61,72,87],
  50:[12,13,13,14,14,15,16,16,17,18,19,20,21,23,24,26,28,30,32,35,39,43,48,54,62,72,87],
  55:[10,10,11,11,12,12,13,13,14,14,15,16,17,17,18,19,20,22,23,25,26,28,30,33,36,39,43,48,55,63,73,88],
  58:[9,10,10,10,10,11,11,12,12,13,13,14,15,15,16,17,18,19,20,21,22,23,25,27,29,31,33,36,40,44,49,55,65,75,89],
  60:[9,9,9,10,10,10,11,11,12,12,13,13,14,14,15,15,16,17,18,19,20,21,22,24,25,27,29,31,34,37,40,44,52,59,66,76,90]
};
const wlaRows:Record<number,number[]>={
  55:[8,8,8,8,9,9,9,9,10,10,11,11,12,12,13,14,14,15,16,17,18,19,21,23,25,27,30,33,38,42,49,59],
  58:[7,8,8,8,8,9,9,9,9,10,10,11,11,12,12,13,13,14,15,16,16,17,18,20,21,23,24,27,29,32,35,40,49,57,67],
  60:[7,7,8,8,8,8,9,9,9,9,10,10,11,11,12,12,13,13,14,15,16,16,17,18,19,21,22,24,26,28,30,33,41,46,52,59,70]
};
const rpliEaRows:Record<number,number[]>={
  35:[5.1,5.45,5.85,6.35,6.95,7.6,8.4,9.4,10.65,12.2,14.3,17.25],
  40:[3.75,3.95,4.2,4.45,4.75,5.1,5.45,5.85,6.35,6.95,7.6,8.4,9.4,10.65,12.2,14.3,17.25],
  45:[2.95,3.1,3.25,3.4,3.55,3.75,3.95,4.2,4.45,4.75,5.1,5.5,5.9,6.4,6.95,7.65,8.45,9.45,10.65,12.25,14.35,17.3],
  50:[2.4,2.5,2.6,2.7,2.8,2.95,3.1,3.25,3.4,3.6,3.8,4,4.25,4.5,4.8,5.15,5.5,5.95,6.45,7,7.7,8.5,9.5,10.75,12.35,14.45,17.4],
  55:[2,2.05,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.85,3,3.15,3.3,3.45,3.65,3.85,4.05,4.3,4.6,4.9,5.2,5.6,6.05,6.55,7.15,7.8,8.65,9.65,10.9,12.5,14.6,17.55],
  58:[1.85,1.9,1.95,2,2.05,2.15,2.25,2.35,2.45,2.55,2.65,2.75,2.9,3.05,3.2,3.35,3.5,3.7,3.9,4.15,4.4,4.65,4.95,5.3,5.7,6.15,6.65,7.25,7.95,8.75,9.75,11,13.06,15.07,17.84],
  60:[1.75,1.8,1.85,1.9,1.95,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.05,3.2,3.35,3.55,3.75,3.95,4.2,4.45,4.7,5,5.35,5.75,6.2,6.75,7.3,8,8.85,10.49,11.71,13.24,15.25,18.01]
};
const gramPriyaMonthly=[9.7,9.7,9.7,9.7,9.7,9.7,9.7,9.75,9.75,9.75,9.75,9.75,9.8,9.8,9.8,9.8,9.85,9.85,9.85,9.85,9.85,9.95,9.95,10,10.05,10.15];
const gramSumangal15=[6.55,6.55,6.55,6.55,6.55,6.55,6.55,6.55,6.55,6.55,6.55,6.6,6.6,6.6,6.6,6.65,6.65,6.7,6.7,6.75,6.75];
const gramSumangal20=[4.95,4.95,4.95,4.95,4.95,4.95,4.95,5,5,5,5,5,5.05,5.05,5.05,5.1,5.1,5.15,5.15,5.2,5.25,5.3];
const officialMonthlyRate=(id:string,entry:number,end:number,term:number)=>{
  if(id==='santosh'){const row=eaRows[end]; return row?.[entry-19];}
  if(id==='suraksha'){const row=wlaRows[end]; return row?.[entry-19];}
  if(id==='sumangal'&&term===15) return entry<=36?33:entry<=42?34:entry<=45?35:undefined;
  if(id==='sumangal'&&term===20) return entry<=33?25:entry<=39?26:entry===40?27:undefined;
  if(id==='gram-santosh'){const row=rpliEaRows[end]; const rate=row?.[entry-19]; return rate===undefined?undefined:rate*5;}
  if(id==='gram-sumangal'&&term===15){const rate=gramSumangal15[entry-19]; return rate===undefined?undefined:rate*5;}
  if(id==='gram-sumangal'&&term===20){const rate=gramSumangal20[entry-19]; return rate===undefined?undefined:rate*5;}
  if(id==='gram-priya'){const rate=gramPriyaMonthly[entry-20]; return rate===undefined?undefined:rate*5;}
  return undefined;
};

export default function Home(){
 const [policyId,setPolicyId]=useState('santosh'),[age,setAge]=useState(30),[maturityAge,setMaturityAge]=useState(55),[sumAssured,setSumAssured]=useState(1000000),[frequency,setFrequency]=useState<Frequency>('Monthly');
 const policy=policies.find(p=>p.id===policyId)!; const term=policy.fixedTerm??Math.max(5,maturityAge-age);
 const activeGuide=planForCalculatorId(policyId);
 useEffect(()=>{const requested=new URLSearchParams(window.location.search).get('policy');if(requested&&policies.some(p=>p.id===requested))setPolicyId(requested);},[]);
 const r=useMemo(()=>{const payments=term*frequencies[frequency],tableRate=officialMonthlyRate(policy.id,age,maturityAge,term),ageLoad=1+Math.max(0,age-20)*.012,termFactor=Math.pow(20/term,.72),monthly=tableRate!==undefined?tableRate*(sumAssured/5000):(sumAssured/1000)*policy.base*ageLoad*termFactor,discount=frequency==='Yearly'?.97:frequency==='Half-yearly'?.985:frequency==='Quarterly'?.995:1,base=monthly*(12/frequencies[frequency])*discount,rebate=Math.floor(sumAssured/20000)*(12/frequencies[frequency]),taxable=Math.max(0,base-rebate),firstYear=taxable*1.045,renewal=taxable*1.0225,yearCount=frequencies[frequency],totalPremium=firstYear*yearCount+renewal*Math.max(0,payments-yearCount),bonus=term>=5?(sumAssured/1000)*policy.bonus*term:0,maturity=sumAssured+bonus;return{payments,firstYear,renewal,totalPremium,bonus,maturity,gain:maturity-totalPremium,official:tableRate!==undefined};},[age,frequency,maturityAge,policy,sumAssured,term]);
 return <main className="min-h-screen">
  <header className="topbar"><div className="brand"><span className="brand-mark">प</span><span>PostalPlan</span></div><nav className="home-nav"><Link href="/guides/postalplan-calculator-user-guide">User guide</Link><span className="secure"><Icon name="shield" size={16}/> Private &amp; secure calculation</span></nav></header>
  <section className="intro"><p className="eyebrow">PLI &amp; RPLI CALCULATOR</p><h1>Plan today. <em>Prosper tomorrow.</em></h1><p>Estimate your premium, maturity amount and total gain in a few simple steps.</p></section>
  <section className="workspace" id="calculator"><div className="form-card">
   <div className="card-title"><span><Icon name="calculator"/></span><div><h2>Policy details</h2><p>Enter details to see your estimate instantly</p></div></div>
   <div className="policy-label-row"><label>Choose policy</label>{activeGuide&&<Link className="selected-guide" href={planPath(activeGuide)}>Policy guide <span>↗</span></Link>}</div><div className="select-wrap"><select value={policyId} onChange={e=>setPolicyId(e.target.value)}><optgroup label="Postal Life Insurance (PLI)">{policies.filter(p=>p.group==='PLI').map(p=><option key={p.id} value={p.id}>{p.name} ({p.hindi})</option>)}</optgroup><optgroup label="Rural Postal Life Insurance (RPLI)">{policies.filter(p=>p.group==='RPLI').map(p=><option key={p.id} value={p.id}>{p.name} ({p.hindi})</option>)}</optgroup></select><Icon name="chevron" size={18}/></div>
   <div className="field-grid"><div><label>Current age</label><div className="suffix-input"><input type="number" min="19" max="55" value={age} onChange={e=>setAge(+e.target.value)}/><span>years</span></div></div><div><label>{policy.fixedTerm?'Policy term':'Maturity age'}</label><div className="suffix-input"><input type="number" min={age+5} max="80" disabled={!!policy.fixedTerm} value={policy.fixedTerm??maturityAge} onChange={e=>setMaturityAge(+e.target.value)}/><span>years</span></div></div></div>
   <label>Sum assured</label><div className="money-input"><Icon name="rupee" size={18}/><input aria-label="Sum assured" type="number" step="10000" min="20000" value={sumAssured} onChange={e=>setSumAssured(+e.target.value)}/></div><input className="range" aria-label="Sum assured slider" type="range" min="50000" max="5000000" step="50000" value={sumAssured} onChange={e=>setSumAssured(+e.target.value)}/><div className="range-labels"><span>₹50,000</span><span>₹50,00,000</span></div>
   <label>Payment frequency</label><div className="segments">{Object.keys(frequencies).map(x=><button key={x} className={frequency===x?'active':''} onClick={()=>setFrequency(x as Frequency)}>{x}</button>)}</div><div className={`notice ${r.official?'verified':''}`}><Icon name="shield" size={17}/><span>{r.official?<><strong>Official annexure rate found</strong> for this age and maturity combination.</>:<>No matching table row supplied; premium uses an <strong>indicative estimate</strong>.</>} Bonus: ₹{policy.bonus} per ₹1,000/year.</span></div>
  </div><div className="results-card">
   <div className="result-head"><div><p>Your estimated maturity</p><h2>{money(r.maturity)}</h2></div><span><Icon name="trend" size={24}/></span></div><div className="breakdown"><div><span>Sum assured</span><strong>{money(sumAssured)}</strong></div><div><span>Accrued bonus</span><strong className="green">+ {money(r.bonus)}</strong></div></div><div className="bar"><span style={{width:`${Math.min(100,sumAssured/r.maturity*100)}%`}}/></div><div className="legend"><span><i className="navy"/>Sum assured</span><span><i className="gold"/>Bonus</span></div>
   <div className="premium-block"><div><span>{frequency} premium · Year 1</span><strong>{money(r.firstYear)}</strong></div><div><span>Year 2 onwards</span><strong>{money(r.renewal)}</strong></div></div><div className="stats"><div><span>Policy term</span><strong>{term} years</strong></div><div><span>Total installments</span><strong>{r.payments}</strong></div><div><span>Total premium</span><strong>{money(r.totalPremium)}</strong></div></div><div className="gain"><span><Icon name="landmark"/>Net gain over premium</span><strong>{money(r.gain)}</strong></div><p className="disclaimer">Indicative planning estimate, not an official quotation. Premiums may differ by policy rules, age and underwriting.</p>
  </div></section>
  <section className="guides"><p className="eyebrow">POLICY GUIDES</p><h2>Understand every PLI &amp; RPLI plan</h2><p>Explore eligibility, terms, benefits and premium-table details from the supplied policy documents.</p><div className="guide-grid">{planGuides.map(plan=><Link key={plan.slug} href={planPath(plan)}><small>{plan.category.toUpperCase()}</small><strong>{plan.shortName}</strong><span>{plan.name}</span><b>View plan →</b></Link>)}</div></section>
  <footer>Designed for smarter Postal Life Insurance planning · No data is stored</footer>
 </main>;
}

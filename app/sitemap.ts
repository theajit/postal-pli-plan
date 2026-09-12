import type { MetadataRoute } from 'next';
import { planPath, plans } from '@/lib/plans';
export default function sitemap():MetadataRoute.Sitemap{
 const base=(process.env.NEXT_PUBLIC_SITE_URL??'http://localhost:3000').replace(/\/$/,'');
 return [{url:base,changeFrequency:'monthly',priority:1},{url:`${base}/compare`,changeFrequency:'monthly',priority:.9},{url:`${base}/privacy`,changeFrequency:'monthly',priority:.75},{url:`${base}/guides/postalplan-calculator-user-guide`,changeFrequency:'monthly',priority:.85},...plans.map(plan=>({url:`${base}${planPath(plan)}`,changeFrequency:'monthly' as const,priority:.8}))];
}

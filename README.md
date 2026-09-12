# PostalPlan — PLI & RPLI Calculator

PostalPlan is an open-source planning tool for exploring Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI) policies. It helps users estimate premiums, projected bonuses, maturity values and net gain, then compare policies within the same insurance family.

> PostalPlan is an independent educational tool. It is not affiliated with or operated by India Post. Always confirm eligibility, premiums, bonus rates and policy benefits with an authorised India Post representative.

## Features

- PLI and RPLI premium, bonus, maturity and gain estimates
- Clear indication when an official annexure rate is available or an estimate is indicative
- Side-by-side policy comparison
  - PLI policies can be compared only with other PLI policies
  - RPLI policies can be compared only with other RPLI policies
- Individual guides for every supported policy
- Practical PLI/RPLI policyholder checklist
- Downloadable PDF planning quotation
- Responsive, accessible interface
- Search-friendly static policy pages and sitemap

## Supported policy guides

### Postal Life Insurance (PLI)

- Santosh — Endowment Assurance
- Suraksha — Whole Life Assurance
- Suvidha — Convertible Whole Life Assurance
- Sumangal — Anticipated Endowment Assurance
- Yugal Suraksha — Joint Life Assurance
- Bal Jeevan Bima — Children Policy

### Rural Postal Life Insurance (RPLI)

- Gram Santosh — Endowment Assurance
- Gram Suraksha — Whole Life Assurance
- Gram Suvidha — Convertible Whole Life Assurance
- Gram Sumangal — Anticipated Endowment Assurance
- Gram Priya — 10-Year Rural PLI
- Gram Bal Jeevan Bima — Children Policy

## Privacy by design

Calculator inputs are held in the active page and processed by browser-side JavaScript. This project has no application database, user-account system or calculator-submission API. PDF quotations are generated on the user's device with jsPDF.

The source code is public so anyone can inspect the data flow and verify how the calculator works. Hosting providers and third-party web resources may still process ordinary technical request information, such as IP addresses or browser details, in their infrastructure logs. See the in-app `/privacy` page for the complete explanation.

## Technology

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [jsPDF](https://github.com/parallax/jsPDF)
- CSS with responsive layouts

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
git clone https://github.com/theajit/postal-pli-plan.git
cd postal-pli-plan
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Create a production build with:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome. You can help by:

- Reporting an incorrect policy detail or premium-table row
- Improving accessibility, design or mobile usability
- Adding tests and calculation validation
- Improving policy comparisons and educational content
- Fixing documentation or SEO content

Please [open an issue](https://github.com/theajit/postal-pli-plan/issues) to describe a problem or proposed enhancement. Pull requests should be focused, explain the reason for the change and include validation steps. For policy-data changes, cite an authoritative India Post source.

## Official references

- [Postal Life Insurance (PLI) — India Post](https://www.indiapost.gov.in/insurance-services/pli)
- [Rural Postal Life Insurance (RPLI) — India Post](https://www.indiapost.gov.in/insurance-services/rpli)

## Accuracy and limitations

PostalPlan provides planning estimates, not an insurance quotation or financial recommendation. Premium tables, eligibility, medical requirements, rebates, tax treatment, bonus declarations and policy rules may change. Refer to current India Post documentation before making a decision.

## License

No licence file is currently included. Until a licence is added, copyright remains with the repository owner and normal GitHub viewing and contribution permissions apply.

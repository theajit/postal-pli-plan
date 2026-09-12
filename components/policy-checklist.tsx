type PolicyChecklistProps = { family?: 'PLI' | 'RPLI' };

const checklistItems = [
  'Store the original policy bond securely and keep it protected from loss or damage.',
  'Tell a trusted family member or nominee where the policy bond is kept.',
  'Review the policy schedule on the first page and confirm that the recorded details are correct.',
  'Write down the policy number, premium amount and every premium due date in a reliable reminder system.',
  'Save the telephone number and contact details of the post office that services the policy.',
  'Keep the PLI customer support or information-centre details within easy reach.',
  'Notify the post office promptly whenever the postal address, phone number or email address changes.',
  'Pay each premium by its due date even when a premium notice has not arrived.',
  'Confirm that a nominee is registered under the policy and keep the nomination details current.',
];

export function PolicyChecklist({ family }: PolicyChecklistProps) {
  const label = family ? `${family} policy` : 'PLI and RPLI policy';
  return <div className="policy-checklist">
    <p className="checklist-intro">Use this practical {label} checklist after issue and revisit it whenever your contact or nomination details change. Ticking an item is only a personal reminder and does not update India Post records.</p>
    <ol>{checklistItems.map((item, index) => {
      const id = `policy-check-${family?.toLowerCase() ?? 'all'}-${index + 1}`;
      return <li key={item}><span className="checklist-number" aria-hidden="true">{index + 1}</span><label htmlFor={id}>{item}</label><input id={id} type="checkbox" aria-label={`Completed: ${item}`} /></li>;
    })}</ol>
    <p className="checklist-source">Based on the customer checklist published by the Department of Posts. For current service instructions, refer to the official <a href="https://www.indiapost.gov.in/insurance-services/pli" rel="noreferrer">PLI</a> or <a href="https://www.indiapost.gov.in/insurance-services/rpli" rel="noreferrer">RPLI</a> page.</p>
  </div>;
}

import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { company } from '../data/site'

const conversationSteps = [
  { number: '01', title: 'Share the pressure', detail: 'Workflow, volume, and turn times' },
  { number: '02', title: 'Shape the plan', detail: 'Scope, ownership, and controls' },
  { number: '03', title: 'Create capacity', detail: 'A launch built around your team' },
]

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact-ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow eyebrow--light"><span /> Start a conversation</p>
          <h2 id="contact-heading">Your next growth move starts with one clear workflow.</h2>
          <p>Bring us the process under pressure. We’ll help shape a right-sized operating plan around your team, turnaround goals, and volume.</p>
        </div>

        <div className="contact-action">
          <p className="contact-action__label"><span><i /></span> A practical first step</p>
          <div className="contact-journey">
            {conversationSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </article>
            ))}
          </div>
          <a className="contact-cta" href={`mailto:${company.email}?subject=Invicto%20website%20inquiry`}>
            <span>Start with your workflow</span>
            <i><ArrowUpRight size={20} aria-hidden="true" /></i>
          </a>
          <small className="contact-action__note">A direct conversation with our team—no generic sales handoff.</small>
        </div>

        <div className="contact-details">
          <p><span><i /></span> Direct lines</p>
          <div>
            <a href={`mailto:${company.email}`}><Mail size={17} />{company.email}</a>
            <a href={`tel:${company.phoneHref}`}><Phone size={17} />{company.phone}</a>
          </div>
          <span className="contact-presence">Dallas · Bengaluru · Supporting U.S. operations</span>
        </div>
      </div>
    </section>
  )
}

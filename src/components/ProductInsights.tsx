import { SiteLink } from './SiteLink'
import { ArrowRight, ShieldCheck, ReceiptText } from 'lucide-react'
import { GridBoxBackground } from './ui/GridBoxBackground'
import './product-insights.css'

const titleCapabilities = [
  { title: 'Review the source records', text: 'Upload the order’s documents and review extracted assessor, tax, deed, vesting, mortgage, and lien information. Verify the editable fields against the source before moving forward.', output: 'Source-verified information' },
  { title: 'Prepare the working file', text: 'Bring property details, recorded instruments, searched names, and comments into Search Notes, Typing Assist, and the typed report.', output: 'Consistent working outputs' },
  { title: 'Resolve the findings', text: 'Run the checks for the selected search type. Follow a finding to the relevant field, examine the evidence, correct the record, and rerun QC.', output: 'Focused quality review' },
  { title: 'Complete the delivery package', text: 'Review outstanding exceptions and finish the cost worksheet before preparing the file for delivery. Your team remains responsible for the final review.', output: 'Reviewer-led completion' },
]

export function ProductInsights({ kind }: { kind: 'title' | 'title-workflow' | 'tax' }) {
  if (kind === 'title') return (
    <div className="titleflow-insights">
      <figure className="titleflow-film">
        <div className="titleflow-film__bar"><span><i /> TITLEFLOW AI / INSIDE THE WORKFLOW</span><span>04 MIN WALKTHROUGH</span></div>
        <video controls playsInline preload="none" poster="/videos/titleflow-poster.jpg" aria-label="TitleFlow AI client presentation: extraction, reports, quality review, and delivery">
          <source src="/videos/titleflow-ai-presentation.mp4" type="video/mp4" />
          Your browser does not support this video. <SiteLink href="/videos/titleflow-ai-presentation.mp4">Download the presentation</SiteLink>.
        </video>
        <figcaption>See the application at work—from document upload to the delivery package. The workflow details below provide a text overview.</figcaption>
      </figure>
    </div>
  )

  if (kind === 'title-workflow') return (
      <section className="titleflow-editorial" aria-labelledby="titleflow-workflow-heading">
        <GridBoxBackground className="titleflow-editorial__grid" cellCount={600} />
        <div className="container titleflow-editorial__workflow">
          <header>
            <p className="titleflow-kicker">THE WORKING PROCESS</p>
            <h2 id="titleflow-workflow-heading">The document is just<br />the beginning.</h2>
            <p>From the first document to the final review, each stage has a practical purpose.</p>
          </header>
          <ol className="titleflow-workflow">
            {titleCapabilities.map(({ title, text, output }, index) => <li key={title}>
              <span className="titleflow-workflow__number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p><small>{output}</small></div>
            </li>)}
          </ol>
        </div>
        <div className="titleflow-review-band"><div className="container titleflow-review-note">
          <div><p className="titleflow-kicker">BUILT FOR THE SEARCH TYPE</p><h3>The right checks for the order.</h3><p>Product Prompts adapt the review criteria to the work being performed.</p><ul aria-label="Supported search types"><li>Full Title</li><li>Two Owner</li><li>Current Owner</li><li>Internal Updates</li><li>External Updates</li></ul></div>
          <div><p className="titleflow-kicker">REVIEWER CONTROL</p><h3>Evidence first. Judgment stays with you.</h3><p>AI surfaces findings; your team verifies them against the source. Reviewed failure patterns can inform prompt updates and fresh checks—not an unreviewed release decision.</p><SiteLink href="#contact">Discuss your title workflow <ArrowRight size={17} aria-hidden="true" /></SiteLink></div>
        </div></div>
        <p className="container titleflow-roadmap"><strong>Looking ahead</strong> Organization-wide visibility and adaptive AI processing are planned enhancements shown in the walkthrough.</p>
      </section>
  )

  return (
    <section className="section taxflow-section" id="tax-flow" aria-labelledby="taxflow-heading">
      <div className="container">
        <div className="product-heading-v2">
          <div><p className="eyebrow"><span /> Product 03 · Tax Flow</p><h2 id="taxflow-heading">Three details.<br />A clearer tax picture.</h2></div>
          <div><p>A property-tax retrieval application built for U.S. mortgage operations. Supply the parcel number, state, and county, and Tax Flow automates the lookup of available property-tax information from supported sources.</p><SiteLink href="#contact">Discuss your county coverage <ArrowRight size={17} aria-hidden="true" /></SiteLink></div>
        </div>
        <div className="taxflow-workspace">
          <div className="taxflow-lookup" aria-label="Illustration of the Tax Flow lookup process">
            <div className="taxflow-lookup__head"><ReceiptText size={23} aria-hidden="true" /><strong>Tax Flow</strong><span>WORKFLOW PREVIEW</span></div>
            <p className="taxflow-overline">START WITH THE PROPERTY</p>
            <div className="taxflow-fields"><div><small>Parcel number</small><strong>Your property’s parcel ID</strong></div><div><small>State</small><strong>Select state</strong></div><div><small>County</small><strong>Select county</strong></div></div>
            <div className="taxflow-transfer" aria-hidden="true"><i /><span>Automated source lookup</span><i /></div>
            <div className="taxflow-result"><ShieldCheck size={24} aria-hidden="true" /><div><strong>Property-tax information</strong><p>Available source records, ready for your team to review.</p></div></div>
            <small className="taxflow-preview-note">Illustrative workflow. This website does not run a live property search.</small>
          </div>
          <div className="taxflow-steps">
            {[
              ['01', 'Identify the right property', 'The parcel number identifies the property; state and county establish the jurisdiction for the lookup.'],
              ['02', 'Let retrieval do the repetitive work', 'Automated browser-based lookup handles the search on supported tax sources, reducing the need to navigate each source manually.'],
              ['03', 'Review with the source in mind', 'Your team checks the returned information for the mortgage file. Available fields and freshness depend on the underlying source.'],
            ].map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
        <p className="taxflow-coverage">Planning a rollout? Share your states, counties, and required tax fields so we can confirm source support and the right workflow for your team.</p>
      </div>
    </section>
  )
}

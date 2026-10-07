import { useRef, useState } from 'react'

const screens = [
  { file: '02-chain-of-title', label: 'Chain of title', caption: 'Review recorded deeds alongside the source document, with the chain of title organized in one workspace.' },
  { file: '03-mortgages-and-assignments', label: 'Mortgages', caption: 'Review open mortgages and related assignments beside the supporting instrument.' },
  { file: '04-tax-review', label: 'Tax review', caption: 'Compare tax installments, payment status, due dates, and balances against the supporting record.' },
  { file: '08-ai-quality-control', label: 'AI quality control', caption: 'Review section coverage and findings, then follow the relevant field and source evidence. Results shown are demonstration fixtures.' },
  { file: '10-typed-report-preview', label: 'Report preview', caption: 'Review the typed report beside the order before preparing the export.' },
]

export function TitleFlowGallery() {
  const [selected, setSelected] = useState(0)
  const zoomRef = useRef<HTMLDialogElement>(null)
  const screen = screens[selected]
  return <section className="titleflow-gallery" aria-labelledby="titleflow-gallery-heading">
    <div className="container">
      <header><div><p className="eyebrow"><span /> Inside the application</p><h2 id="titleflow-gallery-heading">See the work.<br />Not just the promise.</h2></div><p>Source documents, title records, and quality review—shown in the actual TitleFlow AI interface.</p></header>
      <div className="titleflow-gallery__controls" aria-label="Choose an application screenshot">
        {screens.map((item, index) => <button key={item.file} type="button" aria-pressed={index === selected} aria-controls="titleflow-gallery-image" onClick={() => setSelected(index)}>{item.label}</button>)}
      </div>
      <figure id="titleflow-gallery-image">
        <img src={`/images/titleflow/${screen.file}.webp`} width="1920" height="1080" alt={`TitleFlow AI ${screen.label}: ${screen.caption}`} loading="lazy" decoding="async" />
        <button className="gallery-zoom-button" type="button" onClick={() => zoomRef.current?.showModal()}>Enlarge screenshot ↗</button>
        <figcaption aria-live="polite"><strong>{screen.label}</strong><span>{screen.caption}</span></figcaption>
      </figure>
      <dialog className="gallery-zoom" ref={zoomRef} aria-label={`${screen.label} enlarged screenshot`}><form method="dialog"><button autoFocus>Close screenshot ×</button></form><div><img src={`/images/titleflow/${screen.file}.webp`} width="1920" height="1080" alt={screen.caption} /></div><p>{screen.caption}</p></dialog>
      <p className="titleflow-gallery__disclosure">Actual application interface with fictional sample orders. QC results and report previews use demonstration data.</p>
    </div>
  </section>
}

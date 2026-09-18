import type { Event } from "@/types/event"

function eventVisual(event: Event) {
  if (event.type === "webinar") {
    return <><path d="M70 201H245c40 0 38-85 84-85h96c42 0 40 84 94 84h143" stroke="#d1a247" strokeWidth="8" /><path d="M70 286H204c43 0 41-69 83-69h70c45 0 46 57 88 57h217" stroke="#f3efe7" strokeWidth="5" /><circle cx="412" cy="116" r="53" stroke="#d1a247" strokeWidth="8" /><circle cx="529" cy="202" r="47" stroke="#d1a247" strokeWidth="8" /><path d="M70 173v56M87 173v56M104 173v56M121 173v56M138 173v56" stroke="#d8c694" strokeWidth="4" /></>
  }
  if (event.type === "seminar") {
    return <><path d="M67 240H281" stroke="#d1a247" strokeWidth="6" /><path d="M374 240L610 130" stroke="#f3efe7" strokeWidth="5" /><path d="M374 240L610 347" stroke="#d1a247" strokeWidth="5" /><path d="M281 190l93 50-93 51z" fill="#242a2c" stroke="#d1a247" strokeWidth="3" /><circle cx="610" cy="130" r="18" fill="#111416" stroke="#f3efe7" strokeWidth="3" /><circle cx="610" cy="347" r="18" fill="#111416" stroke="#d1a247" strokeWidth="3" /></>
  }
  return <><path d="M61 303H657" stroke="#5b615d" strokeWidth="2" /><path d="M108 303V171M167 303V119M226 303V205M285 303V97M344 303V145M403 303V191M462 303V111M521 303V152M580 303V210" stroke="#d1a247" strokeWidth="13" /><path d="M44 79H674" stroke="#f3efe7" strokeWidth="3" opacity="0.7" /><path d="M326 79v224" stroke="#d1a247" strokeWidth="3" strokeDasharray="6 8" /><path d="M67 130c82 42 145 42 215 0s146-42 228 0 111 42 170 0" stroke="#d1a247" strokeWidth="3" opacity="0.8" /></>
}

export function EventBanner({ event }: { event: Event }) {
  return (
    <div className="scientific-grid relative overflow-hidden bg-[#101416] py-7 sm:py-10">
      <svg viewBox="0 0 720 420" className="relative mx-auto h-auto w-full max-w-4xl" fill="none" role="img" aria-label={`Scientific visual for ${event.title.en}`}>
        <rect x="23" y="24" width="674" height="372" fill="#111619" />
        {eventVisual(event)}
        <text x="48" y="53" fill="#b8b1a4" fontSize="12" fontFamily="monospace">OPTICA EGYPT / EVENT SIGNAL</text>
        <text x="675" y="53" fill="#d1a247" textAnchor="end" fontSize="12" fontFamily="monospace">{event.type.toUpperCase()}</text>
      </svg>
    </div>
  )
}

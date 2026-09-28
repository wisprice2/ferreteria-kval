const quoteUrl = `https://wa.me/56966006747?text=${encodeURIComponent('Hola H&E, me interesa cotizar tubos corrugados. Necesito información sobre diámetros, disponibilidad y valores.')}`;

export default function CorrugatedPipes({ onViewCatalog }) {
  return (
    <section id="tubos-corrugados" aria-labelledby="corrugated-title" className="relative scroll-mt-28 overflow-hidden border-b border-slate-200 bg-[#f4f5f3] py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 bg-slate-200/35" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="contents lg:block">
          <div className="order-1">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber-500" />
            Suministros para tu obra
          </p>
          <h2 id="corrugated-title" className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tubos corrugados.<br />
            <span className="text-amber-600">Ya a la venta.</span>
          </h2>
          </div>
          <div className="order-3 lg:mt-6">
          <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            El material que buscas para tu próximo proyecto está en H&E.
            Cuéntanos qué necesitas y solicita una cotización personalizada.
          </p>
          <div className="mt-8 grid max-w-lg grid-cols-2 gap-5 border-y border-slate-300/70 py-5">
            <div>
              <p className="text-sm font-bold text-slate-900">Cotiza a tu medida</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Indícanos diámetro y cantidad.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Atención directa</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Consulta valores y disponibilidad.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:items-start">
            <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></svg>
              Cotizar tubos por WhatsApp
              <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" /></svg>
            </a>
            <button type="button" onClick={onViewCatalog} className="min-h-11 cursor-pointer rounded-md px-1 text-sm font-bold text-slate-700 underline decoration-slate-400 underline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">
              Ver tubos en el catálogo <span aria-hidden="true">→</span>
            </button>
          </div>
          </div>
        </div>

        <div className="order-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:order-none">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Tubos corrugados</span>
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">Venta de material</span>
          </div>
          <img src="/images/tubos-corrugados.png" width="615" height="650" loading="lazy" decoding="async" alt="Conjunto de tubos corrugados negros apilados, con sus extremos a la vista" className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[420px]" />
          <div className="grid grid-cols-[112px_1fr] items-center gap-5 border-t border-slate-100 p-5 sm:grid-cols-[140px_1fr] sm:px-7">
            <img src="/images/tubos-corrugados-detalle.png" width="763" height="517" loading="lazy" decoding="async" alt="Detalle de los extremos y la superficie exterior de tubos corrugados" className="aspect-[4/3] w-full rounded-xl border border-slate-100 object-cover" />
            <div>
              <p className="text-sm font-bold text-slate-900">Tu proyecto empieza con el material correcto.</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">Imágenes referenciales. Consulta las características del material disponible.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

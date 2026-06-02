import React, { useState, useMemo, useEffect } from 'react';

// --- BASE DE DATOS DE PRODUCTOS - FERRETERÍA INDUSTRIAL KVAL ---
const KVAL_PRODUCTS = [
  // DOCUMENTO 1
  { id: 'd1-1', category: 'Ferretería Industrial', name: 'Fijaciones', image: '/images/d1_image2.jpeg' },
  { id: 'd1-2', category: 'Ferretería Industrial', name: 'Eslingas de izaje de carga', image: '/images/d1_image3.png' },
  { id: 'd1-3', category: 'Ferretería Industrial', name: 'Disco de corte 41/2, 7", 9"', image: '/images/d1_image4.png' },
  { id: 'd1-4', category: 'Ferretería Industrial', name: 'Acero inoxidable y Acero carbono', image: '/images/d1_image5.png' },
  { id: 'd1-5', category: 'Ferretería Industrial', name: 'BROCHA', image: '/images/d1_image14.png' },
  { id: 'd1-6', category: 'Ferretería Industrial', name: 'LIJAS MADERA DIFERENTES GRANOS', image: '/images/d1_image15.png' },
  { id: 'd1-7', category: 'Ferretería Industrial', name: 'LIJA METAL DIFERENTES GRANOS', image: '/images/d1_image16.png' },
  { id: 'd1-10', category: 'Ferretería Industrial', name: 'DILUYENTES', image: '/images/d1_image10.png' },
  { id: 'd1-11', category: 'Ferretería Industrial', name: 'HERRAMIENTAS ELÉCTRICAS E INALÁMBRICAS', image: '/images/herramientas_electricas.png' },
  { id: 'd1-12', category: 'Ferretería Industrial', name: 'HERRAMIENTAS MECÁNICAS (LLAVES, CHICHARRAS, ETC.)', image: '/images/herramientas_mecanicas.png' },
  { id: 'd1-13', category: 'Ferretería Industrial', name: 'MATERIALES DE CONSTRUCCIÓN', image: '/images/materiales_construccion.png' },
  { id: 'd1-14', category: 'Ferretería Industrial', name: 'CEMENTO', image: '/images/cemento.png' },
  { id: 'd1-15', category: 'Ferretería Industrial', name: 'GRIFERÍA DE COCINA', image: '/images/griferia_cocina.png' },
  
  // -- GRUPOS NUEVOS DE REFERENCIA --
  { 
    id: 'grp-1', category: 'Ferretería Industrial', name: 'Pernos y Tornillos', image: '/images/grp_pernos_tornillos.png', tag: 'Variedad',
    desc: ['Pernos Hexagonales (Diferentes largos y diámetros, zincados)', 'Pernos Allen Cilíndricos (Negros de alta resistencia)', 'Pernos de Carrocería (Carriage Bolt)', 'Tornillos Autoperforantes (Punta tipo broca)', 'Tornillos Autorroscantes (Zincados y negros)', 'Tornillos para Madera (Cabeza avellanada)']
  },
  {
    id: 'grp-2', category: 'Ferretería Industrial', name: 'Tuercas', image: '/images/grp_tuercas.png', tag: 'Variedad',
    desc: ['Tuercas Hexagonales Estándar (Doradas y plateadas)', 'Tuercas de Alta Resistencia (Acabado negro)', 'Tuerca de Seguridad (Lock Nut)', 'Tuerca Flangeada (Con base amplia integrada)']
  },
  {
    id: 'grp-3', category: 'Ferretería Industrial', name: 'Arandelas', image: '/images/grp_arandelas.png', tag: 'Variedad',
    desc: ['Arandelas Planas (Distintos diámetros)', 'Arandelas de Presión (Tipo Grower)', 'Arandelas Grandes de Reparto', 'Arandelas de Goma o Neopreno (Para sellado)']
  },
  {
    id: 'grp-4', category: 'Ferretería Industrial', name: 'Elementos de Izaje y Sujeción', image: '/images/grp_izaje.png', tag: 'Variedad',
    desc: ['Cáncamo Cerrado (Eye Bolt)', 'Grillete Tipo Lira', 'Mosquetón Industrial', 'Gancho de Izaje', 'Tensor Abierto/Cerrado (Ajustable mediante rosca)']
  },
  {
    id: 'grp-5', category: 'Ferretería Industrial', name: 'Accesorios de Tubería', image: '/images/grp_tuberia.png', tag: 'Variedad',
    desc: ['Tee de Latón', 'Niple Macho de Latón', 'Acople Rosca Hembra (Latón)', 'Inserto Roscado (Cilíndrico con rosca interna)']
  },
  {
    id: 'grp-6', category: 'Ferretería Industrial', name: 'Herramientas de Corte y Perforación', image: '/images/grp_corte.png', tag: 'Variedad',
    desc: ['Broca Helicoidal HSS (Varias medidas)', 'Broca para Mampostería (Punta de carburo)', 'Broca Plana para Madera', 'Machuelo o Terraja']
  },
  {
    id: 'grp-7', category: 'Ferretería Industrial', name: 'Anclajes y Fijaciones Especiales', image: '/images/grp_anclajes.png', tag: 'Variedad',
    desc: ['Tarugos Metálicos de Expansión', 'Anclajes para Hormigón', 'Remaches o Casquillos Metálicos', 'Inserto Roscado para Chapa']
  },
  {
    id: 'grp-8', category: 'Ferretería Industrial', name: 'Piezas Especiales', image: '/images/grp_pernos_tornillos.png', tag: 'Variedad',
    desc: ['Casquillo Roscado de Latón', 'Espárragos Roscados', 'Tornillo de Ojo', 'Perno Especial de Acople']
  },
  //
  { id: 'd1-25', category: 'Ferretería Industrial', name: 'FITTING HDPE TERMOFUSION Y ELECTROFUSION', image: '/images/d1_image31.png' },
  { id: 'd1-27', category: 'Ferretería Industrial', name: 'GEOTEXTIL', image: '/images/d1_image40.png' },
  
  // DOCUMENTO 2
  { id: 'd2-1', category: 'Ferretería Industrial', name: 'SIFONES', image: '/images/d2_image5.png' },
  { id: 'd2-2', category: 'Ferretería Industrial', name: 'VALVULA BOLA', image: '/images/d2_image6.png' },
  { id: 'd2-3', category: 'Ferretería Industrial', name: 'VALVULA BOLA PVC', image: '/images/d2_image7.jpeg' },
  { id: 'd2-4', category: 'Ferretería Industrial', name: 'CELOSIA', image: '/images/d2_image8.png' },
  { id: 'd2-5', category: 'Ferretería Industrial', name: 'EXTRACTOR', image: '/images/d2_image9.png' },
  { id: 'd2-6', category: 'Ferretería Industrial', name: 'ADHESIVO', image: '/images/d2_image10.png' },
  { id: 'd2-7', category: 'Ferretería Industrial', name: 'PVC HIDRAULICO', image: '/images/d2_image11.png' },
  { id: 'd2-8', category: 'Ferretería Industrial', name: 'PVC SANITARIO', image: '/images/d2_image12.png' },
  { id: 'd2-9', category: 'Ferretería Industrial', name: 'PVC BLANCO', image: '/images/d2_image13.png' },
  { id: 'd2-10', category: 'Ferretería Industrial', name: 'COLLARINES', image: '/images/d2_image14.png' },
  { id: 'd2-11', category: 'Ferretería Industrial', name: 'MANGUERA ESPIRALADA', image: '/images/d2_image15.png' },
  { id: 'd2-12', category: 'Ferretería Industrial', name: 'ACOPLES CAMLOK', image: '/images/d2_image16.png' },
  { id: 'd2-13', category: 'Ferretería Industrial', name: 'TUBERIA CONDUIT', image: '/images/d2_image17.png' },
  { id: 'd2-14', category: 'Ferretería Industrial', name: 'POLIETILENO DE BAJA DENSIDAD', image: '/images/d2_image18.png' },
  
  // ARTÍCULOS ASEO Y LLUVIA
  { id: 'aseo-1', category: 'Aseo y Protección', name: 'PAPEL HIGIÉNICO INDUSTRIAL', image: '/images/aseo_image1.png' },
  { id: 'aseo-2', category: 'Aseo y Protección', name: 'TOALLA PAPEL INDUSTRIAL', image: '/images/aseo_image2.png' },
  { id: 'aseo-3', category: 'Aseo y Protección', name: 'ESCOBILLON DOMICILIARIO', image: '/images/aseo_image3.png' },
  { id: 'aseo-4', category: 'Aseo y Protección', name: 'JABÓN LÍQUIDO BIDÓN 5 LTS', image: '/images/aseo_image4.png' },
  { id: 'aseo-5', category: 'Aseo y Protección', name: 'LIMPIA PISO / LAVALOZA / CIF CREMA / LIMPIA VIDRIOS', image: '/images/aseo_image5.png' },
  { id: 'aseo-6', category: 'Aseo y Protección', name: 'BOLSA DE BASURA 50X70 / 70X90 / 80X100 / 100X120', image: '/images/aseo_image10.png' },
  { id: 'aseo-7', category: 'Aseo y Protección', name: 'ESPONJAS LAVALOZA', image: '/images/aseo_image11.png' },
  { id: 'aseo-8', category: 'Aseo y Protección', name: 'TRAPERO CON OJAL', image: '/images/aseo_image12.png' },
  { id: 'aseo-9', category: 'Aseo y Protección', name: 'PALA PLÁSTICA', image: '/images/aseo_image13.png' },
  { id: 'aseo-10', category: 'Aseo y Protección', name: 'PLUMILLA', image: '/images/aseo_image14.png' },
  { id: 'aseo-11', category: 'Aseo y Protección', name: 'PAÑO MICROFIBRA', image: '/images/aseo_image15.png' },
  { id: 'aseo-12', category: 'Aseo y Protección', name: 'CLORO GEL LITRO', image: '/images/aseo_image16.png' },
  { id: 'aseo-13', category: 'Aseo y Protección', name: 'TRAJE DE AGUA', image: '/images/aseo_image17.png' },
  { id: 'aseo-14', category: 'Aseo y Protección', name: 'BOTA DE AGUA', image: '/images/aseo_image18.png' },
  { id: 'aseo-15', category: 'Aseo y Protección', name: 'CAPA DE AGUA', image: '/images/aseo_image19.png' }
];

const CATEGORIES = [
  'Todos',
  'Ferretería Industrial',
  'Aseo y Protección'
];

const CATEGORY_ICONS = {
  'Todos': '🏭',
  'Ferretería Industrial': '📦',
  'Aseo y Protección': '🧹'
};

// --- LOGO KVAL ---
function KvalLogo({ variant = 'default' }) {
  return (
    <div className="flex items-center select-none">
      <img src="/images/logo.png" alt="KVAL Logo" className={`object-contain ${variant === 'footer' ? 'h-24 opacity-80 mix-blend-screen' : 'h-20 max-w-[200px]'}`} />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog'
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteList, setQuoteList] = useState([]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- ESTADOS PARA CALCULADORA TÉCNICA HIDRÁULICA ---
  const [calcInput, setCalcInput] = useState({
    dn: '110',
    sdr: '11',
    flowRate: '15'
  });

  const [formState, setFormState] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    obraDestino: '',
    mensaje: ''
  });

  const [notification, setNotification] = useState(null);

  // Scroll listener para header
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- FILTRADO ---
  const filteredProducts = useMemo(() => {
    return KVAL_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(q) ||
                            (product.desc && product.desc.join(' ').toLowerCase().includes(q)) ||
                            product.category.toLowerCase().includes(q) ||
                            (product.tag && product.tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // --- CALCULADORA HIDRÁULICA ---
  const hydraulicResults = useMemo(() => {
    const dnNum = parseFloat(calcInput.dn);
    const sdrNum = parseFloat(calcInput.sdr);
    const flowNum = parseFloat(calcInput.flowRate) / 1000;
    if (isNaN(dnNum) || isNaN(sdrNum) || isNaN(flowNum) || dnNum <= 0 || sdrNum <= 1) return null;
    const thickness = dnNum / sdrNum;
    const internalDiameter = dnNum - (2 * thickness);
    const diMeters = internalDiameter / 1000;
    const area = (Math.PI * Math.pow(diMeters, 2)) / 4;
    const velocity = area > 0 ? flowNum / area : 0;
    return {
      thickness: thickness.toFixed(2),
      internalDiameter: internalDiameter.toFixed(2),
      area: (area * 10000).toFixed(2),
      velocity: velocity.toFixed(2)
    };
  }, [calcInput]);

  // --- LISTA DE COTIZACIÓN ---
  const addToQuote = (product) => {
    setQuoteList((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showNotification(`Cantidad de "${product.name}" actualizada`, 'info');
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      showNotification(`"${product.name}" agregado a su solicitud`, 'success');
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromQuote = (productId) => {
    setQuoteList((prev) => prev.filter((item) => item.id !== productId));
    showNotification('Producto removido de la solicitud', 'info');
  };

  const updateQty = (productId, newQty) => {
    if (newQty < 1) return;
    setQuoteList((prev) => prev.map((item) => item.id === productId ? { ...item, qty: newQty } : item));
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    if (!formState.nombre || !formState.email || !formState.telefono) {
      showNotification('Los campos con (*) son requeridos', 'error');
      return;
    }
    showNotification(`¡Solicitud recibida! Ticket #${Math.floor(Math.random() * 90000) + 10000} — Un ejecutivo técnico le contactará en breve.`, 'success');
    setFormState({ nombre: '', empresa: '', email: '', telefono: '', obraDestino: '', mensaje: '' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hola KVAL, necesito cotizar materiales industriales para un proyecto. ¿Pueden asesorarme?");
    window.open(`https://wa.me/56967608125?text=${text}`, '_blank');
  };

  const renderCatalogView = () => (
    <section id="productos" className="py-20 bg-slate-50 min-h-[80vh] relative">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-100 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="mb-10 text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline w-fit">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver al Inicio
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">Catálogo Industrial</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">Productos y Suministros Técnicos</h2>
            <p className="text-slate-600 text-xs max-w-xl mt-2">
              Explore nuestro inventario industrial. Seleccione los productos que necesita y solicite una cotización personalizada.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Buscador */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Buscar productos, marcas, especificaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-900 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 w-full shadow-sm"
            />
            <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <p className="text-slate-500 font-semibold text-sm">No se encontraron productos para esta búsqueda.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }} className="mt-4 text-amber-600 text-xs font-bold hover:underline cursor-pointer">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white hover:border-amber-400/60 border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all group relative hover:shadow-xl hover:shadow-slate-200/50"
              >
                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider z-10 shadow-sm">
                    {product.tag}
                  </span>
                )}

                {/* Imagen */}
                <div className="w-full h-52 bg-white p-4 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>

                {/* Info Minimalista */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">{product.name}</h3>
                  </div>

                  {/* Acciones */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-slate-100/80 hover:bg-slate-200 text-slate-600 py-2.5 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer"
                    >
                      Ver Ficha
                    </button>
                    <button
                      onClick={() => addToQuote(product)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 py-2.5 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-amber-500/15"
                    >
                      <span>Cotizar</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const renderHomeBusinessLines = () => (
    <section id="lineas-negocio" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">Divisiones KVAL</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Nuestras Líneas de Negocio
          </h2>
          <p className="text-slate-500 text-sm mt-2">Soluciones integrales para la industria, construcción y mantención.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Ferretería Industrial */}
          <div 
            onClick={() => { setActiveCategory('Ferretería Industrial'); setCurrentView('catalog'); window.scrollTo(0,0); }}
            className="group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all h-[400px] flex flex-col justify-end p-8"
          >
            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-700">
              <img src="/images/ferreteria_bg_hd.png" alt="Ferretería Industrial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-md mb-4">División Comercial</span>
              <h3 className="text-3xl font-black text-white mb-2">Ferretería Industrial</h3>
              <p className="text-slate-300 text-sm mb-6 max-w-md">Herramientas, equipos, soldadura, válvulas y fijaciones de alta resistencia para su obra.</p>
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:gap-4 transition-all">
                Ver Catálogo <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </div>

          {/* Card 2: Aseo y Protección */}
          <div 
            onClick={() => { setActiveCategory('Aseo y Protección'); setCurrentView('catalog'); window.scrollTo(0,0); }}
            className="group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all h-[400px] flex flex-col justify-end p-8"
          >
            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-700">
              <img src="/images/aseo_bg_hd.png" alt="Aseo y Protección" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-md mb-4">División Industrial</span>
              <h3 className="text-3xl font-black text-white mb-2">Aseo y Protección</h3>
              <p className="text-slate-300 text-sm mb-6 max-w-md">Elementos de protección personal, vestuario de agua y suministros de limpieza industrial.</p>
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:gap-4 transition-all">
                Explorar Categoría <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* ═══════════ NOTIFICACIONES ═══════════ */}
      {notification && (
        <div className={`fixed bottom-6 left-6 z-[60] max-w-sm p-4 rounded-xl shadow-2xl flex items-center gap-3 border animate-[slideUp_0.3s_ease-out] ${
          notification.type === 'success' ? 'bg-white border-emerald-500 text-emerald-700' :
          notification.type === 'info' ? 'bg-white border-sky-500 text-sky-700' :
          'bg-white border-red-500 text-red-700'
        }`}>
          <div className="text-lg">
            {notification.type === 'success' && '✅'}
            {notification.type === 'info' && '💡'}
            {notification.type === 'error' && '⚠️'}
          </div>
          <p className="text-xs font-bold leading-snug">{notification.message}</p>
        </div>
      )}

      {/* ═══════════ BARRA SUPERIOR INFO ═══════════ */}
      <div className="bg-slate-900 text-slate-400 text-[10px] py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><span className="text-amber-400">📍</span> AV. GRAN BRETAÑA 4357 HUALPEN</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-400">📞</span> +56967608125</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-400">✉️</span> Ventashye2@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 font-bold uppercase tracking-wider">
            <span className="text-emerald-400">● Despacho a todo Chile</span>
            <span className="text-slate-600">|</span>
            <span>Lun - Vie: 08:00 a 18:00</span>
          </div>
        </div>
      </div>

      {/* ═══════════ ENCABEZADO ═══════════ */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-lg shadow-slate-200/50 backdrop-blur-md' : 'bg-white border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <a href="#hero" className="hover:opacity-90 transition-opacity">
            <KvalLogo />
          </a>

          <nav className="hidden xl:flex items-center gap-7 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            {[
              ['#hero', 'Inicio'],
              ['#productos', 'Catálogo'],
              ['#servicios', 'Servicios'],
              ['#nosotros', 'Nosotros'],
              ['#contacto', 'Contacto']
            ].map(([href, label]) => (
              <a 
                key={href} 
                href={href} 
                onClick={(e) => {
                  if (href === '#productos') {
                    e.preventDefault();
                    setCurrentView('catalog');
                    window.scrollTo(0, 0);
                  } else if (currentView !== 'home') {
                    e.preventDefault();
                    setCurrentView('home');
                    setTimeout(() => document.querySelector(href)?.scrollIntoView(), 100);
                  }
                }}
                className="hover:text-amber-600 transition-colors relative group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Buscador */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all w-56 focus:w-72"
              />
              <svg className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            {/* Botón Cotización */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-[11px] font-black uppercase tracking-wider hidden sm:inline">Cotizar</span>
              {quoteList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {quoteList.length}
                </span>
              )}
            </button>

            {/* Menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {[
                ['#hero', 'Inicio'],
                ['#productos', 'Catálogo'],
                ['#servicios', 'Servicios'],
                ['#nosotros', 'Nosotros'],
                ['#contacto', 'Contacto']
              ].map(([href, label]) => (
                <a 
                  key={href} 
                  href={href} 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (href === '#productos') {
                      e.preventDefault();
                      setCurrentView('catalog');
                      window.scrollTo(0, 0);
                    } else if (currentView !== 'home') {
                      e.preventDefault();
                      setCurrentView('home');
                      setTimeout(() => document.querySelector(href)?.scrollIntoView(), 100);
                    }
                  }} 
                  className="block py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {currentView === 'home' ? (
        <>
      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative bg-slate-950 pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        {/* Background layers */}
        <div className="absolute inset-0 opacity-80">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent"></div>
        {/* Amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-start text-left">
          
          <div className="max-w-3xl space-y-8">
            <div className="text-amber-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base">
              Ferretería Industrial
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black tracking-tighter text-white leading-[0.95]">
              para Grandes Obras
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
              Tuberías HDPE, válvulas, herramientas eléctricas, soldadura, seguridad industrial, fijaciones y más.<br/><br/>
              Todo lo que su obra necesita con asesoría técnica especializada y despacho a todo Chile.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a href="#productos" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); window.scrollTo(0,0); }} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-md transition-all flex items-center gap-3 text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Ver Catálogo Completo
              </a>
              <a href="#contacto" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView(), 100); } }} className="bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-md transition-all flex items-center gap-3 text-sm backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Solicitar Cotización
              </a>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/10 max-w-2xl">
              {[
                [{d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'}, '15+', 'Años de\nExperiencia'],
                [{d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'}, '8,000+', 'SKUs\nen Stock'],
                [{d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'}, '24 hrs', 'Respuesta\nde Cotización'],
                [{d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'}, '100%', 'Cobertura\nNacional']
              ].map(([icon, value, label], i) => (
                <div key={i} className="flex flex-col items-start text-left">
                  <div className="text-amber-500 mb-2 border border-amber-500/30 rounded-full p-1.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={icon.d} /></svg>
                  </div>
                  <span className="block text-2xl font-black text-white">{value}</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold whitespace-pre-line leading-tight mt-1">{label}</span>
                </div>
              ))}
            </div>

            {/* Marcas (Trust Bar) */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 opacity-70">
              {['BOSCH', 'DeWALT', 'LINCOLN', 'STANLEY', 'WAVIN', '3M', 'NORTON', 'TRUPER'].map((brand) => (
                <span key={brand} className="text-sm font-black tracking-widest text-white uppercase">{brand}</span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ LÍNEAS DE NEGOCIO ═══════════ */}
      {renderHomeBusinessLines()}

      {/* ═══════════ SERVICIOS DE INSTALACIÓN ═══════════ */}
      <section id="servicios" className="py-20 relative border-y border-white/50" style={{ backgroundImage: 'url(/images/light_industrial_bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="w-full lg:w-1/3 space-y-8">
              <div>
                <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">División de Obras</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">Instalación en HDPE y Geosintéticos</h2>
                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  Contamos con un equipo técnico especializado en termofusión, electrofusión y tendido de geosintéticos para proyectos de gran envergadura.
                </p>
              </div>

              <div className="bg-white/60 rounded-2xl overflow-hidden border border-white/60 shadow-md flex items-center justify-center p-6 backdrop-blur-md">
                <img src="/images/hdpe.png" alt="Instalación de HDPE" className="max-w-full h-auto max-h-64 object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl" />
              </div>

              <div className="bg-white/70 border border-white/60 shadow-sm rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="text-amber-500">⚡</span> Somos Especialistas en:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-[11px] font-bold text-slate-600">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geomembrana HDPE</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geotextil</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>GCL</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geomalla</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geocompuesto Drenante</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Bentonita</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Drenante</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geotextil Estabilización</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geotextil Separación</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geotextil Drenaje</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geotextil control erosión</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Geonet</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Pavimentación</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Recapado</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Y más!</li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="mb-10 space-y-2">
                <span className="text-amber-600 text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-amber-500"></span>
                  Galería de Proyectos Reales
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Obras que Respaldan Nuestra Experiencia</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((num) => (
                  <div key={num} className="aspect-square rounded-2xl overflow-hidden bg-white/50 border border-white/50 backdrop-blur-sm shadow-sm transition-transform duration-500 hover:scale-[1.8] hover:z-50 hover:shadow-2xl relative cursor-zoom-in">
                    <img 
                      src={`/images/d1_image${num}.${num === 27 || num === 28 ? 'jpeg' : 'png'}`} 
                      alt="Servicio de instalación KVAL" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════ POR QUÉ KVAL ═══════════ */}
      <section id="nosotros" className="py-20 relative border-y border-white/50" style={{ backgroundImage: 'url(/images/light_premium_bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-50/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">¿Por qué elegirnos?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Su socio de confianza en suministros industriales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏗️', title: 'Stock Permanente', desc: 'Más de 8,000 referencias disponibles en bodega. Despacho inmediato para sus urgencias de obra.' },
              { icon: '🔬', title: 'Asesoría Técnica', desc: 'Equipo de ingenieros especializados en selección de materiales, dimensionamiento y normativas.' },
              { icon: '🚛', title: 'Logística Nacional', desc: 'Despacho a todo Chile con seguimiento en tiempo real. Entregas coordinadas en obra.' },
              { icon: '📋', title: 'Cotización en 24h', desc: 'Respuesta formal con disponibilidad, plazos de entrega y condiciones comerciales en menos de un día hábil.' }
            ].map((item) => (
              <div key={item.title} className="bg-white/70 hover:bg-white/95 border border-white/60 shadow-sm hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10 p-6 rounded-2xl transition-all group backdrop-blur-md">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════ CTA INTERMEDIO ═══════════ */}
      <section className="bg-amber-500 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-slate-900">¿Necesita suministros para su próximo proyecto?</h3>
            <p className="text-sm text-slate-800/70 mt-1">Cotización personalizada sin costo y con respuesta en menos de 24 horas.</p>
          </div>
          <a href="#contacto" className="bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg flex-shrink-0">
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* ═══════════ FORMULARIO CONTACTO ═══════════ */}
      <section id="contacto" className="py-20 relative" style={{ backgroundImage: 'url(/images/light_industrial_bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">Contacto</span>
            <h2 className="text-3xl font-black text-slate-900">Solicitar Asesoría y Cotización</h2>
            <p className="text-slate-500 text-xs">Respuesta garantizada en menos de 24 horas hábiles por nuestro equipo técnico.</p>
          </div>

          <form onSubmit={handleSubmitContactForm} className="bg-white/70 border border-white/60 backdrop-blur-xl rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { key: 'nombre', label: 'Nombre Completo *', placeholder: 'Ing. Carlos Mendoza', type: 'text', required: true },
                { key: 'empresa', label: 'Empresa', placeholder: 'Constructora S.A.', type: 'text' },
                { key: 'email', label: 'Correo Electrónico *', placeholder: 'carlos@empresa.com', type: 'email', required: true },
                { key: 'telefono', label: 'Teléfono *', placeholder: '+56 9 8765 4321', type: 'tel', required: true }
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-[10px] uppercase text-slate-600 font-bold tracking-wider">{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={formState[field.key]}
                    onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full bg-white/60 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase text-slate-600 font-bold tracking-wider">Obra / Proyecto de Destino</label>
              <input
                type="text"
                value={formState.obraDestino}
                onChange={(e) => setFormState({ ...formState, obraDestino: e.target.value })}
                placeholder="Ej. Ampliación Planta de Agua, Antofagasta"
                className="w-full bg-white/60 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase text-slate-600 font-bold tracking-wider">Detalle de Requerimientos</label>
              <textarea
                rows="4"
                value={formState.mensaje}
                onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                placeholder="Describa los productos, cantidades, diámetros, especificaciones técnicas o cualquier detalle relevante..."
                className="w-full bg-white/60 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/15 cursor-pointer">
              Enviar Solicitud de Cotización
            </button>
          </form>
        </div>
      </section>
        </>
      ) : (
        renderCatalogView()
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <KvalLogo variant="footer" />
            <p className="text-xs leading-relaxed text-slate-500 mt-4">
              Ferretería industrial especializada en suministros técnicos para construcción, minería, energía y saneamiento en Chile.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase text-white tracking-widest mb-4">Productos</h3>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                <li key={cat}><a href="#productos" onClick={() => setActiveCategory(cat)} className="hover:text-amber-400 transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase text-white tracking-widest mb-4">Recursos</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios de Instalación</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Proyectos Ejecutados</a></li>
              <li><a href="#nosotros" className="hover:text-amber-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-amber-400 transition-colors">Solicitar Cotización</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase text-white tracking-widest mb-4">Contacto</h3>
            <div className="space-y-3 text-xs">
              <p className="flex items-start gap-2"><span className="text-amber-400">📍</span> AV. GRAN BRETAÑA 4357 HUALPEN</p>
              <p className="flex items-start gap-2"><span className="text-amber-400">📞</span> +56 9 6760 8125</p>
              <p className="flex items-start gap-2"><span className="text-amber-400">✉️</span> <span className="text-amber-400 font-bold">Ventashye2@gmail.com</span></p>
              <p className="flex items-start gap-2"><span className="text-amber-400">🕐</span> Lunes a Viernes: 08:00 — 18:00</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-12 border-t border-slate-800 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 KVAL Ferretería Industrial S.A. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400">Términos y Condiciones</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Política de Garantías</a>
          </div>
        </div>
      </footer>

      {/* ═══════════ BOTÓN FLOTANTE WHATSAPP ═══════════ */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-4 rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 cursor-pointer group"
        title="Cotizar por WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-2 -left-2 bg-emerald-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all uppercase tracking-wider">Chat</span>
      </button>

      {/* ═══════════ SIDEBAR COTIZACIÓN ═══════════ */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setIsQuoteOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  Lista de Cotización
                </h3>
                <button onClick={() => setIsQuoteOpen(false)} className="text-slate-400 hover:text-white p-2 cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {quoteList.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 space-y-3">
                    <svg className="w-16 h-16 text-slate-200 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    <p className="text-xs font-semibold">Su lista está vacía.</p>
                    <p className="text-[11px] text-slate-300">Agregue productos desde el catálogo para solicitar cotización.</p>
                  </div>
                ) : (
                  quoteList.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                      <button 
                        onClick={() => removeFromQuote(item.id)}
                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>

                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0 p-1 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>

                      <div className="flex-grow space-y-1.5">
                        <h4 className="font-bold text-xs text-slate-900 pr-5 line-clamp-2">{item.name}</h4>
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">{item.category}</span>
                        
                        <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white overflow-hidden w-fit">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 font-black cursor-pointer text-xs">−</button>
                          <span className="text-xs font-bold text-slate-800 w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 font-black cursor-pointer text-xs">+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {quoteList.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                  <div className="text-xs text-slate-500">
                    <div className="flex justify-between font-bold text-slate-900 text-sm">
                      <span>Total de Productos:</span>
                      <span>{quoteList.length} ítem{quoteList.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <a 
                    href="#contacto"
                    onClick={() => {
                      setIsQuoteOpen(false);
                      setFormState(prev => ({
                        ...prev,
                        mensaje: `Solicito cotización para los siguientes productos:\n\n` + 
                          quoteList.map(i => `• ${i.name} — Cantidad: ${i.qty}`).join('\n')
                      }));
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-4 rounded-xl text-xs uppercase tracking-wider text-center block transition-all shadow-sm"
                  >
                    Solicitar Cotización Formal
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ MODAL FICHA DE PRODUCTO ═══════════ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative z-10">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 p-2.5 rounded-full cursor-pointer transition-all z-20 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="h-64 relative bg-white border-b border-slate-100 p-8 flex items-center justify-center">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
              {selectedProduct.tag && (
                <span className="absolute bottom-4 right-4 bg-slate-900 backdrop-blur-sm text-amber-400 text-[10px] font-black uppercase px-3 py-1 rounded-lg tracking-wider">
                  {selectedProduct.tag}
                </span>
              )}
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{selectedProduct.category}</span>
                <h3 className="text-xl font-black text-slate-900 mt-2">{selectedProduct.name}</h3>
                
                {selectedProduct.desc && (
                  <ul className="mt-4 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedProduct.desc.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 text-xs">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => { addToQuote(selectedProduct); setSelectedProduct(null); }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm shadow-amber-500/15 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
                Agregar a Solicitud de Cotización
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom animation keyframes */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

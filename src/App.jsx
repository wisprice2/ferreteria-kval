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
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [activeWhyCard, setActiveWhyCard] = useState(0);

  const whyFeatures = [
    { img: '/images/carousel_stock_1780437420971.png', title: 'Stock Permanente', desc: 'Más de 8,000 referencias disponibles en bodega. Despacho inmediato para sus urgencias de obra.' },
    { img: '/images/carousel_asesoria_1780437432777.png', title: 'Asesoría Técnica', desc: 'Equipo de ingenieros especializados en selección de materiales, dimensionamiento y normativas.' },
    { img: '/images/carousel_logistica_1780437443504.png', title: 'Logística Nacional', desc: 'Despacho a todo Chile con seguimiento en tiempo real. Entregas coordinadas en obra.' },
    { img: '/images/carousel_cotizacion_he_1780437750642.png', title: 'Cotización en 24h', desc: 'Respuesta formal con disponibilidad, plazos de entrega y condiciones comerciales en menos de un día hábil.' }
  ];

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

    let wtext = `Hola, soy ${formState.nombre}`;
    if (formState.empresa) wtext += ` de ${formState.empresa}`;
    wtext += `.\nMi correo es ${formState.email} y mi teléfono ${formState.telefono}.\n`;
    if (formState.obraDestino) wtext += `Proyecto: ${formState.obraDestino}\n`;
    if (formState.mensaje) wtext += `\nMensaje:\n${formState.mensaje}`;

    const text = encodeURIComponent(wtext);
    window.open(`https://wa.me/56966006747?text=${text}`, '_blank');

    showNotification(`Redirigiendo a WhatsApp...`, 'success');
    setFormState({ nombre: '', empresa: '', email: '', telefono: '', obraDestino: '', mensaje: '' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hola H&E, necesito cotizar materiales industriales para un proyecto. ¿Pueden asesorarme?");
    window.open(`https://wa.me/56966006747?text=${text}`, '_blank');
  };

  const renderAboutView = () => (
    <div className="min-h-screen bg-slate-50 font-sans animate-[fadeIn_0.5s_ease-out]">
      
      {/* ═══════════ HERO MINIMALISTA ═══════════ */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-50 overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-slate-100 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="mb-12 mx-auto text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-slate-600 transition-colors w-fit group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Volver al Inicio
          </button>

          <span className="inline-block py-1.5 px-4 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
            Nuestra Esencia
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            H & E Ferretería <br className="hidden md:block" />
            <span className="text-slate-400 font-light tracking-normal">Soluciones Hidráulicas Ltda.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Suministro integral, especialización técnica y respaldo garantizado para los proyectos de mayor envergadura en la Zona Sur del país.
          </p>
        </div>
      </div>

      {/* ═══════════ DOS COLUMNAS (INFO & MÉTRICAS) ═══════════ */}
      <section className="py-24 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Lado Izquierdo: Copy */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Especialistas Duales</h2>
              <div className="w-12 h-1 bg-amber-500"></div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed font-light text-lg">
                <p>
                  En <strong className="font-bold text-slate-800">H & E</strong>, no nos limitamos a ser un proveedor tradicional. Operamos bajo un modelo dual que fusiona la distribución a gran escala de ferretería industrial con una profunda capacidad técnica en terreno.
                </p>
                <p>
                  Nuestra <strong className="font-bold text-slate-800">División Comercial</strong> cuenta con un catálogo de más de 8,000 SKUs de las marcas más reconocidas a nivel mundial, garantizando el suministro oportuno de herramientas, fijaciones y equipos de protección personal en todo Chile.
                </p>
                <p>
                  En paralelo, nuestra <strong className="font-bold text-slate-800">División de Obras</strong> dispone de un equipo técnico élite especializado en termofusión, electrofusión e instalación de geosintéticos (HDPE), capaz de enfrentar desafíos de alta complejidad en terreno.
                </p>
              </div>
            </div>

            {/* Lado Derecho: Métricas (Clean Grid) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                <div className="border-l border-slate-200 pl-6 space-y-2">
                  <span className="text-5xl font-black text-slate-900">15+</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Años de Experiencia</p>
                </div>
                
                <div className="border-l border-slate-200 pl-6 space-y-2">
                  <span className="text-5xl font-black text-slate-900">8k+</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SKUs en Stock</p>
                </div>
                
                <div className="border-l border-slate-200 pl-6 space-y-2">
                  <span className="text-5xl font-black text-slate-900">100%</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Cobertura Nacional</p>
                </div>
                
                <div className="border-l border-slate-200 pl-6 space-y-2">
                  <span className="text-5xl font-black text-slate-900">&lt;24h</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tiempo de Respuesta</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ BLOQUE ALIANZA Y MARCAS ═══════════ */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-3xl mx-auto">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Alianza Estratégica</h3>
            <p className="text-2xl sm:text-3xl font-light text-slate-800 leading-tight">
              Somos el <strong className="font-black text-slate-900">Representante Exclusivo</strong> de Politrans en la Zona Sur del país.
            </p>
          </div>

          <div className="pt-16 border-t border-slate-200">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Marcas con las que trabajamos</h3>
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              {['BOSCH', 'DeWALT', 'LINCOLN', 'STANLEY', 'WAVIN', '3M', 'NORTON', 'TRUPER'].map(brand => (
                <span key={brand} className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{brand}</span>
              ))}
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );

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

  const renderInstallationView = () => (
    <div className="min-h-screen bg-slate-50 font-sans animate-[fadeIn_0.5s_ease-out]">
      
      {/* ═══════════ HERO DEDICADO ═══════════ */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="/images/d1_image20.png" alt="Hero Instalación HDPE" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-emerald-900/40 to-transparent opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="mb-10 text-amber-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-amber-400 transition-colors w-fit group bg-slate-950/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Volver al Inicio
          </button>

          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            División de Obras
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Instalación en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">HDPE</span><br className="hidden md:block" /> y Geosintéticos
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed border-l-4 border-emerald-500 pl-4 bg-slate-900/40 p-4 rounded-r-xl backdrop-blur-sm">
            Contamos con un equipo técnico especializado en termofusión, electrofusión y tendido de geosintéticos para proyectos de gran envergadura.
          </p>
        </div>
      </div>

      {/* ═══════════ ALIANZA ESTRATÉGICA POLITRANS ═══════════ */}
      <section className="py-24 relative bg-white overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-50 rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-5/12 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-amber-50 border border-amber-200 rounded-full w-fit shadow-sm">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs">★</span>
                <span className="text-amber-700 text-xs font-black uppercase tracking-widest">Alianza Estratégica</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Representante Exclusivo de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Politrans</span>
              </h2>
              
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:scale-150"></div>
                <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-2">En la Zona Sur</h4>
                <p className="text-slate-300 leading-relaxed relative z-10">
                  Suministro técnico e instalación garantizada de materiales geosintéticos de alta densidad. Trabajamos con tecnología de punta y estándares internacionales.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-4">
                  <span className="h-px bg-slate-200 flex-1"></span>
                  Nuestras Especialidades
                  <span className="h-px bg-slate-200 flex-1"></span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {[
                    'Geomembrana HDPE', 'Geotextil', 'GCL', 'Geomalla', 
                    'Geocompuesto Drenante', 'Bentonita', 'Drenante', 
                    'Geotextil Estabilización', 'Geotextil Separación', 
                    'Geotextil Drenaje', 'Geotextil Control Erosión', 
                    'Geonet', 'Pavimentación', 'Recapado', '¡Y más!'
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-default border
                        ${item === '¡Y más!' 
                          ? 'bg-amber-50 border-amber-200 hover:bg-amber-500 hover:border-amber-600 group' 
                          : 'bg-slate-50 border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-sm'
                        }`}
                    >
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full transition-colors
                        ${item === '¡Y más!' 
                          ? 'bg-amber-500 group-hover:bg-white' 
                          : 'bg-emerald-500'
                        }`}
                      ></div>
                      <span className={`text-xs sm:text-sm font-bold leading-tight transition-colors
                        ${item === '¡Y más!' 
                          ? 'text-amber-800 group-hover:text-white' 
                          : 'text-slate-700'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ FABRICACIÓN DE BIOFILTROS ═══════════ */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-5/12 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-full w-fit shadow-sm">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs">🌿</span>
                <span className="text-emerald-700 text-xs font-black uppercase tracking-widest">Servicio Especializado</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Fabricación de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Biofiltros</span>
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-lg">
                Diseñamos y construimos sistemas de biofiltración con geomembrana HDPE, lechos de grava y plantación especializada para el tratamiento natural de aguas residuales y control ambiental en obras de gran envergadura.
              </p>

              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:scale-150"></div>
                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-3">Características</h4>
                <ul className="space-y-2 text-slate-300 text-sm relative z-10">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">■</span> Geomembrana HDPE de alta densidad</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">■</span> Lechos filtrantes de grava calibrada</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">■</span> Plantación de especies nativas</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">■</span> Sistemas de drenaje integrado</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">■</span> Tratamiento natural de aguas</li>
                </ul>
              </div>

              {/* CTA Biofiltros */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { const text = encodeURIComponent('Hola H&E, me interesa el servicio de Fabricación de Biofiltros. ¿Pueden enviarme más información y cotización?'); window.open(`https://wa.me/56967608125?text=${text}`, '_blank'); }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Cotizar Biofiltros
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                <button
                  onClick={() => { setCurrentView('home'); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 200); }}
                  className="bg-transparent border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Solicitar Cotización Formal
                </button>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[16/9]">
                  <img src="/images/biofiltro_1.jpeg" alt="Fabricación de Biofiltros - Vista general" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
                  <img src="/images/biofiltro_2.jpeg" alt="Fabricación de Biofiltros - Detalle construcción" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
                  <img src="/images/biofiltro_3.jpeg" alt="Fabricación de Biofiltros - Vista aérea" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ INSTALACIÓN DE GEO TUBOS ═══════════ */}
      <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="w-full lg:w-5/12 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-cyan-50 border border-cyan-200 rounded-full w-fit shadow-sm">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-white text-xs">💧</span>
                <span className="text-cyan-700 text-xs font-black uppercase tracking-widest">Servicio Especializado</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Instalación de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Geo Tubos</span>
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-lg">
                Instalación profesional de geotubos para deshidratación de lodos, contención de sedimentos y manejo de aguas en proyectos mineros, industriales y de saneamiento ambiental.
              </p>

              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:scale-150"></div>
                <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Aplicaciones</h4>
                <ul className="space-y-2 text-slate-300 text-sm relative z-10">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">■</span> Deshidratación de lodos mineros</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">■</span> Contención de sedimentos</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">■</span> Manejo y tratamiento de aguas</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">■</span> Protección costera y fluvial</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">■</span> Geomembrana HDPE de soporte</li>
                </ul>
              </div>

              {/* CTA Geo Tubos */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { const text = encodeURIComponent('Hola H&E, me interesa el servicio de Instalación de Geo Tubos. ¿Pueden enviarme más información y cotización?'); window.open(`https://wa.me/56967608125?text=${text}`, '_blank'); }}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-black px-6 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Cotizar Geo Tubos
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                <button
                  onClick={() => { setCurrentView('home'); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 200); }}
                  className="bg-transparent border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Solicitar Cotización Formal
                </button>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[16/9]">
                  <img src="/images/geotubo_3.jpeg" alt="Instalación de Geo Tubos - Vista general" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
                  <img src="/images/geotubo_1.jpeg" alt="Geo Tubos - Piscina con geomembrana" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
                  <img src="/images/geotubo_2.jpeg" alt="Geo Tubos - Instalación en terreno" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>

              {/* Video de Geo Tubos */}
              <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <video controls className="w-full aspect-video object-cover" poster="/images/geotubo_1.jpeg">
                  <source src="/videos/geotubo_video_1.mp4" type="video/mp4" />
                  Su navegador no soporta la reproducción de video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRABAJO HDPE EN TERRENO ═══════════ */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span> Nuestro Equipo en Acción <span className="w-8 h-px bg-amber-500"></span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Instalación y Electrofusión HDPE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
              <img src="/images/hdpe_terreno_1.jpeg" alt="Equipo KVAL - Termofusión HDPE en terreno" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3]">
              <img src="/images/hdpe_terreno_2.jpeg" alt="Electrofusión de tubería HDPE" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER HDPE ═══════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/hdpe_terreno_1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-emerald-500/80 to-teal-500/90"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ¿Tiene un proyecto en HDPE?
            </h3>
            <p className="text-emerald-100 text-base sm:text-lg max-w-xl">
              Biofiltros, geo tubos, termofusión, electrofusión y geosintéticos. Contáctenos y reciba asesoría técnica sin costo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => { const text = encodeURIComponent('Hola H&E, necesito asesoría técnica para un proyecto en HDPE. ¿Pueden contactarme?'); window.open(`https://wa.me/56967608125?text=${text}`, '_blank'); }}
              className="bg-white hover:bg-slate-50 text-emerald-700 font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-2xl cursor-pointer flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 fill-emerald-600" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp Directo
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <a
              href="tel:+56967608125"
              className="bg-emerald-800/50 hover:bg-emerald-800 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ GALERÍA DE PROYECTOS (MASONRY LAYOUT) ═══════════ */}
      <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-900 to-slate-900 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                <span className="w-8 h-px bg-emerald-500"></span> Evidencia en Terreno
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Galería de Proyectos Reales</h2>
              <p className="text-slate-400 mt-4 text-lg">Obras que respaldan nuestra experiencia técnica en proyectos de alta complejidad.</p>
            </div>
          </div>
          
          {/* Diseño Uniforme para la galería */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((num) => (
              <div 
                key={num} 
                onClick={() => setSelectedGalleryImage(num)}
                className="group relative rounded-2xl overflow-hidden bg-slate-800 aspect-[4/3] border border-white/5 transform transition-all duration-500 hover:scale-105 hover:z-30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 cursor-zoom-in"
              >
                <img 
                  src={`/images/d1_image${num}.${num === 27 || num === 28 ? 'jpeg' : 'png'}`} 
                  alt={`Proyecto H&E ${num}`} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transform transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                />
                
                {/* Overlay oscuro sutil que desaparece al hacer hover */}
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Icono Lupa Centrado Elegante */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 bg-emerald-500/90 backdrop-blur-sm rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transform transition-transform duration-500 shadow-2xl border border-white/30">
                    <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      {/* Modal / Lightbox de Galería */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full max-h-[90vh] flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-0 right-0 z-10 p-2 text-white/50 hover:text-white transition-colors bg-slate-900/50 rounded-bl-xl hover:bg-slate-900"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img 
              src={`/images/d1_image${selectedGalleryImage}.${selectedGalleryImage === 27 || selectedGalleryImage === 28 ? 'jpeg' : 'png'}`} 
              alt="Proyecto Ampliado" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  );

  const renderHomeBusinessLines = () => (
    <section id="lineas-negocio" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">Divisiones H&E</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Nuestras Líneas de Negocio
          </h2>
          <p className="text-slate-500 text-sm mt-2">Soluciones integrales para la industria, construcción y mantención.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
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

          {/* Card 3: División de Obras / HDPE */}
          <div 
            onClick={() => { setCurrentView('installation'); window.scrollTo(0,0); }}
            className="group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all h-[400px] flex flex-col justify-end p-8"
          >
            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-700">
              {/* Uso de una de las imágenes de instalación como fondo (ej. la 20) */}
              <img src="/images/d1_image20.png" alt="Instalación HDPE" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-4">División de Obras</span>
              <h3 className="text-3xl font-black text-white mb-2">Instalación HDPE</h3>
              <p className="text-slate-300 text-sm mb-6 max-w-md">Termofusión, electrofusión y tendido de geosintéticos para proyectos de envergadura.</p>
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm group-hover:gap-4 transition-all">
                Ver Servicios <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden w-full">
      
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
            <span className="flex items-center gap-1.5"><span className="text-amber-400">📞</span> +56966006747</span>
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
          
          {/* Logo en Encabezado */}
          <div 
            onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }}
            className="flex flex-col cursor-pointer group"
          >
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-amber-500 transition-colors">H&E</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Soluciones Hidráulicas</span>
          </div>

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
                  } else if (href === '#servicios') {
                    e.preventDefault();
                    setCurrentView('installation');
                    window.scrollTo(0, 0);
                  } else if (href === '#nosotros') {
                    e.preventDefault();
                    setCurrentView('about');
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
                    } else if (href === '#servicios') {
                      e.preventDefault();
                      setCurrentView('installation');
                      window.scrollTo(0, 0);
                    } else if (href === '#nosotros') {
                      e.preventDefault();
                      setCurrentView('about');
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

        {/* Logo superior destacado con fondo blanco interno */}
        <div className="absolute inset-x-0 top-2 sm:top-4 lg:top-4 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
            <div className="relative pointer-events-auto h-32 sm:h-40 lg:h-52 aspect-[532/469] group">
              {/* Fondo blanco circular ajustado milimétricamente usando el análisis de píxeles del logo */}
              <div 
                className="absolute bg-white rounded-[50%] z-0"
                style={{ top: '46.6%', left: '51.2%', width: '54.7%', height: '55.2%', transform: 'translate(-50%, -50%)' }}
              ></div>
              <img src="/images/logo.png" alt="KVAL Logo Destacado" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-start text-left mt-16 lg:mt-24">
          
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

      {/* ═══════════ REPRESENTANTES DIRECTOS POLITRANS ═══════════ */}
      <section id="politrans" className="relative py-20 lg:py-28 bg-white overflow-hidden border-b border-slate-200">
        {/* Decoraciones de fondo */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-amber-50/60 rounded-full blur-[120px] -mr-96 -mt-64 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-slate-50 rounded-full blur-[100px] -ml-72 -mb-72 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header de la sección */}
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 border-2 border-amber-200 rounded-full shadow-md shadow-amber-100/50 mx-auto">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white text-sm shadow-lg shadow-amber-500/30">★</span>
              <span className="text-amber-800 text-xs font-black uppercase tracking-[0.2em]">Representantes Directos</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Distribuidor Oficial de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">Politrans</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
              Somos el <strong className="font-bold text-slate-800">representante directo</strong> de Politrans, 
              líderes en geosintéticos y soluciones de ingeniería. Suministro técnico garantizado con la más amplia gama de productos 
              para obras de gran envergadura en todo Chile.
            </p>
          </div>

          {/* Contenido principal: 2 columnas */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

            {/* Columna izquierda: Card oscura premium */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex-grow">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>

                <div className="relative z-10 space-y-8">
                  <div>
                    <span className="inline-block px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-5">Alianza Exclusiva</span>
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
                      Toda la Gama <span className="text-amber-400">Politrans</span> a su Alcance
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Acceda a la línea completa de geosintéticos, geomembranas y materiales especializados directamente desde fábrica. 
                      Sin intermediarios, con asesoría técnica personalizada y los mejores tiempos de entrega del mercado.
                    </p>
                  </div>

                  {/* Métricas rápidas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <span className="block text-3xl font-black text-amber-400">100%</span>
                      <span className="block text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-bold">Original</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <span className="block text-3xl font-black text-amber-400">Directo</span>
                      <span className="block text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-bold">De Fábrica</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => { const text = encodeURIComponent('Hola H&E, me interesa cotizar productos Politrans. ¿Pueden asesorarme?'); window.open(`https://wa.me/56966006747?text=${text}`, '_blank'); }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-black px-6 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    Cotizar Productos Politrans
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Columna derecha: Grid completo de productos Politrans */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.09)] transition-shadow">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-4">
                  <span className="h-px bg-slate-200 flex-1"></span>
                  Gama Completa de Productos
                  <span className="h-px bg-slate-200 flex-1"></span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {[
                    { name: 'Geomembrana HDPE', icon: '🛡️' },
                    { name: 'Geotextil', icon: '🧵' },
                    { name: 'GCL', icon: '📐' },
                    { name: 'Geomalla', icon: '🔲' },
                    { name: 'Geocompuesto Drenante', icon: '💧' },
                    { name: 'Bentonita', icon: '🧱' },
                    { name: 'Drenante', icon: '🌊' },
                    { name: 'Geotextil Estabilización', icon: '🏗️' },
                    { name: 'Geotextil Separación', icon: '📏' },
                    { name: 'Geotextil Drenaje', icon: '🔧' },
                    { name: 'Geotextil Control Erosión', icon: '🌿' },
                    { name: 'Geonet', icon: '🔗' },
                    { name: 'Tubería HDPE', icon: '🔩' },
                    { name: 'Fitting Termofusión', icon: '⚡' },
                    { name: 'Fitting Electrofusión', icon: '🔌' },
                    { name: 'Pavimentación', icon: '🛤️' },
                    { name: 'Recapado', icon: '🏁' },
                    { name: '¡Y más!', icon: '✨' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 cursor-default border
                        ${item.name === '¡Y más!'
                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:from-amber-500 hover:to-orange-500 hover:border-amber-600 group col-span-2 sm:col-span-1'
                          : 'bg-slate-50/80 border-slate-100 hover:bg-amber-50 hover:border-amber-200 hover:shadow-sm'
                        }`}
                    >
                      <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full transition-colors
                        ${item.name === '¡Y más!'
                          ? 'bg-amber-500 group-hover:bg-white'
                          : 'bg-amber-500'
                        }`}
                      ></div>
                      <span className={`text-xs sm:text-sm font-bold leading-tight transition-colors
                        ${item.name === '¡Y más!'
                          ? 'text-amber-800 group-hover:text-white'
                          : 'text-slate-700'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Nota inferior */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <p className="text-xs text-slate-400 text-center sm:text-left">
                    <span className="font-bold text-slate-600">Asesoría técnica incluida</span> en la selección de materiales según requerimientos de su proyecto.
                  </p>
                  <button
                    onClick={() => { setCurrentView('installation'); window.scrollTo(0, 0); }}
                    className="text-amber-600 text-xs font-black uppercase tracking-wider hover:text-amber-700 transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer group"
                  >
                    Ver Servicios
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ LÍNEAS DE NEGOCIO ═══════════ */}
      {renderHomeBusinessLines()}

      {/* ═══════════ POR QUÉ KVAL ═══════════ */}
      <section id="nosotros" className="py-20 relative border-y border-white/50 overflow-hidden" style={{ backgroundImage: 'url(/images/light_premium_bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-50/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 text-[11px] uppercase tracking-widest font-black">¿Por qué elegirnos?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Su socio de confianza en suministros industriales
            </h2>
          </div>

          {/* 3D Carousel Container */}
          <div className="relative h-[450px] sm:h-[550px] w-full max-w-5xl mx-auto flex items-center justify-center" style={{ perspective: '1200px' }}>
            {whyFeatures.map((item, i) => {
              let offset = i - activeWhyCard;
              const isActive = offset === 0;
              
              let transformStyle = { opacity: 0, transform: 'scale(0.75) translateY(2rem) translateZ(-200px)', zIndex: 0 };
              let cursorStyle = 'pointer-events-none';
              
              if (isActive) {
                transformStyle = { opacity: 1, transform: 'scale(1) translateX(0) translateZ(50px)', zIndex: 30, filter: 'blur(0px)' };
                cursorStyle = 'cursor-default shadow-[0_30px_60px_rgba(0,0,0,0.5)]';
              } else if (offset === -1) {
                transformStyle = { opacity: 0.7, transform: 'scale(0.85) translateX(-45%) rotateY(15deg) translateZ(-50px)', zIndex: 20, filter: 'blur(2px)' };
                cursorStyle = 'cursor-pointer hover:opacity-100 hover:filter-none';
              } else if (offset === 1) {
                transformStyle = { opacity: 0.7, transform: 'scale(0.85) translateX(45%) rotateY(-15deg) translateZ(-50px)', zIndex: 20, filter: 'blur(2px)' };
                cursorStyle = 'cursor-pointer hover:opacity-100 hover:filter-none';
              } else if (offset === -2) {
                transformStyle = { opacity: 0.3, transform: 'scale(0.75) translateX(-80%) rotateY(25deg) translateZ(-150px)', zIndex: 10, filter: 'blur(4px)' };
              } else if (offset === 2) {
                transformStyle = { opacity: 0.3, transform: 'scale(0.75) translateX(80%) rotateY(-25deg) translateZ(-150px)', zIndex: 10, filter: 'blur(4px)' };
              }

              return (
                <div 
                  key={i}
                  onClick={() => !isActive && setActiveWhyCard(i)}
                  className={`absolute w-[260px] sm:w-[350px] h-[380px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform-gpu ${cursorStyle}`}
                  style={{ ...transformStyle, transformStyle: 'preserve-3d' }}
                >
                  <img src={item.img} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-80' : 'opacity-40'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                    <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-md mb-2 sm:mb-4 shadow-lg">Ventaja Competitiva</span>
                    <h3 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={() => setActiveWhyCard(prev => Math.max(0, prev - 1))}
              disabled={activeWhyCard === 0}
              className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer z-40"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-3">
              {whyFeatures.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveWhyCard(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeWhyCard ? 'w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setActiveWhyCard(prev => Math.min(whyFeatures.length - 1, prev + 1))}
              disabled={activeWhyCard === whyFeatures.length - 1}
              className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer z-40"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
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
      ) : currentView === 'catalog' ? (
        renderCatalogView()
      ) : currentView === 'about' ? (
        renderAboutView()
      ) : (
        renderInstallationView()
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            {/* Logo copiado exactamente del Hero (flotante en el video) */}
            <div className="relative h-24 aspect-[532/469] group">
              <div 
                className="absolute bg-white rounded-[50%] z-0 shadow-sm"
                style={{ top: '46.6%', left: '51.2%', width: '54.7%', height: '55.2%', transform: 'translate(-50%, -50%)' }}
              ></div>
              <img src="/images/logo.png" alt="KVAL Logo" className="relative z-10 w-full h-full object-contain" />
            </div>
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
              <p className="flex items-start gap-2"><span className="text-amber-400">📞</span> +56 9 6600 6747</p>
              <p className="flex items-start gap-2"><span className="text-amber-400">📞</span> +56 9 6760 8125</p>
              <p className="flex items-start gap-2"><span className="text-amber-400">✉️</span> <span className="text-amber-400 font-bold">Ventashye2@gmail.com</span></p>
              <p className="flex items-start gap-2"><span className="text-amber-400">🕐</span> Lunes a Viernes: 08:00 — 18:00</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-12 border-t border-slate-800 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 H & E FERRETERIA SOLUCIONES HIDRAULICAS LTDA. Todos los derechos reservados.</p>
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


      {/* ═══════════ BOTÓN WHATSAPP FLOTANTE ═══════════ */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center animate-[slideUp_0.5s_ease-out]"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </button>

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

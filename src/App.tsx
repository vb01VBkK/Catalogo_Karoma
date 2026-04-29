import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Menu, X, ArrowUpRight, Search, FileDown, Loader2 } from 'lucide-react';
import { CATALOG, Category, Product } from './constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Logo = () => (
  <div className="flex items-center gap-2">
    <img 
      src="https://www.caffekaroma.it/wp-content/uploads/2025/02/logo-black-1.png" 
      alt="Karoma Logo" 
      className="h-10 md:h-12 w-auto object-contain"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  </div>
);

const getVariantColor = (variant: string) => {
  const v = variant.toLowerCase();
  if (v === 'intenso') return 'bg-gray-500';
  if (v === 'soave') return 'bg-yellow-400';
  if (v === 'classico') return 'bg-brand-red';
  if (v.includes('dek') || v.includes('deca')) return 'bg-blue-600';
  return null;
};

const BoxIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M50 20L85 37.5V72.5L50 90L15 72.5V37.5L50 20Z" />
    <path d="M50 20V55" />
    <path d="M15 37.5L50 55L85 37.5" />
  </svg>
);

const PalletIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Base structure */}
    <path d="M50 20L85 37.5V72.5L50 90L15 72.5V37.5L50 20Z" />
    {/* Internal grid lines to simulate boxes stack */}
    <path d="M50 20V90" />
    <path d="M15 37.5L50 55L85 37.5" />
    <path d="M15 55L50 72.5L85 55" />
    <path d="M32.5 28.75L32.5 81.25" />
    <path d="M67.5 28.75L67.5 81.25" />
    {/* Bottom base detail */}
    <path d="M25 77.5V81.5L50 87V83L25 77.5Z" />
    <path d="M75 77.5V81.5L50 87V83L75 77.5Z" />
  </svg>
);

const ProductCard = ({ product, index, isPdf = false }: { product: Product; index: number; isPdf?: boolean }) => {
  return (
    <div
      className={`relative bg-white brutal-border p-6 overflow-hidden ${isPdf ? 'w-full mb-8' : 'group hover:border-brand-red transition-all hover:shadow-[8px_8px_0px_0px_rgba(208,0,0,0.1)]'}`}
    >
      {!isPdf && (
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="text-brand-red w-5 h-5" />
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className={`relative w-full aspect-square mb-6 overflow-hidden bg-brand-gray brutal-border flex items-center justify-center ${isPdf ? 'h-48' : ''}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover grayscale transition-all duration-500 ${!isPdf ? 'hover:grayscale-0 scale-100 group-hover:scale-110' : ''}`}
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement?.classList.add('bg-brand-gray');
              const icon = document.createElement('div');
              icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-brand-dark/10"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>';
              (e.target as HTMLImageElement).parentElement?.appendChild(icon.firstChild as Node);
            }}
          />
        </div>

        <h3 className={`font-display font-bold uppercase leading-tight ${isPdf ? 'text-lg mb-2' : 'text-xl mb-4 group-hover:text-brand-red transition-colors'}`}>
          {product.name}
        </h3>
        
        {product.variants && (
          <div className="flex flex-wrap gap-2 mb-6">
            {product.variants.map((variant) => {
              const dotColor = getVariantColor(variant);
              return (
                <span 
                  key={variant} 
                  className={`inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider px-2 py-1 bg-brand-gray border border-transparent ${!isPdf ? 'group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all' : ''}`}
                >
                  {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0 shadow-sm`} />}
                  {variant}
                </span>
              );
            })}
          </div>
        )}

        {product.specs && (
          <div className={`mt-auto pt-4 border-t border-brand-dark/10 ${isPdf ? 'mb-0' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col items-center text-center">
                  <div className={`text-brand-dark ${!isPdf ? 'group-hover:text-brand-red' : ''} transition-colors scale-75`}>
                    {spec.label.toLowerCase().includes('box') ? <BoxIcon /> : <PalletIcon />}
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-bold text-brand-dark/40 block leading-none">{spec.label}</span>
                    <span className="text-[10px] font-display font-bold uppercase">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isPdf && (
           <div className="mt-8">
            <button className="w-full py-3 bg-brand-red text-white text-[10px] font-display font-bold uppercase tracking-widest hover:bg-brand-dark transition-colors flex items-center justify-center group/btn">
              Scopri il prezzo
              <ArrowUpRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATALOG[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = CATALOG.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(CATALOG[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadPdf = async () => {
    if (!pdfRef.current || isGeneratingPdf) return;

    try {
      setIsGeneratingPdf(true);
      
      // Ensure images are loaded (simple delay or verification)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdf = new jsPDF('p', 'mm', 'a4');
      const container = pdfRef.current;
      const categories = container.querySelectorAll('.pdf-category');

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i] as HTMLElement;
        const canvas = await html2canvas(category, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        
        // If the category content is taller than A4, we'll need to split it
        // But for simplicity in this catalog, we assume each category fits or we split broadly
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save('Catalogo_Karoma_2026.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const filteredCatalog = CATALOG.map(category => ({
    ...category,
    products: category.products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.variants?.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.products.length > 0);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-brand-gray px-3 py-2 border border-brand-dark/5 focus-within:border-brand-red transition-colors">
              <Search className="w-4 h-4 text-brand-dark/30 mr-2" />
              <input 
                type="text" 
                placeholder="Cerca prodotti..." 
                className="bg-transparent border-none outline-none text-xs font-medium w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-brand-gray transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-brand-dark text-white pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <span className="text-brand-red font-display font-bold text-xs uppercase tracking-[0.5em]">est. 2003</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11vw] md:text-[7vw] font-display font-bold leading-[0.85] uppercase mb-12"
          >
            Passione <br />
            <span className="text-stroke-red">Tradizione</span> <br />
            Innovazione
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-lg leading-relaxed">
              Il vero aroma del caffè, <br />
              senza compromessi. Esplora il <br />
              nostro catalogo digitale 2026.
            </p>
            <div className="flex flex-col items-start md:items-end">
              <button 
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="btn-primary flex items-center group disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Generazione PDF...
                  </>
                ) : (
                  <>
                    Scarica il PDF aggiornato
                    <FileDown className="ml-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-[-10%] w-[800px] h-[800px] rounded-full border-[100px] border-brand-red" />
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Nav */}
        <aside className="hidden md:block w-64 sticky top-32 h-fit">
          <nav className="flex flex-col gap-2">
            {CATALOG.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`
                  text-xs font-bold uppercase tracking-widest px-4 py-4 border-l-2 transition-all
                  ${activeCategory === cat.id 
                    ? 'border-brand-red text-brand-red bg-brand-red/5' 
                    : 'border-transparent text-brand-dark/40 hover:text-brand-dark hover:bg-brand-gray'}
                `}
              >
                {cat.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Product Sections */}
        <div className="flex-1 space-y-32">
          {filteredCatalog.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
                    {category.title}
                  </h2>
                  <p className="text-brand-dark/40 font-medium italic">{category.subtitle}</p>
                </div>
                <div className="h-[1px] flex-1 mx-8 bg-brand-dark/10 hidden lg:block" />
                <span className="font-display font-bold text-xs uppercase tracking-widest">{category.products.length} Prodotti</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product, idx) => (
                  <ProductCard key={`${category.id}-${product.name}-${idx}`} product={product} index={idx} />
                ))}
              </div>
            </section>
          ))}

          {filteredCatalog.length === 0 && (
            <div className="py-20 text-center">
              <Coffee className="w-12 h-12 mx-auto text-brand-dark/10 mb-4" />
              <p className="text-xl font-display font-medium text-brand-dark/40">Nessun prodotto trovato per la tua ricerca.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-brand-red font-bold uppercase text-xs tracking-widest hover:underline"
              >
                Reset filtri
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-red text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 brightness-0 invert">
              <img 
                src="https://www.caffekaroma.it/wp-content/uploads/2025/02/logo-black-1.png" 
                alt="Karoma Logo" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-8 text-white/60 font-light leading-relaxed">
              La qualità del caffè Karoma è garantita da anni di esperienza nel settore e da una meticolosa selezione delle migliori miscele.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-display font-bold text-xs uppercase tracking-[0.3em] mb-4">Contatti</span>
            <p className="text-lg">info@karoma.it</p>
            <p className="text-lg">+39 123 456 7890</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-display font-bold text-xs uppercase tracking-[0.3em] mb-4">Ufficio</span>
            <p className="text-lg">Via Roma, 123</p>
            <p className="text-lg">80100 Napoli (NA)</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">© 2024 Karoma Coffee S.r.l. - Listino Digitale</p>
          <div className="flex gap-4">
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">Privacy</a>
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Hidden PDF Container */}
      <div className="fixed left-[-9999px] top-0 overflow-hidden" style={{ width: '800px' }}>
        <div ref={pdfRef} className="bg-white text-brand-dark p-8">
          {CATALOG.map((category) => (
            <div key={`pdf-${category.id}`} className="pdf-category bg-white p-10 min-h-[1100px] border-b-2 border-brand-dark/5">
              <div className="flex justify-between items-start mb-20 border-b-8 border-brand-red pb-8">
                <div>
                  <h2 className="text-6xl font-display font-bold uppercase tracking-tighter mb-4 text-brand-dark">
                    {category.title}
                  </h2>
                  <p className="text-brand-dark/60 font-medium italic text-xl">{category.subtitle}</p>
                </div>
                <div className="text-right">
                  <Logo />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">Listino Ufficiali 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                {category.products.map((product, idx) => (
                  <ProductCard 
                    key={`pdf-prod-${category.id}-${idx}`} 
                    product={product} 
                    index={idx} 
                    isPdf={true} 
                  />
                ))}
              </div>
              
              <div className="mt-auto pt-20 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-dark/20 italic">
                <span>Passione, Tradizione, Innovazione</span>
                <span>Pagina {CATALOG.indexOf(category) + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-brand-red text-white flex flex-col"
          >
            <div className="p-8 flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 border border-white/20 rounded-full hover:bg-white/10">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 px-8 py-12 overflow-y-auto">
              <nav className="flex flex-col gap-8">
                {CATALOG.map((cat, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={cat.id}
                    href={`#${cat.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-dark transition-colors"
                  >
                    {cat.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


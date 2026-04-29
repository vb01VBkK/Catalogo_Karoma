import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Menu, X, ArrowUpRight, Search, ChevronRight } from 'lucide-react';
import { CATALOG, Category, Product } from './constants';

const Logo = () => (
  <div className="flex items-center gap-2">
    <img 
      src="https://www.caffekaroma.it/wp-content/uploads/2025/02/logo-black-1.png" 
      alt="Karoma Logo" 
      className="h-10 md:h-12 w-auto object-contain"
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

const ProductCard = ({ product, index }: { product: Product; index: number; key?: string | number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white brutal-border p-6 hover:border-brand-red transition-all hover:shadow-[8px_8px_0px_0px_rgba(208,0,0,0.1)] overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-brand-red w-5 h-5" />
      </div>
      
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-square mb-6 overflow-hidden bg-brand-gray brutal-border">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <h3 className="font-display font-bold text-xl uppercase mb-4 leading-tight group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        
        {product.variants && (
          <div className="flex flex-wrap gap-2 mb-8">
            {product.variants.map((variant) => {
              const dotColor = getVariantColor(variant);
              return (
                <span 
                  key={variant} 
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-brand-gray border border-transparent group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all"
                >
                  {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0 shadow-sm`} />}
                  {variant}
                </span>
              );
            })}
          </div>
        )}

        {product.specs && (
          <div className="mt-auto pt-6 border-t border-brand-dark/10">
            <div className="grid grid-cols-2 gap-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col items-center text-center">
                  <div className="text-brand-dark group-hover:text-brand-red transition-colors">
                    {spec.label.toLowerCase().includes('box') ? <BoxIcon /> : <PalletIcon />}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-brand-dark/40 mb-0.5 tracking-widest">{spec.label}</p>
                    <p className="text-xs font-display font-bold uppercase">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATALOG[0].id);
  const [searchQuery, setSearchQuery] = useState('');

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
            className="text-[12vw] md:text-[8vw] font-display font-bold leading-[0.8] uppercase mb-12"
          >
            Passione <br />
            <span className="text-stroke-red opacity-80">Napoletana</span>
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-lg leading-relaxed">
              Il vero aroma del caffè, <br />
              senza compromessi. Esplora il <br />
              nostro catalogo digitale 2024.
            </p>
            <div className="flex flex-col items-start md:items-end">
              <a href="#cialde" className="btn-primary flex items-center group">
                Sfoglia Listino 
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
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


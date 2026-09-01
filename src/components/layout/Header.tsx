import { siteConfig } from "@/config/siteConfig";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, isOffer, getSubcategories, type ProductCategory } from "@/data/products";
import { ProductSearch } from "./ProductSearch";

const NAV_ITEMS = siteConfig.navigation.items;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      {/* Altura estável: evita deslocamento de layout e oscilação ao voltar ao topo. */}
      <div className="bg-primary text-primary-foreground text-center text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 py-2">
        COMPRE ONLINE | ATENDIMENTO | ENTREGA | NOVIDADES
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex-shrink-0">
          <img
            src={siteConfig.brand.logo}
            alt={siteConfig.brand.name}
            className="w-auto object-contain h-12 sm:h-14 md:h-16"
          />
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl mx-8"><ProductSearch /></div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          {/* Mobile: search toggle */}
          <button
            className="lg:hidden p-2 text-primary hover:bg-secondary/50 rounded-full transition-colors"
            onClick={() => setIsMobileSearchOpen((v) => !v)}
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/carrinho"
            className="p-2 text-primary hover:bg-secondary/50 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {count}
            </span>
          </Link>

          {/* Mobile: menu toggle */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Categories Menu (desktop) */}
      <nav className="hidden lg:block border-t border-border/50">
        <ul className="container mx-auto flex justify-center items-center gap-8 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          {NAV_ITEMS.map((item) => {
            const categoryProducts = item.categoria
              ? PRODUCTS.filter((p) => p.category === item.categoria)
              : [];
            const featured = categoryProducts[0];
            const subcategories = item.categoria ? getSubcategories(item.categoria) : [];
            const categoryHasOffers = categoryProducts.some(isOffer);
            const linkSearch = item.categoria
              ? { categoria: item.categoria }
              : item.oferta
                ? { oferta: "1" }
                : {};

            return (
              <li key={item.label} className="relative group">
                <Link
                  to={item.to}
                  search={linkSearch}
                  className="flex items-center gap-1 hover:text-primary/70 transition-colors border-b-2 border-transparent group-hover:border-primary/20 pb-1"
                >
                  {item.label}
                  {featured && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>

                {featured && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-border p-6 grid grid-cols-[minmax(220px,260px)_200px] gap-6 w-max max-w-[90vw]">
                      <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                        {subcategories.map((sub) => (
                          <div key={sub}>
                            <p className="text-[10px] text-muted-foreground normal-case tracking-normal font-semibold mb-1.5">
                              {sub}
                            </p>
                            <div className="space-y-0.5">
                              {categoryProducts
                                .filter((p) => p.subcategory === sub)
                                .map((product) => (
                                  <Link
                                    key={product.slug}
                                    to="/catalogo"
                                    search={{ categoria: item.categoria!, subcategoria: sub }}
                                    className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-secondary/40 transition-colors normal-case tracking-normal font-medium text-xs text-foreground"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-9 h-9 rounded-md object-cover shrink-0"
                                    />
                                    <span className="flex-1 line-clamp-2">{product.name}</span>
                                    {product.sizes && (
                                      <span className="text-[9px] text-primary/60 font-semibold shrink-0">
                                        {product.sizes.length} tam.
                                      </span>
                                    )}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3">
                        <Link
                          to="/catalogo"
                          search={{ categoria: item.categoria! }}
                          className="relative rounded-xl overflow-hidden group/img block flex-1 min-h-[140px]"
                        >
                          <img
                            src={featured.image}
                            alt={featured.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1">
                              Destaque
                            </p>
                            <p className="text-sm font-bold leading-tight normal-case tracking-normal">
                              {item.label}
                            </p>
                          </div>
                        </Link>

                        {categoryHasOffers && (
                          <Link
                            to="/catalogo"
                            search={{ categoria: item.categoria!, oferta: "1" }}
                            className="text-center bg-secondary text-primary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
                          >
                            Ver ofertas
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Search — toggled by the search icon, keeps the header compact by default */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ProductSearch mobile onClose={() => setIsMobileSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border/50 bg-white">
          <ul className="flex flex-col py-2 text-xs font-bold uppercase tracking-wider text-primary">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  search={
                    item.categoria
                      ? { categoria: item.categoria }
                      : item.oferta
                        ? { oferta: "1" }
                        : {}
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 hover:bg-secondary/40 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

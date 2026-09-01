import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/s\b/g, "");
function closeMatch(query: string, text: string) {
  const q = normalize(query);
  const words = normalize(text).split(/\W+/);
  if (normalize(text).includes(q)) return true;
  return words.some((word) => {
    if (Math.abs(word.length - q.length) > 1) return false;
    let differences = 0;
    for (let i = 0, j = 0; i < word.length && j < q.length; i++, j++) {
      if (word[i] !== q[j] && ++differences > 1) return false;
    }
    return differences <= 1;
  });
}

export function ProductSearch({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const normalized = normalize(query.trim());
  const matches = useMemo(() => {
    if (normalized.length < 2) return [];
    return PRODUCTS.filter((p) =>
      closeMatch(normalized, [p.name, p.category, p.subcategory, p.description, ...(p.sizes ?? [])].join(" ")),
    ).slice(0, 5);
  }, [normalized]);
  const categories = PRODUCT_CATEGORIES.filter((category) =>
    closeMatch(normalized, category) || PRODUCTS.some((p) => p.category === category && closeMatch(normalized, [p.name, p.subcategory, p.description].join(" "))),
  );
  const open = normalized.length >= 2;

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={mobile ? "mobile-search" : "desktop-search"}>Buscar produtos</label>
      <input
        id={mobile ? "mobile-search" : "desktop-search"}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoFocus={mobile}
        autoComplete="off"
        placeholder="O que você está procurando?"
        className="w-full bg-secondary/50 border border-transparent rounded-full py-2.5 px-5 pr-12 text-sm outline-none focus:border-primary/30 focus:bg-white transition-all"
      />
      {query ? (
        <button onClick={() => setQuery("")} aria-label="Limpar busca" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="w-4 h-4" /></button>
      ) : <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}

      {open && (
        <div className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-border rounded-2xl shadow-2xl overflow-hidden z-[70] ${mobile ? "max-h-[65vh] overflow-y-auto" : ""}`}>
          {categories.length > 0 && (
            <div className="p-4 border-b border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Categorias</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => <Link key={category} to="/catalogo" search={{ categoria: category }} onClick={onClose} className="text-xs font-semibold text-primary bg-secondary/50 px-3 py-1.5 rounded-full">{category}</Link>)}
              </div>
            </div>
          )}
          {matches.length > 0 ? (
            <div className="p-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-2">Produtos relacionados</p>
              {matches.map((product) => (
                <Link key={product.id} to="/produto/$slug" params={{ slug: product.slug }} onClick={onClose} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/40 transition-colors">
                  <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="min-w-0 flex-1"><strong className="block text-xs text-primary line-clamp-1">{product.name}</strong><small className="text-[11px] text-muted-foreground">{product.subcategory}</small></span>
                  <strong className="text-xs text-primary">{formatCurrency(product.price)}</strong>
                </Link>
              ))}
              <Link to="/catalogo" search={{ q: query }} onClick={onClose} className="block text-center text-[11px] font-bold uppercase tracking-wider text-primary py-3 border-t border-border/60 mt-1">Ver todos os resultados</Link>
            </div>
          ) : <div className="p-8 text-center"><Search className="w-6 h-6 mx-auto text-primary/30 mb-2" /><p className="text-sm font-semibold text-primary">Nenhum resultado</p><p className="text-xs text-muted-foreground mt-1">Tente buscar por cama, toalha, mesa ou aromas.</p></div>}
        </div>
      )}
    </div>
  );
}

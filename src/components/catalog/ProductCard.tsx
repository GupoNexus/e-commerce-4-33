import { useCallback, useEffect, useState } from "react";
import { Star, Heart, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/siteConfig";
import type { Product } from "@/data/products";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("site-favorites") || "[]") as number[];
    setFavorite(ids.includes(product.id));
  }, [product.id]);
  const toggleFavorite = () => {
    const ids = JSON.parse(localStorage.getItem("site-favorites") || "[]") as number[];
    const next = ids.includes(product.id) ? ids.filter((id) => id !== product.id) : [...ids, product.id];
    localStorage.setItem("site-favorites", JSON.stringify(next));
    setFavorite(next.includes(product.id));
  };

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp || ""}?text=${encodeURIComponent(
    `Olá! Tenho interesse no produto "${product.name}" (${formatCurrency(product.price)}) que vi no site da marca.`,
  )}`;

  return (
    <div className="group flex flex-col space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/30">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {product.images.map((img, index) => (
              <div key={img} className="relative flex-[0_0_100%] min-w-0 h-full">
                <Link to="/produto/$slug" params={{ slug: product.slug }} className="block w-full h-full">
                  <img src={img} alt={`${product.name} - foto ${index + 1}`} loading="lazy" width="600" height="750" className="w-full h-full object-cover" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={toggleFavorite}
          aria-label={favorite ? "Remover dos favoritos" : "Favoritar"}
          className={`absolute top-3 right-3 p-2 bg-white/90 rounded-full transition-colors z-10 ${favorite ? "text-rose-600" : "text-primary"}`}
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
        </button>
        {product.oldPrice && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-[10px] font-bold rounded-full z-10">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </div>
        )}

        {product.images.length > 1 && (
          <>
            <button type="button" onClick={scrollPrev} aria-label="Foto anterior" className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-white/85 text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={scrollNext} aria-label="Próxima foto" className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-white/85 text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
              {product.images.map((img, index) => (
                <span key={img} className={`h-1.5 rounded-full transition-all ${index === selectedIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"}`} />
              ))}
            </div>
          </>
        )}

      </div>

      {product.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {product.images.map((img, index) => (
            <button key={img} type="button" onClick={() => scrollTo(index)} aria-label={`Ver foto ${index + 1} de ${product.name}`} className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${index === selectedIndex ? "border-primary" : "border-transparent opacity-70"}`}>
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary/60">
          {product.category}
        </span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <Link to="/produto/$slug" params={{ slug: product.slug }}><h3 className="font-bold text-primary leading-snug hover:underline">{product.name}</h3></Link>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground font-medium">Consulte as condições de pagamento.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={handleAddToCart}
          className="bg-secondary text-primary py-2 px-4 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          {added ? "Adicionado" : "Carrinho"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white min-h-9 py-2 px-2 sm:px-4 rounded-full text-[10px] sm:text-xs font-bold hover:bg-primary/90 transition-all uppercase tracking-wider text-center flex items-center justify-center leading-none"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}

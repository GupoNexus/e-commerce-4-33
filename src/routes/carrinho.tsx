import { siteConfig } from "@/config/siteConfig";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho de Compras | Sua Marca" },
      {
        name: "description",
        content:
          "Revise os itens do seu carrinho e finalize sua compra de cama, mesa, banho e decoração na Sua Marca.",
      },
      { property: "og:title", content: "Carrinho de Compras | Sua Marca" },
      {
        property: "og:description",
        content: "Revise seus produtos e siga para o checkout da Sua Marca.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const whatsappMessage = `Olá! Quero continuar este pedido pelo WhatsApp:\n\n${items.map((item) => `• ${item.quantity}x ${item.name} — ${formatCurrency(item.price * item.quantity)}`).join("\n")}\n\nSubtotal: ${formatCurrency(subtotal)}`;
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-8">Meu Carrinho</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
            <ShoppingBag className="w-12 h-12 text-primary/40" />
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
            <Link
              to="/"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-2xl p-4 border border-border/60"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <h2 className="font-bold text-primary text-sm">{item.name}</h2>
                    <p className="text-sm font-bold text-primary">{formatCurrency(item.price)}</p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          aria-label="Diminuir quantidade"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-primary"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          aria-label="Aumentar quantidade"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-primary"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        aria-label="Remover item"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"
              >
                <ArrowLeft className="w-4 h-4" /> Continuar comprando
              </Link>
            </div>

            <aside className="bg-white rounded-2xl p-6 border border-border/60 space-y-4 sticky top-28">
              <h2 className="font-bold text-primary uppercase text-xs tracking-widest">
                Resumo do pedido
              </h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-semibold">
                  A calcular
                </span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-bold text-primary">Total</span>
                <span className="font-bold text-primary text-lg">
                  {formatCurrency(subtotal)} + frete
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Condições de pagamento confirmadas na finalização.
              </p>
              <Link
                to="/checkout"
                className="block text-center bg-primary text-primary-foreground py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Finalizar compra
              </Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="block text-center border border-primary text-primary py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">Continuar pelo WhatsApp</a>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

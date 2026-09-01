import { siteConfig } from "@/config/siteConfig";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { MERCADO_PAGO_INTEGRATED, SHIPPING_INTEGRATED } from "@/lib/checkout";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar Compra | Sua Marca" },
      {
        name: "description",
        content:
          "Finalize seu pedido Sua Marca e conclua a compra direto pelo WhatsApp com nossa equipe.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const total = subtotal;

  const [customer, setCustomer] = useState({ name: "", phone: "", cep: "", address: "", number: "", city: "", state: "" });

  const orderLines = items
    .map((i) => `• ${i.quantity}x ${i.name} — ${formatCurrency(i.price * i.quantity)}`)
    .join("\n");
  const message =
    `Olá! Quero finalizar meu pedido na Sua Marca:\n\n${orderLines}\n\n` +
    `Cliente: ${customer.name || "A informar"}\nTelefone: ${customer.phone || "A informar"}\n` +
    `Endereço: ${customer.address || "A informar"}, ${customer.number || "s/n"} — ${customer.city || ""}/${customer.state || ""} — CEP ${customer.cep || "A informar"}\n` +
    `Subtotal: ${formatCurrency(total)}\nFrete: a calcular`;
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-8">Finalizar Compra</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-border/60 space-y-3">
              <h2 className="font-bold text-primary uppercase text-xs tracking-widest mb-2">
                Resumo do pedido
              </h2>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-semibold">
                  A calcular
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-primary">Subtotal</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border/60 space-y-4">
              <h2 className="font-bold text-primary uppercase text-xs tracking-widest">1. Identificação e entrega</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[{ key: "name", label: "Nome completo" }, { key: "phone", label: "Telefone" }, { key: "cep", label: "CEP" }, { key: "address", label: "Endereço" }, { key: "number", label: "Número" }, { key: "city", label: "Cidade" }, { key: "state", label: "Estado" }].map((field) => <label key={field.key} className={field.key === "address" ? "sm:col-span-2 text-xs text-muted-foreground" : "text-xs text-muted-foreground"}>{field.label}<input value={customer[field.key as keyof typeof customer]} onChange={(event) => setCustomer((value) => ({ ...value, [field.key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary" /></label>)}
              </div>
              {!SHIPPING_INTEGRATED && <p className="text-xs text-muted-foreground bg-secondary/40 rounded-xl p-3">A cotação pelo Melhor Envio será ativada após a conexão das credenciais. Até lá, valor e prazo são confirmados pela equipe.</p>}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border/60 space-y-4">
              <h2 className="font-bold text-primary uppercase text-xs tracking-widest">2. Pagamento</h2>
              {!MERCADO_PAGO_INTEGRATED && <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4"><p className="text-sm font-semibold text-primary">Mercado Pago preparado para conexão</p><p className="text-xs text-muted-foreground mt-1">PIX e cartão serão habilitados quando as credenciais da conta Sua Marca forem conectadas.</p></div>}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border/60 space-y-4">
              <h2 className="font-bold text-primary uppercase text-xs tracking-widest">3. Finalização</h2>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => clearCart()} className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                <MessageCircle className="w-4 h-4" /> Concluir pelo WhatsApp
              </a>
              <p className="text-[10px] text-muted-foreground text-center">Você será direcionado ao WhatsApp configurado no template para confirmar pagamento e entrega.</p>
            </div>

            <Link
              to="/carrinho"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

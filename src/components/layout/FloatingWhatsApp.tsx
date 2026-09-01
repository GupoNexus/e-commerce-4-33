import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="fixed bottom-6 right-6 z-[60]"><AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="absolute bottom-20 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-border overflow-hidden"><div className="bg-primary p-6 text-white text-center"><h3 className="font-bold uppercase tracking-widest text-sm">Fale com {siteConfig.brand.shortName}</h3><p className="text-[10px] opacity-80 mt-1">Atendimento pelo WhatsApp</p></div><div className="p-4"><a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/20"><div className="bg-primary/10 p-2 rounded-full text-primary"><MessageCircle className="w-5 h-5" /></div><div><h4 className="text-sm font-bold text-primary">Atendimento</h4><p className="text-[10px] text-muted-foreground">{siteConfig.contact.phone}</p></div></a></div></motion.div>}</AnimatePresence><button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative z-[61]">{isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-8 h-8" />}</button></div>;
}

type NavItem = { label: string; to: "/" | "/catalogo"; categoria?: string; oferta?: boolean };
type StoreItem = { name: string; address: string; phone?: string; whatsapp?: string; mapsLink?: string };

/**
 * TEMPLATE MASTER — única fonte de configuração da identidade do site.
 * Substitua os valores deste arquivo para criar um novo projeto.
 */
export const siteConfig = {
  brand: {
    name: "Sua Marca",
    shortName: "Sua Marca",
    logo: "/brand/logo.svg",
    favicon: "/favicon.svg",
    tagline: "Uma experiência pensada para sua marca.",
    description: "Apresente seus produtos, serviços e diferenciais com uma experiência digital premium.",
  },
  theme: {
    primary: "#111111",
    secondary: "#f3f3f3",
  },
  contact: {
    whatsapp: "5500000000000",
    phone: "(00) 00000-0000",
    email: "contato@seudominio.com",
    whatsappMessage: "Olá! Vim pelo site e gostaria de atendimento.",
  },
  social: {
    instagram: "https://www.instagram.com/",
    instagramHandle: "@suaempresa",
  },
  seo: {
    title: "Sua Marca | Loja Online",
    description: "Conheça nossa loja online e confira nossos produtos.",
    canonical: "https://seudominio.com",
  },
  announcement: {
    enabled: true,
    items: ["Compra segura", "Atendimento personalizado", "Entrega", "Novidades"],
  },
  hero: {
    eyebrow: "Sua marca",
    banners: [
      { title: "Uma nova experiência para seus clientes.", subtitle: "Apresente sua marca com imagens, ofertas e mensagens que convertem.", cta: "EXPLORAR", image: "/banners/banner-01.svg", search: {} },
      { title: "Destaque seus produtos.", subtitle: "Use este espaço para campanhas, coleções e lançamentos.", cta: "VER PRODUTOS", image: "/banners/banner-02.svg", search: {} },
      { title: "Conte sua história.", subtitle: "Transforme visitantes em clientes com uma experiência marcante.", cta: "CONHECER", image: "/banners/banner-03.svg", search: {} },
    ],
  },
  navigation: {
    items: [
      { label: "Início", to: "/" },
      { label: "Categoria 1", to: "/catalogo", categoria: "Categoria 1" },
      { label: "Categoria 2", to: "/catalogo", categoria: "Categoria 2" },
      { label: "Categoria 3", to: "/catalogo", categoria: "Categoria 3" },
      { label: "Ofertas", to: "/catalogo", oferta: true },
      { label: "Catálogo", to: "/catalogo" },
    ] as NavItem[],
  },
  home: {
    benefits: [
      { icon: "shield", title: "COMPRA SEGURA", description: "Compre com segurança" },
      { icon: "message", title: "ATENDIMENTO", description: "Fale com nossa equipe" },
      { icon: "truck", title: "ENTREGA", description: "Receba onde estiver" },
      { icon: "sparkles", title: "QUALIDADE", description: "Produtos selecionados" },
    ],
    categories: [
      { name: "Categoria 1", text: "Apresente sua primeira categoria", image: "/categories/category-01.svg", categoria: "Categoria 1" },
      { name: "Categoria 2", text: "Apresente sua segunda categoria", image: "/categories/category-02.svg", categoria: "Categoria 2" },
      { name: "Categoria 3", text: "Apresente sua terceira categoria", image: "/categories/category-03.svg", categoria: "Categoria 3" },
      { name: "Categoria 4", text: "Apresente outra linha de produtos", image: "/categories/category-04.svg", categoria: "Categoria 4" },
      { name: "Categoria 5", text: "Crie quantas categorias precisar", image: "/categories/category-05.svg", categoria: "Categoria 5" },
    ],
    featuredTitle: "Produtos em destaque",
    offersEyebrow: "Condições especiais",
    offersTitle: "Ofertas",
    why: {
      enabled: true,
      title: "Mais do que produtos. Uma experiência.",
      description: "Use esta seção para destacar os motivos que fazem sua marca ser escolhida.",
      highlights: [
        { title: "QUALIDADE", text: "Produtos selecionados para seus clientes." },
        { title: "ATENDIMENTO", text: "Uma equipe preparada para ajudar." },
        { title: "EXPERIÊNCIA", text: "Uma jornada simples e agradável." },
      ],
    },
    guide: { enabled: false, eyebrow: "Conteúdo", title: "Guia", description: "Conteúdos para seus clientes." },
    reviews: { enabled: true, rating: 5, count: 0, sourceLabel: "avaliações", link: "#" },
    stores: { enabled: false, title: "Encontre nossa loja", items: [] as StoreItem[] },
    shopBySize: { enabled: false, title: "Compre por tamanho", sizes: [] as string[] },
    firstVisit: { enabled: false, delayMs: 9000, title: "É sua primeira vez por aqui?", description: "Fale com nossa equipe e receba atendimento personalizado." },
  },
  policies: {
    entrega: "Defina aqui as condições de entrega e retirada.",
    trocas: "Defina aqui as condições de trocas e devoluções.",
    privacidade: "Defina aqui sua política de privacidade.",
    termos: "Defina aqui os termos de uso do site.",
  },
};

export type SiteConfig = typeof siteConfig;

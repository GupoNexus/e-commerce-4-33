export type ProductCategory = string;
export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  sizes?: string[];
  description: string;
  price: number;
  oldPrice?: number | undefined;
  rating: number;
  image: string;
  images: string[];
};

const image = (n: number) => `/products/product-${String(n).padStart(2, "0")}.svg`;

/** Dados neutros de demonstração. Substitua pelo catálogo do cliente. */
export const PRODUCTS: Product[] = Array.from({ length: 8 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    slug: `produto-${String(id).padStart(2, "0")}`,
    name: `Produto de exemplo ${String(id).padStart(2, "0")}`,
    category: `Categoria ${((index % 4) + 1)}`,
    subcategory: "Linha de produtos",
    description: "Descrição de exemplo. Substitua por informações reais do produto.",
    price: 99 + id * 25,
    oldPrice: id % 2 === 0 ? 169 + id * 20 : undefined,
    rating: 5,
    images: [image(id), image(((id) % 8) + 1)],
    image: image(id),
  };
});

export const PRODUCT_CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
export const OFFER_PRODUCTS = PRODUCTS.filter((p) => p.oldPrice);
export function isOffer(product: Product) { return Boolean(product.oldPrice && product.oldPrice > product.price); }
export function getSubcategories(category: ProductCategory) { return [...new Set(PRODUCTS.filter((p) => p.category === category).map((p) => p.subcategory))]; }

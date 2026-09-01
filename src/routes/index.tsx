import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/home/HeroBanner";
import { AnnouncementRibbon } from "@/components/home/AnnouncementRibbon";
import { Benefits } from "@/components/home/Benefits";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { StoreLocations } from "@/components/home/StoreLocations";
import { ShopBySize } from "@/components/home/ShopBySize";
import { Offers } from "@/components/home/Offers";
import { FirstVisitCapture } from "@/components/home/FirstVisitCapture";
import { GuideSection } from "@/components/home/GuideSection";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/siteConfig";
export const Route = createFileRoute("/")({ head: () => ({ title: siteConfig.seo.title, meta: [{ name: "description", content: siteConfig.seo.description }, { property: "og:title", content: siteConfig.seo.title }, { property: "og:description", content: siteConfig.seo.description }] }), component: Index });
function Index() { return <div className="min-h-screen bg-background"><Header/><main><AnnouncementRibbon/><HeroBanner/><Benefits/><Categories/><ShopBySize/><FeaturedProducts/><Offers/><WhyChooseUs/><GuideSection/><CustomerReviews/><StoreLocations/><FloatingWhatsApp/><FirstVisitCapture/></main><Footer/></div>; }

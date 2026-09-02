import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AppProviders } from "@/lib/store";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import NetworkStatus from "@/components/NetworkStatus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProClean Detergents — Household Cleaning Products in Lebanon" },
      {
        name: "description",
        content:
          "Shop ProClean Detergents: surface cleaners, laundry liquid, dishwashing liquid, bleach and hand soap. Order online or checkout via WhatsApp.",
      },
      { property: "og:title", content: "ProClean Detergents — Professional Clean" },
      {
        property: "og:description",
        content: "Many cleaning formulas for surfaces, laundry, dishes and hands. Order online or via WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppProviders>
      <main className="min-h-screen bg-background">
        <TopBar />
        <Hero />
        <Catalog />
        <Footer />
        <CartDrawer />
        <Toaster position="top-center" richColors />
      </main>
    </AppProviders>
  );
}

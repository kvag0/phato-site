import HeroSection from "@/components/sections/home/hero-section";
import PillarsSection from "@/components/sections/home/pillars-section";
import BiasTestCtaSection from "@/components/sections/home/bias-test-cta-section";
import ProductsSection from "@/components/sections/home/products-section";
import ContentPreview from "@/components/sections/home/content-preview-section";
import EarlyAccessCtaSection from "@/components/sections/home/early-access-cta-section";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* [INFO]: Estrutura da homepage atualizada com as novas seções.
        A jornada agora é:
        1. Hero: Nossa missão.
        2. Pilares: Nossos valores inegociáveis.
        3. Teste de Viés: Um convite à autorreflexão.
        4. Produtos: Nossas soluções B2C e B2B.
        5. Conteúdo: Uma amostra do nosso conhecimento.
        6. CTA de Acesso Antecipado: O convite para participar.
      */}
      <HeroSection />
      <PillarsSection />
      <BiasTestCtaSection />
      <ProductsSection />
      {/*<ContentPreview />*/}
      <EarlyAccessCtaSection />
    </main>
  );
}
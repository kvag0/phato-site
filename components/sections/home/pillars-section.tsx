// [DATA]: Nossos quatro pilares fundamentais, extraídos de Genesis.md.
const pillarsData = [
  {
    title: "Transparência Radical",
    description: "Não pedimos sua confiança, nós a conquistamos. Nossa metodologia, fontes e registros são abertos. O lema não é 'confie em nós', mas sim 'não confie, verifique'.",
    visualId: "transparency"
  },
  {
    title: "Imparcialidade Verificável",
    description: "Não declaramos neutralidade, nós a construímos. Para cada fato, apresentamos os múltiplos ângulos, os contrapontos e, crucialmente, o que foi omitido.",
    visualId: "impartiality"
  },
  {
    title: "Empoderamento do Leitor",
    description: "O Phato é um arsenal para a mente crítica. Oferecemos resumos neutros, análise de viés e contrapontos automáticos para desafiar sua perspectiva.",
    visualId: "empowerment"
  },
  {
    title: "Sustentabilidade Ética",
    description: "Você não é o produto. A clareza é o produto. Seus dados de interação servem a um único propósito: aprimorar nossas ferramentas para toda a comunidade.",
    visualId: "sustainability"
  },
];

const PillarsSection = () => {
  return (
    <section className="w-full py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-6">
        {/* // [ANIMATION CONTAINER]: Este container à esquerda será 'pinned' (fixado) com GSAP ScrollTrigger.
          // O conteúdo dentro dele mudará dinamicamente com base no texto que está em foco na direita.
        */}
        <div className="lg:sticky top-0 h-screen flex items-center justify-center">
          <div className="w-full h-3/4 bg-card/50 rounded-lg border border-border flex items-center justify-center p-8">
             <span className="text-secondary-text">[Placeholder para Animação Interativa dos Pilares]</span>
             {/* // [ANIMATION NOTE]: Aqui teremos uma única animação complexa (provavelmente Lottie ou Three.js)
                // que irá se transformar para representar cada um dos quatro pilares (transparency, impartiality, etc.).
                // A rolagem pelos textos à direita controlará o estado desta animação.
             */}
          </div>
        </div>
        
        {/* // [SCROLLING CONTENT]: Estes blocos de texto rolarão normalmente,
          // e cada um atuará como um gatilho para a animação à esquerda.
        */}
        <div className="flex flex-col gap-16 lg:gap-[50vh]">
          {pillarsData.map((pillar, index) => (
            <div key={index} className="min-h-[50vh] flex flex-col justify-center pillar-trigger" data-visual={pillar.visualId}>
              <h3 className="text-4xl md:text-5xl font-bold text-highlight">{pillar.title}</h3>
              <p className="mt-6 text-secondary-text text-lg leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
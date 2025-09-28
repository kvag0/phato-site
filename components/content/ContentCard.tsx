import { ArrowRight } from 'lucide-react'; // Usando lucide-react, padrão do Shadcn/UI

// [TYPE DEFINITION]: Definindo a estrutura de dados para um item de conteúdo.
// Isso garante type safety e facilita o consumo de uma API no futuro.
export type ContentItem = {
  id: number;
  type: "Blog" | "Podcast";
  title: string;
  excerpt: string;
  date: string;
  metadata: string; // Unificando "readTime" e "duration"
};

type ContentCardProps = {
  item: ContentItem;
};

export const ContentCard = ({ item }: ContentCardProps) => {
  const isBlog = item.type === "Blog";

  return (
    // [COMPONENT]: O card em si. As classes do 'group' são essenciais para os efeitos de hover.
    // A classe 'fade-in-card' será nosso alvo para a animação com GSAP.
    <div className="fade-in-card group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isBlog ? "bg-[#ffbc59] text-black" : "bg-purple-500 text-white"
          }`}
        >
          {item.type}
        </span>
        <div className="text-blue-200 text-sm">
          {item.date} • {item.metadata}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ffbc59] transition-colors">
        {item.title}
      </h3>

      <p className="text-blue-100 leading-relaxed mb-4 text-pretty">{item.excerpt}</p>

      <div className="flex items-center text-[#ffbc59] font-medium group-hover:translate-x-2 transition-transform duration-300">
        {isBlog ? "Ler artigo" : "Ouvir episódio"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
};
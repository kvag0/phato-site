import { ContentCard, ContentItem } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// [DATA MOCK]: Dados temporários para representar nossos conteúdos.
const MOCKED_CONTENT: ContentItem[] = [
    {
      id: 1,
      type: "Blog",
      title: "O Futuro da Verificação de Fatos na Era Digital",
      excerpt: "Como a IA está revolucionando a forma como combatemos a desinformação.",
      date: "15 Nov 2024",
      metadata: "8 min de leitura",
    },
    {
      id: 2,
      type: "Podcast",
      title: "Episódio #12: Navegando pela Infodemia",
      excerpt: "Conversamos com especialistas sobre os desafios da informação no mundo moderno.",
      date: "12 Nov 2024",
      metadata: "45 min",
    },
];

const ContentPreview = () => {
    return (
        <section className="w-full py-20 md:py-32 bg-card/30">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Luz sobre a <span className="text-highlight">Desinformação</span>
                </h2>
                <p className="mt-4 text-secondary-text max-w-2xl mx-auto">
                    Mergulhe em nossos artigos e podcasts para entender as nuances do cenário informacional atual.
                </p>

                <div className="mt-12 space-y-8 text-left">
                    {MOCKED_CONTENT.map((item) => (
                        // [REUSE]: Reutilizando o componente ContentCard que já existe no projeto.
                        <ContentCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="mt-12">
                    <Button asChild size="lg" variant="outline" className="border-highlight text-highlight hover:bg-highlight/10 hover:text-highlight">
                        <Link href="/conteudo">
                            Ver todo o conteúdo
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default ContentPreview;
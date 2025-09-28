import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const EarlyAccessCtaSection = () => {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* [STYLE UPGRADE]: O gradiente cônico foi substituído por um gradiente radial mais focado.
            Isso cria um "palco" iluminado para o card, reforçando a importância do CTA.
        */}
        <div 
          className="relative max-w-5xl mx-auto rounded-3xl p-1"
          style={{
            background: `radial-gradient(ellipse at center, oklch(var(--highlight) / 0.2), transparent 60%)`,
          }}
        >
          <Card className="relative bg-card/95 p-8 md:p-12 border-border">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                  Construa o futuro da informação <span className="text-highlight">conosco</span>.
                </h2>
                <p className="text-lg text-muted-foreground text-balance">
                  Torne-se um pioneiro na luta contra a desinformação. Inscreva-se para ter acesso exclusivo à plataforma Phato e nos ajudar a refinar as ferramentas que trarão clareza ao mundo.
                </p>
                <div className="mt-4 space-y-4 max-w-lg">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input 
                      type="email" 
                      placeholder="Seu e-mail de acesso" 
                      className="h-12 text-base flex-1" // O foco já é tratado pelo globals.css
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto bg-[#ffbc59] text-primary-foreground hover:bg-highlight/90 h-12 text-base font-semibold px-8 phato-glow"
                    >
                      Quero ser um testador
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    Vagas limitadas. Enviaremos um convite assim que novas vagas estiverem disponíveis.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center aspect-square bg-background/50 rounded-2xl border border-border">
                <span className="text-muted-foreground">[Animação: Pato Construtor]</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessCtaSection;
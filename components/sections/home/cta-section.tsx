import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CtaSection = () => {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* [ANIMATION]: Efeito de 'stagger' nos textos ao entrarem na viewport.
        */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
          Este é um convite para reconstruir, juntos, a base do nosso diálogo.
        </h2>
        <p className="mt-6 text-secondary-text max-w-2xl mx-auto">
          Faça parte da reconquista do fato. Inscreva-se para ser um dos primeiros a ter acesso à plataforma Phato e receber atualizações sobre nossa missão.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* [TODO]: Implementar a lógica de submissão do formulário. */}
          <Input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="bg-card border-border text-primary-text h-12 text-base"
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-highlight text-black hover:bg-highlight/90 h-12 text-base font-semibold">
            Junte-se a nós
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
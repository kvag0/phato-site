"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl tracking-tighter text-balance">
          A Reconquista do Phato
        </h1>
        
        {/* [COPY UPGRADE]: A nova copy é mais ativa, usando palavras do manifesto como "arsenal" e "confiança".
            Ela foca no que o usuário pode FAZER com a Phato.
        */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          A informação foi capturada. É hora de tomá-la de volta. Phato é o seu <strong className="text-foreground">arsenal de clareza</strong> para navegar a desinformação com contexto e confiança.
        </p>
        
        <div className="mt-10">
          {/* [COPY UPGRADE]: O CTA agora é um convite direto para se juntar à nossa missão.
              O efeito 'phato-glow' foi mantido para um visual premium.
          */}
          <Button 
            size="lg" 
            className="bg-[#ffbc59] text-primary-foreground hover:bg-highlight/90 px-8 py-6 text-base font-semibold phato-glow"
          >
            <Zap className="w-5 h-5 mr-2" />
            Junte-se à Reconquista
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float">
        <span className="text-sm">Role para explorar</span>
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
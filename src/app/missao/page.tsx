// src/app/missao/page.tsx

// Os componentes agora são importados da nova pasta 'missao' para melhor organização.
import HeroMissao from "@/components/missao/HeroMissao";
import ManifestoCompleto from "@/components/missao/ManifestoCompleto";
import MissionHistory from "@/components/missao/MissionHistory";
import MissionTeam from "@/components/missao/MissionTeam";

/**
 * A página da Missão.
 * Estrutura o layout para a rota /missao, montando as várias secções
 * que contam a história e os valores da Phato.
 */
export default function MissionPage() {
  return (
    <>
      <HeroMissao />
      <ManifestoCompleto />
      <MissionHistory />
      <MissionTeam />
    </>
  );
}


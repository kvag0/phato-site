// src/components/organisms/MissionManifesto.tsx

import Container from "@/components/molecules/Container";

/**
 * The Manifesto section for the Mission page.
 * Designed for an optimal reading experience, presenting the core values of Phato.
 */
export default function MissionManifesto() {
  return (
    <section className="py-16 bg-phato-card/50">
      <Container>
        <div className="mx-auto max-w-prose">
            <h2 className="text-3xl font-bold tracking-tight text-phato-light">
                O Nosso Manifesto
            </h2>
            <div className="mt-8 space-y-6 text-phato-text">
                <p>
                    <strong>Transparência Radical:</strong> Não pedimos que confie em nós; pedimos que verifique. Todas as nossas análises são abertas, e as nossas fontes, auditáveis. Acreditamos que a confiança não é dada, mas conquistada através da clareza.
                </p>
                <p>
                    <strong>Imparcialidade Verificável:</strong> O nosso compromisso não é com um lado, mas com o contexto. A nossa tecnologia é desenhada para identificar e expor o viés, independentemente da sua origem, permitindo que os factos falem por si.
                </p>
                <p>
                    <strong>Empoderamento do Usuário:</strong> Acreditamos que a verdadeira solução para a desinformação não é dizer às pessoas o que pensar, mas sim dar-lhes as ferramentas para pensarem por si mesmas. A Phato é a sua lanterna, não o seu mapa.
                </p>
            </div>
        </div>
      </Container>
    </section>
  );
}

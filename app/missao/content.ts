// [CONTENT]: Centralizamos todo o conteúdo da página aqui para desacoplar dados da apresentação.
// Esta é uma réplica exata do conteúdo do ficheiro original.

export const headerContent = {
  title: "Vivemos numa era de contradições",
  subtitle:
    "O acesso à informação nunca foi tão fácil, mas a confiança na verdade nunca foi tão frágil. Os factos tornaram-se areia movediça numa paisagem digital onde a linha entre realidade e ficção se desvanece.",
}

export const problemContent = {
  title: "A Anatomia da Distração",
  subtitle:
    "A polarização não é um debate. É uma tática deliberada que nos impede de focar nos problemas que realmente importam.",
  cards: [
    {
      title: "O Jogo da Divisão",
      text: "Narrativas são construídas para nos forçar a escolher um lado. A complexidade é reduzida a um conflito binário, onde a lealdade ao grupo se torna mais importante que a busca pela verdade. Algoritmos otimizados para o 'engagement' amplificam as vozes mais extremas, criando uma ilusão de conflito generalizado e tornando o diálogo construtivo quase impossível.",
    },
    {
      title: "O Custo da Batalha",
      text: "Enquanto a nossa energia é consumida em debates polarizados, os problemas reais e complexos — aqueles que exigem a nossa cooperação — são deixados na sombra, a crescer sem oposição. Cada ciclo de indignação online é um ciclo de inação no mundo real, um imposto sobre o nosso progresso coletivo.",
    },
  ],
  impact: {
    title: "O Custo da Inércia",
    text: "A consequência direta é a paralisia. Desafios críticos como alterações climáticas, instabilidade económica e disrupção tecnológica não esperam pelo fim das nossas disputas. A inércia custa-nos o futuro.",
  },
  // [CONTENT-FIX]: The blueprint object has been re-added to support the interactive component.
  blueprint: {
    title: "Blueprint da Máquina de Divisão",
    description:
      "Analisámos a tática. Desconstruímo-la para a neutralizar. Interaja com os componentes para compreender o mecanismo.",
    steps: [
      {
        id: "step1",
        name: "Simplificar & Polarizar",
        description: "Reduzir um problema complexo a uma escolha binária e emocional ('nós' vs 'eles').",
      },
      {
        id: "step2",
        name: "Empacotar & Rotular",
        description: "Agrupar ideias não relacionadas sob um único rótulo para forçar a lealdade ao 'pacote'.",
      },
      {
        id: "step3",
        name: "Amplificar & Isolar",
        description:
          "Utilizar algoritmos para criar bolhas de confirmação, isolando os grupos e amplificando a hostilidade.",
      },
      {
        id: "step4",
        name: "Distrair & Conquistar",
        description:
          "Manter a população focada no conflito encenado, enquanto os problemas reais passam despercebidos.",
      },
    ],
  },
}

export const solutionContent = {
  title: "Desempacotar a Verdade",
  subtitle: "Rejeitamos a prisão dos 'pacotes ideológicos'. Nossa missão é desconstruir a complexidade para revelar a clareza.",
  biasAxes: [
    {
      title: "Eixo Económico",
      desc: "Analisamos a perspetiva económica, desde o livre mercado até à intervenção estatal, independentemente de outras posições.",
    },
    {
      title: "Eixo Social",
      desc: "Mapeamos os valores sociais, do libertário ao autoritário, para entender as visões sobre liberdades individuais e ordem social.",
    },
    {
      title: "Eixo de Autoridade",
      desc: "Identificamos se a fonte de autoridade é o consenso institucional ou uma perspetiva individual e de contracultura.",
    },
    {
      title: "Eixo Epistemológico",
      desc: "Avaliamos como a verdade é construída: com base em dados empíricos e racionalidade ou em empatia e experiência pessoal.",
    },
  ],
}

export const principlesContent = {
  title: "A Arquitetura da Confiança",
  subtitle: "Não pedimos a sua confiança. Conquistamo-la a cada segundo.",
  principles: [
    {
      title: "Transparência Radical",
      motto: "Não confie, verifique.",
      desc: "Todos os nossos processos são abertos e auditáveis. O código é público, os dados são rastreáveis.",
    },
    {
      title: "Imparcialidade Verificável",
      motto: "O processo, não a alegação.",
      desc: "Focamos em metodologias rigorosas, não em conclusões pré-determinadas.",
    },
    {
      title: "Empoderamento do Utilizador",
      motto: "O utilizador como protagonista.",
      desc: "Fornecemos ferramentas, não verdades. O pensamento crítico é seu, não nosso.",
    },
    {
      title: "Sustentabilidade Ética",
      motto: "A missão acima do lucro.",
      desc: "O nosso modelo de negócio alinha-se com o bem público, não contra ele.",
    },
  ],
}

export const teamMembers = [
  {
    name: "Caio Sobrinho",
    role: "Co-Fundador",
    bio: "Visionário em tecnologia com expertise em verificação de fatos e sistemas de integridade informacional.",
    expertise: ["Estratégia", "Visão", "Liderança"],
  },
  {
    name: "Bruno Basini",
    role: "Co-Fundador & CPO",
    bio: "Especialista em produto com background em jornalismo investigativo e desenvolvimento de plataformas digitais.",
    expertise: ["Produto", "UX", "Jornalismo"],
  },
  {
    name: "Kalil Souza",
    role: "Co-Fundador",
    bio: "Executivo experiente em operações e crescimento de startups de tecnologia com foco em impacto social.",
    expertise: ["Operações", "Crescimento", "Impacto"],
  },
  {
    name: "Rafael Montilla",
    role: "CTO",
    bio: "Arquiteto de software com expertise em sistemas distribuídos e machine learning aplicado à verificação de informação.",
    expertise: ["Tecnologia", "ML", "Arquitetura"],
  },
  {
    name: "Igor Teisen",
    role: "CMO",
    bio: "Especialista em marketing digital e comunicação estratégica com foco em tecnologia e transparência informacional.",
    expertise: ["Marketing", "Comunicação", "Branding"],
  },
]


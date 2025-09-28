"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Obstacle {
  id: number
  x: number
  passed: boolean
  type: string
}

interface Cloud {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export default function NotFoundPage() {
  const [isJumping, setIsJumping] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [duckBottom, setDuckBottom] = useState(20)
  const [clouds, setClouds] = useState<Cloud[]>([])

  const obstacleTypes = ["FAKE NEWS", "DESINFORMAÇÃO", "CLICKBAIT", "BOATOS", "PROPAGANDA"]
  const gameSpeed = useRef(5)
  const obstacleIdCounter = useRef(0)
  const animationFrameRef = useRef<number>()
  const obstacleTimerRef = useRef<NodeJS.Timeout>()
  const cloudIdCounter = useRef(0)

  const generateClouds = useCallback(() => {
    const initialClouds: Cloud[] = []
    for (let i = 0; i < 6; i++) {
      initialClouds.push({
        id: cloudIdCounter.current++,
        x: Math.random() * 1000,
        y: Math.random() * 150 + 50,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 1 + 0.5,
      })
    }
    setClouds(initialClouds)
  }, [])

  // [CORREÇÃO] A função de pulo foi simplificada e corrigida.
  const jump = useCallback(() => {
    if (isJumping || gameOver || !gameStarted) return

    setIsJumping(true)
    let velocity = 22 // Força inicial do pulo

    const jumpAnimation = (currentHeight: number) => {
      velocity -= 1.2 // Gravidade
      let newHeight = currentHeight + velocity

      if (newHeight <= 20) {
        setDuckBottom(20)
        setIsJumping(false)
        return
      }

      setDuckBottom(newHeight)
      requestAnimationFrame(() => jumpAnimation(newHeight))
    }

    requestAnimationFrame(() => jumpAnimation(duckBottom))
  }, [isJumping, gameOver, gameStarted, duckBottom])

  // [CORREÇÃO] A geração de obstáculos agora usa o setter de estado funcional corretamente.
  const generateObstacle = useCallback(() => {
    if (gameOverRef.current) return;

    setObstacles((prev) => [
      ...prev,
      {
        id: obstacleIdCounter.current++,
        x: 800,
        passed: false,
        type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
      },
    ])

    const randomTime = Math.random() * 1500 + (1500 / gameSpeed.current)
    obstacleTimerRef.current = setTimeout(generateObstacle, randomTime)
  }, [obstacleTypes])


  // [CORREÇÃO] A lógica do jogo foi movida para dentro de um único useEffect.
  // Esta é a mudança mais importante e garante que o jogo funcione.
  const gameOverRef = useRef(gameOver);
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);
  
  // NO LUGAR DO SEU ANTIGO useEffect DE GAMELOOP, USE ESTE:
useEffect(() => {
    // [FIX] Se o jogo não começou ou acabou, limpamos tudo e paramos.
    if (!gameStarted || gameOver) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (obstacleTimerRef.current) clearTimeout(obstacleTimerRef.current);
      return;
    }

    // [FIX] A função que gera obstáculos agora vive DENTRO do useEffect.
    // Isso garante que ela só seja iniciada uma vez com o jogo.
    const generateObstacleWithTimer = () => {
        // [ANIMATION]: Placeholder para lógica mais complexa, se necessário.
        setObstacles((prev) => [
            ...prev,
            {
                id: obstacleIdCounter.current++,
                x: 800, // Posição inicial fora da tela
                passed: false,
                type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
            },
        ]);

        // Calcula o próximo intervalo de tempo.
        const randomTime = Math.random() * 1500 + (1500 / gameSpeed.current);
        obstacleTimerRef.current = setTimeout(generateObstacleWithTimer, randomTime);
    };

    // A função principal do loop de animação.
    const gameLoop = () => {
        // Movimenta os obstáculos (a lógica de geração foi separada).
        setObstacles((prevObstacles) =>
            prevObstacles
                .map((obstacle) => ({
                    ...obstacle,
                    x: obstacle.x - gameSpeed.current,
                }))
                .filter((obstacle) => obstacle.x > -50)
        );

        // Movimenta as nuvens.
        setClouds((prevClouds) => {
            const newClouds = prevClouds.map((cloud) => ({
                ...cloud,
                x: cloud.x - cloud.speed,
            })).filter(cloud => cloud.x > -100);

            if (newClouds.length < 6 && Math.random() < 0.01) {
                newClouds.push({
                    id: cloudIdCounter.current++, x: 850, y: Math.random() * 150 + 50,
                    size: Math.random() * 30 + 20, speed: Math.random() * 1 + 0.5,
                });
            }
            return newClouds;
        });

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // --- PONTO DE PARTIDA ---
    // Inicia o loop de animação.
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    // Inicia a CADEIA de geração de obstáculos (será chamada apenas uma vez).
    generateObstacleWithTimer();

    // Função de limpeza: será executada quando o jogo parar ou o componente for desmontado.
    return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (obstacleTimerRef.current) clearTimeout(obstacleTimerRef.current);
    };
    
    // [FIX] Este useEffect agora só depende do estado do jogo (iniciado/acabado).
}, [gameStarted, gameOver]);


  // [CORREÇÃO] Lógica de colisão e pontuação em um useEffect separado
  // Isso simplifica o loop principal e evita bugs de estado.
  useEffect(() => {
      if (obstacles.length === 0 || !gameStarted || gameOver) return;

      const duckRect = { left: 50, bottom: duckBottom, right: 98, top: duckBottom + 48 };

      obstacles.forEach(obstacle => {
          const obstacleRect = { left: obstacle.x, bottom: 20, right: obstacle.x + 30, top: 80 };
          
          // Checagem de colisão
          if (duckRect.right > obstacleRect.left && duckRect.left < obstacleRect.right && duckRect.bottom < obstacleRect.top) {
              setGameOver(true);
          }
          
          // Checagem de pontuação
          if (obstacle.x < 50 && !obstacle.passed) {
              setObstacles(prev => prev.map(o => o.id === obstacle.id ? {...o, passed: true} : o));
              setScore(s => s + 1);
              gameSpeed.current = Math.min(gameSpeed.current + 0.1, 12);
          }
      });
  }, [obstacles, duckBottom, gameStarted, gameOver]);


  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setObstacles([])
    setDuckBottom(20)
    gameSpeed.current = 5
    obstacleIdCounter.current = 0
    generateClouds()
  }

  useEffect(() => {
    const handleAction = (e: Event) => {
      e.preventDefault();
      if (!gameStarted) {
        startGame();
      } else if (gameOver) {
        startGame();
      } else {
        jump();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') handleAction(e);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleAction);
    document.addEventListener('touchstart', handleAction);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleAction);
      document.removeEventListener('touchstart', handleAction);
    };
  }, [gameStarted, gameOver, jump]);


  // O JSX ABAIXO ESTÁ IDÊNTICO AO SEU ORIGINAL
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="text-center mb-8">
        <h1
          className="text-8xl font-bold text-[#ffbc59] mb-4"
          style={{
            textShadow: "4px 4px 0px #000",
            imageRendering: "pixelated",
          }}
        >
          404
        </h1>
        <p className="text-2xl text-[#ffbc59] mb-2 font-bold">PÁGINA NÃO ENCONTRADA!</p>
        <p className="text-lg text-[#ffbc59]/80">Mas que tal um jogo enquanto está aqui?</p>
      </div>

      <div
        className="relative w-full max-w-4xl h-80 bg-black overflow-hidden"
        style={{
          imageRendering: "pixelated",
        }}
      >
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute bg-[#ffbc59] opacity-10 rounded-full"
            style={{
              left: `${cloud.x}px`,
              top: `${cloud.y}px`,
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              imageRendering: "pixelated",
            }}
          />
        ))}

        <div
          className="absolute bottom-5 w-full h-0.5 border-t-2 border-dotted border-[#ffbc59]"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, #ffbc59 0px, #ffbc59 4px, transparent 4px, transparent 12px)`,
            height: "2px",
          }}
        ></div>

        <div
          className="absolute left-12 transition-none"
          style={{
            bottom: `${duckBottom}px`,
            imageRendering: "pixelated",
            width: "48px",
            height: "48px",
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-8 left-4 w-8 h-6 bg-[#ffbc59]"></div>
            <div className="absolute bottom-6 left-2 w-12 h-8 bg-[#ffbc59]"></div>
            <div className="absolute bottom-4 left-6 w-8 h-4 bg-[#ffbc59]"></div>
            <div className="absolute bottom-14 left-6 w-6 h-6 bg-[#ffbc59]"></div>
            <div className="absolute bottom-16 left-8 w-4 h-4 bg-[#ffbc59]"></div>
            <div className="absolute bottom-15 left-12 w-3 h-2 bg-orange-400"></div>
            <div className="absolute bottom-14 left-13 w-2 h-1 bg-orange-400"></div>
            <div className="absolute bottom-16 left-9 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-2 left-4 w-2 h-2 bg-orange-400"></div>
            <div className="absolute bottom-2 left-10 w-2 h-2 bg-orange-400"></div>
            <div className="absolute bottom-4 left-5 w-1 h-2 bg-orange-400"></div>
            <div className="absolute bottom-4 left-10 w-1 h-2 bg-orange-400"></div>
            <div className="absolute bottom-8 left-1 w-3 h-4 bg-[#ffbc59]"></div>
            <div className="absolute bottom-10 left-0 w-2 h-2 bg-[#ffbc59]"></div>
            <div className="absolute bottom-8 left-6 w-4 h-3 bg-[#e6a84d]"></div>
            <div className="absolute bottom-6 left-8 w-3 h-2 bg-[#e6a84d]"></div>
          </div>
        </div>

        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className="absolute bottom-5 flex flex-col items-center"
            style={{
              left: `${obstacle.x}px`,
              zIndex: 10,
            }}
          >
            <div className="relative">
              <div className="w-6 h-20 bg-[#ffbc59] border-2 border-black"></div>
              <div className="absolute top-4 -left-3 w-3 h-8 bg-[#ffbc59] border-2 border-black"></div>
              <div className="absolute top-8 -right-3 w-3 h-6 bg-[#ffbc59] border-2 border-black"></div>
              <div className="absolute -top-10 -left-6 bg-black text-[#ffbc59] text-xs px-2 py-1 whitespace-nowrap font-bold border-2 border-[#ffbc59] text-center min-w-max">
                {obstacle.type}
              </div>
            </div>
          </div>
        ))}

        <div
          className="absolute top-4 right-4 text-[#ffbc59] font-bold text-lg"
          style={{
            imageRendering: "pixelated",
            fontFamily: "monospace",
          }}
        >
          HI {String(Math.max(score, 0)).padStart(5, "0")} {String(score).padStart(5, "0")}
        </div>

        {gameOver && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
            <div
              className="bg-black border-4 border-[#ffbc59] p-8 text-center"
              style={{
                imageRendering: "pixelated",
              }}
            >
              <h2
                className="text-4xl font-bold text-[#ffbc59] mb-4"
                style={{
                  textShadow: "2px 2px 0px #000",
                }}
              >
                GAME OVER
              </h2>
              <p className="text-lg text-[#ffbc59] mb-2 font-bold">Você foi pego pela desinformação!</p>
              <p className="text-md text-[#ffbc59]/70 mb-6">Pontuação final: {score}</p>
              <Button
                onClick={startGame}
                className="bg-[#ffbc59] hover:bg-[#ffbc59]/90 text-black font-bold px-6 py-3 border-2 border-black"
                style={{
                  imageRendering: "pixelated",
                }}
              >
                TENTAR NOVAMENTE
              </Button>
            </div>
          </div>
        )}

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div
              className="bg-black p-8 text-center max-w-md"
              style={{
                imageRendering: "pixelated",
              }}
            >
              <div className="relative w-12 h-12 mx-auto mb-4">
                <div className="absolute bottom-2 left-1 w-2 h-1.5 bg-[#ffbc59]"></div>
                <div className="absolute bottom-1.5 left-0.5 w-3 h-2 bg-[#ffbc59]"></div>
                <div className="absolute bottom-1 left-1.5 w-2 h-1 bg-[#ffbc59]"></div>
                <div className="absolute bottom-3.5 left-1.5 w-1.5 h-1.5 bg-[#ffbc59]"></div>
                <div className="absolute bottom-4 left-2 w-1 h-1 bg-[#ffbc59]"></div>
                <div className="absolute bottom-3.75 left-3 w-0.75 h-0.5 bg-orange-400"></div>
                <div className="absolute bottom-4 left-2.25 w-0.25 h-0.25 bg-black"></div>
                <div className="absolute bottom-0.5 left-1 w-0.5 h-0.5 bg-orange-400"></div>
                <div className="absolute bottom-0.5 left-2.5 w-0.5 h-0.5 bg-orange-400"></div>
              </div>
              <h2 className="text-2xl font-bold text-[#ffbc59] mb-4">PATO ANTI-FAKE NEWS</h2>
              <p className="text-[#ffbc59]/70 mb-4 font-bold">Ajude o pato a evitar a desinformação!</p>
              <Button
                onClick={startGame}
                className="bg-[#ffbc59] border-2 border-black text-black hover:bg-[#ffbc59]/90 font-bold px-6 py-3"
                style={{
                  imageRendering: "pixelated",
                }}
              >
                COMEÇAR JOGO
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-[#ffbc59]">
        <p
          className="mb-2 font-bold text-lg"
          style={{
            textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
          }}
        >
          PRESSIONE ESPAÇO OU TOQUE NA TELA PARA PULAR
        </p>
        <p
          className="text-sm font-bold"
          style={{
            textShadow: "1px 1px 0px rgba(0,0,0,0.5)",
          }}
        >
          EVITE OS OBSTÁCULOS DE DESINFORMAÇÃO E MARQUE PONTOS!
        </p>
      </div>
    </div>
  )
}
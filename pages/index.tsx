import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Game } from '../src/class/Game'

const Home: NextPage = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game | null>(null)

  console.warn('>>>> Render page');

  useEffect(() => {
    const game = new Game({ canvas: canvasRef.current as HTMLCanvasElement })
    setGame(game)
    console.log('>>>> Game created');
  }, [])

  return (
    <div className="layout">
      <Head>
        <title>Tetris</title>
        <meta name="description" content="Juego realizado con NextJS y TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="controls">
          <label id="pauseLabel" className="hidden">PAUSED</label>
        </div>
        <div className="board">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  )
}

export default Home

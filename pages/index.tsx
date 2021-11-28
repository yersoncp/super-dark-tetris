import type { NextPage } from 'next'
import Head from 'next/head'
import {useEffect, useRef, useState } from 'react'
import { Game } from '../src/class/Game'

const Home: NextPage = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    const gameInstance = new Game({ canvas: canvasRef.current as HTMLCanvasElement })
    game.pieces
    setGame(gameInstance)
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
          <label className="scoreLabel">
              <span className="text">Puntos: </span>
              <span id="score">0</span>
          </label>
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

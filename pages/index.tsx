import type { NextPage } from 'next'
import Head from 'next/head'
import {useEffect, useRef, useState } from 'react'
import { Game } from '../src/class/game/Game'

const Home: NextPage = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const gameInstance = new Game(canvas)
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
        <div className="by">
          <a href="https://www.zurvin.com/">Make by Yerson</a>
        </div>
      </div>
    </div>
  )
}

export default Home

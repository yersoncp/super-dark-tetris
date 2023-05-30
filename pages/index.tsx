import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import Layout from '../src/components/Layout/Layout'
import { Game } from '../src/class/Game'

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
    <Layout>

      <div className="controls">
        <label className="scoreLabel">
          <span className="text">SCORE: </span>
          <span id="score">0</span>
        </label>
        <label id="pauseLabel" className="hidden">PAUSED</label>
      </div>
      
      <canvas ref={canvasRef}></canvas>

    </Layout>
  )
}

export default Home

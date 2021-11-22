import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { Game } from '../src/class/Game'

const Home: NextPage = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const game = new Game({ canvas: canvasRef.current as HTMLCanvasElement })
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="game">
        <canvas ref={canvasRef}></canvas>
      </div>

    </div>
  )
}

export default Home

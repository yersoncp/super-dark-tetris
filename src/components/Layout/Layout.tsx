import Head from 'next/head'
import { ReactNode } from 'react'
import s from './Layout.module.css'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Tetris experiment</title>
        <meta name="description" content="Juego realizado con NextJS y TypeScript" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap" rel="stylesheet" />
      </Head>

      <div className={s.container}>
        <h1 className={s.title}>Tetris game</h1>

        <div>
          {children}
        </div>

        <div className="by">
          Make by
          {" "}
          <a
            className={s.link}
            href="https://www.zurvin.com/"
            target='_blank'
            rel='noreferrer'
          >
            Yerson
          </a>

          {" - "}

          <a
            className={s.link}
            href="https://github.com/yersoncp/super-dark-tetris"
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </>
  )
}

export default Layout

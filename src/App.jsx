import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Atelier from './sections/Atelier'
import Feature from './sections/Feature'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-violet px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-ink focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Atelier />
        <Feature />
        <Contact />
      </main>

      <div className="grain" aria-hidden="true" />
    </>
  )
}

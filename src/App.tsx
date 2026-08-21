import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Locations } from './components/Locations'
import { Partnership } from './components/Partnership'
import { Services } from './components/Services'

export default function App() {
  return (
    <>
      <Header />
      <main className="stack-page" id="main-content">
        <Hero />
        <Services />
        <Approach />
        <Partnership />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

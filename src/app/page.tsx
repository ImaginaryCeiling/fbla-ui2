import { CatamountHero } from "../components/hero/hero-page"
import { Footer } from "../components/hero/hero-footer"
import { Header } from "../components/hero/hero-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <CatamountHero />
      </main>
      <Footer />
    </div>
  )
}


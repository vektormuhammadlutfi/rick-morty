import Footer from '@/component/Footer'
import Navigation from '@/component/Navbar'
import CharacterModule from '@/modules/characters'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Navigation />
      <CharacterModule />
      <Footer />
    </>
  )
}

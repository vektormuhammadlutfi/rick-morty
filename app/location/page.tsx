import Footer from '@/component/Footer'
import Navigation from '@/component/Navbar'
import LocationModule from '@/modules/locations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rick And Morty Fan Site - Locations',
  description:
    'Rick And Morty Fan Site. This is a fan site for Rick And Morty. It is built with Next.js and Bootstrap.',
}

export default function Home() {
  return (
    <>
      <Navigation />
      <LocationModule />
      <Footer />
    </>
  )
}

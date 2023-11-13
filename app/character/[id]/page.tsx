import Footer from '@/component/Footer'
import Navigation from '@/component/Navbar'
import DetailCharacterModule from '@/modules/characters/detail'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

const DetailCharacterPage = ({ params }: Props) => {
  return (
    <>
      <Navigation />
      <DetailCharacterModule params={params} />
      <Footer />
    </>
  )
}

export default DetailCharacterPage

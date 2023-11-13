import Footer from '@/component/Footer'
import Navigation from '@/component/Navbar'
import DetailLocationModule from '@/modules/locations/detail'
import { Metadata } from 'next'

type Props = {
  params: { name: string }
}

const DetailLocationPage = ({ params }: Props) => {
  return (
    <>
      <Navigation />
      {/* <DetailCharacterModule params={params} /> */}
      <DetailLocationModule params={params} />
      <Footer />
    </>
  )
}

export default DetailLocationPage

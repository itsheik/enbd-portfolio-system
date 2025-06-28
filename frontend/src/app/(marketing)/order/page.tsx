import OrderSection from '@/src/components/sections/order'

import { SectionBanner, SectionContainer } from '~/components/sections'

const OrderPage = () => {
   return (
      <section className="space-y-16 pb-16">
         <SectionBanner title="Order" />
         <SectionContainer className="space-y-8">
            <OrderSection />
         </SectionContainer>
      </section>
   )
}

export default OrderPage

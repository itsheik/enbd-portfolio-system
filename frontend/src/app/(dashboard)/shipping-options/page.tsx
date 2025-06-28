import ShippingOptionsSection from '@/src/components/sections/checkout/ShippingOptionsSection'

import { SectionBanner, SectionContainer } from '~/components/sections'
import { generateSeoMetadata } from '~/config'
import { routes } from '~/constants'

export const metadata = generateSeoMetadata({
   title: 'Shipping Option',
   canonicalUrlRelative: routes.shipping_options,
})

const CartPage = () => {
   return (
      <section className="space-y-16 pb-16">
         <SectionBanner title="Shipping Option" />
         <SectionContainer className="space-y-8">
            <ShippingOptionsSection />
         </SectionContainer>
      </section>
   )
}

export default CartPage

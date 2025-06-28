import CheckoutSection from '@/src/components/sections/checkout/CheckoutSection'

import { SectionBanner, SectionContainer } from '~/components/sections'
import { generateSeoMetadata } from '~/config'
import { routes } from '~/constants'

export const metadata = generateSeoMetadata({
   title: 'Checkout',
   canonicalUrlRelative: routes.checkout,
})

const CartPage = () => {
   return (
      <section className="space-y-16 pb-16">
         <SectionBanner title="Checkout" />
         <SectionContainer className="space-y-8">
            <CheckoutSection />
         </SectionContainer>
      </section>
   )
}

export default CartPage

import CartSection from '@/src/components/sections/checkout/CartSection'

import { SectionBanner, SectionContainer } from '~/components/sections'
import { generateSeoMetadata } from '~/config'
import { routes } from '~/constants'

export const metadata = generateSeoMetadata({
   title: 'Retail Sales Shopping Cart',
   canonicalUrlRelative: routes.cart,
})

const CartPage = () => {
   return (
      <section className="space-y-16 pb-16">
         <SectionBanner title="Retail Sales Shopping Cart" />
         <SectionContainer className="space-y-8">
            <CartSection />
         </SectionContainer>
      </section>
   )
}

export default CartPage

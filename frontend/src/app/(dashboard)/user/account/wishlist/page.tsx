import WishList from '@/src/components/sections/wishlist/WishList/WishList'

import BidSummary from '~/components/sections/dashboard/BidSummary'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <BidSummary showTitle={false} />
         <WishList />
      </section>
   )
}

export default Page

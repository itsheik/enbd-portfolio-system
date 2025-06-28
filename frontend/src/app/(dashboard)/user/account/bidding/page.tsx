import BiddingGuide from '@/src/components/sections/bidding/BiddingGuide'
import CurrentWinningBids from '@/src/components/sections/bidding/CurrentWinningBids/CurrentWinningBids'
import OutBidsLots from '@/src/components/sections/bidding/OutBidsLots/OutBidsLots'
import SplitViewHeader from '@/src/components/sections/bidding/SplitViewHeader'

import BidSummary from '~/components/sections/dashboard/BidSummary'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <BidSummary />

         <SplitViewHeader />

         <CurrentWinningBids />
         <OutBidsLots />

         <BiddingGuide />
      </section>
   )
}

export default Page

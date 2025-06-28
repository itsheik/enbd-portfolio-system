import BiddingGuide from '@/src/components/sections/bidding/BiddingGuide'
import SplitViewHeader from '@/src/components/sections/bidding/SplitViewHeader'
import CurrentNotSelling from '@/src/components/sections/consignments/CurrentNotSelling/CurrentNotSelling'
import CurrentSelling from '@/src/components/sections/consignments/CurrentSelling/CurrentSelling'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <SplitViewHeader />

         <CurrentSelling />
         <CurrentNotSelling />

         <BiddingGuide />
      </section>
   )
}

export default Page

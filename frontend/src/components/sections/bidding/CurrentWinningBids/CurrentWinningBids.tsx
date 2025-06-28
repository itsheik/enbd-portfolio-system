import GlobalHeading from '../../../ui/Headings/GlobalHeading'

import CurrentWinningBidsTable from './CurrentWinningBidsTable'

type Props = object

const CurrentWinningBids = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="Currently Winning Bids" />
         <CurrentWinningBidsTable />
      </div>
   )
}

export default CurrentWinningBids

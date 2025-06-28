import GlobalHeading from '../../../ui/Headings/GlobalHeading'

import OutBidsLotsTable from './OutBidsLotsTable'

type Props = object

const OutBidsLots = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="OutBid Lots \ Not Winning" />
         <OutBidsLotsTable />
      </div>
   )
}

export default OutBidsLots

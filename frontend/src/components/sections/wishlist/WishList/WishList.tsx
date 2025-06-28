import GlobalHeading from '../../../ui/Headings/GlobalHeading'

import WishListTable from './WishListTable'

type Props = object

const WishList = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="Watching Lots" />

         <WishListTable />
      </div>
   )
}

export default WishList

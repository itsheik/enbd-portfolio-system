import GlobalHeading from '../../../ui/Headings/GlobalHeading'

import CurrentNotSellingTable from './CurrentNotSellingTable'

type Props = object

const CurrentNotSelling = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="Currently Not Selling" />
         <CurrentNotSellingTable />
      </div>
   )
}

export default CurrentNotSelling

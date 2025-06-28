import GlobalHeading from '../../../ui/Headings/GlobalHeading'

import CurrentSellingTable from './CurrentSellingTable'

type Props = object

const CurrentSelling = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between flex-wrap">
            <GlobalHeading title="Currently Selling" />

            <div className="text-red-secondary font-medium text-md shadow-white-secondary bg-red-muted px-[10%] min-w-10">
               Selling: <span className='text-red-600'>0Lots / $0</span>{' '}
            </div>
         </div>

         <CurrentSellingTable />
      </div>
   )
}

export default CurrentSelling

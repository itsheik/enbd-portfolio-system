import GlobalHeading from '~/components/ui/Headings/GlobalHeading'

type Props = {
   showTitle?: boolean
}

const BidSummary = ({ showTitle = true }: Props) => {
   const BID_SUMMARY_DATA = [
      {
         title: 'Bid Limit',
         value: 10,
      },
      {
         title: 'Current Bids',
         value: 10,
      },
      {
         title: 'Available',
         value: 10,
      },
   ]

   return (
      <div className="flex flex-col gap-3">
         {showTitle && <GlobalHeading title="Bid Summary" />}

         <div className="flex items-center flex-wrap gap-5 border-b border-b-b-white-primary py-2">
            {BID_SUMMARY_DATA.map((data, index) => {
               return (
                  <div
                     key={index}
                     className="lg:w-1/6 flex gap-2 items-center text-b-white-secondary font-medium text-sm"
                  >
                     <span className="">{data.title}:</span>
                     <span className="">${data.value}</span>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default BidSummary

import GlobalHeading from '~/components/ui/Headings/GlobalHeading'

type Props = object

const BidsData = ({ winData, lossData }: { winData: string; lossData: string }) => {
   return (
      <div className="flex items-center gap-2 text-xs">
         <span className="text-success-primary">Winning {winData}</span>
         <span className="text-success-primary">|</span>
         <span className="text-error-primary">Losing {lossData}</span>
      </div>
   )
}

const ConsignedData = ({ winData, lossData }: { winData: string; lossData: string }) => {
   return (
      <div className="flex items-center gap-2 text-xs">
         <span className="text-error-primary">Selling {winData}</span>
         <span className="text-error-primary">|</span>
         <span className="text-error-primary">Not Selling {lossData}</span>
      </div>
   )
}

const AuctionSummary = (props: Props) => {
   const BID_SUMMARY_DATA = [
      {
         title: 'Auction Name',
         value: 10,
      },
      {
         title: 'Bids',
         value: <BidsData winData="0/0.00" lossData="0/0.00" />,
      },
      {
         title: 'Consigned',
         value: <ConsignedData winData="0/0.00" lossData="0/0.00" />,
      },
      {
         title: 'Consigned',
         value: <ConsignedData winData="0/0.00" lossData="0/0.00" />,
      },
   ]

   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="Auction Summary" />

         <div className="grid grid-cols-3 gap-5 border-b border-b-b-white-primary w-[90%] py-2">
            {BID_SUMMARY_DATA.map((data, index) => {
               return (
                  <div
                     key={index}
                     className="col-span flex gap-2 items-center text-b-white-secondary font-medium text-sm"
                  >
                     <span className="">{data.title}:</span>
                     <span className="">{data.value}</span>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default AuctionSummary

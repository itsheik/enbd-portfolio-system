import { CloseSvg, DoubleTickSvg, ManRankSvg } from '../../ui/icons/svg-icons'

type Props = object

const BiddingGuide = (props: Props) => {
   return (
      <div className="bg-red-muted text-red-primary text-sm px-2 py-3 flex flex-col gap-2">
         <div className="text-inherit flex items-center gap-2">
            <ManRankSvg />
            <p>Indicates you are the winning Bidder for a specific lot.</p>
         </div>
         <div className="text-inherit flex items-center gap-2">
            <DoubleTickSvg />
            <p>Indicates you are the highest Bidder for a specific lot.</p>
         </div>
         <div className="text-inherit flex items-center gap-2">
            <CloseSvg />
            <p>Indicates you have been outbid on a specific a lot.</p>
         </div>

         <span className='pl-5'>
            *Price Includes BP if Auction is Closed <br /> *Reserve not met
         </span>
      </div>
   )
}

export default BiddingGuide

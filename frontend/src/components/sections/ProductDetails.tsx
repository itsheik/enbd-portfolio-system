'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { differenceInSeconds } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ImageCaroselComponent } from '@/src/components/cards/ImageCarosel'
import { ChevFilledSvg } from '@/src/components/ui/icons/svg-icons'
import { routes } from '@/src/constants'
import { REGEX } from '@/src/constants/regex'
import { useAddBid } from '@/src/hooks/auction/useAuctionData'
import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { selectUserSlice } from '@/src/store/features/auth/authSlice'
import { Back, WineCUP } from '@/src/utils/images/main-page'

import Loader from '../ui/Loader'

import CountdownTimer from './auction/DateOfAuction'

import { Heading, InternalLink, MButton, MTextInput, Paragraph } from '~/components/ui'

type Props = {
   isLoading: boolean
}

interface BidValidationErrors {
   bidValue?: string
}

const ProductDetails = ({ isLoading, ..._props }: Props) => {
   const router = useRouter()
   const { lotDetails, lotImages } = useSelector(selectAuctionSlice)
   const { userId } = useSelector(selectUserSlice)
   const { addBid, addBidIsLoading } = useAddBid()

   const [bidValue, setBidValue] = useState<string>('')
   const [bidErrors, setBidErrors] = useState<BidValidationErrors>({})
   const [isBidValid, setIsBidValid] = useState<boolean>(false)

   const secondsDifference = differenceInSeconds(lotDetails?.sessionEndDateTime || '', Date.now())

   const images = lotImages?.map(item => item.imageNormalFileName) || []

   // Validation functions
   const validateBidValue = (value: string): string | undefined => {
      if (!value.trim()) {
         return 'Bid value is required'
      }

      // Check if it's a valid number
      if (!REGEX.DECIMAL_NUMBER.test(value)) {
         return 'Please enter a valid number'
      }

      const numValue = parseFloat(value)

      // Check if it's a positive number
      if (numValue <= 0) {
         return 'Bid amount must be greater than 0'
      }

      // Check if it's a reasonable amount (not too large)
      if (numValue > 1000000) {
         return 'Bid amount cannot exceed $1,000,000'
      }

      // Check if it's at least the minimum bid increment
      const currentBid = lotDetails?.currentBid || 0
      const openingBid = lotDetails?.openingBid || 0
      const minBid = Math.max(currentBid, openingBid)

      if (numValue < minBid) {
         return `Bid must be at least $${minBid}`
      }

      return undefined
   }

   const handleBidValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setBidValue(value)

      // Clear error when user starts typing
      if (bidErrors.bidValue) {
         setBidErrors(prev => ({ ...prev, bidValue: undefined }))
      }
   }

   const handleBidValueBlur = () => {
      const error = validateBidValue(bidValue)
      setBidErrors(prev => ({ ...prev, bidValue: error }))
      setIsBidValid(!error && bidValue.trim() !== '')
   }

   const handleAddBid = () => {
      const error = validateBidValue(bidValue)

      if (error) {
         setBidErrors(prev => ({ ...prev, bidValue: error }))

         return
      }

      if (!lotDetails || !userId) {
         return
      }

      const bidAmount = parseFloat(bidValue)

      addBid({
         lotID: lotDetails.lotID,
         PaddleID: 0,
         CustomerID: userId,
         AuctionID: lotDetails.auctionID,
         BidTypeID: 0,
         BidAmount: bidAmount,
         EmployeID: 0,
         AdministratorInd: false,
      })

      // Clear the input after successful bid
      setBidValue('')
      setBidErrors({})
      setIsBidValid(false)
   }

   // Clear bid input when lot details change
   useEffect(() => {
      setBidValue('')
      setBidErrors({})
      setIsBidValid(false)
   }, [lotDetails?.lotID])

   return (
      <div className="mb-24">
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <button className="flex gap-3 items-center cursor-pointer" onClick={() => router.back()}>
                  <Image src={Back} alt="Bottle Shake" className="mb-0.5" />
                  <Heading className="font-normal">Back</Heading>
               </button>
               <div className="grid grid-cols-[33%_67%] w-full max-[1000px]:grid-cols-1">
                  <div className="max-w-[488px] w-full max-[1000px]:max-w-full">
                     {images.length > 0 ? <ImageCaroselComponent images={images} /> : ''}
                  </div>
                  <div className="pl-8 w-full flex flex-col justify-between">
                     <div>
                        <div className="border-b border-b-b-white-primary pb-4">
                           <Heading className="font-gilda-display font-normal text-red-secondary text-3xl">
                              {lotDetails?.internetHeading}
                           </Heading>
                           <Paragraph className="text-b-white-secondary font-light text-base mt-4">
                              Brand : Wine Yard | Auction # {lotDetails?.auctionID} | . Condition : New
                           </Paragraph>
                        </div>
                        <div className="flex items-end justify-between py-6  w-full max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2.5">
                           <div>
                              <div className="flex items-center gap-2">
                                 <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                                 <Paragraph className="font-light text-sm">Color</Paragraph>
                                 <div className="w-4 h-4 rounded-full bg-primary"></div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                                 <Paragraph className="font-light text-sm">{lotDetails?.mainDescription}</Paragraph>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                                 <Paragraph className="font-light text-sm">The Arcadia Cellar</Paragraph>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                                 <Paragraph className="font-light text-sm">
                                    Lot Location: {lotDetails?.location}
                                 </Paragraph>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                                 <Paragraph className="font-light text-sm">Estimate: $2,400</Paragraph>
                              </div>
                           </div>
                           <div>
                              {lotDetails?.dateOfAuction ? (
                                 <CountdownTimer dateOfAuction={lotDetails?.dateOfAuction} />
                              ) : (
                                 ''
                              )}
                           </div>
                        </div>
                        <Paragraph className="font-semibold text-sm text-b-white-secondary">
                           <span className="text-primary">SIZE:</span> 250ML
                        </Paragraph>

                        {secondsDifference > 0 && lotDetails && userId ? (
                           <div className="flex flex-col gap-2 max-w-xs">
                              <Paragraph className="font-medium text-sm text-primary leading-6">
                                 Enter Bid Value
                              </Paragraph>

                              <MTextInput
                                 type="text"
                                 name="bidValue"
                                 placeholder={`Minimum bid: $${Math.max(lotDetails?.currentBid || 0, lotDetails?.openingBid || 0)}`}
                                 value={bidValue}
                                 onChange={handleBidValueChange}
                                 onBlur={handleBidValueBlur}
                                 aria-label="bid value"
                                 size="sm"
                                 error={bidErrors.bidValue}
                              />

                              <MButton
                                 className="w-full"
                                 loading={addBidIsLoading}
                                 disabled={!isBidValid || addBidIsLoading}
                                 onClick={handleAddBid}
                              >
                                 Add Bid
                              </MButton>
                           </div>
                        ) : null}

                        <div className="flex items-center gap-2 my-4">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <InternalLink
                              className="font-light text-sm text-b-red-secondary underline"
                              href={routes.auctions.current}
                           >
                              Back to Auction Lot Listing
                           </InternalLink>
                        </div>
                     </div>
                     <div className="flex justify-between items-center w-full">
                        {lotDetails?.previousLotID ? (
                           <button
                              className="cursor-pointer flex items-center gap-1.5"
                              onClick={() => router.push(routes.auctions.current + `/${lotDetails.previousLotID}`)}
                           >
                              <ChevFilledSvg className="text-red-secondary" />
                              Previous
                           </button>
                        ) : (
                           ''
                        )}

                        {lotDetails?.nextLotID ? (
                           <button
                              className="cursor-pointer flex items-center gap-1.5"
                              onClick={() => router.push(routes.auctions.current + `/${lotDetails.previousLotID}`)}
                           >
                              Next <ChevFilledSvg className="text-red-secondary rotate-180" />
                           </button>
                        ) : (
                           ''
                        )}
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

export default ProductDetails

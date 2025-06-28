'use client'
import { type FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

import { routes } from '@/src/constants'
import { type Auction } from '@/src/interface/auction'
import { cn } from '@/src/lib'
import { selectAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { selectUserSlice } from '@/src/store/features/auth/authSlice'
import { useAddBidMutation } from '@/src/store/services/auction'
import { ApiErrorToast, ApiSuccessToast, formatDateToISO } from '@/src/utils/helpers'

import CountdownTimer from '../sections/auction/DateOfAuction'
import { GlobalSkeleton } from '../ui/Skeleton'

import Share from '~/assets/images/share.png'
import Star from '~/assets/images/star.png'
import WineBottle from '~/assets/images/wine-bottle.png'
import WineCUP from '~/assets/images/wine-cup.png'
import { Heading, MButton, MTextInput, Paragraph } from '~/components/ui'

type AuctionListingCard = {
   item?: Auction
}

interface BidFormValues {
   bidAmount: string
}

export const AuctionListingCard: FC<AuctionListingCard> = ({ item }) => {
   const router = useRouter()

   const { userId } = useSelector(selectUserSlice)
   const { auctionLiveData, auctionLiveDataLoading } = useSelector(selectAuctionSlice)
   const [isAuctionEnded, setIsAuctionEnded] = useState(false)

   const [
      addBid,
      {
         isLoading: isAddBidLoading,
         isSuccess: isAddBidSuccess,
         isError: isAddBidError,
         error: addBidError,
         data: addBidData,
      },
   ] = useAddBidMutation()

   const BidData = {
      ob: auctionLiveData?.[0].ob || item?.openingbid || 0,
      cb: auctionLiveData?.[0].cb || item?.currentbid || 0,
      yb: auctionLiveData?.[0].yb || 0,
   }

   const initialValues: BidFormValues = {
      bidAmount: '',
   }

   const validationSchema = Yup.object({
      bidAmount: Yup.string()
         .required('Please enter a bid amount')
         .test('is-valid-number', 'Please enter a valid bid amount', value => {
            if (!value) return false
            const numValue = Number(value)

            return !isNaN(numValue) && numValue > 0
         })
         .test('is-greater-than-current', `Bid amount must be greater than current bid ($${BidData.cb})`, value => {
            if (!value) return false
            const numValue = Number(value)

            return numValue > BidData.cb
         }),
   })

   const handleSubmit = (values: BidFormValues, { resetForm }: { resetForm: () => void }) => {
      if (!item || !userId) {
         return
      }

      addBid({
         lotID: item.lotid,
         PaddleID: 0,
         CustomerID: userId,
         AuctionID: item.auctionid,
         BidTypeID: 2,
         BidAmount: Number(values.bidAmount),
         EmployeID: 0,
         AdministratorInd: false,
      })
   }

   useEffect(() => {
      if (isAddBidSuccess) {
         ApiSuccessToast(addBidData.message)
      }
   }, [isAddBidSuccess, addBidData?.message])

   useEffect(() => {
      if (isAddBidError && addBidError) {
         ApiErrorToast(addBidError)
      }
   }, [isAddBidError])

   return (
      <article
         aria-label="recommeauction price list card"
         className="w-full flex items-center flex-col lg:flex-row xl:gap-8 gap-4 justify-between bg-beige px-8 py-4  mb-4 rounded-lg sm:max-md:px-2"
      >
         <div
            className="w-full flex items-center xl:gap-6 gap-4 relative cursor-pointer max-[750px]:flex-col"
            onClick={() => router.push(`/auctions/current/${item?.lotid}`)}
         >
            <div className="flex items-center gap-6 h-[260px] sm:max-md:h-[210px] w-32 relative ">
               <Image
                  width={200}
                  height={240}
                  src={item?.defaultimageurl || WineBottle}
                  blurDataURL={item?.defaultimageurl}
                  alt="Bottle Shake"
                  placeholder={'blur'}
                  className="object-cover mix-blend-multiply brightness-125  w-full h-full"
               />
            </div>
            <div className="w-[1px] h-[187px] bg-[#8282826B] max-[750px]:w-full max-[750px]:h-[1px]"></div>
            <div className="w-full  flex flex-col justify-between xl:gap-12">
               <div className=" w-full">
                  <div className="flex lg:items-center justify-between w-full flex-col lg:flex-row">
                     <Heading className="font-gilda-display font-normal lg:text-[20px] xl:text-2xl text-red-secondary break-words">
                        {item?.internetheading}
                     </Heading>
                     {item?.score ? (
                        <div className="flex lg:justify-between items-center gap-3">
                           {' '}
                           <Image src={Star} alt="Bottle Shake" placeholder="blur" className=" " />
                           <Heading className="font-gilda-display font-semibold text-red-secondary lg:text-[20px] xl:text-2xl">
                              {item.score + 'RP'}
                           </Heading>
                        </div>
                     ) : null}
                  </div>
                  <div className="flex xl:items-end xl:justify-between flex-col lg:flex-row max-[880px]:flex-row max-sm:flex-col">
                     <div className="w-1/2">
                        <div className="flex items-center gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <Paragraph className="font-light text-[12px] xl:text-sm">Color</Paragraph>
                           <div className="w-4 h-4 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex items-center gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <Paragraph className="font-light text-[12px] xl:text-sm">
                              Consists of {item?.quantity} Bottle, {item?.bottlesize + 'L'}
                           </Paragraph>
                        </div>
                        <div className="flex items-center gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <Paragraph className="font-light text-[12px] xl:text-sm">{item?.provenance}</Paragraph>
                        </div>
                        <div className="flex items-center gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <Paragraph className="font-light text-[12px] xl:text-sm">
                              Lot Location: {item?.location}
                           </Paragraph>
                        </div>
                        <div className="flex items-center gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="" />
                           <Paragraph className="font-light text-[12px] xl:text-sm">
                              Estimate: ${item?.estvalue}
                           </Paragraph>
                        </div>
                     </div>
                     <div className="w-1/2">
                        {item?.sessionenddatetime ? (
                           <CountdownTimer
                              dateOfAuction={formatDateToISO(item.sessionenddatetime)}
                              setIsAuctionEnded={setIsAuctionEnded}
                           />
                        ) : (
                           ''
                        )}
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Paragraph className="font-light md:text-base">Share the Link</Paragraph>
                  <button className="cursor-pointer">
                     {' '}
                     <Image src={Share} alt="Bottle Shake" className="" />
                  </button>
               </div>
            </div>
         </div>

         <div className="w-full lg:min-w-[160px] lg:max-w-[210px]">
            <div className="w-full lg:max-w-[210px] mx-auto border-2 rounded-sm p-4 mb-6">
               <div
                  // className={cn('relative pb-6  lg:block w-full flex items-center justify-between', {
                  className={cn('relative pb-6 max-lg:flex justify-between', {
                     'pb-0': userId,
                  })}
               >
                  <div className="flex items-start gap-2">
                     <Image src={WineCUP} alt="Bottle Shake" className="mt-1.5" />
                     <div>
                        <Paragraph className="font-medium text-lg text-primary leading-6">Opening Bid</Paragraph>
                        {auctionLiveDataLoading ? (
                           <GlobalSkeleton height={'25'} />
                        ) : (
                           <Paragraph className="font-light text-[12px] xl:text-sm leading-6">
                              {BidData.ob || 0}
                           </Paragraph>
                        )}
                     </div>
                  </div>
                  <div className="flex items-start gap-2">
                     <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="mt-1.5" />
                     <div>
                        <Paragraph className="font-medium text-lg text-primary leading-6">Current Bid</Paragraph>

                        {auctionLiveDataLoading ? (
                           <GlobalSkeleton height={'25'} />
                        ) : (
                           <Paragraph className="font-light text-[12px] xl:text-sm leading-6">
                              {BidData.cb || 0}
                           </Paragraph>
                        )}
                     </div>
                  </div>
                  {userId ? (
                     <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                           <Image src={WineCUP} alt="Bottle Shake" placeholder="blur" className="mt-1.5" />
                           <div>
                              <Paragraph className="font-medium text-lg text-primary leading-6">Your Bid</Paragraph>
                              {auctionLiveDataLoading ? (
                                 <GlobalSkeleton height={'25'} />
                              ) : (
                                 <Paragraph className="font-light text-[12px] xl:text-sm leading-6">
                                    {BidData.yb || 0}
                                 </Paragraph>
                              )}
                           </div>
                        </div>
                        {!isAuctionEnded ? (
                           <div className="flex flex-col gap-2">
                              <Paragraph className="font-medium text-sm text-primary leading-6">
                                 Enter Bid Value
                              </Paragraph>

                              <Formik
                                 initialValues={initialValues}
                                 validationSchema={validationSchema}
                                 onSubmit={handleSubmit}
                                 enableReinitialize={false}
                              >
                                 {({ values, errors, touched, handleChange, handleBlur, isSubmitting, resetForm }) => (
                                    <Form className="flex flex-col gap-2">
                                       <div>
                                          <MTextInput
                                             type="text"
                                             name="bidAmount"
                                             placeholder="bid value"
                                             value={values.bidAmount}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             aria-label="bid amount"
                                             size="sm"
                                             error={
                                                touched.bidAmount && errors.bidAmount ? errors.bidAmount : undefined
                                             }
                                          />
                                       </div>

                                       <MButton
                                          type="submit"
                                          className="w-full"
                                          loading={isAddBidLoading}
                                          disabled={!values.bidAmount || Object.keys(errors).length > 0}
                                       >
                                          Add Bid
                                       </MButton>
                                    </Form>
                                 )}
                              </Formik>
                           </div>
                        ) : null}
                     </div>
                  ) : (
                     <MButton
                        className="uppercase absolute left-1/2 transform -translate-x-1/2 -bottom-10"
                        isInternal
                        route={routes.auth.signIn}
                     >
                        Login To Bid
                     </MButton>
                  )}
               </div>
            </div>
            <div className="flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
               <Paragraph className="md:text-[13px] font-light">
                  <span className="font-bold">Ends :</span> {item?.sessionenddatetime}
               </Paragraph>
            </div>
         </div>
      </article>
   )
}

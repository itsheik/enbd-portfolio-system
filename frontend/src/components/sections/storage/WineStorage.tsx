import React from 'react'
import { Heading, Paragraph } from '../../ui'
import { NEWPORT_BEACH_STORAGE_FACILITY_DETAILS, SANTA_ANA_STORAGE_FACILITY_DETAILS } from '@/src/constants/constants'
import Image from 'next/image'
import { NewportStorage, SantaAnaStorage } from '@/src/utils/images/main-page'

const WineStorage = () => {
   return (
      <section>
         <section>
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Store Your Wine In The Optimum Conditions
            </Heading>
            <Paragraph className="font-light md:font-light text-base my-4">
               As one of the largest purveyors of fine and rare wine in Orange County, we know how important wine
               storage is to our customers. Spectrum Wine operates wine storage facilities in Santa Ana and Newport
               Beach. At these locations we offer locker sizes that range from smaller 6 case lockers up to luxury 1000+
               case walk-in storage units. We also offer commercial refrigerated pallet storage at our Santa Ana
               facility on a short or long-term basis.
               <br /> Already a storage customer at our Santa Ana location?{' '}
               <span className="underline cursor-pointer">
                  Click here to view your account and submit payment Need Help Moving in? We're Happy To Help.
               </span>
               <br /> Offering Two Convenient Locations in Orange County:
            </Paragraph>
         </section>
         <section className="flex justify-between flex-wrap lg:flex-nowrap gap-8 my-8">
            <div>
               {' '}
               <Heading order={2} className="text-red-secondary font-normal text-3xl">
                  Santa Ana Wine Storage Facility Features
               </Heading>
               <ul className="pl-5 my-5">
                  {SANTA_ANA_STORAGE_FACILITY_DETAILS.map(feat => {
                     return (
                        <li key={feat} className="leading-0 m-0 p-0 list-disc ">
                           <Paragraph className="my-0 font-light md:font-light text-base ">{feat} </Paragraph>
                        </li>
                     )
                  })}
               </ul>
               <div>
                  <Paragraph className="my-0 underline font-light md:font-light text-base text-red-secondary">
                     1641 East Saint Andrew Pl, Santa Ana CA 92705
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Open Monday-Saturday 9AM-7PM, Sunday 10AM-6PM
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Phone:<span className="underline">(949) 748-4845</span>
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Email:<span className="underline">storage@spectrumwine.com</span>{' '}
                  </Paragraph>
               </div>
            </div>

            <Image
               width={500}
               height={600}
               src={SantaAnaStorage}
               alt="Santa Ana storage"
               className="object-cover w-full lg:w-[500px]"
            />
         </section>
         <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-20">
            <Image
               width={390}
               height={380}
               src={NewportStorage}
               alt="Santa Ana storage"
               className="object-cover w-full md:w-[380px]"
            />
            <div>
               {' '}
               <Heading order={2} className="text-red-secondary font-normal text-3xl">
                  Newport Beach Wine Storage Facility
               </Heading>
               <ul className="pl-5 my-5">
                  {NEWPORT_BEACH_STORAGE_FACILITY_DETAILS.map(feat => {
                     return (
                        <li key={feat} className="leading-0 m-0 p-0 list-disc ">
                           <Paragraph className="my-0 font-light md:font-light text-base ">{feat} </Paragraph>
                        </li>
                     )
                  })}
               </ul>
               <div>
                  <Paragraph className="my-0 underline font-light md:font-light text-base text-red-secondary">
                     1641 East Saint Andrew Pl, Santa Ana CA 92705
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Open Monday-Saturday 9AM-7PM, Sunday 10AM-6PM
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Phone:<span className="underline">(949) 748-4845</span>
                  </Paragraph>
                  <Paragraph className="my-0 font-light md:font-light text-base text-red-secondary">
                     Email:<span className="underline">storage@spectrumwine.com</span>{' '}
                  </Paragraph>
               </div>
            </div>
         </section>
      </section>
   )
}

export default WineStorage

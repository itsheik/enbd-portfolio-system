'use client'
import { Pouring } from '@/src/utils/images/main-page'
import Image from 'next/image'
import React from 'react'
import { Heading, MAccordion, Paragraph } from '~/components/ui'

const ShippingFaqs = () => {
   let ACC_DATA = [
      {
         question: 'How is my order being shipped?',
         answer:
            'If you are shipping to the California, District of Columbia, New Mexico, Idaho, or Alaska, your shipment will default to standard ground shipping via United Parcel Service (UPS). If you are shipping to any other US state, your shipment will be scheduled by default through a carrier such as UPS or FedEx. If you would like to adjust your shipping preference, method, or rapidity, you may always adjust your default preferences in your account page or you may of course contact us directly.Starting March 2021 we will only be shipping via Golden State Overnight(GSO/GLS) by special request and those shipments will not be covered under any of our insurance options. We would also like to advise clients that Golden State Overnight (GSO/GLS) typically delivers your shipment within one business day; however, this is not a guarantee and delivery may occasionally take longer than the overnight period advertised by this vendor, particularly for residential (non-commercial) addresses. Such an eventuality is out of the control of Spectrum Wine.For our customers in Asia, we default to shipping your order via our next scheduled consolidated shipment to Hong Kong. If you prefer another method of shipping we are happy to accommodate and can adjust your account to ship future orders this way by default',
      },
      {
         question: 'How quickly should I expect my order to ship?',
         answer:
            'If you are shipping to the California, District of Columbia, New Mexico, Idaho, or Alaska, your shipment will default to standard ground shipping via United Parcel Service (UPS). If you are shipping to any other US state, your shipment will be scheduled by default through a carrier such as UPS or FedEx. If you would like to adjust your shipping preference, method, or rapidity, you may always adjust your default preferences in your account page or you may of course contact us directly.Starting March 2021 we will only be shipping via Golden State Overnight(GSO/GLS) by special request and those shipments will not be covered under any of our insurance options. We would also like to advise clients that Golden State Overnight (GSO/GLS) typically delivers your shipment within one business day; however, this is not a guarantee and delivery may occasionally take longer than the overnight period advertised by this vendor, particularly for residential (non-commercial) addresses. Such an eventuality is out of the control of Spectrum Wine.For our customers in Asia, we default to shipping your order via our next scheduled consolidated shipment to Hong Kong. If you prefer another method of shipping we are happy to accommodate and can adjust your account to ship future orders this way by default',
      },
      {
         question: 'Can I pick up my Order?',
         answer:
            'If you are shipping to the California, District of Columbia, New Mexico, Idaho, or Alaska, your shipment will default to standard ground shipping via United Parcel Service (UPS). If you are shipping to any other US state, your shipment will be scheduled by default through a carrier such as UPS or FedEx. If you would like to adjust your shipping preference, method, or rapidity, you may always adjust your default preferences in your account page or you may of course contact us directly.Starting March 2021 we will only be shipping via Golden State Overnight(GSO/GLS) by special request and those shipments will not be covered under any of our insurance options. We would also like to advise clients that Golden State Overnight (GSO/GLS) typically delivers your shipment within one business day; however, this is not a guarantee and delivery may occasionally take longer than the overnight period advertised by this vendor, particularly for residential (non-commercial) addresses. Such an eventuality is out of the control of Spectrum Wine.For our customers in Asia, we default to shipping your order via our next scheduled consolidated shipment to Hong Kong. If you prefer another method of shipping we are happy to accommodate and can adjust your account to ship future orders this way by default',
      },
      {
         question: 'What is Weather Hold?',
         answer: 'Can I consolidate multiple orders to help reduce shipping costs?',
      },
      {
         question: 'Do you offer local delivery?',
         answer:
            'If you are shipping to the California, District of Columbia, New Mexico, Idaho, or Alaska, your shipment will default to standard ground shipping via United Parcel Service (UPS). If you are shipping to any other US state, your shipment will be scheduled by default through a carrier such as UPS or FedEx. If you would like to adjust your shipping preference, method, or rapidity, you may always adjust your default preferences in your account page or you may of course contact us directly.Starting March 2021 we will only be shipping via Golden State Overnight(GSO/GLS) by special request and those shipments will not be covered under any of our insurance options. We would also like to advise clients that Golden State Overnight (GSO/GLS) typically delivers your shipment within one business day; however, this is not a guarantee and delivery may occasionally take longer than the overnight period advertised by this vendor, particularly for residential (non-commercial) addresses. Such an eventuality is out of the control of Spectrum Wine.For our customers in Asia, we default to shipping your order via our next scheduled consolidated shipment to Hong Kong. If you prefer another method of shipping we are happy to accommodate and can adjust your account to ship future orders this way by default',
      },
   ]
   return (
      <section className="flex flex-col">
         <section>
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Spectrum Wine AuctionsThe May 2025 Auction: Part 4{' '}
            </Heading>
            <Paragraph className="leading-5">
               We offer an array of full service fulfillment options for your purchases with us. Below are some of our
               frequently asked questions. If we didn't answer your question, please contact us and we'll be happy to
               help.
            </Paragraph>
         </section>
         <section className="my-4">
            <MAccordion data={ACC_DATA} />
         </section>
         <section className="w-full h-[401px]  overflow-hidden shadow-md relative block">
            <div className="relative w-full h-full">
               <Image src={Pouring} alt={'this is alt'} fill className="object-cover z-0" />
            </div>
            <div className="bg-transparent  absolute left-4 bottom-7 right-0  z-50">
               <Heading className="text-white font-semibold uppercase text-4xl ">
                  A symphony of <br /> <span className="text-table-head">flavour</span> in e
                  <span className="text-table-head">very sip...</span>
               </Heading>
            </div>
         </section>
      </section>
   )
}

export default ShippingFaqs

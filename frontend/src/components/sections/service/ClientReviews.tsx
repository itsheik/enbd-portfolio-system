import React from 'react'
import TestimonialComponent from './TestimonialsComponent'
import { TESTIMONIALS } from '@/src/constants/dummyData'
import Pagination from '../../pagination/PaginationCard'

const ClientReviews = () => {
   return (
      <section>
         <ul>
            {TESTIMONIALS.map(item => {
               return <TestimonialComponent key={item.review} review={item.review} client={item.address} />
            })}
         </ul>
         <div className="flex w-full justify-between">
            <div></div>
            <Pagination totalPages={10} />
         </div>
      </section>
   )
}

export default ClientReviews

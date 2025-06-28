import React from 'react'

type Props = {
   review?: string
   client?: string
}
const TestimonialComponent = ({ client, review }: Props) => {
   return (
      <li className="border-b border-b-b-white-primary list-disc ml-6 font-light pb-3 pt-1.5">
         "{review}" - {client}
      </li>
   )
}

export default TestimonialComponent

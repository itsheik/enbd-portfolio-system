import { type FC } from 'react'

import { Paragraph } from '~/components/ui'

type TimeBoxProps = {
   data?: {
      number: string
      info: string
   }
}
export const TimeBoxCard: FC<TimeBoxProps> = ({ data }) => {
   return (
      <article
         aria-label="recommeauction price list card"
         className=" bg-table-head flex flex-col items-center justify-center text-center w-12 h-14 rounded-sm"
      >
         <Paragraph className="font-medium text-xs leading-5">{data?.number}</Paragraph>
         <Paragraph className="font-light text-xs leading-5 lowercase">{data?.info}</Paragraph>
      </article>
   )
}

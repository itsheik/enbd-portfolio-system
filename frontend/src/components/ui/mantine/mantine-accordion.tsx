import { type ReactNode } from 'react'
import { Accordion } from '@mantine/core'

type LayoutProps = {
   data?: any
}
export const MAccordion = ({ data }: LayoutProps) => {
   return (
      <Accordion className="max-w-[1140px]">
         {data?.map((acc: { answer: ReactNode | string; question: string }) => {
            return (
               <Accordion.Item value={acc?.question} key={acc?.question} className="border my-2 rounded-lg">
                  <Accordion.Control className="font-light text-sm data-[active=true]:text-red-secondary data-[active=true]:font-medium data-[active=true]:text-lg flex">
                     <li className="list-disc">{acc?.question}</li>
                  </Accordion.Control>
                  <Accordion.Panel className="border-t border-t-b-white-secondary px-2 text-sm font-light">
                     {acc?.answer}
                  </Accordion.Panel>
               </Accordion.Item>
            )
         })}
      </Accordion>
   )
}

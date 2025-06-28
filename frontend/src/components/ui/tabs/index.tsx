'use client'
import { Tabs } from '@mantine/core'
type TabDataProps = {
   value: string
   name: string
   node?: React.ReactNode
}

type GlobalTabsProps = {
   data: TabDataProps[]
}
export const GlobalTabsComponent = (props: GlobalTabsProps) => {
   const { data } = props

   return (
      <Tabs color="text-red-secondary" defaultValue="first">
         <Tabs.List justify="center">
            {data.map((name, i) => {
               return (
                  <Tabs.Tab
                     key={i}
                     className=" data-[active=true]:text-red-secondary text-b-white-secondary font-gilda-display font-light text-base  hover:bg-gray-100"
                     value={name.value}
                  >
                     {name.name}
                  </Tabs.Tab>
               )
            })}
         </Tabs.List>
         {data.map(tab => {
            return (
               <Tabs.Panel value={tab.value} pt="xs" key={tab.value}>
                  {tab.node}
               </Tabs.Panel>
            )
         })}
      </Tabs>
   )
}

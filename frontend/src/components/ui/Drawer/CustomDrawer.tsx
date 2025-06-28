'use client'
import { Burger, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface CustomDrawerProps {
   children: React.ReactNode
}

export const CustomeDarawer = ({ children }: CustomDrawerProps) => {
   const [opened, { open, close }] = useDisclosure(false)

   return (
      <>
         <Drawer
            opened={opened}
            onClose={close}
            classNames={{ body: 'bg-background', header: 'bg-background' }}
            className="w-[352px] block"
            size={'xs'}
         >
            {children}
         </Drawer>

         <Burger opened={opened} onClick={opened ? close : open} aria-label="Toggle Drawer" />
      </>
   )
}

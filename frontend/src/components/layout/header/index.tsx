'use client'

import { useToggle } from '@mantine/hooks'
import { usePathname } from 'next/navigation'

import Banner from './Banner'
import BannerBody from './BannerBody'
import { TopHeaderBar } from './header-top'
import { MainNav } from './main-nav'
import { MobileMenu } from './mobile-menu'
import { NavBottom } from './nav-bottom'

import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { cn } from '~/lib'

export const Header = () => {
   const [menuOpen, toggleMenuOpen] = useToggle()
   const pathname = usePathname()

   let customStyles = {
      header: '',
   }
   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      customStyles = {
         header: 'relative min-h-screen overflow-hidden text-white',
      }
   }

   return (
      <header className={cn('w-full h-full flex flex-col', customStyles.header)}>
         <Banner />
         <TopHeaderBar />
         <MainNav toggleMenuOpen={toggleMenuOpen} />
         <NavBottom />
         <MobileMenu menuOpen={menuOpen} />
         <BannerBody />
      </header>
   )
}

'use client'
import { type SetStateAction } from 'react'
import { CiHome, CiLogin, CiLogout } from 'react-icons/ci'
import { FiMenu, FiShoppingBag } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Divider } from '@mantine/core'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { HIDE_LOGIN_BUTTON, HIDE_NAV_ACTIONS, PAGE_ROUTES } from '@/src/constants/page-constants'
import { useAppDispatch } from '@/src/lib/store'
import { logoutUser, selectUserSlice } from '@/src/store/features/auth/authSlice'

import NavPopover from '../../ui/Popover/NavPopover'

import { SectionContainer } from '~/components/sections'
import { Logo, MActionIcon, MButton } from '~/components/ui'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { cn } from '~/lib'
import { chartImage } from '~/utils/images'

type MainNavProps = {
   toggleMenuOpen: (value?: SetStateAction<boolean> | undefined) => void
}

export const MainNav = ({ toggleMenuOpen }: MainNavProps) => {
   const pathname = usePathname()
   const dispatch = useAppDispatch()
   const { userId, loggingOut } = useSelector(selectUserSlice)
   const router = useRouter()

   const toggleMenu = () => toggleMenuOpen(mO => !mO)
   const toggleMobileMenu = () => toggleMenuOpen(mO => !mO)

   let customStyles = {
      header: '',
      banner: 'hidden',
      container: {
         main: 'bg-beige',
         text: 'text-primary',
      },
      icon: '',
   }
   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      customStyles = {
         header: 'bg-unset overflow-hidden text-white',
         banner: 'absolute inset-0 z-0',
         container: {
            main: 'relative z-10 h-full',
            text: 'text-white',
         },
         icon: 'text-white',
      }
   }

   const HideLoginButton = HIDE_LOGIN_BUTTON.includes(pathname)
   const HideNavAction = HIDE_NAV_ACTIONS.includes(pathname)

   const NAV_ACTION_ITEMS = [
      {
         label: 'My Account',
         icon: <CiHome />,
         onClick: () => router.push(PAGE_ROUTES.DASHBOARD.USER_DASHBOARD),
      },
      {
         label: 'Log Out',
         icon: <CiLogout />,
         onClick: () => {
            dispatch(logoutUser())
         },
      },
   ]

   return (
      <header className={cn('bg-beige py-4 w-full ', customStyles.header)} role="banner">
         <SectionContainer className={cn('w-full flex items-center justify-between', customStyles.container.main)}>
            <div />
            {/* <Logo aria-label="Home" /> */}
            {/* <div>
               <Image src={chartImage} alt="ENBD Logo" width={100} height={100} />
            </div> */}

            {loggingOut ? (
               <div />
            ) : HideNavAction && !userId ? (
               HideLoginButton ? (
                  <div />
               ) : (
                  <MButton
                     onClick={() => {
                        router.push(PAGE_ROUTES.AUTH.LOGIN)
                     }}
                     variant="transparent"
                     leftSection={<CiLogin className="size-5" aria-hidden="true" />}
                     classNames={{
                        inner: 'gap-0',
                        section: 'md:mr-2',
                     }}
                     className={cn('p-0', customStyles.container.text)}
                  >
                     <span className={'font-medium text-inherit text-[17px] hidden md:inline-block'}>Log In</span>
                  </MButton>
               )
            ) : (
               <nav
                  className={cn('flex items-center justify-between min-[768px]:gap-x-2', customStyles.container.text)}
                  aria-label="Main Navigation"
               >
                  <MActionIcon
                     size="lg"
                     className="text-inherit relative w-max"
                     variant="subtle"
                     aria-label="Shopping Bag"
                     onClick={() => router.push(routes.cart)}
                  >
                     <FiShoppingBag className="size-5" aria-hidden="true" />
                  </MActionIcon>

                  <div className="max-[768px]:hidden">
                     <NavPopover
                        targetElement={
                           <MActionIcon
                              size="lg"
                              className="text-inherit"
                              variant="subtle"
                              aria-label="Toggle Mobile Menu"
                              onClick={toggleMenu}
                           >
                              <FiMenu className="size-5" aria-hidden="true" />
                           </MActionIcon>
                        }
                        content={NAV_ACTION_ITEMS.map((item, index) => (
                           <div
                              key={index}
                              className="flex flex-col gap-2 justify-between w-full hover:bg-red-primary hover:text-white font-inter"
                           >
                              <MButton
                                 onClick={item.onClick}
                                 variant="transparent"
                                 leftSection={item.icon}
                                 className="text-inherit !p-0"
                                 classNames={{
                                    inner: 'justify-start',
                                 }}
                              >
                                 {item.label}
                              </MButton>
                              {index === NAV_ACTION_ITEMS.length - 1 ? <></> : <Divider />}
                           </div>
                        ))}
                        position="bottom"
                        width={250}
                        classNames={{
                           dropdown: 'w-full bg-background p-0 p-2',
                        }}
                     />
                  </div>
                  <MActionIcon
                     className={cn('hidden max-[768px]:block absolute top-1.7 right-2 z-50', customStyles.icon)}
                     size="lg"
                     variant="subtle"
                     aria-label="Toggle Mobile Menu"
                     onClick={toggleMobileMenu}
                  >
                     <FiMenu className="size-5" aria-hidden="true" />
                  </MActionIcon>
               </nav>
            )}
         </SectionContainer>
      </header>
   )
}

'use client'

import { FaChevronDown } from 'react-icons/fa'
import { Menu } from '@mantine/core'
import { usePathname } from 'next/navigation'

import { HIDE_NAV_LINKS } from '@/src/constants/page-constants'

import { navItems } from '~/__mocks__'
import { SectionContainer } from '~/components/sections'
import { InternalLink } from '~/components/ui'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { cn } from '~/lib'

export const NavBottom = () => {
   const pathname = usePathname()
   let customStyles = {
      nav: '',
      menu: {
         text: 'text-primary',
      },
   }

   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      customStyles = {
         nav: 'bg-unset text-white border-none',
         menu: {
            text: 'text-white',
         },
      }
   }

   if (HIDE_NAV_LINKS.includes(pathname)) {
      return null
   }

   return (
      <nav className={cn('bg-beige border-t border-beige hidden md:block', customStyles.nav)}>
         <SectionContainer className="py-4 border-t border-b border-beige font-inter">
            <ul className="flex justify-center gap-4 lg:gap-x-7 xl:gap-x-10 text-primary font-medium">
               {navItems.map(item => (
                  <li key={item.id}>
                     {item.hasDropdown ? (
                        <Menu
                           transitionProps={{ transition: 'pop', duration: 150 }}
                           position="bottom-start"
                           offset={15}
                           trigger="click-hover"
                           loop={false}
                           withinPortal={false}
                           trapFocus={false}
                           menuItemTabIndex={0}
                        >
                           <Menu.Target>
                              <button
                                 className={cn(
                                    'text-base md:text-[17px] cursor-pointer flex items-center gap-2',
                                    {
                                       'font-semibold': item.items?.some(subItem => pathname === subItem.href),
                                    },
                                    customStyles.menu.text,
                                 )}
                              >
                                 <span>{item.label}</span>
                                 <FaChevronDown className="inline mt-0.5 size-3 text-secondary" />
                              </button>
                           </Menu.Target>

                           <Menu.Dropdown>
                              {item.items?.map(subItem => (
                                 <Menu.Item
                                    key={subItem.id}
                                    component={InternalLink}
                                    className="hover:no-underline text-base"
                                    classNames={{
                                       item: cn('hover:bg-red-primary hover:text-white', {
                                          'bg-primary text-white hover:bg-primary/90': pathname === subItem.href,
                                       }),
                                    }}
                                    href={subItem.href}
                                 >
                                    {subItem.label}
                                 </Menu.Item>
                              ))}
                           </Menu.Dropdown>
                        </Menu>
                     ) : (
                        <Menu trigger="hover">
                           <Menu.Target>
                              <InternalLink
                                 href={item.href!}
                                 className={cn(
                                    'text-base md:text-[17px] text-primary cursor-pointer hover:no-underline',
                                    {
                                       'font-semibold': pathname === item.href,
                                    },
                                    customStyles.menu.text,
                                 )}
                              >
                                 {item.label}
                              </InternalLink>
                           </Menu.Target>
                        </Menu>
                     )}
                  </li>
               ))}
            </ul>
         </SectionContainer>
      </nav>
   )
}

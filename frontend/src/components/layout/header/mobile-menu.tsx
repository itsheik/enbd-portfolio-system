'use client'

import { type FC } from 'react'
import { CiLogin } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { Accordion, Box, Divider, Stack, Text } from '@mantine/core'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { logoutUser, selectUserSlice } from '@/src/store/features/auth/authSlice'

import { navItems } from '~/__mocks__'
import { InternalLink, MButton } from '~/components/ui'
import { INCLUDE_NAV_STYLES } from '~/constants/constants'
import { cn, useAppDispatch } from '~/lib'

const mobileMenuVariants: Variants = {
   hidden: {
      height: 0,
      opacity: 0,
      transition: {
         duration: 0.3,
         ease: [0.4, 0.0, 0.2, 1],
      },
   },
   visible: {
      height: 'auto',
      opacity: 1,
      transition: {
         duration: 0.5,
         ease: [0.0, 0.0, 0.2, 1],
         staggerChildren: 0.1,
         delayChildren: 0.1,
      },
   },
}

type MobileMenuProps = {
   menuOpen: boolean
}

export const MobileMenu: FC<MobileMenuProps> = ({ menuOpen }) => {
   const pathname = usePathname()
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { userId, loggingOut } = useSelector(selectUserSlice)

   let customStyles = {
      container: 'bg-beige',
      text: '',
   }
   if (INCLUDE_NAV_STYLES.includes(pathname)) {
      customStyles = {
         container: 'bg-primary',
         text: 'text-beige',
      }
   }

   return (
      <AnimatePresence>
         {menuOpen && (
            <motion.div
               initial="hidden"
               animate="visible"
               exit="hidden"
               variants={mobileMenuVariants}
               className={cn('md:hidden bg-beige overflow-hidden', customStyles.container)}
            >
               <Box px="md" py="sm">
                  <Accordion
                     transitionDuration={500}
                     variant="filled"
                     classNames={{
                        root: 'pl-0',
                        content: 'p-0',
                        item: 'data-[active=true]:bg-transparent',
                        control: cn('p-0! text-primary text-sm', customStyles.text),
                     }}
                     defaultValue={navItems[0].id.toString()}
                  >
                     {navItems.map(item =>
                        item.hasDropdown ? (
                           <Accordion.Item value={item.id.toString()} key={item.id}>
                              <Accordion.Control>
                                 <Text>{item.label}</Text>
                              </Accordion.Control>
                              <Accordion.Panel>
                                 <Stack pl="xs">
                                    {item.items?.map((subItem, idx) => (
                                       <InternalLink
                                          key={idx}
                                          href={subItem.href}
                                          className={cn('text-primary hover:underline', customStyles.text)}
                                       >
                                          {subItem.label}
                                       </InternalLink>
                                    ))}
                                 </Stack>
                              </Accordion.Panel>
                           </Accordion.Item>
                        ) : (
                           <Box key={item.id} py={8}>
                              <InternalLink
                                 href={item.href || '/'}
                                 className={cn('text-primary hover:underline', customStyles.text)}
                              >
                                 {item.label}
                              </InternalLink>
                           </Box>
                        ),
                     )}
                  </Accordion>

                  <Divider my="xs" />

                  <Stack gap="xs">
                     {userId ? (
                        <>
                           <MButton
                              variant="subtle"
                              onClick={() => router.push(routes.account)}
                              className={cn('text-primary justify-start p-0', customStyles.text)}
                              styles={{
                                 inner: {
                                    justifyContent: 'flex-start',
                                 },
                              }}
                           >
                              My Account
                           </MButton>
                           <MButton
                              variant="subtle"
                              onClick={() => dispatch(logoutUser())}
                              loading={loggingOut}
                              className={cn('text-primary justify-start p-0', customStyles.text)}
                              styles={{
                                 inner: {
                                    justifyContent: 'flex-start',
                                 },
                              }}
                           >
                              Log Out
                           </MButton>
                        </>
                     ) : (
                        <MButton
                           variant="filled"
                           leftSection={<CiLogin />}
                           onClick={() => router.push(routes.auth.signIn)}
                           className="bg-primary text-white hover:bg-primary/90"
                        >
                           Log In
                        </MButton>
                     )}
                  </Stack>

                  {/* <Stack mt="lg">
                     <MAnchor
                        href={`mailto:${appConfig.supportEmail}`}
                        className={cn('flex items-center text-primary', customStyles.text)}
                     >
                        <FiMail className="mr-2" />
                        {appConfig.supportEmail}
                     </MAnchor>
                     <MAnchor
                        href={`tel:${appConfig.contactNo}`}
                        className={cn('flex items-center text-primary', customStyles.text)}
                     >
                        <FiPhone className="mr-2" />
                        {appConfig.contactNo}
                     </MAnchor>
                  </Stack> */}
               </Box>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

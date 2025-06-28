import type { IconType } from 'react-icons'
import { Anchor, Flex } from '@mantine/core'

type ContactItemProps = {
   icon: IconType
   href: string
   label?: string
   isExternal?: boolean
}

export const ContactItem = ({ icon: Icon, href, label, isExternal = true }: ContactItemProps) => (
   <Anchor
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="hover:opacity-80 transition-opacity"
      aria-label={label}
   >
      <Flex align="center" gap="xs">
         <Icon className="h-4 w-4" aria-hidden="true" />
         {label && <span className="text-sm">{label}</span>}
      </Flex>
   </Anchor>
)

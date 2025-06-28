import { type FooterLinkItem } from '~/__mocks__'
import { InternalLink } from '~/components/ui'
import { type Routes } from '~/constants'

type FooterColumnProps = {
   links: FooterLinkItem[]
   title?: string
}

export const FooterColumn = ({ links, title }: FooterColumnProps) => (
   <div className="space-y-3">
      {title && <h3 className="text-base font-semibold mb-2">{title}</h3>}
      {links.map((link, i) => (
         <InternalLink
            key={`link-${i}-${link.href}`}
            href={link.href as Routes} // later we need to fix this
            className="block text-[15px] font-light"
            aria-label={link.label}
         >
            {link.label}
         </InternalLink>
      ))}
   </div>
)

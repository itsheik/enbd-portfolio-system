import { ContactInfo } from './contact-info'
import { FooterLinks } from './footer-links'
import { SiteInfo } from './site-info'

export const Footer = () => (
   <footer className="w-full mt-auto">
      <FooterLinks />
      <ContactInfo />
      <SiteInfo />
   </footer>
)

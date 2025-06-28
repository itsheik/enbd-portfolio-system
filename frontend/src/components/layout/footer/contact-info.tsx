import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import { ContactItem } from './contact-item'

import { SectionContainer } from '~/components/sections'
import { appConfig } from '~/config'

export const ContactInfo = () => (
   <div className="bg-secondary py-4">
      <SectionContainer>
         <div className="flex justify-around flex-wrap gap-4 items-center">
            <ContactItem
               icon={FiMapPin}
               href={`https://www.google.com/maps/place/${encodeURIComponent(appConfig.address)}`}
               label={appConfig.address}
            />
            <ContactItem icon={FiPhone} href={`tel:${appConfig.contactNo}`} label={appConfig.contactNo} />
            <ContactItem icon={FiMail} href={`mailto:${appConfig.supportEmail}`} label={appConfig.supportEmail} />
         </div>
      </SectionContainer>
   </div>
)

import { SectionBanner, SectionContainer } from '~/components/sections'
import { Heading, MAnchor, Paragraph } from '~/components/ui'
import { appConfig, generateSeoMetadata } from '~/config'
import { routes } from '~/constants'

export const metadata = generateSeoMetadata({ title: 'Contact', canonicalUrlRelative: routes.contact })

const ContactPage = () => {
   return (
      <section className="space-y-16 pb-16">
         <SectionBanner title="Contact Us" />
         <SectionContainer className="space-y-8">
            <div className="grid md:grid-cols-2 shadow-md">
               <div className="bg-red-secondary text-white size-full rounded-sm p-8 space-y-8">
                  <Heading order={3} className="text-2xl">
                     ENBD Portfolio Auctions Corporate Office, Storage Facility, Retail Store and Auction Operations
                  </Heading>

                  <div className="space-y-1">
                     <p>1641 East Saint Andrew Pl</p>
                     <p>Santa Ana, CA, 92705</p>
                     <p>United States of America</p>
                     <p>
                        Main Telephone:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`tel:${appConfig.mainTel}`}>
                           {appConfig.mainTel}
                        </MAnchor>
                     </p>
                     <p>
                        Main Fax:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`tel:${appConfig.fax}`}>
                           {appConfig.fax}
                        </MAnchor>
                     </p>
                     <p>
                        General Email and Support:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`mailto:${appConfig.supportEmail}`}>
                           {appConfig.supportEmail}
                        </MAnchor>
                     </p>
                  </div>

                  <Heading order={4} className="text-xl font-inter font-normal">
                     ENBD Portfolio Newport Beach Storage Facility
                  </Heading>

                  <div className="space-y-1">
                     <p>865 Production Place</p>
                     <p>Newport Beach CA 92663</p>
                     <p>United States of America</p>
                     <p>
                        Telephone:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`tel:${appConfig.mainTel}`}>
                           {appConfig.mainTel}
                        </MAnchor>
                     </p>

                     <p>
                        Email:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`mailto:${appConfig.supportEmail}`}>
                           {appConfig.supportEmail}
                        </MAnchor>
                     </p>
                  </div>

                  <Heading order={4} className="text-xl font-inter font-normal">
                     ENBD Portfolio Auctions Hong Kong Office
                  </Heading>

                  <div className="space-y-1">
                     <p>Room 1603, 16/F</p>
                     <p>Miramar Tower</p>
                     <p>132 Nathan Road</p>
                     <p>Tsim Sha Tsui</p>
                     <p>Kowloon, Hong Kong</p>
                     <p>
                        Telephone:{' '}
                        <MAnchor variant="underlined" className="text-white" href={`tel:+(852) 2116-1103`}>
                           +(852) 2116-1103
                        </MAnchor>
                     </p>
                  </div>
               </div>
               {/* right */}
               <div className="bg-white size-full rounded-sm p-8 space-y-8">
                  <Heading order={3} className="text-2xl text-red-secondary">
                     Management Team and Staff
                  </Heading>

                  <ul role="list" className="space-y-4">
                     {appConfig.teamMembers.map(({ name, title, email }) => (
                        <li key={email} role="listitem" className="text-red-secondary">
                           <span className="font-semibold">{title}</span>
                           <div className="flex items-center gap-1 font-light">
                              <span>{name} - </span>
                              <MAnchor href={`mailto:${email}`} variant="underlined">
                                 {email}
                              </MAnchor>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <Paragraph className="text-center text-red-secondary max-w-2xl mx-auto">
               Agents are available throughout the United States, Asia, Canada, and Europe. Contact us for further
               details.
            </Paragraph>
         </SectionContainer>
      </section>
   )
}

export default ContactPage

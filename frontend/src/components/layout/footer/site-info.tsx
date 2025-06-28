import { SectionContainer } from '~/components/sections'

export const SiteInfo = () => (
   <div className="py-3">
      <SectionContainer className="text-sm text-gray-600 text-center">
         <p aria-label="Copyright">© {new Date().getFullYear()} Spectrum Wine Auctions LLC, All rights reserved.</p>
      </SectionContainer>
   </div>
)

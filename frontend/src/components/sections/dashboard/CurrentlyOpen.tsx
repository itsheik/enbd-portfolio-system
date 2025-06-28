import SidebarCard from '~/components/ui/Cards/SidebarCard'

type Props = object

const CurrentlyOpen = (props: Props) => {
   return (
      <SidebarCard title="Currently Open" bodyStyle={'p-0'}>
         <div className="flex flex-col gap-1 px-3 py-2">
            <span className="text-red-secondary font-medium text-sm">Spectrum Wine Auction</span>
            <span className="text-red-secondary underline font-normal text-xs">The April 2025 Auction: PT2</span>
         </div>

         <hr className="w-full text-b-white-primary" />

         <div className="px-3 text-xs text-error-primary">Auction Online Coming Soon</div>
      </SidebarCard>
   )
}

export default CurrentlyOpen

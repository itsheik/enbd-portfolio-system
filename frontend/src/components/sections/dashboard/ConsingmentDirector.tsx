import SidebarCard from '~/components/ui/Cards/SidebarCard'

type Props = object

const ConsingmentDirector = (props: Props) => {
   return (
      <SidebarCard title="Consignment Director">
         <span className="text-red-secondary font-medium text-sm">All Products</span>
         <span className="text-b-white-secondary font-normal text-xs">Jason Boland- (714) 392-2631</span>
         <span className="text-red-secondary underline font-normal text-xs">Jboland@spectrumwine.com</span>
      </SidebarCard>
   )
}

export default ConsingmentDirector

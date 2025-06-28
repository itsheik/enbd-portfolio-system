import SearchSettigs from '@/src/components/sections/dashboard/SearchSettigs'
import GlobalHeading from '@/src/components/ui/Headings/GlobalHeading'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <SearchSettigs />
      </section>
   )
}

export default Page

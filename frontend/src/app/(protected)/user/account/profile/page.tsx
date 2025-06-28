import PersonalProfile from '@/src/components/sections/dashboard/PersonalProfile'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <PersonalProfile />
      </section>
   )
}

export default Page

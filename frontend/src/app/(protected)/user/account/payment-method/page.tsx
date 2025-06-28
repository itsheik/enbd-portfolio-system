import SavedPaymentMethods from '@/src/components/sections/dashboard/SavedPaymentMethods'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <SavedPaymentMethods />
      </section>
   )
}

export default Page

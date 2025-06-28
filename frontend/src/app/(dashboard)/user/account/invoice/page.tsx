import InvoiceList from '@/src/components/sections/invoices/Invoices/InvoiceList'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <ul className='px-5'>
            <li className="text-red-secondary text-base font-medium list-disc">
               Official auction results and invoices are usually posted around 1-2 hours after the last session of the
               auction closes
            </li>
         </ul>

         <InvoiceList />
      </section>
   )
}

export default Page

'use client'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { PAYMENT_METHOD_DETAILS } from '~/constants/dummyData'

type PaymentMethodsData = (typeof PAYMENT_METHOD_DETAILS)[0]

const PaymentMethodTable = () => {
   const columns = [
      {
         key: 'name' as const,
         label: 'Name',
         render: (item: PaymentMethodsData) => (
            <span className="text-primary text-xs block text-center">{item.name}</span>
         ),
      },
      {
         key: 'type' as const,
         label: 'Type',
         render: (item: PaymentMethodsData) => (
            <span className="text-primary text-xs block text-center">{item.type}</span>
         ),
      },
      {
         key: 'billingAddress' as const,
         label: 'Billing Address',
         render: (item: PaymentMethodsData) => (
            <span className="text-primary text-xs block text-center">{item.billingAddress}</span>
         ),
      },
      {
         key: 'billingZip' as const,
         label: 'Billing Zip',
         render: (item: PaymentMethodsData) => (
            <span className="text-primary text-xs block text-center">{item.billingZip}</span>
         ),
      },
      {
         key: 'actions' as const,
         label: '',
         render: (item: PaymentMethodsData) => (
            <TableActions
               text=""
               showIcon={{
                  deleteIcon: true,
               }}
               handleDeleteClick={() => console.log('delete')}
            />
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<PaymentMethodsData>
            columns={columns}
            data={PAYMENT_METHOD_DETAILS}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
         />
      </section>
   )
}

export default PaymentMethodTable

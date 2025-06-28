'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { MButton } from '@/src/components/ui'
import { useCheckoutData } from '@/src/hooks/checkout/useCheckoutData'
import { usePaymentSummary } from '@/src/hooks/payment/usePaymentSummary'
import { generateUUID } from '@/src/lib'
import { setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { getCartId } from '@/src/utils/storage/protectedStorage'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { type SERVICE_TYPES } from '~/constants/dummyData'

type PaymentMethodsData = (typeof SERVICE_TYPES)[0]

interface ShippingTypesTableProps {
   shippingDay: string
   selectedServiceType?: string | null
   onServiceTypeChange?: (serviceType: string | null, price: number | null) => void
   error?: boolean
   errorMessage?: string
   onValidationChange?: (hasError: boolean) => void
   onPaymentSummaryClick?: () => void
}

const ShippingTypesTable = ({ 
   shippingDay, 
   selectedServiceType: externalSelectedServiceType,
   onServiceTypeChange,
   error = false, 
   errorMessage = '', 
   onValidationChange,
   onPaymentSummaryClick 
}: ShippingTypesTableProps) => {
   const { getShippingRatesLoading, shippingRates } = useCheckoutData()
   const [internalSelectedShippingType, setInternalSelectedShippingType] = useState<string | null>(null)
   const [selectedShippingVal, setSelectedShippingVal] = useState<number | null>(null)
   const { getPaymentSummary } = usePaymentSummary()
   const dispatch = useDispatch()
   const cartId = getCartId()

   // Use external state if provided, otherwise use internal state
   const selectedShippingType = externalSelectedServiceType ?? internalSelectedShippingType

   const SHIPPING_RATES =
      shippingRates?.map(item => ({
         serviceType: item.serviceType,
         price: item.newCost.toString(),
         actions: '',
      })) ?? []

   const handleServiceTypeChange = (serviceType: string, price: number) => {
      const newServiceType = selectedShippingType === serviceType ? null : serviceType
      const newPrice = selectedShippingVal === price ? null : price
      
      // Always call the external handler if provided
      if (onServiceTypeChange) {
         onServiceTypeChange(newServiceType, newPrice)
      } else {
         // Fallback to internal state management
         setInternalSelectedShippingType(newServiceType)
      }
      
      setSelectedShippingVal(newPrice)
      
      // Clear validation error when user makes a selection
      if (newServiceType && onValidationChange) {
         onValidationChange(false)
      }
   }

   const columns = [
      {
         key: 'serviceType' as const,
         label: 'Service Type',
         render: (item: PaymentMethodsData) => (
            <p className="text-primary text-xs block text-center">{item.serviceType}</p>
         ),
      },
      {
         key: 'price' as const,
         label: 'Price',
         render: (item: PaymentMethodsData) => (
            <p className="text-primary text-xs block text-center font-medium">${item.price}</p>
         ),
      },
      {
         key: 'actions' as const,
         label: '',
         render: (item: PaymentMethodsData) => (
            <TableActions
               text=""
               showIcon={{
                  checkbox: true,
               }}
               isChecked={selectedShippingType === item.serviceType}
               handleCheckBox={() => {
                  handleServiceTypeChange(item.serviceType, Number(item.price))
               }}
            />
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<PaymentMethodsData>
            columns={columns}
            data={SHIPPING_RATES}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
            loading={getShippingRatesLoading}
         />

         {error && errorMessage && (
            <p className="text-xs text-error-primary mt-1" role="alert">
               {errorMessage}
            </p>
         )}

         <MButton
            className="mt-5 max-w-xs self-end"
            onClick={async () => {
               // Call the parent's payment summary click handler first to trigger all validations
               onPaymentSummaryClick?.()

               if (!selectedShippingType || (!shippingDay && !selectedShippingVal)) {
                  // Show validation error if no service type is selected
                  if (!selectedShippingType && onValidationChange) {
                     onValidationChange(true)
                  }

                  return
               }

               await getPaymentSummary({
                  shippingType: selectedShippingType,
                  shippingVal: selectedShippingVal || 0,
                  cartId: cartId ? cartId : generateUUID(),
               })

               dispatch(
                  setRetailSlice({
                     shippingOptions: {
                        ShippingType: selectedShippingType,
                        ShippingPrice: selectedShippingVal?.toString() || '0',
                        ShippingDay: shippingDay,
                     },
                  }),
               )
            }}
         >
            PAYMENT SUMMARY
         </MButton>
      </section>
   )
}

export default ShippingTypesTable

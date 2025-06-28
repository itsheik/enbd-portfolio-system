'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { type ORDER_SUMMARY_TYPES } from '@/src/constants/dummyData'
import { useRemoveItemFromCart } from '@/src/hooks/cart/useCartData'
import { useAddOrder } from '@/src/hooks/order/useOrderData'
import { orderValidationSchema } from '@/src/lib/utils/validations/order'
import { selectUserSlice } from '@/src/store/features/auth/authSlice'
import { selectRetailSlice } from '@/src/store/features/retail/retailSlice'
import { removeDollarSign } from '@/src/utils/helpers'

import SimpleCheckbox from '../../form/CheckBox'
import SelectDropdown from '../../form/Dropdown'
import { Heading, MButton } from '../../ui'
import GlobalInput from '../../ui/Inputs'
import GlobalTable from '../../ui/Tables/GlobalTable'
import TableActions from '../TableActions'

type OrderSummaryData = (typeof ORDER_SUMMARY_TYPES)[0]

const OrderSection = () => {
   const router = useRouter()
   const { removeRetailItemFromCart, setRemovedItem, isLoading } = useRemoveItemFromCart()

   const { paymentMethods, paymentSummary, shippingOptions } = useSelector(selectRetailSlice)
   const { customerInfo, customerBillingShippingInfo } = useSelector(selectUserSlice)

   const { completeOrder, isCompleteOrderLoading } = useAddOrder()

   const DEFAULT_CARD =
      paymentMethods?.length === 1
         ? paymentMethods[0].id.toString()
         : paymentMethods?.find(method => method.defaultInd === 1)?.id.toString() || null

   const formik = useFormik({
      initialValues: {
         paymentMethod: 'stored',
         selectedCard: DEFAULT_CARD || '',
         cardNumber: '',
         expiryMonth: '',
         expiryYear: '',
         securityCode: '',
      },
      validationSchema: orderValidationSchema,
      onSubmit: values => {
         // Handle form submission
         completeOrder({
            CartID: '123123',
            Amount: removeDollarSign(paymentSummary?.lblTotal || '0'),
            ShippingAmount: Number(shippingOptions?.ShippingPrice) || 0,
            ShippingType: shippingOptions?.ShippingType || '',
            shipDate: shippingOptions?.ShippingDay || '',
            WeatherPreference: '1',
            CreditCardNumber: values.cardNumber,
            CreditCardType: values.paymentMethod === 'new' ? 'Visa' : '',
            ExpirationMonth: values.expiryMonth,
            ExpirationYear: values.expiryYear,
            SecurityCode: values.securityCode,
            StoredPaymentID: Number(values.selectedCard),
            BillingAddress: {
               Address1: customerBillingShippingInfo?.billing_primaryAddress || '',
               Address2: customerBillingShippingInfo?.billing_secondaryAddress || '',
               City: customerBillingShippingInfo?.billing_city || '',
               State: customerBillingShippingInfo?.billing_state || '',
               Zip: customerBillingShippingInfo?.billing_zip || '',
               Country: customerBillingShippingInfo?.billing_country || '',
            },
            ShippingAddress: {
               Address1: customerBillingShippingInfo?.shipping_primaryAddress || '',
               Address2: customerBillingShippingInfo?.shipping_secondaryAddress || '',
               City: customerBillingShippingInfo?.shipping_city || '',
               State: customerBillingShippingInfo?.shipping_state || '',
               Zip: customerBillingShippingInfo?.shipping_zip || '',
               Country: customerBillingShippingInfo?.shipping_country || '',
            },
            firstName: customerInfo?.firstName || '',
            lastName: customerInfo?.lastName || '',
            emailAddress: customerInfo?.emailAddress || '',
            mobilePhone: customerInfo?.mobilePhone || '',
            countryCodeID: customerInfo?.addresses[0]?.countryCodeID || 0,
            state: customerInfo?.addresses[0]?.state || '',
            address1: customerInfo?.addresses[0]?.address1 || '',
            address2: customerInfo?.addresses[0]?.address2 || '',
            city: customerInfo?.addresses[0]?.city || '',
            zip: customerInfo?.addresses[0]?.zip || '',
            shippingPhoneNumber: customerInfo?.addresses[0]?.shippingPhone || '',
            shpCountryCodeID: customerInfo?.shippingAddress.countryCodeID || 0,
            shpState: customerInfo?.shippingAddress.state || '',
            shpAddress1: customerInfo?.shippingAddress.address1 || '',
            shpAddress2: customerInfo?.shippingAddress.address2 || '',
            shpCity: customerInfo?.shippingAddress.city || '',
            shpZip: customerInfo?.shippingAddress.zip || '',
            serviceType: shippingOptions?.ShippingType || '',
         })
      },
   })

   useEffect(() => {
      if (!paymentSummary) {
         router.push(routes.checkout)
      }
   }, [])

   const PaymentMethodOptions =
      paymentMethods?.map(method => ({
         label: method.name,
         value: method.id.toString(),
      })) || []

   const ORDER_SUMMARY =
      paymentSummary?.cart?.map(item => ({
         wineCatalogId: item.wineCatalogID,
         itemDescription: item.wineName,
         price: item.price.toString(),
         quantity: item.quantity.toString(),
         total: item.totalPrice.toString(),
         actions: '',
      })) || []

   const columns = [
      {
         key: 'itemDescription' as const,
         label: 'Item Description',
         render: (item: OrderSummaryData) => (
            <span className="text-primary text-xs block text-center">{item.itemDescription}</span>
         ),
      },
      {
         key: 'price' as const,
         label: 'Price',
         render: (item: OrderSummaryData) => (
            <span className="text-primary text-xs block text-center font-medium">${item.price}</span>
         ),
      },
      {
         key: 'quantity' as const,
         label: 'Quantity',
         render: (item: OrderSummaryData) => (
            <span className="text-primary text-xs block text-center font-medium">{item.quantity}</span>
         ),
      },
      {
         key: 'total' as const,
         label: 'Total',
         render: (item: OrderSummaryData) => (
            <span className="text-primary text-xs block text-center font-medium">{item.total}</span>
         ),
      },
      {
         key: 'actions' as const,
         label: 'Remove',
         render: (item: OrderSummaryData) => (
            <TableActions
               text=""
               showIcon={{
                  checkbox: false,
                  deleteIcon: true,
               }}
               handleDeleteClick={() => {
                  setRemovedItem(item.wineCatalogId)

                  removeRetailItemFromCart({
                     cartId: '123123',
                     winecatalogid: item.wineCatalogId,
                     quantity: Number(item.quantity),
                     amount: Number(item.total),
                  })
               }}
            />
         ),
      },
   ]

   if (!paymentSummary) {
      return <></>
   }

   return (
      <div className="flex flex-col gap-4">
         <Heading
            order={3}
            className="w-full text-white bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
         >
            Checkout / Payment Information
         </Heading>

         <SimpleCheckbox
            label="Use a Stored Payment Method: (Authorize.net)"
            isChecked={formik.values.paymentMethod === 'stored'}
            onChange={() => {
               formik.setFieldValue('paymentMethod', 'stored')
               formik.setFieldValue('selectedCard', DEFAULT_CARD || '')
               formik.setFieldValue('cardNumber', '')
               formik.setFieldValue('expiryMonth', '')
               formik.setFieldValue('expiryYear', '')
               formik.setFieldValue('securityCode', '')
            }}
            styles={{
               label: 'text-sm font-medium text-b-white-secondary',
            }}
         />

         {formik.values.paymentMethod === 'stored' ? (
            <div>
               <SelectDropdown
                  name="payment-method"
                  value={formik.values.selectedCard || DEFAULT_CARD || '...'}
                  onChange={value => {
                     formik.setFieldValue('selectedCard', value)
                  }}
                  options={PaymentMethodOptions}
               />
               {formik.touched.selectedCard && formik.errors.selectedCard && (
                  <p className="text-xs text-error-primary mt-1" role="alert">
                     {formik.errors.selectedCard}
                  </p>
               )}
            </div>
         ) : null}

         <SimpleCheckbox
            label="Use Credit/Debit Card: (PayPal)"
            isChecked={formik.values.paymentMethod === 'new'}
            onChange={() => {
               formik.setFieldValue('paymentMethod', 'new')
               formik.setFieldValue('selectedCard', '')
            }}
            styles={{
               label: 'text-sm font-medium text-b-white-secondary',
            }}
         />

         {formik.values.paymentMethod === 'new' ? (
            <div className="flex flex-col gap-2">
               <div>
                  <GlobalInput
                     size="sm"
                     placeholder="Card Number"
                     className="max-w-1/2"
                     leftSection={false}
                     defaultValue={formik.values.cardNumber}
                     onChange={value => {
                        formik.setFieldValue('cardNumber', value)
                     }}
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                     <p className="text-xs text-error-primary mt-1" role="alert">
                        {formik.errors.cardNumber}
                     </p>
                  )}
               </div>

               <div>
                  <GlobalInput
                     size="sm"
                     placeholder="Expiry Month (MM)"
                     className="max-w-1/2"
                     leftSection={false}
                     defaultValue={formik.values.expiryMonth}
                     onChange={value => {
                        formik.setFieldValue('expiryMonth', value)
                     }}
                  />
                  {formik.touched.expiryMonth && formik.errors.expiryMonth && (
                     <p className="text-xs text-error-primary mt-1" role="alert">
                        {formik.errors.expiryMonth}
                     </p>
                  )}
               </div>

               <div>
                  <GlobalInput
                     size="sm"
                     placeholder="Expiry Year (YYYY)"
                     className="max-w-1/2"
                     leftSection={false}
                     defaultValue={formik.values.expiryYear}
                     onChange={value => {
                        formik.setFieldValue('expiryYear', value)
                     }}
                  />
                  {formik.touched.expiryYear && formik.errors.expiryYear && (
                     <p className="text-xs text-error-primary mt-1" role="alert">
                        {formik.errors.expiryYear}
                     </p>
                  )}
               </div>

               <div>
                  <GlobalInput
                     size="sm"
                     placeholder="Security Code"
                     className="max-w-1/2"
                     leftSection={false}
                     defaultValue={formik.values.securityCode}
                     onChange={value => {
                        formik.setFieldValue('securityCode', value)
                     }}
                  />
                  {formik.touched.securityCode && formik.errors.securityCode && (
                     <p className="text-xs text-error-primary mt-1" role="alert">
                        {formik.errors.securityCode}
                     </p>
                  )}
               </div>
            </div>
         ) : null}

         <Heading
            order={3}
            className="w-full text-white bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
         >
            Checkout / Order Summary
         </Heading>

         <GlobalTable<OrderSummaryData>
            columns={columns}
            data={ORDER_SUMMARY}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
            loading={false}
         />

         <span className="text-sm font-medium text-b-white-secondary">Subtotal: {paymentSummary.lblSubTotal}</span>
         <span className="text-sm font-medium text-b-white-secondary">Shipping: {paymentSummary.lblTax}</span>
         <span className="text-sm font-medium text-b-white-secondary">Total: {paymentSummary.lblTotal}</span>

         <MButton
            loading={isCompleteOrderLoading}
            onClick={() => {
               // Trigger validation for all fields
               formik
                  .validateForm()
                  .then(errors => {
                     if (Object.keys(errors).length > 0) {
                        // Mark all fields as touched to show errors
                        formik.setTouched({
                           paymentMethod: true,
                           selectedCard: true,
                           cardNumber: true,
                           expiryMonth: true,
                           expiryYear: true,
                           securityCode: true,
                        })
                     } else {
                        // If no errors, submit the form
                        formik.handleSubmit()
                     }

                     return
                  })
                  .catch(error => {
                     console.error('Validation error:', error)
                  })
            }}
         >
            Complete Order & Charge Payment
         </MButton>
      </div>
   )
}

export default OrderSection

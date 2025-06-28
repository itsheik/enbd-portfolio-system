'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { selectRetailSlice } from '@/src/store/features/retail/retailSlice'

import CartItemCard from '../../cards/CartItemCard'

import { MButton, Paragraph } from '~/components/ui'

const CartSection = () => {
   const router = useRouter()
   const { retailCart } = useSelector(selectRetailSlice)

   const hasItems = retailCart?.cartItems && retailCart?.cartItems.length > 0

   return (
      <section>
         <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
               <div className="bg-table-head px-3 py-1.5 grid grid-cols-[72%_12%_8%_8%] max-[780px]:grid-cols-[60%_14%_13%_13%]">
                  <Paragraph className="font-semibold text-white">Description</Paragraph>
                  <Paragraph className="font-semibold text-white">Quantity</Paragraph>
                  <Paragraph className="font-semibold text-white">Price</Paragraph>
                  <Paragraph className="font-semibold text-white">Total</Paragraph>
               </div>
               <div className="w-full">
                  {hasItems ? (
                     retailCart?.cartItems.map((item, index) => {
                        return <CartItemCard data={item} key={index} />
                     }) || 'No items in cart'
                  ) : (
                     <div className="h-16 flex items-center justify-center">No items in cart</div>
                  )}
               </div>
            </div>
         </div>
         <div className="flex items-end justify-between w-full">
            <MButton onClick={() => router.push(routes.retail.wines)}>Continue Shopping</MButton>
            {hasItems ? (
               <div>
                  <Paragraph>
                     Subtotal:
                     <span className="font-bold text-c-red-primary">${retailCart?.cartSubtotal || 0}</span>
                  </Paragraph>
                  <MButton className="w-full mt-3" onClick={() => router.push(routes.checkout)}>
                     Checkout
                  </MButton>
               </div>
            ) : (
               ''
            )}
         </div>
      </section>
   )
}

export default CartSection

import type React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import QuantityBox from '@/src/components/ui/QuantityBox'
import { type Cart } from '@/src/interface/retail'
import { setAddItemToRetailCart, setRemoveItemCompletelyFromRetailCart, setRemoveItemFromRetailCart } from '@/src/store/features/retail/retailSlice'
import { useRemoveRetailItemToCartMutation } from '@/src/store/services/retail'
import { ApiErrorToast } from '@/src/utils/helpers'
import { getCartId } from '@/src/utils/storage/protectedStorage'

import { Heading, Paragraph } from '~/components/ui'

interface CartItemsProps {
   data: Cart
}
const CartItemCard: React.FC<CartItemsProps> = ({ data }) => {
   const dispatch = useDispatch()
   const cartId = getCartId()

   const [itemQuantity, setItemQuantity] = useState(data.quantity)
   const [isRemovingItem, setIsRemovingItem] = useState(false)

   const [removeItemFromCart, { isLoading, isSuccess, isError, error, data: removeItemFromCartData }] =
      useRemoveRetailItemToCartMutation()

   // Sync local state with Redux data when data changes
   useEffect(() => {
      setItemQuantity(data.quantity)
   }, [data.quantity])

   useEffect(() => {
      if (itemQuantity === 0 && cartId) {
         setIsRemovingItem(true)
         removeItemFromCart({
            cartId,
            winecatalogid: data.wineCatalogID,
            quantity: data.quantity,
            amount: data.price * data.quantity,
         })
      }
   }, [itemQuantity, cartId, data.wineCatalogID, data.price, data.quantity, removeItemFromCart])

   const handleRemoveItem = () => {
      if (itemQuantity === 1 && cartId) {
         setIsRemovingItem(true)
         removeItemFromCart({
            cartId,
            winecatalogid: data.wineCatalogID,
            quantity: data.quantity,
            amount: data.price * data.quantity,
         })
      } else {
         dispatch(
            setRemoveItemFromRetailCart({
               wineCatalogID: data.wineCatalogID,
               quantity: 1,
            }),
         )
      }
   }

   const handleAddItem = () => {
      dispatch(
         setAddItemToRetailCart({
            wineCatalogID: data.wineCatalogID,
            price: data.price,
            totalPrice: data.price,
            quantity: 1,
            wineName: data.wineName,
            vintage: data.vintage,
            bottleSize: data.bottleSize,
            varietal: data.varietal,
            region: data.region,
            subRegion: data.subRegion,
            imagethumb: data.imagethumb,
         }),
      )
   }

   useEffect(() => {
      if (isSuccess && removeItemFromCartData && isRemovingItem) {
         // When API call succeeds, completely remove the item from Redux state
         // This ensures complete removal and avoids any issues with other items
         dispatch(
            setRemoveItemCompletelyFromRetailCart({
               wineCatalogID: data.wineCatalogID,
            }),
         )
         setIsRemovingItem(false)
         console.log('Item successfully removed from cart')
      }
   }, [isSuccess, removeItemFromCartData, dispatch, data.wineCatalogID, isRemovingItem])

   useEffect(() => {
      if (isError && error && isRemovingItem) {
         ApiErrorToast(error)
         setIsRemovingItem(false)
      }
   }, [isError, isRemovingItem])

   return (
      <article
         aria-label="recommeauction price list card"
         className="w-full grid grid-cols-[72%_12%_8%_8%] gap-2 items-center bg-beige px-6 py-3 mb-4 rounded-lg cursor-pointer max-[780px]:grid-cols-[60%_14%_13%_13%]"
      >
         <div className="w-full flex items-center gap-2.5 relative ">
            <div className="flex items-center gap-6 h-[108px] w-32 relative ">
               <Image
                  fill
                  src={data.imagethumb || '/images/placeholder.png'}
                  alt="Bottle Shake"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain mix-blend-multiply brightness-125 md:px-6"
               />
            </div>
            <div className="w-[1px] h-[87px] bg-[#8282826B]"></div>
            <div className="w-full">
               <Heading className="font-gilda-display font-normal text-red-secondary">{data.wineName}</Heading>
               <Paragraph className="font-light text-sm">
                  {data.region} <br /> {data.varietal}
               </Paragraph>

               <Paragraph className="text-sm font-semibold text-black">
                  Only {itemQuantity} Remaining In Stock {`{{check this later}}`}
               </Paragraph>
            </div>
         </div>
         <div>
            <QuantityBox
               quantity={itemQuantity}
               setQuantity={setItemQuantity}
               handleRemove={handleRemoveItem}
               handleAdd={handleAddItem}
               disabled={false}
            />
         </div>
         <div>
            <Paragraph className="md:text-base font-semibold text-c-red-primary ">${data.price}</Paragraph>
         </div>
         <div>
            <Paragraph className="md:text-base font-semibold text-c-red-primary ">
               ${data.price * itemQuantity}
            </Paragraph>
         </div>
      </article>
   )
}

export default CartItemCard

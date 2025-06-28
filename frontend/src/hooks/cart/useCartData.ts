import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { type Retail } from '@/src/interface/retail'
import { generateUUID } from '@/src/lib'
import { selectUserSlice } from '@/src/store/features/auth/authSlice'
import {
   selectRetailSlice,
   setAddItemToRetailCart,
   setRemoveItemFromRetailOrder,
   setRetailSlice,
} from '@/src/store/features/retail/retailSlice'
import {
   useAddRetailItemToCartMutation,
   useGetRetailItemToCartMutation,
   useRemoveRetailItemToCartMutation,
} from '@/src/store/services/retail'
import { ApiErrorToast, ApiSuccessToast } from '@/src/utils/helpers'
import { getCartId, setCartId } from '@/src/utils/storage/protectedStorage'

type TUseCartDataParams = {
   wine?: Retail
   quantity?: number
}

export const useAddToCartData = ({ wine, quantity }: TUseCartDataParams) => {
   const dispatch = useDispatch()
   let cartId: string = getCartId()
   const { userId } = useSelector(selectUserSlice)

   const [
      addRetailItemToCart,
      {
         isLoading: isAddRetailItemToCartLoading,
         isSuccess: isAddRetailItemToCartSuccess,
         isError: isAddRetailItemToCartError,
         error: addRetailItemToCartError,
         data: addRetailItemToCartData,
      },
   ] = useAddRetailItemToCartMutation()

   const handleAddRetailItemToCart = async () => {
      if (wine && quantity && userId) {
         if (!cartId) {
            cartId = generateUUID()

            setCartId(cartId)
         }

         await addRetailItemToCart({
            winecatalogid: wine.winecatalogid,
            quantity,
            cartId,
            amount: wine.price,
         })
      }
   }

   useEffect(() => {
      if (isAddRetailItemToCartSuccess && addRetailItemToCartData) {
         ApiSuccessToast(`Item added to cart`)

         setCartId(cartId)

         if (wine && quantity)
            dispatch(
               setAddItemToRetailCart({
                  wineCatalogID: wine.winecatalogid,
                  price: wine.price,
                  totalPrice: wine.price,
                  quantity,
                  wineName: wine.winename,
                  vintage: wine.vintage,
                  bottleSize: wine.bottlesize,
                  varietal: wine.varietal,
                  region: wine.region,
                  subRegion: wine.subregion,
                  imagethumb: wine.imagethumb,
               }),
            )
      }
   }, [isAddRetailItemToCartSuccess])

   useEffect(() => {
      if (isAddRetailItemToCartError && addRetailItemToCartError) {
         ApiErrorToast(addRetailItemToCartError)
      }
   }, [isAddRetailItemToCartError])

   return {
      handleAddRetailItemToCart,
      isAddRetailItemToCartLoading,
   }
}

export const useGetCartData = () => {
   const dispatch = useDispatch()
   const { retailCart } = useSelector(selectRetailSlice)
   const { userId } = useSelector(selectUserSlice)

   const [
      getRetailItemToCart,
      {
         isLoading: isGetRetailItemToCartLoading,
         isSuccess: isGetRetailItemToCartSuccess,
         isError: isGetRetailItemToCartError,
         error: getRetailItemToCartError,
         data: getRetailItemToCartData,
      },
   ] = useGetRetailItemToCartMutation()

   useEffect(() => {
      if (userId) {
         const cartId = generateUUID()
         setCartId(cartId)

         getRetailItemToCart({
            cartId,
         })
      }
   }, [])

   useEffect(() => {
      if (isGetRetailItemToCartSuccess) {
         dispatch(
            setRetailSlice({
               retailCart: {
                  cartItems: getRetailItemToCartData.payload.data.cart,
                  cartSubtotal: getRetailItemToCartData.payload.data.cartSubtotal[0].subTotal,
               },
            }),
         )
      }
   }, [isGetRetailItemToCartSuccess])

   useEffect(() => {
      if (isGetRetailItemToCartError) {
         ApiErrorToast(getRetailItemToCartError)
      }
   }, [isGetRetailItemToCartError])

   return {
      retailCart,
      isGetRetailItemToCartLoading,
   }
}

export const useRemoveItemFromCart = () => {
   const dispatch = useDispatch()
   const [removeRetailItemFromCart, { isSuccess, isError, error, isLoading }] = useRemoveRetailItemToCartMutation()
   const [removedItem, setRemovedItem] = useState<number | null>(null)

   useEffect(() => {
      if (isSuccess) {
         ApiSuccessToast('Item removed from order')

         if (removedItem) {
            dispatch(setRemoveItemFromRetailOrder({ wineCatalogID: removedItem }))
         }
      }
   }, [isSuccess])

   useEffect(() => {
      if (isError) {
         ApiErrorToast(error)
      }
   }, [isError])

   return {
      removeRetailItemFromCart,
      setRemovedItem,
      isLoading,
   }
}

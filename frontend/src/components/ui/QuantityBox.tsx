'use client'
import type React from 'react'
import { type Dispatch, type SetStateAction, useState } from 'react'

import { DownChevSvg } from './icons/svg-icons'

interface CartItemsProps {
   quantity?: number
   setQuantity?: Dispatch<SetStateAction<number>>
   handleRemove?: () => void
   handleAdd?: () => void
   disabled?: boolean
}
const QuantityBox: React.FC<CartItemsProps> = ({ quantity, setQuantity, ...props }) => {
   const [currentQuantity, setCurrentQuantity] = useState(quantity || 1)

   const handleQuantity = (type: string) => {
      if (type === 'down') {
         if (props.handleRemove) props.handleRemove()

         setCurrentQuantity(prev => {
            if (prev > 1) {
               return Math.max(prev - 1, 1)
            }

            return prev // or 1, depending on your lower limit
         })

         if (setQuantity)
            setQuantity(prev => {
               if (prev > 1) {
                  return Math.max(prev - 1, 1)
               }

               return prev // or 1, depending on your lower limit
            })
      } else {
         setCurrentQuantity(prev => prev + 1)

         if (setQuantity) setQuantity(prev => prev + 1)

         if (props.handleAdd) props.handleAdd()
      }
   }

   return (
      <div className="grid grid-cols-2 w-max border-1 border-b-white-primary">
         <div
            className="flex items-center justify-center border-r border-b-white-primary"
            onClick={e => {
               e.stopPropagation()
            }}
         >
            {quantity || currentQuantity}
         </div>
         <div className="grid grid-rows-2 ">
            <button
               onClick={e => {
                  e.stopPropagation()
                  handleQuantity('up')
               }}
               className="border-b border-b-white-primary cursor-pointer px-1.5 py-1"
            >
               <DownChevSvg className="rotate-180" />
            </button>
            <button
               onClick={e => {
                  e.stopPropagation()
                  handleQuantity('down')
               }}
               className=" cursor-pointer px-1.5 py-1"
               disabled={!props.handleRemove ? props.disabled || quantity === 1 || currentQuantity === 1 : false}
            >
               <DownChevSvg />
            </button>
         </div>
      </div>
   )
}

export default QuantityBox

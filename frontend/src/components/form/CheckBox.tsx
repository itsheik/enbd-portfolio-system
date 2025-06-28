'use client'

import { cn } from '@/src/lib/utils'

interface SimpleCheckboxProps {
   label?: string
   isChecked?: boolean
   onChange?: () => void

   styles?: {
      label?: string
      checkbox?: string
   }
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({ label, isChecked = false, onChange, styles }) => {
   return (
      <label className={cn('flex items-center space-x-2 cursor-pointer text-b-white-secondary font-inter', styles?.label)}>
         <span
            className={cn(
               `w-4 h-4 rounded border flex items-center justify-center transition ${
                  isChecked ? 'bg-primary border-primary' : 'border-gray-400'
               }`,
               styles?.checkbox
            )}
         >
            {isChecked && <span className="w-1 h-1 bg-table-head rounded-full" />}
         </span>
         {label && (
            <span className={cn('text-xs', styles?.label)}>
               {label}
            </span>
         )}
         <input type="checkbox" checked={isChecked} onChange={onChange} className="hidden" />
      </label>
   )
}

export default SimpleCheckbox

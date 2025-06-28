import { type ReactNode } from 'react'

import { cn } from '@/src/lib'

import SimpleCheckbox from '../form/CheckBox'
import { FileSettingSvg, PdfSvg, TrashSvg } from '../ui/icons/svg-icons'
import { Pill } from '../ui/Pills'

interface Props {
   text?: string
   pillData?: {
      variant: 'success' | 'danger' | 'info' | 'warning'
      value: string
   }
   showIcon?: {
      fileIcon?: boolean
      deleteIcon?: boolean
      pdfIcon?: boolean
      checkbox?: boolean
   }
   customIcon?: ReactNode
   className?: string
   handleFileClick?: () => void
   handleDeleteClick?: () => void
   handlePdfClick?: () => void
   handleCheckBox?: () => void
   isChecked?: boolean
}

const TableActions = ({ pillData, showIcon, customIcon, className = '', isChecked, ...props }: Props) => {
   return (
      <div className={cn(`text-primary text-xs text-center flex items-center justify-center gap-2 w-full`, className)}>
         {props.text && <span className="text-red-secondary">{props.text}</span>}

         <div className="flex items-center gap-2 self-end">
            {pillData && (
               <Pill variant={pillData.variant} className="capitalize">
                  {pillData.value}
               </Pill>
            )}

            {showIcon?.fileIcon &&
               (customIcon || (
                  <button className="cursor-pointer" onClick={props.handleFileClick}>
                     <FileSettingSvg className="text-b-white-secondary w-4 h-4" />
                  </button>
               ))}

            {showIcon?.deleteIcon && (
               <button className="cursor-pointer" onClick={props.handleDeleteClick}>
                  <TrashSvg className="text-error-secondary w-4 h-4" />
               </button>
            )}

            {showIcon?.pdfIcon && (
               <button className="cursor-pointer" onClick={props.handlePdfClick}>
                  <PdfSvg className="text-error-secondary w-4 h-4" />
               </button>
            )}
            {showIcon?.checkbox && (
               <SimpleCheckbox isChecked={isChecked} onChange={props.handleCheckBox} />
            )}
         </div>
      </div>
   )
}

export default TableActions

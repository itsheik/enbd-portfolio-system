import type React from 'react'
import { TextInput, type TextInputProps } from '@mantine/core'

import { cn } from '@/src/lib'

import { SearchSvg } from '../icons/svg-icons'

type MTextInputProps = {
   inputStyles?: {
      input?: string
   }
   leftSection?: React.ReactNode
   showLeftSection?: boolean
   showicon?: 'true' | 'false'
} & TextInputProps

/* 
*props
variant = 'default' | 'filled' | 'unstyled';
size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

see @https://mantine.dev/core/text-input/?t=props
*/

export const MTextInput: React.FC<MTextInputProps> = ({ ...props }) => {
   const { inputStyles, ...rest } = props

   return (
      <TextInput
         {...rest}
         leftSection={
            props.showLeftSection && props.leftSection ? (
               props.leftSection
            ) : props.showicon && props.showicon == 'false' ? null : (
               <div className="h-5 w-5 text-gray-400 mx-2">
                  <SearchSvg className="text-primary h-5 w-5" />
               </div>
            )
         }
         classNames={{
            input: cn('bg-transparent shadow-white-secondary placeholder:text-muted', inputStyles?.input),
            wrapper: 'h-full',
         }} 
      />
   )
}

'use client'
import { useState } from 'react'
import { CloseButton, Input } from '@mantine/core'

import { cn } from '@/src/lib'

type Props = {
   className?: string
   wrapperClassName?: string
   inputClassName?: string
   defaultValue?: string
   onChange?: (value: string) => void
   placeholder?: string
   rightSection?: React.ReactNode
   leftSection?: React.ReactNode
   size?: 'sm' | 'md' | 'lg' | 'xl'
}

const GlobalInput = ({
   className,
   wrapperClassName,
   inputClassName,
   defaultValue,
   onChange,
   placeholder,
   rightSection,
   leftSection,
   size,
}: Props) => {
   const [value, setValue] = useState(defaultValue || '')

   return (
      <Input
         className={className}
         classNames={{
            input: cn('bg-transparent border-none text-red-primary', inputClassName),
            wrapper: cn('rounded-lg border border-b-white-primary rounded-md', wrapperClassName),
         }}
         size={size || 'md'}
         placeholder={placeholder || 'Clearable input'}
         value={value}
         onChange={event => {
            setValue(event.currentTarget.value)

            if (onChange) onChange(event.currentTarget.value)
         }}
         rightSectionPointerEvents="all"
         rightSection={
            rightSection || (
               <CloseButton
                  aria-label="Clear input"
                  onClick={() => {
                     setValue('')
                     if (onChange) onChange('')
                  }}
                  style={{ display: value ? undefined : 'none' }}
               />
            )
         }
         leftSection={leftSection}
      />
   )
}

export default GlobalInput

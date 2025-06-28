'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { cn } from '@/src/lib'

import { DownChevSvg, SearchSvg } from '../ui/icons/svg-icons'

type Option = {
   label: string
   value: string
   id?: string
   count?: number
}

type AutocompleteProps = {
   options: Option[]
   placeholder?: string
   queryKey?: string
   styles?: {
      container?: string
      inputContainer?: string
      dropdownContainer?: string
   }
   error?: boolean
   errorMessage?: string
   name?: string
   required?: boolean
   onErrorChange?: (hasError: boolean) => void
   onChange?: (value: string) => void
   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
   hideSearchIcon?: boolean
   id?: string
   getValue?: (value: Option | null) => void
}

export default function AutocompleteDropdown({
   options,
   placeholder = 'Search...',
   queryKey = 'country',
   error = false,
   errorMessage = '',
   required = false,
   onErrorChange,
   onBlur,
   id,
   ...props
}: AutocompleteProps) {
   const defaultValue = useQueryParam(queryKey || '')
   const defaultLabel = options.find(opt => opt.value === defaultValue)?.label || ''

   const [query, setQuery] = useState(defaultLabel)
   const [showDropdown, setShowDropdown] = useState(false)

   // Memoize the filtered options
   const filtered = useMemo(() => {
      return options.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()))
   }, [options, query])

   // make this callback
   const initValue = useCallback(() => setQuery(defaultLabel), [defaultLabel])

   useEffect(() => {
      initValue()
   }, [defaultValue, initValue])

   const updateQueryParam = useCallback(
      debounce((key: string, value: string | null) => {
         updateQueryParams(key, value)
      }, 0),
      [],
   )

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)

      if (value.length === 0) {
         setShowDropdown(true)
         updateQueryParam(queryKey, null)
      }

      const matchingOption = options.find(opt => opt.label.toLowerCase() === value.toLowerCase())

      if (props.onChange) {
         props.onChange(matchingOption ? matchingOption.value : '')
      }

      if (props.getValue) {
         props.getValue(matchingOption ? matchingOption : null)
      }

      // Clear error when user starts typing
      if (error && value.length > 0) {
         onErrorChange?.(false)
      }
   }

   const handleOptionSelect = (opt: Option) => {
      setQuery(opt.label)
      updateQueryParams(queryKey, opt.value)
      if (props.onChange) {
         props.onChange(opt.value)
      }
      if (props.getValue) {
         props.getValue(opt)
      }
      setShowDropdown(false)
   }

   return (
      <div className={cn('relative w-full', props.styles?.container)} id={id}>
         <div
            className={cn(
               'flex items-center border border-gray-300 rounded-md px-3 py-2.5 bg-transparent shadow-sm focus-within:ring-2 focus-within:ring-[#550000]',
               {
                  'border-error-primary': error,
               },
               props.styles?.inputContainer,
            )}
         >
            {!props.hideSearchIcon && (
               <div className="h-5 w-5 text-gray-400 mr-2">
                  <SearchSvg className="text-primary h-5 w-5" />
               </div>
            )}

            <input
               type="text"
               name={props.name}
               value={query}
               onChange={handleInputChange}
               onFocus={() => setShowDropdown(true)}
               onBlur={e => {
                  if (onBlur) onBlur(e)
                  setShowDropdown(false)
               }}
               // onMouseDown={e => setTimeout(() => setShowDropdown(false), 150)}
               placeholder={placeholder}
               className={cn('w-full bg-transparent outline-none text-sm placeholder:text-b-white-secondary')}
               required={required}
               aria-invalid={error}
               aria-errormessage={error ? 'error-message' : undefined}
            />
            <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
               <DownChevSvg
                  className={cn(
                     'w-4 h-4 transition-transform text-b-white-secondary',
                     { 'rotate-180': showDropdown },
                     {
                        'text-error-primary': error,
                     },
                  )}
               />
            </button>
         </div>

         {error && errorMessage && (
            <p id="error-message" className="mt-1 text-xs text-error-primary" role="alert">
               {errorMessage}
            </p>
         )}

         {showDropdown && filtered.length > 0 && (
            <ul
               className={cn(
                  'absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-white-secondary max-h-48 overflow-y-auto',
                  props.styles?.dropdownContainer,
               )}
            >
               {filtered.map(opt => (
                  <li
                     key={opt.value}
                     onMouseDown={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleOptionSelect(opt)
                     }}
                     className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-inherit w-full flex justify-between items-center"
                  >
                     <span>{opt.label}</span>
                     {opt.count ? <span>{opt.count}</span> : ''}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

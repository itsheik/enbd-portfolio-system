'use client'

import { useCallback, useEffect, useState } from 'react'
import { RangeSlider } from '@mantine/core'
import { debounce } from 'lodash'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { cn } from '@/src/lib'

import { StarSvg } from '../ui/icons/svg-icons'

type RangeSliderInputProps = {
   queryKey?: string
   minDefault?: number
   maxDefault?: number
   minRange?: number
   maxRange?: number
   step?: number
   error?: boolean
   errorMessage?: string
   styles?: {
      container?: string
      track?: string
      thumb?: string
   }
   onChange?: (range: { min: number; max: number }) => void
   getValue?: (range: { min: number; max: number }) => void
   onErrorChange?: (hasError: boolean) => void
}

export const RangeSliderInput = ({
   queryKey = 'range',
   minDefault = 0,
   maxDefault = 100,
   minRange = 0,
   maxRange = 100,
   step = 1,
   error = false,
   errorMessage = '',
   styles,
   onChange,
   getValue,
   onErrorChange,
}: RangeSliderInputProps) => {
   const defaultMin = useQueryParam(`${queryKey}Min`)
   const defaultMax = useQueryParam(`${queryKey}Max`)

   const initialMin = defaultMin ? parseInt(defaultMin, 10) : minDefault
   const initialMax = defaultMax ? parseInt(defaultMax, 10) : maxDefault

   const [range, setRange] = useState<[number, number]>([initialMin, initialMax])

   // Debounced function to update query params
   const debouncedUpdateSearchQuery = useCallback(
      debounce((value: [number, number]) => {
         updateQueryParams(`${queryKey}Min`, String(value[0]))
         updateQueryParams(`${queryKey}Max`, String(value[1]))

         if (onChange) onChange({ min: value[0], max: value[1] })
         if (getValue) getValue({ min: value[0], max: value[1] })
      }, 500),
      [queryKey, onChange, getValue],
   )

   useEffect(() => {
      // Clear error state when valid range is selected
      if (error && range[0] >= minRange && range[1] <= maxRange) {
         onErrorChange?.(false)
      }
   }, [range, minRange, maxRange, error, onErrorChange])

   return (
      <div className={cn('w-full', styles?.container)}>
         <RangeSlider
            value={range}
            onChange={value => {
               setRange(value)
               debouncedUpdateSearchQuery(value)
            }}
            min={minRange}
            max={maxRange}
            step={step}
            thumbSize={12}
            label={null}
            className={cn('text-primary', {
               'border-error-primary': error,
            })}
            thumbChildren={[<StarSvg key="1" />, <StarSvg key="2" />]}
         />
         {error && errorMessage && (
            <p className="mt-1 text-xs text-error-primary" role="alert">
               {errorMessage}
            </p>
         )}
      </div>
   )
}

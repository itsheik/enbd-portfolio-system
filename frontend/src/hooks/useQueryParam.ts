'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export function useQueryParam(key: string): string | null {
   const searchParams = useSearchParams()

   const value = useMemo(() => {
      return searchParams.get(key)
   }, [searchParams, key])

   return value
}

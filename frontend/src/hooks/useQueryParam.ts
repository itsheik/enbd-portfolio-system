'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Custom hook to get the value of a specific query parameter from the URL.
 *
 * @param key - The query parameter key to retrieve
 * @returns The value of the query parameter or null if not found
 */
export function useQueryParam(key: string): string | null {
   const searchParams = useSearchParams()

   const value = useMemo(() => {
      return searchParams.get(key)
   }, [searchParams, key])

   return value
}

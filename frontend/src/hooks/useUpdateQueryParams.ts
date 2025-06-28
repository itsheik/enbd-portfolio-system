'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

type QueryParams = Record<string, string | number | boolean | undefined>

function useUpdateQueryParams() {
   const router = useRouter()
   const constructNewUrl = useCallback((params: QueryParams | QueryParams[]) => {
      const searchParams = new URLSearchParams(window.location.search)
      const paramArray = Array.isArray(params) ? params : [params]

      paramArray.forEach(param => {
         Object.entries(param).forEach(([key, value]) => {
            if (value !== undefined) {
               searchParams.set(key, String(value))
            } else {
               searchParams.delete(key)
            }
         })
      })

      return `${window.location.pathname}?${searchParams.toString()}`
   }, [])

   const updateQueryParams = useCallback(
      (params: QueryParams | QueryParams[]) => {
         const newUrl = constructNewUrl(params)

         window.history.pushState(
            {
               ...window.history.state,
               as: newUrl,
               url: newUrl,
            },
            '',
            newUrl,
         )
      },
      [constructNewUrl],
   )

   const updateQueryParamsWithReload = useCallback(
      (params: QueryParams | QueryParams[]) => {
         const newUrl = constructNewUrl(params)

         router.push(newUrl)
      },
      [constructNewUrl, router],
   )

   const deleteQueryParams = useCallback((keys: string[]) => {
      const searchParams = new URLSearchParams(window.location.search)

      keys.forEach(key => searchParams.delete(key))

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`

      // Update the URL without reloading the page
      window.history.pushState(
         {
            ...window.history.state,
            as: newUrl,
            url: newUrl,
         },
         '',
         newUrl,
      )
   }, [])

   return {
      updateQueryParams,
      updateQueryParamsWithReload,
      deleteQueryParams,
   }
}

export const updateQueryParams = (key: string, value: string | null) => {
   const params = new URLSearchParams(window.location.search)
   if (value) {
      params.set(key, value)
   } else {
      params.delete(key)
   }
   window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
}

export default useUpdateQueryParams

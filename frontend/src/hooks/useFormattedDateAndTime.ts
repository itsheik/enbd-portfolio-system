import { useMemo } from 'react'

export const useFormattedDateTime = (isoString: string | undefined): string => {
   return useMemo(() => {
      if (!isoString) return ''

      const date = new Date(isoString)
      if (isNaN(date.getTime())) return 'Invalid Date'

      return date.toLocaleString('en-US', {
         year: 'numeric',
         month: 'numeric',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',
         hour12: true,
      })
   }, [isoString])
}

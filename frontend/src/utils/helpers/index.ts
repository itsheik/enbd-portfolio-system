import { toast } from 'react-toastify'
import { type SerializedError } from '@reduxjs/toolkit'
import { format, parse } from 'date-fns'
import DOMPurify from 'dompurify'

import { COUNTRY_ALIAS } from '@/src/constants/constants'
import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { type LoadWineRegionsByAuctionIdData } from '@/src/interface/auction'

export const ApiErrorToast = (error: SerializedError) => {
   if ('data' in error) {
      toast.error((error.data as { message: string })?.message || 'An error occurred')
   }
}

export const ApiSuccessToast = (message: string) => {
   toast.success(message)
}

export const mergeWithDefaults = <T extends Record<string, unknown>>(defaults: T, payload?: Partial<T>): T => ({
   ...defaults,
   ...payload,
})

export const matchCountry = (country: string) => {
   if (COUNTRY_ALIAS[country]) return COUNTRY_ALIAS[country]

   return country
}

export function formatDateToISO(dateString: string): string {
   const normalizedDateString = dateString.replace(/\s+/g, ' ').trim()
   const parsedDate = parse(normalizedDateString, 'MMM d yyyy h:mmaaa', new Date())

   // Validate the date
   if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format')
   }

   // Format the date as YYYY-MM-DDTHH:mm:ss
   return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss")
}

export const allFilterData = () => {
   const country = useQueryParam('country')
   const size = useQueryParam('size')
   const brand = useQueryParam('brand')
   const categories = useQueryParam('categories')
   const currentPage = Number(useQueryParam('page'))
   const keyword = useQueryParam('keyword')
   const rating = useQueryParam('rating')
   const state = useQueryParam('state')
   const auctionId = useQueryParam('auctionId')
   const priceRange = useQueryParam('priceRange')
   const type = useQueryParam('type')
   const vintage = useQueryParam('vintage')
   const subRegion = useQueryParam('subRegion')

   return {
      country,
      size,
      brand,
      categories,
      currentPage,
      keyword,
      rating,
      state,
      auctionId,
      priceRange,
      type,
      vintage,
      subRegion,
   }
}

export const clearAllFilters = () => {
   updateQueryParams('country', null)
   updateQueryParams('size', null)
   updateQueryParams('brand', null)
   updateQueryParams('categories', null)
   updateQueryParams('page', null)
   updateQueryParams('keyword', null)
   updateQueryParams('rating', null)
   updateQueryParams('state', null)
   updateQueryParams('subRegion', null)

   return
}

export default function SanitizeHtml(data: string) {
   const sanitizedHTML = DOMPurify.sanitize(data || '-')

   return sanitizedHTML
}

export function extractRange(rangeString: string) {
   // Use a regular expression to extract the numeric values
   const matches = rangeString.match(/\$(\d+)/g)

   if (!matches || matches.length < 2) {
      return { from: 0, to: 0 }
   }

   // Extract the numbers from the matched strings
   const from = parseInt(matches[0].replace('$', ''), 10)
   const to = parseInt(matches[1].replace('$', ''), 10)

   return { from, to }
}

export function removeDollarSign(price: string) {
   if (typeof price !== 'string') {
      throw new Error('Input must be a string')
   }

   // Remove the dollar sign using String.prototype.replace
   return price.replace('$', '')
}

export function cleanString(input: string) {
   // Check if input is null or undefined
   if (input === null || input === undefined) {
      console.warn('Invalid input provided. Expected a string.')

      return ''
   }

   // Convert input to string to handle numbers, booleans, etc.
   const str = input.toString()

   // Remove commas and periods using regex
   // eslint-disable-next-line no-useless-escape
   const cleanedStr = str.replace(/[,\.]/g, '')

   return cleanedStr
}

export const GetCountryRegions = (data: LoadWineRegionsByAuctionIdData[] | null, countryName: string) => {
   if (data) {
      const countryRegions = data
         .filter(item => item.country === countryName)
         .map(item => item.region)
         .filter((region, index, self) => self.indexOf(region) === index) // Remove duplicates

      console.log({ countryRegions, countryName })

      return countryRegions
   }

   return []
}

export const GetRegionsSubRegions = (data: LoadWineRegionsByAuctionIdData[] | null, regionName: string) => {
   if (data) {
      console.log({ data, regionName })
      const regionSubRegions = data
         .filter(item => item.region === regionName)
         .map(item => item.subRegion)
         .filter((subRegion, index, self) => self.indexOf(subRegion) === index) // Remove duplicates

      return regionSubRegions
   }

   return []
}

export const formatDateToReadable = (isoString: string): string => {
   if (!isoString) {
      console.warn('Invalid ISO string provided to formatDateToReadable')

      return ''
   }

   try {
      const date = new Date(isoString)

      // Check if the date is valid
      if (isNaN(date.getTime())) {
         console.warn('Invalid date format provided to formatDateToReadable')

         return ''
      }

      return format(date, 'EEEE, MMMM d, yyyy')
   } catch (error) {
      console.error('Error formatting date:', error)

      return ''
   }
}

export const formatDateToDateTime = (isoString: string): string => {
   if (!isoString) {
      console.warn('Invalid ISO string provided to formatDateToDateTime')

      return ''
   }

   try {
      const date = new Date(isoString)

      // Check if the date is valid
      if (isNaN(date.getTime())) {
         console.warn('Invalid date format provided to formatDateToDateTime')

         return ''
      }

      return format(date, 'M/d/yyyy h:mm:ss a')
   } catch (error) {
      console.error('Error formatting date:', error)

      return ''
   }
}

export const getAllFiltersData = () => {
   const transactionId = useQueryParam('orderId'),
      securityName = useQueryParam('securityName'),
      transactionType = useQueryParam('transactionType'),
      fromDate = useQueryParam('fromDate'),
      toDate = useQueryParam('toDate')

   return {
      transactionId,
      securityName,
      transactionType,
      fromDate,
      toDate,
   }
}

export const CLEAR_FILTERS = () => {}

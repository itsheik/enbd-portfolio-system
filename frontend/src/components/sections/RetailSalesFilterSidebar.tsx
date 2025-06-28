'use client'

import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'

import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { resetRetailFilterSlice, selectRetailSlice } from '@/src/store/features/retail/retailSlice'
import { useLoadStatesMutation } from '@/src/store/services/general'
import { allFilterData, clearAllFilters } from '@/src/utils/helpers'

import AutocompleteDropdown from '../form/AutoCompleteDropdown'
import FilterOption from '../form/CheckBoxGrouped'
import RatingFilter from '../form/Rating'
import { DownChevSvg, SearchSvg } from '../ui/icons/svg-icons'
import GlobalInput from '../ui/Inputs'

import { Heading, Paragraph } from '~/components/ui'

export const RetailSalesFilterSidebar = () => {
   const dispatch = useDispatch()
   const { retailWineFilters, retailListingFiltersLoading, retailWineListing } = useSelector(selectRetailSlice)
   const { country, size, brand, categories, currentPage, keyword, rating, state, priceRange, subRegion } = allFilterData()

   const [
      getStates,
      {
         isLoading: getStatesLoading,
         isSuccess: getStatesSuccess,
         isError: getStatesIsError,
         error: getStatesError,
         data: getStatesData,
      },
   ] = useLoadStatesMutation()

   useEffect(() => {
      if (retailWineFilters && retailWineFilters.filteredCountries) {
         if (retailWineFilters.filteredCountries) {
            const findCountry = retailWineFilters.filteredCountries.find(item => item.name === country)

            if (findCountry) {
               getStates({ countryId: findCountry.iD_PK })
            }
         }
      }
   }, [country, retailWineFilters])

   const debouncedUpdateSearchQuery = useCallback(
      debounce((key: string, value: string | null) => {
         updateQueryParams(key, value || null)
      }, 1500),
      [],
   )

   const BottleSizes = retailWineFilters
      ? retailWineFilters.bottleSize.map(size => ({
           label: size.value,
           value: size.value,
           count: size.count,
        }))
      : []

   const Type = retailWineFilters
      ? retailWineFilters.type.map(type => ({
           label: type.value,
           value: type.value,
           count: type.count,
        }))
      : []

   const PriceRange = retailWineFilters
      ? retailWineFilters.price.map(price => ({
           label: `$${price.from.toString()} - $${price.to.toString()}`,
           value: `$${price.from.toString()} - $${price.to.toString()}`,
           count: price.count,
        }))
      : []

   const Countries =
      retailWineFilters && retailWineFilters.filteredCountries
         ? retailWineFilters.filteredCountries.map(country => ({
              label: country.name,
              value: country.name,
              id: country.iD_PK.toString(),
           }))
         : []

   const States =
      getStatesSuccess && getStatesData.payload.data.length > 0
         ? getStatesData.payload.data.map(state => ({
              label: state.name,
              value: state.name,
              id: state.iD_PK.toString(),
           }))
         : []

   const Vintage = retailWineFilters
      ? retailWineFilters.vintage.map(_rating => ({
           label: _rating.value,
           value: _rating.value,
           count: _rating.count,
        }))
      : []

   // Get sub regions from retail wine data
   const getRetailSubRegions = (regionName: string) => {
      if (retailWineListing?.retail) {
         const subRegions = retailWineListing.retail
            .filter(item => item.region === regionName)
            .map(item => item.subregion)
            .filter((subRegion, index, self) => subRegion && self.indexOf(subRegion) === index) // Remove duplicates and null values
         
         return subRegions.map(subRegion => ({
            label: subRegion,
            value: subRegion,
         }))
      }
      
      return []
   }

   const SubRegions = state ? getRetailSubRegions(state) : []

   const SHOW_CLEAR_FILTER =
      country || size || brand || categories || currentPage || keyword || rating || state || priceRange || subRegion

   return (
      <aside className="w-full">
         {SHOW_CLEAR_FILTER && (
            <div className="flex justify-end w-full pb-2">
               <button
                  className="text-sm font-bold cursor-pointer"
                  onClick={() => {
                     clearAllFilters()
                     dispatch(resetRetailFilterSlice())
                  }}
               >
                  Clear All Filters
               </button>
            </div>
         )}

         <div className="bg-beige px-4 py-6 rounded-2xl mb-3 flex flex-col gap-5">
            <div className="border-b border-b-b-white-primary">
               <Heading className="font-light uppercase mb-1.5">FEATURED</Heading>
               <Paragraph className="text-red-secondary font-gilda-display">2022 Bordeaux Futures</Paragraph>
            </div>
            <div>
               <Heading className="font-light uppercase">ON SALE</Heading>
               <div className="flex items-center justify-between">
                  <Paragraph className="text-red-secondary font-gilda-display">View all Item on Sale</Paragraph>
                  <DownChevSvg className="text-b-white-secondary" />
               </div>
            </div>

            <div>
               <Heading className="font-light uppercase mb-4">Search</Heading>

               <GlobalInput
                  size="sm"
                  placeholder="Search.."
                  className="lg:col-span-1 sm:col-span-2 col-span-4 bg-white"
                  leftSection={<SearchSvg className="text-red-secondary" />}
                  onChange={value => {
                     debouncedUpdateSearchQuery('keyword', value)
                     updateQueryParams('page', '1')
                  }}
               />
            </div>
         </div>
         <div className="rounded-lg w-full border-2 px-4 py-5 flex flex-col gap-5">
            <div>
               <Heading className="font-light uppercase mb-4">Country</Heading>
               <AutocompleteDropdown options={Countries} placeholder="Select Country" queryKey="country" />
            </div>

            {getStatesLoading ? (
               'Loading States...'
            ) : country && getStatesSuccess && getStatesData.payload.data.length > 0 ? (
               <div>
                  <Heading className="font-light uppercase mb-4">State</Heading>
                  <AutocompleteDropdown options={States} placeholder="Select State" queryKey={'state'} />
               </div>
            ) : country ? (
               <div>
                  <Heading className="font-light uppercase mb-4">State</Heading>
                  <span className="text-red-primary font-medium text-base text-center">
                     There are not states available for selected country!
                  </span>
               </div>
            ) : (
               ''
            )}

            {/* {state ? (
               <div>
                  <Heading className="font-light uppercase mb-4">Sub Region</Heading>
                  {retailListingFiltersLoading ? (
                     <p>Loading sub regions...</p>
                  ) : SubRegions.length > 0 ? (
                     <AutocompleteDropdown
                        options={SubRegions}
                        placeholder="Select Sub Region"
                        queryKey={'subRegion'}
                     />
                  ) : (
                     <p>No sub regions available for this region</p>
                  )}
               </div>
            ) : (
               ''
            )} */}

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Size</Heading>
               <FilterContainer>
                  {retailListingFiltersLoading ? (
                     <p>Loading...</p>
                  ) : BottleSizes.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption queryName="size" options={BottleSizes} styles={{ container: 'w-full max-w-full' }} />
                  )}
               </FilterContainer>
            </div>

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Type</Heading>
               <FilterContainer>
                  {retailListingFiltersLoading ? (
                     <p>Loading...</p>
                  ) : Type.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption queryName="type" options={Type} styles={{ container: 'w-full max-w-full' }} />
                  )}
               </FilterContainer>
            </div>

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Price Range</Heading>
               <FilterContainer>
                  {retailListingFiltersLoading ? (
                     <p>Loading...</p>
                  ) : PriceRange.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption
                        queryName="priceRange"
                        options={PriceRange}
                        styles={{ container: 'w-full max-w-full' }}
                     />
                  )}
               </FilterContainer>
            </div>

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Rating</Heading>

               <FilterContainer>
                  <RatingFilter
                     ratings={[100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90].map(item => ({
                        label: String(item),
                        value: String(item),
                     }))}
                     queryName="rating"
                  />
               </FilterContainer>
            </div>
            <div className="">
               <Heading className="font-light uppercase mt-6 mb-4">Vintage</Heading>
               <AutocompleteDropdown options={Vintage} placeholder="Vintage" queryKey="vintage" />
            </div>
         </div>
         <div className="bg-beige px-4 py-6 rounded-2xl mt-3 h-40">
            <div>
               <Heading className="font-light uppercase mb-1.5">IMPORTER</Heading>
               <Paragraph className="text-red-secondary font-gilda-display">2022 Bordeaux Futures</Paragraph>
            </div>
         </div>
      </aside>
   )
}

const FilterContainer = ({ children }: PropsWithChildren) => {
   return <div className="max-h-48 h-full w-full overflow-y-scroll overflow-x-scroll">{children}</div>
}

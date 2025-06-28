'use client'
import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import Image from 'next/image'

import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { resetAuctionFilters, selectAuctionSlice, setAuctionSlice } from '@/src/store/features/auction/auctionSlice'
import { selectGeneralSlice } from '@/src/store/features/general/generalSlice'
import { useFetchAuctionLotFiltersMutation, useLoadWineRegionsByAuctionsIdMutation } from '@/src/store/services/auction'
import { useLoadStatesMutation } from '@/src/store/services/general'
import { allFilterData, ApiErrorToast, clearAllFilters, GetRegionsSubRegions } from '@/src/utils/helpers'

import AutocompleteDropdown from '../form/AutoCompleteDropdown'
import FilterOption from '../form/CheckBoxGrouped'
import RatingFilter from '../form/Rating'
import { SearchSvg } from '../ui/icons/svg-icons'
import GlobalInput from '../ui/Inputs'

import sellAuction from '~/assets/images/sell-auction.jpg'
import { Heading } from '~/components/ui'

export const FiltersSidebar = () => {
   const dispatch = useDispatch()
   const [getAllAuctionLotFilters, { isLoading, isSuccess, isError, data, error }] = useFetchAuctionLotFiltersMutation()
   const { auctionAndSessionsByStatusIDsData, auctionListingFilters, loadAloadWineRegionsByAuctionIdData } =
      useSelector(selectAuctionSlice)

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

   const [
      loadWineRegionsByAuctionId,
      {
         isLoading: isLoadingWineRegions,
         isSuccess: isSuccessWineRegions,
         isError: isErrorWineRegions,
         data: dataWineRegions,
         error: errorWineRegions,
      },
   ] = useLoadWineRegionsByAuctionsIdMutation()

   const { countries } = useSelector(selectGeneralSlice)
   const { country, size, brand, categories, currentPage, keyword, rating, state } = allFilterData()

   useEffect(() => {
      if (auctionAndSessionsByStatusIDsData && !auctionListingFilters) {
         getAllAuctionLotFilters({ auctionId: auctionAndSessionsByStatusIDsData[0]?.auctionID })
      }
   }, [auctionAndSessionsByStatusIDsData, auctionListingFilters])

   useEffect(() => {
      if (auctionAndSessionsByStatusIDsData && !loadAloadWineRegionsByAuctionIdData) {
         loadWineRegionsByAuctionId({ auctionID: auctionAndSessionsByStatusIDsData[0]?.auctionID })
      }
   }, [auctionAndSessionsByStatusIDsData, loadAloadWineRegionsByAuctionIdData, loadWineRegionsByAuctionId])

   useEffect(() => {
      if (isSuccess && data) {
         dispatch(
            setAuctionSlice({
               auctionListingFilters: data.payload.data,
            }),
         )
      }
   }, [isSuccess])

   useEffect(() => {
      if (isSuccessWineRegions && dataWineRegions) {
         dispatch(
            setAuctionSlice({
               loadAloadWineRegionsByAuctionIdData: dataWineRegions.payload.data,
            }),
         )
      }
   }, [isSuccessWineRegions, dataWineRegions, dispatch])

   useEffect(() => {
      if (countries && country) {
         const findCountry = countries.find(item => item.name === country)

         if (findCountry) {
            getStates({ countryId: findCountry.iD_PK })
         }
      }
   }, [country, countries])

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
      if (isErrorWineRegions && errorWineRegions) {
         ApiErrorToast(errorWineRegions)
      }
   }, [isError, error, isErrorWineRegions, errorWineRegions])

   const debouncedUpdateSearchQuery = useCallback(
      debounce((key: string, value: string | null) => {
         updateQueryParams(key, value || null)
      }, 1500),
      [],
   )

   // { label: '250ML', value: '250ml', count: 17 },
   const BottleSizes = auctionListingFilters
      ? auctionListingFilters.bottleSizes.map(size => ({
           label: size.bottleName,
           value: size.bottleName,
           count: 0,
        }))
      : []

   const Categories = auctionListingFilters
      ? auctionListingFilters.wineClassifications.map(brand => ({
           label: brand.cruClassification,
           value: brand.cruClassification,
           count: 0,
        }))
      : []

   const Countries = countries
      ? countries.map(country => ({
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

   const Brands = auctionListingFilters
      ? auctionListingFilters.wineCollections.map(brand => ({
           label: brand.provenance,
           value: brand.provenance,
           count: 0,
        }))
      : []

   // { label: 'option 1', value: 'option1' },
   const WineVintage = auctionListingFilters
      ? auctionListingFilters.wineVintages.map(winVintage => ({
           label: winVintage.vintage,
           value: winVintage.vintage,
        }))
      : []

   const SHOW_CLEAR_FILTER = country || size || brand || categories || currentPage || keyword || rating

   return (
      <aside className="w-full">
         {/* <CustomeDarawer children={<div>Alishan is here</div>} /> */}
         {SHOW_CLEAR_FILTER && (
            <div className="flex justify-end w-full pb-2">
               <button
                  className="text-sm font-bold cursor-pointer"
                  onClick={() => {
                     clearAllFilters()
                     dispatch(resetAuctionFilters())
                  }}
               >
                  Clear All Filters
               </button>
            </div>
         )}

         <div className="bg-beige px-4 py-6 rounded-2xl mb-3 flex flex-col gap-5">
            <div>
               <Heading className="font-light uppercase mb-3.5">Search</Heading>
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
            {/* <div>
               <Heading className="font-light text-base">Quick Research</Heading>
               <RatingFilter
                  ratings={['The Civary Seller', 'option2'].map(item => ({
                     label: item,
                     value: item,
                  }))}
                  queryName="quickResearch"
               />
            </div> */}
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

            {state ? (
               <div>
                  <Heading className="font-light uppercase mb-4">Sub Region</Heading>
                  {isLoadingWineRegions ? (
                     <p>Loading sub regions...</p>
                  ) : loadAloadWineRegionsByAuctionIdData ? (
                     <AutocompleteDropdown
                        options={GetRegionsSubRegions(loadAloadWineRegionsByAuctionIdData, state).map(subRegion => ({
                           label: subRegion,
                           value: subRegion,
                        }))}
                        placeholder="Select Sub Region"
                        queryKey={'subRegion'}
                     />
                  ) : (
                     <p>No sub regions available</p>
                  )}
               </div>
            ) : (
               ''
            )}

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Size</Heading>
               <FilterContainer>
                  {isLoading ? (
                     <p>Loading...</p>
                  ) : BottleSizes.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption queryName="size" options={BottleSizes} styles={{ container: 'w-full max-w-full' }} />
                  )}
                  <FilterOption queryName="size" options={BottleSizes} />
               </FilterContainer>
            </div>

            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Collections</Heading>

               <FilterContainer>
                  {isLoading ? (
                     <p>Loading...</p>
                  ) : BottleSizes.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption
                        queryName="brand"
                        options={Brands}
                        styles={{
                           container: 'w-max',
                        }}
                     />
                  )}
               </FilterContainer>
            </div>
            <Image
               src={sellAuction}
               alt="wine footer"
               placeholder="blur"
               className="w-full min-h-[360px] object-cover mt-5"
            />
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
            <div>
               <Heading className="font-light uppercase mt-6 mb-4">Classifications</Heading>

               <FilterContainer>
                  {isLoading ? (
                     <p>Loading...</p>
                  ) : BottleSizes.length === 0 ? (
                     <p>No data available</p>
                  ) : (
                     <FilterOption queryName="categories" options={Categories} />
                  )}
               </FilterContainer>
            </div>
            <div className="">
               <Heading className="font-light uppercase mt-6 mb-4">Vintage</Heading>
               <AutocompleteDropdown options={WineVintage} placeholder="Vintage" queryKey="vintage" />
            </div>
         </div>
      </aside>
   )
}

const FilterContainer = ({ children }: PropsWithChildren) => {
   return <div className="max-h-48 h-full w-full overflow-y-scroll overflow-x-scroll">{children}</div>
}

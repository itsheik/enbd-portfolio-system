'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { CUSTOMER_TRADE_DETAILS_DATA } from '@/src/constants/dummyData'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { getAllFiltersData } from '@/src/utils/helpers'

import Dropdown from '../../../form/Dropdown'
import GlobalHeading from '../../../ui/Headings/GlobalHeading'
import { SearchSvg } from '../../../ui/icons/svg-icons'
import GlobalInput from '../../../ui/Inputs'
import GlobalTable from '../../../ui/Tables/GlobalTable'
import { SectionContainer } from '../../section-container'

type Props = object

type CustomerTradeDetailsData = (typeof CUSTOMER_TRADE_DETAILS_DATA)[0]

const CustomerTradeDetails = (props: Props) => {
   const { orderRefNo, securityName, transactionType, fromDate, toDate } = getAllFiltersData()
   const [filteredData, setFilteredData] = useState(CUSTOMER_TRADE_DETAILS_DATA)

   const debouncedUpdateSearchQuery = useCallback(
      debounce((key: string, value: string | null) => {
         updateQueryParams(key, value || null)
      }, 500),
      [],
   )

   const transactionTypes = useMemo(() => {
      const types = [...new Set(CUSTOMER_TRADE_DETAILS_DATA.map(item => item.transactionType))]

      return types.map(type => ({ label: type, value: type }))
   }, [])

   const clearFilters = () => {
      debouncedUpdateSearchQuery('orderRefNo', null)
      debouncedUpdateSearchQuery('securityName', null)
      debouncedUpdateSearchQuery('transactionType', null)
      debouncedUpdateSearchQuery('fromDate', null)
      debouncedUpdateSearchQuery('toDate', null)
   }

   const hasActiveFilters = Object.values({
      orderRefNo,
      securityName,
      transactionType,
      fromDate,
      toDate,
   }).some(value => value !== '')

   useEffect(() => {
      if (orderRefNo) {
         setFilteredData(
            CUSTOMER_TRADE_DETAILS_DATA.filter(item =>
               item.orderRefNo.toLowerCase().includes(orderRefNo.toLowerCase()),
            ),
         )
      } else if (securityName) {
         setFilteredData(
            CUSTOMER_TRADE_DETAILS_DATA.filter(item =>
               item.securityName.toLowerCase().includes(securityName.toLowerCase()),
            ),
         )
      } else if (transactionType) {
         setFilteredData(
            CUSTOMER_TRADE_DETAILS_DATA.filter(item =>
               item.transactionType.toLowerCase().includes(transactionType.toLowerCase()),
            ),
         )
      } else if (fromDate) {
         setFilteredData(CUSTOMER_TRADE_DETAILS_DATA.filter(item => item.fromDate.includes(fromDate)))
      } else if (toDate) {
         setFilteredData(CUSTOMER_TRADE_DETAILS_DATA.filter(item => item.toDate.includes(toDate)))
      } else {
         setFilteredData(CUSTOMER_TRADE_DETAILS_DATA)
      }
   }, [orderRefNo, securityName, transactionType, fromDate, toDate])

   const columns = [
      {
         key: 'orderRefNo' as const,
         label: 'Order Ref No',
         render: (item: CustomerTradeDetailsData) => (
            <span className="text-primary text-xs block text-center">{item.orderRefNo}</span>
         ),
      },
      {
         key: 'securityName' as const,
         label: 'Security Name',
         render: (item: CustomerTradeDetailsData) => (
            <span className="text-primary text-xs block text-center">{item.securityName}</span>
         ),
      },
      {
         key: 'transactionType' as const,
         label: 'Transaction Type',
         render: (item: CustomerTradeDetailsData) => (
            <span className="text-primary text-xs block text-center">{item.transactionType}</span>
         ),
      },
      {
         key: 'fromDate' as const,
         label: 'From Date',
         render: (item: CustomerTradeDetailsData) => (
            <span className="text-primary text-xs block text-center">{item.fromDate}</span>
         ),
      },
      {
         key: 'toDate' as const,
         label: 'To Date',
         render: (item: CustomerTradeDetailsData) => (
            <span className="text-primary text-xs block text-center">{item.toDate}</span>
         ),
      },
   ]

   return (
      <SectionContainer aria-labelledby="about-heading">
         <div className="w-full">
            {/* Search Filters Section */}
            <div className="bg-beige px-4 py-6 rounded-2xl mb-6">
               <div className="flex items-center justify-between mb-4">
                  <GlobalHeading title="Search Filters" className="font-light uppercase" />
                  {hasActiveFilters && (
                     <button
                        onClick={clearFilters}
                        className="text-sm font-bold cursor-pointer text-red-primary hover:text-red-secondary transition-colors"
                     >
                        Clear All Filters
                     </button>
                  )}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Order Reference Number Search */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Order Reference No</label>
                     <GlobalInput
                        size="sm"
                        placeholder="Search by order ref..."
                        className="bg-white"
                        leftSection={<SearchSvg className="text-red-secondary" />}
                        defaultValue={orderRefNo || ''}
                        onChange={value => {
                           debouncedUpdateSearchQuery('orderRefNo', value)
                        }}
                     />
                  </div>

                  {/* Security Name Search */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Security Name</label>
                     <GlobalInput
                        size="sm"
                        placeholder="Search by security name..."
                        className="bg-white"
                        leftSection={<SearchSvg className="text-red-secondary" />}
                        defaultValue={securityName || ''}
                        onChange={value => {
                           debouncedUpdateSearchQuery('securityName', value)
                        }}
                     />
                  </div>

                  {/* Transaction Type Dropdown */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                     <Dropdown
                        name="transactionType"
                        options={transactionTypes}
                        value={transactionType || ''}
                        onChange={value => {
                           debouncedUpdateSearchQuery('transactionType', value)
                        }}
                     />
                  </div>

                  {/* From Date */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                     <GlobalInput
                        size="sm"
                        placeholder="Select from date"
                        className="bg-white"
                        defaultValue={fromDate || ''}
                        onChange={value => {
                           debouncedUpdateSearchQuery('fromDate', value)
                        }}
                     />
                  </div>

                  {/* To Date */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                     <GlobalInput
                        size="sm"
                        placeholder="Select to date"
                        className="bg-white"
                        defaultValue={toDate || ''}
                        onChange={value => {
                           debouncedUpdateSearchQuery('toDate', value)
                        }}
                     />
                  </div>

                  {/* Results Count */}
                  <div className="flex items-end">
                     <div className="bg-white px-3 py-2 rounded border">
                        <span className="text-sm text-gray-600">
                           Showing {filteredData.length} of {CUSTOMER_TRADE_DETAILS_DATA.length} results
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative h-full w-full aspect-video md:aspect-square md:h-[500px] rounded-md overflow-hidden">
               <GlobalTable<CustomerTradeDetailsData>
                  columns={columns}
                  data={filteredData}
                  styles={{
                     thStyle: 'py-2 px-3 text-center',
                     tdStyle: 'py-2 px-3',
                  }}
               />
            </div>
         </div>
      </SectionContainer>
   )
}

export default CustomerTradeDetails

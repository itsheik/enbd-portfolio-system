import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { CUSTOMER_TRADE_DETAILS_DATA } from '@/src/constants/dummyData'

import CustomerTradeDetails from '../index'

// Mock dependencies
vi.mock('@/src/hooks/useUpdateQueryParams', () => ({
   updateQueryParams: vi.fn(),
}))

vi.mock('@/src/utils/helpers', () => ({
   getAllFiltersData: vi.fn(() => ({
      orderRefNo: '',
      securityName: '',
      transactionType: '',
      fromDate: '',
      toDate: '',
   })),
}))

vi.mock('@/src/hooks/useQueryParam', () => ({
   useQueryParam: vi.fn((param: string) => {
      const mockParams: Record<string, string> = {
         orderRefNo: '',
         securityName: '',
         transactionType: '',
         fromDate: '',
         toDate: '',
      }
      
      return mockParams[param] || ''
   }),
}))

// Mock components
vi.mock('../../../form/Dropdown', () => ({
   default: ({ options, value, onChange, name }: {
      options?: Array<{ label: string; value: string }>
      value?: string
      onChange?: (value: string) => void
      name?: string
   }) => (
      <select
         data-testid={`dropdown-${name}`}
         value={value}
         onChange={(e) => onChange?.(e.target.value)}
      >
         <option value="">Select...</option>
         {options?.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   ),
}))

vi.mock('../../../ui/Inputs', () => ({
   default: ({ 
      placeholder, 
      defaultValue, 
      onChange, 
      leftSection, 
      size, 
      className 
   }: {
      placeholder?: string
      defaultValue?: string
      onChange?: (value: string) => void
      leftSection?: React.ReactNode
      size?: string
      className?: string
   }) => (
      <input
         data-testid={`input-${placeholder?.replace(/\s+/g, '-').toLowerCase()}`}
         placeholder={placeholder}
         defaultValue={defaultValue}
         onChange={(e) => onChange?.(e.target.value)}
         className={className}
      />
   ),
}))

vi.mock('../../../ui/Tables/GlobalTable', () => ({
   default: ({ data, columns }: {
      data?: Array<Record<string, unknown>>
      columns?: Array<{
         key: string
         label: string
         render?: (item: Record<string, unknown>) => React.ReactNode
      }>
   }) => (
      <table data-testid="global-table">
         <thead>
            <tr>
               {columns?.map((col) => (
                  <th key={col.key}>{col.label}</th>
               ))}
            </tr>
         </thead>
         <tbody>
            {data?.map((item, index) => (
               <tr key={index}>
                  {columns?.map((col) => (
                     <td key={col.key} data-testid={`cell-${col.key}-${index}`}>
                        {col.render ? col.render(item) : String(item[col.key] || '')}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   ),
}))

vi.mock('../../../ui/Headings/GlobalHeading', () => ({
   default: ({ title, className }: { title?: string; className?: string }) => (
      <h2 data-testid="global-heading" className={className}>
         {title}
      </h2>
   ),
}))

vi.mock('../../../ui/icons/svg-icons', () => ({
   SearchSvg: ({ className }: { className?: string }) => (
      <svg data-testid="search-icon" className={className}>
         Search
      </svg>
   ),
}))

vi.mock('../../section-container', () => ({
   SectionContainer: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
      <section data-testid="section-container" {...props}>
         {children}
      </section>
   ),
}))

describe('CustomerTradeDetails', () => {
   const user = userEvent.setup()

   beforeEach(() => {
      vi.clearAllMocks()
   })

   describe('Component Rendering', () => {
      it('renders the component with all sections', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByTestId('section-container')).toBeInTheDocument()
         expect(screen.getByTestId('global-heading')).toHaveTextContent('Search Filters')
         expect(screen.getByTestId('global-table')).toBeInTheDocument()
      })

      it('renders all filter inputs with correct labels', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByText('Order Reference No')).toBeInTheDocument()
         expect(screen.getByText('Security Name')).toBeInTheDocument()
         expect(screen.getByText('Transaction Type')).toBeInTheDocument()
         expect(screen.getByText('From Date')).toBeInTheDocument()
         expect(screen.getByText('To Date')).toBeInTheDocument()
      })

      it('renders search inputs with search icons', () => {
         render(<CustomerTradeDetails />)

         const orderRefInput = screen.getByTestId('input-search-by-order-ref...')
         const securityNameInput = screen.getByTestId('input-search-by-security-name...')

         expect(orderRefInput).toBeInTheDocument()
         expect(securityNameInput).toBeInTheDocument()
         expect(screen.getAllByTestId('search-icon')).toHaveLength(2)
      })

      it('renders transaction type dropdown with correct options', () => {
         render(<CustomerTradeDetails />)

         const dropdown = screen.getByTestId('dropdown-transactionType')
         expect(dropdown).toBeInTheDocument()

         const uniqueTypes = [...new Set(CUSTOMER_TRADE_DETAILS_DATA.map(item => item.transactionType))]
         uniqueTypes.forEach(type => {
            expect(screen.getByText(type)).toBeInTheDocument()
         })
      })

      it('renders results count with correct data', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByText(`Showing ${CUSTOMER_TRADE_DETAILS_DATA.length} of ${CUSTOMER_TRADE_DETAILS_DATA.length} results`)).toBeInTheDocument()
      })
   })

   describe('Table Rendering', () => {
      it('renders table with all columns', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByText('Order Ref No')).toBeInTheDocument()
         expect(screen.getByText('Security Name')).toBeInTheDocument()
         expect(screen.getByText('Transaction Type')).toBeInTheDocument()
         expect(screen.getByText('From Date')).toBeInTheDocument()
         expect(screen.getByText('To Date')).toBeInTheDocument()
      })

      it('renders all data rows', () => {
         render(<CustomerTradeDetails />)

         CUSTOMER_TRADE_DETAILS_DATA.forEach((item, index) => {
            expect(screen.getByTestId(`cell-orderRefNo-${index}`)).toBeInTheDocument()
            expect(screen.getByTestId(`cell-securityName-${index}`)).toBeInTheDocument()
            expect(screen.getByTestId(`cell-transactionType-${index}`)).toBeInTheDocument()
            expect(screen.getByTestId(`cell-fromDate-${index}`)).toBeInTheDocument()
            expect(screen.getByTestId(`cell-toDate-${index}`)).toBeInTheDocument()
         })
      })

      it('displays correct data in table cells', () => {
         render(<CustomerTradeDetails />)

         const firstItem = CUSTOMER_TRADE_DETAILS_DATA[0]
         expect(screen.getByTestId('cell-orderRefNo-0')).toHaveTextContent(firstItem.orderRefNo)
         expect(screen.getByTestId('cell-securityName-0')).toHaveTextContent(firstItem.securityName)
         expect(screen.getByTestId('cell-transactionType-0')).toHaveTextContent(firstItem.transactionType)
         expect(screen.getByTestId('cell-fromDate-0')).toHaveTextContent(firstItem.fromDate)
         expect(screen.getByTestId('cell-toDate-0')).toHaveTextContent(firstItem.toDate)
      })
   })

   describe('User Interactions', () => {
      it('allows typing in order reference input', async () => {
         render(<CustomerTradeDetails />)

         const orderRefInput = screen.getByTestId('input-search-by-order-ref...')
         await user.type(orderRefInput, 'ORD-2025-001')

         expect(orderRefInput).toHaveValue('ORD-2025-001')
      })

      it('allows typing in security name input', async () => {
         render(<CustomerTradeDetails />)

         const securityNameInput = screen.getByTestId('input-search-by-security-name...')
         await user.type(securityNameInput, 'Apple')

         expect(securityNameInput).toHaveValue('Apple')
      })

      it('allows selecting transaction type from dropdown', async () => {
         render(<CustomerTradeDetails />)

         const dropdown = screen.getByTestId('dropdown-transactionType')
         await user.selectOptions(dropdown, 'Buy')

         expect(dropdown).toHaveValue('Buy')
      })

      it('allows typing in from date input', async () => {
         render(<CustomerTradeDetails />)

         const fromDateInput = screen.getByTestId('input-select-from-date')
         await user.type(fromDateInput, '2025-01-15')

         expect(fromDateInput).toHaveValue('2025-01-15')
      })

      it('allows typing in to date input', async () => {
         render(<CustomerTradeDetails />)

         const toDateInput = screen.getByTestId('input-select-to-date')
         await user.type(toDateInput, '2025-01-20')

         expect(toDateInput).toHaveValue('2025-01-20')
      })
   })

   describe('Transaction Types Generation', () => {
      it('generates unique transaction types from data', () => {
         render(<CustomerTradeDetails />)

         const uniqueTypes = [...new Set(CUSTOMER_TRADE_DETAILS_DATA.map(item => item.transactionType))]
         uniqueTypes.forEach(type => {
            expect(screen.getByText(type)).toBeInTheDocument()
         })
      })

      it('creates dropdown options with correct label and value', () => {
         render(<CustomerTradeDetails />)

         const dropdown = screen.getByTestId('dropdown-transactionType')
         const options = dropdown.querySelectorAll('option')
         
         const uniqueTypes = [...new Set(CUSTOMER_TRADE_DETAILS_DATA.map(item => item.transactionType))]
         expect(options.length).toBe(uniqueTypes.length + 1) // +1 for default "Select..." option
      })
   })

   describe('Accessibility', () => {
      it('has proper ARIA labels and structure', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByTestId('section-container')).toHaveAttribute('aria-labelledby', 'about-heading')
         expect(screen.getByTestId('global-heading')).toHaveTextContent('Search Filters')
      })

      it('has proper form labels for all inputs', () => {
         render(<CustomerTradeDetails />)

         expect(screen.getByText('Order Reference No')).toBeInTheDocument()
         expect(screen.getByText('Security Name')).toBeInTheDocument()
         expect(screen.getByText('Transaction Type')).toBeInTheDocument()
         expect(screen.getByText('From Date')).toBeInTheDocument()
         expect(screen.getByText('To Date')).toBeInTheDocument()
      })
   })

   describe('Data Structure', () => {
      it('displays all customer trade details data', () => {
         render(<CustomerTradeDetails />)

         CUSTOMER_TRADE_DETAILS_DATA.forEach((item, index) => {
            expect(screen.getByTestId(`cell-orderRefNo-${index}`)).toHaveTextContent(item.orderRefNo)
            expect(screen.getByTestId(`cell-securityName-${index}`)).toHaveTextContent(item.securityName)
            expect(screen.getByTestId(`cell-transactionType-${index}`)).toHaveTextContent(item.transactionType)
            expect(screen.getByTestId(`cell-fromDate-${index}`)).toHaveTextContent(item.fromDate)
            expect(screen.getByTestId(`cell-toDate-${index}`)).toHaveTextContent(item.toDate)
         })
      })

      it('shows correct total count of results', () => {
         render(<CustomerTradeDetails />)

         const expectedCount = CUSTOMER_TRADE_DETAILS_DATA.length
         expect(screen.getByText(`Showing ${expectedCount} of ${expectedCount} results`)).toBeInTheDocument()
      })
   })
}) 
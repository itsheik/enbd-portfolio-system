import { LoaderBottleSvg } from '../icons/svg-icons'
import Loader from '../Loader'

import { cn } from '~/lib'

type Column<T> = {
   key: keyof T
   label: string
   render?: (item: T) => React.ReactNode
}

type GlobalTableProps<T> = {
   columns: Column<T>[]
   data: T[]
   styles: {
      thStyle?: string
      tdStyle?: string
   }
   loading?: boolean
}

const GlobalTable = <T,>(props: GlobalTableProps<T>) => {
   const { columns, data, styles, loading } = props

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full whitespace-nowrap table-auto w-full border border-b-white-primary rounded-full">
            <thead>
               <tr className="bg-table-head rounded-sm text-center text-white border-2 shadow-[0px_4px_3.2px_0px_#00000040]">
                  {columns.map((column, i) => (
                     <th className={cn('py-2', styles.thStyle)} key={i}>
                        {column.label}
                     </th>
                  ))}
               </tr>
            </thead>

            {loading ? (
               <tbody>
                  <tr className="flex items-center justify-center">
                     <td colSpan={columns.length} className="text-center py-8">
                        <LoaderBottleSvg className="w-12 h-12 animate-spin-slow mx-auto" />
                     </td>
                  </tr>
               </tbody>
            ) : (
               <tbody>
                  {data.map((item, i) => (
                     <tr key={i} className={`${i % 2 === 1 ? 'bg-table-body-primary' : 'bg-background'} w-full`}>
                        {columns.map((column, j) => (
                           <td
                              key={j}
                              className={cn('py-4 px-6 w-1/4', styles.tdStyle)}
                              style={{ width: `${100 / columns.length}%` }}
                           >
                              <>{column.render ? column.render(item) : String(item[column.key])}</>
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            )}
         </table>
      </div>
   )
}

export default GlobalTable

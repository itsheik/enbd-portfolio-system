import React from 'react'

import { SearchSvg } from '../ui/icons/svg-icons'

export default function IconInput() {
   return (
      <div className="w-full relative">
         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchSvg className="text-red-secondary" />
         </span>
         <input
            type="text"
            className="pl-7 pr-4 py-2 w-full rounded-md border border-gray-300  text-gray-800 focus:outline-none"
         />
      </div>
   )
}

'use client'

import { DownChevSvg } from '../ui/icons/svg-icons'

type SelectProps = {
   label?: string
   name: string
   options: { label: string; value: string }[]
   value: string
   onChange: (value: string) => void
}

export default function SelectDropdown({ label, name, options, value, onChange }: SelectProps) {
   return (
      <div className="w-full relative">
         {label && (
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
               {label}
            </label>
         )}
         <select
            id={name}
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="block appearance-none px-4 py-2 w-full rounded-md border border-b-white-primary  focus:border-primary focus:ring-prborder-primary text-sm placeholder:text-b-white-primary"
         >
            {options.map(option => (
               <option key={option.value} value={option.value} className="hover:bg-beige">
                  {option.label}
               </option>
            ))}
         </select>
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-b-white-secondary">
            <DownChevSvg />
         </div>
      </div>
   )
}

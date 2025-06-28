'use client'

import { useField } from 'formik'

type Option = {
   label: string
   value: string
}

type MultiCheckboxProps = {
   name: string
   options: Option[]
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({ name, options }) => {
   const [field, , helpers] = useField<string[]>({ name })

   const toggleOption = (value: string) => {
      const set = new Set(field.value)
      if (set.has(value)) {
         set.delete(value)
      } else {
         set.add(value)
      }
      helpers.setValue(Array.from(set))
   }

   return (
      <div className="space-y-2">
         {options.map(option => {
            const isChecked = field.value.includes(option.value)

            return (
               <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer text-b-white-secondary font-inter"
               >
                  <span
                     onClick={() => toggleOption(option.value)}
                     className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isChecked ? 'bg-primary border-primary' : 'border-gray-400'
                     }`}
                  >
                     {isChecked && <span className="w-1 h-1 bg-table-head rounded-full" />}
                  </span>
                  <span className="text-xs" onClick={() => toggleOption(option.value)}>
                     {option.label}
                  </span>
                  <input
                     type="checkbox"
                     name={name}
                     value={option.value}
                     checked={isChecked}
                     onChange={() => toggleOption(option.value)}
                     className="hidden"
                  />
               </label>
            )
         })}
      </div>
   )
}

export default MultiCheckbox

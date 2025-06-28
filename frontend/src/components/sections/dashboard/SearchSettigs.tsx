'use client'
import React from 'react'
import { useFormik } from 'formik'

import { searchSettingsValidationSchema } from '@/src/lib/utils/validations/dashboard'

import { MButton, Paragraph } from '~/components/ui'
import GlobalHeading from '~/components/ui/Headings/GlobalHeading'

type FormValues = {
   locations: string[] // tell TypeScript it holds strings
}
const SearchSettigs = () => {
   const formik = useFormik<FormValues>({
      initialValues: {
         locations: [],
      },
      validationSchema: searchSettingsValidationSchema,
      onSubmit: values => {
         console.log(values)
      },
   })
   const options = [
      { label: 'Orange County', value: 'orange' },
      { label: 'Los Angeles', value: 'la' },
      { label: 'San Diego', value: 'sd' },
   ]
   
return (
      <div className="flex flex-col gap-4">
         {' '}
         <GlobalHeading title="Search Setting" />
         <li className="list-disc ml-4 text-b-white-secondary text-sm">
            Filter my search result to these warehouse location:
         </li>
         <form onSubmit={formik.handleSubmit}>
            {options.map(option => {
               const isChecked = formik.values.locations.includes(option.value)

               return (
                  <label
                     key={option.value}
                     className="mb-1 flex items-center justify-between cursor-pointer text-b-white-secondary font-inter"
                  >
                     <div className="flex items-center space-x-2">
                        <span
                           className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                              isChecked ? 'bg-primary border-primary' : 'border-gray-400'
                           }`}
                        >
                           {isChecked && <span className="w-1 h-1 bg-table-head rounded-full" />}
                        </span>
                        <span className="text-xs">{option.label}</span>
                     </div>
                     <input
                        type="checkbox"
                        name="locations"
                        value={option.value}
                        checked={isChecked}
                        onChange={() => {
                           const current = formik.values.locations
                           const isAlreadySelected = current.includes(option.value)
                           const nextValues = isAlreadySelected
                              ? current.filter(val => val !== option.value)
                              : [...current, option.value]

                           formik.setFieldValue('locations', nextValues)
                        }}
                        className="hidden"
                     />
                  </label>
               )
            })}

            <MButton className="max-w-max font-light mt-4" type="submit">
               Save Settings
            </MButton>
         </form>
         <Paragraph className="text-b-red-secondary underline font-light">
            Read our shipping FAQ for Details on easy and safe shipping option between warehouses as well as other
            frequently asked question
         </Paragraph>
         <Paragraph className="text-b-red-secondary underline font-light">Return to current auction</Paragraph>
      </div>
   )
}

export default SearchSettigs

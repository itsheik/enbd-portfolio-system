import type React from 'react'

import { cn } from '@/src/lib'

import { LoaderBottleSvg } from './icons/svg-icons'

interface LoaderProps {
   message?: string
   classname?: string
}

const Loader: React.FC<LoaderProps> = ({ message = 'Fetching the finest wines...', classname, ...props }) => {
   return (
      <div className="flex flex-col items-center justify-center gap-4 py-10">
         <div className="w-12 h-12 animate-spin-slow">
            <LoaderBottleSvg className={classname} {...props} />
         </div>
         <p className="text-red-secondary text-sm tracking-wide">{message}</p>
      </div>
   )
}

export default Loader

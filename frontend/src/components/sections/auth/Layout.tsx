import type React from 'react'

import { AuthBanner } from './AuthBanner'

type LayoutProps = {
   children: React.ReactNode
   title: string
}
const AuthLayout = ({ children, title }: LayoutProps) => {
   return (
      <div className="grid grid-cols-[40%_60%] w-full max-w-[1070px] p-5 border-[1px] border-b-white-primary  max-[950px]:grid-cols-2 max-[700px]:grid-cols-1">
         {' '}
         <div className="max-[700px]:hidden">
            <AuthBanner title={title} />
         </div>{' '}
         {children}
      </div>
   )
}

export default AuthLayout

import type React from 'react'
import { type PropsWithChildren } from 'react'

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
   return <section className="text-white bg-beige">{children}</section>
}
export default AuthLayout

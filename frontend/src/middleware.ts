import { type NextRequest, NextResponse } from 'next/server'

import { PAGE_ROUTES } from './constants/page-constants'
import { type IUser } from './store/features/auth/authSlice'

// Configuration
// Configuration for app routes only
export const config = {
   matcher: [
      // Protected routes
      '/user/:path*',

      // Dynamic routes
      // "/admins/:path*",
      // "/influencers/:path*",
      // "/finance/:path*",
      // "/members/:path*",
      // "/admin-settings/:path*",
      // "/medals/:path*",
      // "/courses/:path*",
      // "/podcast/:path*",
      // "/marketing/:path*",
      // "/roles/:path*",
      // "/shop/:path*",

      // Static routes
      // "/packages",

      // Auth routes
      '/auth/:path*',
   ],
}

// CONSTANTS
// not able to access if logged in
const WHITE_LIST = ['/auth/login', '/auth/forgot-password', '/auth/reset-password', '/auth/register']

// can always access even without logging in
const WHITE_LIST_NOT_LOGGED_USER = [
   '/',
   '/auth/login',
   '/auth/forgot-password',
   '/auth/reset-password',
   '/auth/register',
   '/verify',
]

// Helper Functions
const redirectTo = (url: string, req: NextRequest) => {
   return NextResponse.redirect(new URL(url, req.url))
}
// Parse and validate JSON string
const parseString = <T>(val?: string): T | null => {
   if (!val) return null
   try {
      const parsed = JSON.parse(val)

      return parsed as T // Cast to generic type T
   } catch {
      return null
   }
}
const isWhiteListedRoute = (url: string): boolean => {
   return WHITE_LIST.includes(url)
}
const isWhiteListedRoute_NotLogged = (url: string): boolean => {
   return WHITE_LIST_NOT_LOGGED_USER.includes(url)
}

// Handler Functions
const handleUnauthenticatedUser = (req: NextRequest, url: string) => {
   if (!isWhiteListedRoute_NotLogged(url)) {
      console.log('Unauthenticated user accessing protected route')

      return redirectTo(PAGE_ROUTES.AUTH.LOGIN, req)
   }

   return NextResponse.next()
}

const handleAuthenticatedUser = (req: NextRequest, url: string, user: IUser | null) => {
   console.log('inside handleAuthenticatedUser', user, url)

   if (isWhiteListedRoute(url)) {
      console.log('Authenticated user accessing white-listed route')

      return redirectTo(PAGE_ROUTES.ROOT, req)
   }

   return NextResponse.next()
}

// Middleware
export default async function middleware(req: NextRequest) {
   try {
      console.log('inside middleware')
      // Get URL and access token from request information
      const url = req.nextUrl.pathname
      const accessToken = req.cookies.get('access_token')?.value

      const user = parseString(req.cookies.get('user')?.value) as IUser

      // Handle unauthenticated users
      if (!accessToken || !user) {
         console.log('Unauthenticated user accessing protected route')

         return handleUnauthenticatedUser(req, url)
      }

      console.log('Authenticated user accessing protected route')

      return handleAuthenticatedUser(req, url, user)
   } catch (error) {
      console.error('Middleware Error:', error)

      return redirectTo(PAGE_ROUTES.ROOT, req)
   }
}

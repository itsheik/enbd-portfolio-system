import UniversalCookie from 'universal-cookie'

const cookie = new UniversalCookie()

const COOKIE_EXPIRATION_DAYS = 7

export const setAccessTokenCookie = (accessToken: string) => {
   cookie.set('access_token', JSON.stringify(accessToken), {
      path: '/',
      expires: new Date(new Date().getTime() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
      httpOnly: false,
   })
}

export const setUserCookie = <T>(user: T) => {
   cookie.set('user', JSON.stringify(user), {
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
      httpOnly: false,
   })
}

export const getAccessTokenFromCookie = () => {
   return cookie.get('access_token')
}

export const removeAccessTokenCookie = () => {
   cookie.remove('access_token', { path: '/' })
}

export const setRefreshTokenCookie = (refreshToken: string) => {
   cookie.set('refresh_token', refreshToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
   })
}

export const setCartId = (cartId: string) => {
   cookie.set('cartId', cartId, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
   })
}

export const getCartId = () => {
   return cookie.get('cartId')
}

export const getRefreshTokenFromCookie = () => {
   return cookie.get('refresh_token')
}

export const removeCartId = () => {
   cookie.remove('cartId', { path: '/' })
}

export const removeRefreshTokenCookie = () => {
   cookie.remove('refresh_token', { path: '/' })
}

export const removeUserCookie = () => {
   cookie.remove('user', { path: '/' })
}

export const getUserFromCookie = () => {
   return cookie.get('user')
}

export const remove2FACookie = () => {
   cookie.remove('is2FAVerified', { path: '/' })
}

export const set2FACookie = (data: { is2FAVerifiedCookie: boolean }) => {
   cookie.set('is2FAVerified', JSON.stringify(data), {
      path: '/',
      expires: new Date(new Date().getTime() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
      httpOnly: false,
   })
}

// const getUserAccessibleRoutes = (permissions_sources: TUserPermissionsSources, SidebarData: TSideBarData): string[] => {
//    return SidebarData.flatMap(item => {
//       // Check top-level route permissions
//       const routeAccessible = permissions_sources.includes(item.routePermission)
//       const mainRouteUrls = routeAccessible ? [item.url] : []

//       // Check nested routes
//       const nestedRouteUrls = item.list
//          ? item.list
//               .filter(nestedItem => permissions_sources.includes(nestedItem.routePermission))
//               .map(nestedItem => nestedItem.url)
//          : []

//       return [...mainRouteUrls, ...nestedRouteUrls]
//    }).filter(Boolean)
// }

// export const setPermissionsSourcesCookie = (permissions_sources: TUserPermissionsSources) => {
//    let accessibleRoutes = getUserAccessibleRoutes(permissions_sources, SidebarData)

//    cookie.set('permissions_sources', JSON.stringify(accessibleRoutes), {
//       path: '/',
//       expires: new Date(new Date().getTime() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
//       secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
//       httpOnly: false,
//    })
// }

// export const getPermissionsSourcesCookie = () => {
//    return cookie.get('permissions_sources') as TUserPermissionsSources
// }

// export const removePermissionsSourcesCookie = () => {
//    cookie.remove('permissions_sources', { path: '/' })
// }

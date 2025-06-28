export const API_ENDPOINTS = {
   AUTH: {
      LOGIN: '/login',
      REGISTER: '/SignUp',
      FORGET_PASSWORD: '/ForgotPassword',
   },

   TRANSACTION: {
      ROOT: 'transaction',
      HISTORY: 'transaction/history',
   },
   PORTFOLIO: {
      SUMMARY: 'portfolio/summary',
   },
} as const

export type ApiRouteKeys =
   (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS][keyof (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS]]

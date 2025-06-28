export const API_ENDPOINTS = {
   //API_BASE_URL: https://clientweb-api-dev-hee0awa2f9e0cjep.westus-01.azurewebsites.net/api/
   //API DOUCMENT: https://docs.google.com/document/u/0/d/19PkTCzd4Ru7k_vEcd-r0gYM-McOc_AVkRsv3MTfVDW4/mobilebasic
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

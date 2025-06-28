'use client'

//REDUX-TOOLKIT
import { Provider as ReduxProvider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'
import dynamic from 'next/dynamic'
// REDUX-PERSIST
import type { Persistor } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '../lib'

interface ProviderProp {
   children: React.ReactNode
}

// Loading component for PersistGate
const PersistLoading = () => (
   <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
   </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StoreProvider({ children }: ProviderProp): any {
   return (
      <ReduxProvider store={store}>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
            toastStyle={{
               border: '2px solid #fafafa40',
               backgroundColor: '#530000',
            }}
         />
         <PersistGate loading={<PersistLoading />} persistor={persistor as Persistor}>
            {children}
         </PersistGate>
      </ReduxProvider>
   )
}

const DynamicGlobalProvider = dynamic(() => Promise.resolve(StoreProvider), {
   ssr: false,
})

export default DynamicGlobalProvider

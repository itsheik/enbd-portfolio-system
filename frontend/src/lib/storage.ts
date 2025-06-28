'use client'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
   return {
      getItem(_key: string) {
         return Promise.resolve(null)
      },
      setItem(_key: string, value: string) {
         return Promise.resolve(value)
      },
      removeItem(_key: string) {
         return Promise.resolve()
      },
   }
}

// Function to check available storage space
const getAvailableStorageSpace = () => {
   if (typeof window === 'undefined') {
      return 0
   }
   
   try {
      const testKey = '__storage_test__'
      const testValue = 'x'.repeat(1024 * 1024) // 1MB test
      let availableSpace = 0
      
      // Try to store increasingly larger chunks until we hit the limit
      for (let i = 0; i < 50; i++) { // Max 50MB test
         try {
            localStorage.setItem(testKey + i, testValue)
            availableSpace += 1024 * 1024
         } catch (e) {
            break
         }
      }
      
      // Clean up test data
      for (let i = 0; i < 50; i++) {
         try {
            localStorage.removeItem(testKey + i)
         } catch (e) {
            // Ignore cleanup errors
         }
      }
      
      return availableSpace
   } catch (e) {
      return 0
   }
}

// Function to clean up old data when storage is full
const cleanupStorage = () => {
   if (typeof window === 'undefined') {
      return
   }
   
   try {
      const keys = Object.keys(localStorage)
      const persistKeys = keys.filter(key => key.startsWith('persist:'))
      
      // Remove old persist data if storage is getting full
      if (persistKeys.length > 0) {
         // Keep only the most recent persist data
         const sortedKeys = persistKeys.sort((a, b) => {
            const aTime = localStorage.getItem(a + '_timestamp') || '0'
            const bTime = localStorage.getItem(b + '_timestamp') || '0'
            
            return parseInt(bTime) - parseInt(aTime)
         })
         
         // Remove older persist data (keep only the latest 2)
         for (let i = 2; i < sortedKeys.length; i++) {
            localStorage.removeItem(sortedKeys[i])
            localStorage.removeItem(sortedKeys[i] + '_timestamp')
         }
      }
   } catch (e) {
      console.warn('Failed to cleanup storage:', e)
   }
}

const storage = (() => {
   // Check if we're in a browser environment
   if (typeof window === 'undefined') {
      return createNoopStorage()
   }

   // Check if localStorage is available and accessible
   try {
      const testKey = '__redux_persist_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)

      // Check available storage space
      const availableSpace = getAvailableStorageSpace()
      if (availableSpace < 1024 * 1024) { // Less than 1MB available
         console.warn('Low storage space detected, cleaning up old data...')
         cleanupStorage()
      }

      return createWebStorage('local')
   } catch (error) {
      console.warn('Failed to create web storage, falling back to noop storage:', error)

      return createNoopStorage()
   }
})()

export default storage

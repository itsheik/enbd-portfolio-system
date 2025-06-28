/** @format */

import initializeBundleAnalyzer from '@next/bundle-analyzer'
import { type NextConfig } from 'next'
import { fileURLToPath } from 'node:url'

const withBundleAnalyzer = initializeBundleAnalyzer({
   enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true',
})

async function createNextConfig(): Promise<NextConfig> {
   const { createJiti } = await import('jiti')
   const jiti = createJiti(fileURLToPath(import.meta.url))

   await jiti.import('./src/constants/env.ts')

   return {
      devIndicators: false,
      experimental: {
         optimizePackageImports: ['react-icons/*', 'lodash', '@mantine/core', '@mantine/hooks'],
         // typedRoutes: true,
      },
      images: {
         remotePatterns: [
            {
               protocol: 'https',
               hostname: 'spectrumwine.blob.core.windows.net',
            },
            {
               protocol: 'https',
               hostname: 'ssl.spectrumwine.com',
            },
         ],
      },
   }
}

export default (async () => withBundleAnalyzer(await createNextConfig()))()

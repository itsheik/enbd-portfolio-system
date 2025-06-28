import { Gilda_Display, Inter, Podkova } from 'next/font/google'

export const gildaDisplayFont = Gilda_Display({
   subsets: ['latin'],
   variable: '--font-gilda-display',
   weight: ['400'],
})

export const interFont = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
   weight: ['300', '400', '500', '600', '700'],
})

export const podkovaFont = Podkova({
   subsets: ['latin'],
   variable: '--font-podkova',
   weight: ['400', '500', '600'],
   display: 'swap',
})

export const appFonts = [gildaDisplayFont.variable, interFont.variable, podkovaFont.variable]

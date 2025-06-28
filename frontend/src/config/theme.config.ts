import { createTheme, type DefaultMantineColor, type MantineColorsTuple, type MantineTheme } from '@mantine/core'
import type { PartialDeep } from 'type-fest'

import { interFont } from '~/components/ui/fonts'

const colors:
   | PartialDeep<
        Record<DefaultMantineColor, MantineColorsTuple>,
        {
           recurseIntoArrays: false
           allowUndefinedInNonTupleArrays: true
        }
     >
   | undefined = {
   primary: [
      'oklch(0.53 0.14 28.5)' /* #8a3d2b */,
      'oklch(0.47 0.13 28.5)' /* #7a3424 */,
      'oklch(0.41 0.12 28.5)' /* #6b2c1e */,
      'oklch(0.36 0.11 28.5)' /* #5c2418 */,
      'oklch(0.31 0.10 28.5)' /* #4d1d13 */,
      'oklch(0.27 0.09 28.5)' /* #3f160e */,
      'oklch(0.21 0.07 28.5)' /* #320814 */,
      'oklch(0.18 0.06 28.5)' /* #29060f */,
      'oklch(0.14 0.05 28.5)' /* #1f040b */,
      'oklch(0.10 0.04 28.5)' /* #140207 */,
   ],
}

export const theme: PartialDeep<
   MantineTheme,
   {
      recurseIntoArrays: false
      allowUndefinedInNonTupleArrays: true
   }
> = createTheme({
   colors,
   fontFamily: interFont.style.fontFamily,
   primaryColor: 'primary',
   primaryShade: 6,

   breakpoints: {
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
   },
})

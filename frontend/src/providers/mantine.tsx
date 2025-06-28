import { type PropsWithChildren } from 'react'
import { MantineProvider } from '@mantine/core'

import { theme } from '~/config'

export default function MantineThemeProvider({ children }: PropsWithChildren) {
   return <MantineProvider theme={theme}>{children}</MantineProvider>
}

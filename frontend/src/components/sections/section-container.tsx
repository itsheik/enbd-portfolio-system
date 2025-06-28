import { type FC } from 'react'
import { Container, type ContainerProps } from '@mantine/core'

import { cn } from '~/lib'

export const SectionContainer: FC<ContainerProps> = ({ children, className, ...props }) => {
   return (
      <Container className={cn('max-w-8xl px-10 md:px-8 mx-auto', className)} {...props}>
         {children}
      </Container>
   )
}

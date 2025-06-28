import { type FC, type PropsWithChildren } from 'react'
import {
   type BoxProps,
   type ElementProps,
   type MantineColor,
   type MantineGradient,
   type MantineSize,
   type StylesApiProps,
   Text,
   type TextFactory,
   Title,
   type TitleFactory,
   type TitleOrder,
   type TitleSize,
} from '@mantine/core'

import { cn } from '~/lib'

type TextTruncate = 'end' | 'start' | boolean

type ParagraphProps = BoxProps &
   StylesApiProps<TextFactory> & {
      __staticSelector?: string
      /** Controls `font-size` and `line-height`, `'md'` by default */
      size?: MantineSize | (string & {})
      /** Number of lines after which Text will be truncated */
      lineClamp?: number
      /** Side on which Text must be truncated, if `true`, text is truncated from the start */
      truncate?: TextTruncate
      /** Sets `line-height` to 1 for centering, `false` by default */
      inline?: boolean
      /** Determines whether font properties should be inherited from the parent, `false` by default */
      inherit?: boolean
      /** Gradient configuration, ignored when `variant` is not `gradient`, `theme.defaultGradient` by default */
      gradient?: MantineGradient
      /** Shorthand for `component="span"`, `false` by default, default root element is `p` */
      span?: boolean
      /** @deprecated Use `c` prop instead */
      color?: MantineColor
   } // https://mantine.dev/core/text/

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({ children, className, ...props }) => {
   return (
      <Text component="p" className={cn('leading-relaxed text-pretty text-black text-base ', className)} {...props}>
         {children}
      </Text>
   )
}

type HeadingProps = BoxProps &
   StylesApiProps<TitleFactory> &
   ElementProps<'h1', 'color'> & {
      /** Determines which tag will be used (h1-h6), controls `font-size` style if `size` prop is not set, `1` by default */
      order?: TitleOrder
      /** Changes title size, if not set, then size is controlled by `order` prop */
      size?: TitleSize
      /** Number of lines after which Text will be truncated */
      lineClamp?: number
      /** Controls `text-wrap` property, `'wrap'` by default */
      textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
   } // https://mantine.dev/core/title/

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({ children, className, ...props }) => {
   return (
      <Title textWrap="balance" order={3} {...props} className={cn('font-gilda-display', className)}>
         {children}
      </Title>
   )
}

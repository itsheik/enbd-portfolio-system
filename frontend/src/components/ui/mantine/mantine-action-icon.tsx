import { type FC, type PropsWithChildren } from 'react'
import {
   ActionIcon,
   type ActionIconFactory,
   type BoxProps,
   type LoaderProps,
   type MantineColor,
   type MantineGradient,
   type MantineRadius,
   type MantineSize,
   type StylesApiProps,
} from '@mantine/core'

export interface ActionIconProps extends BoxProps, StylesApiProps<ActionIconFactory> {
   'data-disabled'?: boolean
   __staticSelector?: string
   /** Determines whether `Loader` component should be displayed instead of the `children`, `false` by default */
   loading?: boolean
   /** Props added to the `Loader` component (only visible when `loading` prop is set) */
   loaderProps?: LoaderProps
   /** Controls width and height of the button. Numbers are converted to rem. `'md'` by default. */
   size?: MantineSize | `input-${MantineSize}` | (string & {}) | number
   /** Key of `theme.colors` or any valid CSS color. Default value is `theme.primaryColor`.  */
   color?: MantineColor
   /** Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. `theme.defaultRadius` by default. */
   radius?: MantineRadius
   /** Gradient data used when `variant="gradient"`, default value is `theme.defaultGradient` */
   gradient?: MantineGradient
   /** Sets `disabled` and `data-disabled` attributes on the button element */
   disabled?: boolean
   /** Icon displayed inside the button */
   children?: React.ReactNode
   /** Determines whether button text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
   autoContrast?: boolean
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// https://mantine.dev/core/action-icon/
export const MActionIcon: FC<PropsWithChildren<ActionIconProps>> = ({ children, ...props }) => {
   return <ActionIcon {...props}>{children}</ActionIcon>
}

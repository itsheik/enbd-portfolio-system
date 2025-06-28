import { Skeleton } from '@mantine/core'

type Props = {
   height?: string
   mb?: string
   width?: string
   radius?: string
   variant?: string
   color?: string
   className?: string
}
export const GlobalSkeleton = ({ height, mb, width, radius, variant, color, className }: Props) => {
   return <Skeleton color='blue.5' height={height || 50} mb={mb} />
}

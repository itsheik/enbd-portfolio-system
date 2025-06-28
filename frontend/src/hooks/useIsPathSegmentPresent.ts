import { usePathname } from 'next/navigation'

export function useIsPathSegmentPresent(segment: string): boolean {
   const pathname = usePathname() || ''
   
return pathname.toLowerCase().split('/').includes(segment.toLowerCase())
}

import { type MCarouselProps } from '~/components/ui'

export const wineCarouselProps: MCarouselProps = {
   slideSize: { base: '100%', '330px': '50%', '500px': '33.333333%', '48rem': '25%', '64rem': '20%' },
   slideGap: { base: 'xs', '48rem': 'md', '64rem': 'lg' },
   slidesToScroll: 4,
   withControls: false,
   withIndicators: true,
}

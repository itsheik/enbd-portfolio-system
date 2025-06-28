'use client'
import { type FC, type PropsWithChildren, useRef } from 'react'
import { Carousel, type CarouselStylesNames } from '@mantine/carousel'
import { type ElementProps, type MantineSpacing, type StyleProp } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import dynamic from 'next/dynamic'
import { type PartialDeep } from 'type-fest'

export type MCarouselProps = PropsWithChildren<{
   /** Autoplay Delay time between slide */
   delay?: number
   /** Need Carousel Autoplay or not */
   autoPlay?: boolean

   /** Called when next slide is shown */
   onNextSlide?: () => void
   /** Called when previous slider is shown */
   onPreviousSlide?: () => void
   /** Called with slide index when slide changes */
   onSlideChange?: (index: number) => void
   /** Props passed down to next control */
   nextControlProps?: React.ComponentPropsWithoutRef<'button'>
   /** Props passed down to previous control */
   previousControlProps?: React.ComponentPropsWithoutRef<'button'>
   /** Controls size of the next and previous controls, `26` by default */
   controlSize?: React.CSSProperties['width']
   /** Controls position of the next and previous controls, key of `theme.spacing` or any valid CSS value, `'sm'` by default */
   controlsOffset?: MantineSpacing
   /** Controls slide width based on viewport width, `'100%'` by default */
   slideSize?: StyleProp<string | number>
   /** Key of theme.spacing or number to set gap between slides */
   slideGap?: StyleProp<MantineSpacing>
   /** Carousel orientation, `'horizontal'` by default */
   orientation?: 'horizontal' | 'vertical'
   /** Determines type of queries used for responsive styles, `'media'` by default */
   type?: 'media' | 'container'
   /** Slides container `height`, required for vertical orientation */
   height?: React.CSSProperties['height']
   /** Determines how slides will be aligned relative to the container. Use number between 0-1 to align slides based on percentage, where 0.5 is 50%, `'center'` by default */
   align?: 'start' | 'center' | 'end' | number
   /** Number of slides that will be scrolled with next/previous buttons, `1` by default */
   slidesToScroll?: number | 'auto'
   /** Determines whether gap between slides should be treated as part of the slide size, `true` by default */
   includeGapInSize?: boolean
   /** Determines whether the carousel can be scrolled with mouse and touch interactions, `true` by default */
   draggable?: boolean
   /** Determines whether momentum scrolling should be enabled, `false` by default */
   dragFree?: boolean
   /** Enables infinite looping. `true` by default, automatically falls back to `false` if slide content isn't enough to loop. */
   loop?: boolean
   /** Adjusts scroll speed when triggered by any of the methods. Higher numbers enables faster scrolling. */
   speed?: number
   /** Index of initial slide */
   initialSlide?: number
   /** Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. For example, 0.5 equals 50%. */
   inViewThreshold?: number
   /** Determines whether next/previous controls should be displayed, true by default */
   withControls?: boolean
   /** Determines whether indicators should be displayed, `false` by default */
   withIndicators?: boolean
   /** Icon of the next control */
   nextControlIcon?: React.ReactNode
   /** Icon of the previous control */
   previousControlIcon?: React.ReactNode
   /** Allow the carousel to skip scroll snaps if it is dragged vigorously. Note that this option will be ignored if the dragFree option is set to `true`, `false` by default */
   skipSnaps?: boolean
   /** Clear leading and trailing empty space that causes excessive scrolling. Use `trimSnaps` to only use snap points that trigger scrolling or keepSnaps to keep them. */
   containScroll?: 'trimSnaps' | 'keepSnaps' | ''
   /** Determines whether arrow key should switch slides, `true` by default */
   withKeyboardEvents?: boolean
   /** Theme Styles */
   classNames?: PartialDeep<Record<CarouselStylesNames, string>>
}> // https://mantine.dev/x/carousel/?t=props

export const MCarousel: FC<MCarouselProps> = ({ children, delay = 2000, autoPlay = true, classNames, ...props }) => {
   const autoplay = useRef(Autoplay({ delay, active: autoPlay }))

   const styles = {
      carousel: { indicator: 'w-7! h-2.5! data-[active]:w-10!', indicators: '-bottom-13! p-2' },
   }

   if (props.orientation === 'vertical') {
      styles.carousel.indicator = 'w-[6px]! h-[20px]! data-[active]:w-[6px]!'
      styles.carousel.indicators = 'right-0'
   }

   return (
      <div className="flex opacity-100">
         <Carousel
            align="start"
            type="container"
            loop
            dragFree
            height="100%"
            slideSize={{
               base: '100%', // default
               sm: '90%', // min-width: 36em
               md: '80%', // min-width: 48em
               lg: '70%',
            }}
            slideGap={{
               base: 'md',
               sm: 'lg',
            }}
            {...props}
            className="flex-1"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            classNames={{
               indicators: styles.carousel.indicators,
               indicator:
                  'border-2 border-primary rounded-[2px]! ease-in-out duration-500 transition-all bg-secondary! opacity-100! data-[active]:bg-primary! ' +
                  styles.carousel.indicator,
               ...classNames,
            }}
         >
            {children}
         </Carousel>
      </div>
   )
}

export const MCarouselSlide: FC<PropsWithChildren<ElementProps<'div'>>> = ({ children, ...props }) => {
   return <Carousel.Slide {...props}>{children}</Carousel.Slide>
}

export const DynamicMCarousel = dynamic(() => Promise.resolve(MCarousel), {
   ssr: false,
})

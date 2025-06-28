import { cn } from '~/lib'

type Props = {
   className?: string
   title: string
}

const GlobalHeading = (props: Props) => {
   return <h1 className={cn('text-red-secondary text-4xl font-gilda-display font-normal tracking-[-2%]', props.className)}>{props.title}</h1>
}

export default GlobalHeading

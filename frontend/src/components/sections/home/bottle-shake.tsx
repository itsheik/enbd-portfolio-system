import Image from 'next/image'

import BottleImage from '~/assets/images/bottle-shake.png'

export const BottleShake = () => {
   return (
      <section aria-label="wine bottles" className="flex items-center justify-center">
         <Image src={BottleImage} alt="Bottle Shake" placeholder="blur" />
      </section>
   )
}

'use client'
import { useEffect, useState } from 'react'
import { differenceInSeconds, intervalToDuration } from 'date-fns'

import { LISTING_TIME } from '@/src/constants/dummyData'

import { TimeBoxCard } from '../../cards/TimeBox'
import { Paragraph } from '../../ui'

interface CountdownTimerProps {
   dateOfAuction: string // ISO 8601 date string
   setIsAuctionEnded?: (val: boolean) => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ dateOfAuction, setIsAuctionEnded }) => {
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hrs: 0,
      mins: 0,
      sec: 0,
      hasEnded: false,
   })

   useEffect(() => {
      let intervalId: NodeJS.Timeout | null = null

      const calculateTimeLeft = () => {
         const now = new Date()
         const auctionDate = new Date(dateOfAuction)

         // Calculate the difference in seconds between now and the auction date
         const secondsDifference = differenceInSeconds(auctionDate, now)

         if (secondsDifference > 0) {
            // Convert the difference into a duration object
            const duration = intervalToDuration({ start: now, end: auctionDate })

            // Extract days, hours, minutes, and seconds
            const days = duration.days || 0
            const hrs = duration.hours || 0
            const mins = duration.minutes || 0
            const sec = duration.seconds || 0

            // Update state only if there's a meaningful change
            setTimeLeft(prev =>
               prev.days === days && prev.hrs === hrs && prev.mins === mins && prev.sec === sec
                  ? prev // Avoid unnecessary re-renders
                  : { days, hrs, mins, sec, hasEnded: false },
            )
         } else {
            // Auction has ended
            if (intervalId) clearInterval(intervalId)
            setTimeLeft({ days: 0, hrs: 0, mins: 0, sec: 0, hasEnded: true })
         }
      }

      // Initial calculation
      calculateTimeLeft()

      // Set up the interval
      intervalId = setInterval(calculateTimeLeft, 1000)

      // Cleanup the interval on component unmount
      return () => {
         if (intervalId) clearInterval(intervalId)
      }
   }, [dateOfAuction])

   useEffect(() => {
      if (timeLeft.hasEnded) {
         if (setIsAuctionEnded) {
            setIsAuctionEnded(true)
         }
      }
   }, [timeLeft.hasEnded])

   if (timeLeft.hasEnded) {
      return <div className="text-red-500">Auction has ended!</div>
   }

   return (
      <>
         <Paragraph>Time Left To Bid</Paragraph>
         <div className="flex gap-1">
            {LISTING_TIME.map((item, i) => (
               <TimeBoxCard
                  key={i}
                  data={{
                     ...item,
                     number: timeLeft[item.info as keyof typeof timeLeft].toString(),
                  }}
               />
            ))}
         </div>
      </>
   )
}

export default CountdownTimer

import { useEffect, useState } from 'react'

type TimeUnit = {
   number: string
   info: string
}

const defaultTime = (): TimeUnit[] => [
   { number: '0', info: 'Days' },
   { number: '0', info: 'HRS' },
   { number: '0', info: 'MINS' },
   { number: '0', info: 'SEC' },
]

function parseLooseDate(input: string): Date | null {
   // Ensure consistent parsing by using 24-hour format
   const fixed = input.replace(/(\d{1,2}):(\d{2})(AM|PM)/, (_, h, m, period) => {
      let hour = parseInt(h)
      if (period === 'PM' && hour !== 12) hour += 12
      if (period === 'AM' && hour === 12) hour = 0
      return `${hour.toString().padStart(2, '0')}:${m}`
   })
   const date = new Date(fixed)
   return isNaN(date.getTime()) ? null : date
}

export const useTimeLeft = (endTimeString?: string): TimeUnit[] => {
   const calculateTimeLeft = (): TimeUnit[] => {
      if (!endTimeString) return defaultTime()

      const endTime = parseLooseDate(endTimeString)
      if (!endTime) return defaultTime()

      const now = new Date()
      let diff = endTime.getTime() - now.getTime()

      if (diff <= 0) return defaultTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff %= 1000 * 60 * 60 * 24

      const hours = Math.floor(diff / (1000 * 60 * 60))
      diff %= 1000 * 60 * 60

      const minutes = Math.floor(diff / (1000 * 60))
      diff %= 1000 * 60

      const seconds = Math.floor(diff / 1000)

      return [
         { number: days.toString(), info: 'Days' },
         { number: hours.toString(), info: 'HRS' },
         { number: minutes.toString(), info: 'MINS' },
         { number: seconds.toString(), info: 'SEC' },
      ]
   }

   const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(calculateTimeLeft())

   useEffect(() => {
      const interval = setInterval(() => {
         setTimeLeft(calculateTimeLeft())
      }, 1000)

      return () => clearInterval(interval)
   }, [endTimeString])

   return timeLeft
}

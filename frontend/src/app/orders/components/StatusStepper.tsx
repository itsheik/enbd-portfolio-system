/* app/order-entry/components/StatusStepper.tsx
   ------------------------------------------------ */
   import React, { memo } from "react";
   import { DoubleTickSvg, CloseSvg } from "~/components/ui/icons/svg-icons";
   import { OrderStatus } from "../lib/trade.service";
   
   /* --- visual palette for each state --------------------------------------- */
   const STATUS_COLOR: Record<OrderStatus, string> = {
     Submitted:  "bg-blue-500",
     Executed:   "bg-yellow-500",
     Completed:  "bg-green-600",
     Cancelled:  "bg-gray-400",
     Failed:     "bg-red-600"
   };
   
   /* --- component ----------------------------------------------------------- */
   interface Props {
     steps: OrderStatus[];
   }
   
   const StatusStepper = memo<Props>(({ steps }) => {
     /* guard: render nothing if array is empty / undefined */
     if (!Array.isArray(steps) || steps.length === 0) return null;
   
     return (
       <ol className="flex flex-wrap items-center gap-2">
         {steps.map((status, idx) => {
           /* fallback tone in case a new status is introduced */
           const bgTone = STATUS_COLOR[status] ?? "bg-gray-300";
   
           return (
             <li key={`${status}-${idx}`} className="flex items-center">
               <span
                 className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${bgTone}`}
               >
                 {status === "Completed" ? (
                   <DoubleTickSvg className="h-5 w-5" />
                 ) : status === "Failed" ? (
                   <CloseSvg className="h-5 w-5" />
                 ) : (
                   idx + 1
                 )}
               </span>
   
               <span className="ml-1 text-sm">{status}</span>
   
               {idx < steps.length - 1 && <span className="mx-2">→</span>}
             </li>
           );
         })}
       </ol>
     );
   });
   
   StatusStepper.displayName = "StatusStepper";
   export default StatusStepper;
   
import { z } from "zod";
import { listFunds } from "./lib/trade.service";

export const orderSchema = z.object({
  fundId: z
    .string()
    .refine((id) => listFunds().some((f) => f.id === id), {
      message: "Invalid Security Name"
    }),
  transactionType: z.enum(["Buy", "Sell"], {
    errorMap: () => ({ message: "Invalid Transaction Type" })
  }),
  quantity: z
    .number({ invalid_type_error: "Invalid Quantity" })
    .int("Invalid Quantity")
    .positive("Invalid Quantity")
});
export type OrderFormData = z.infer<typeof orderSchema>;

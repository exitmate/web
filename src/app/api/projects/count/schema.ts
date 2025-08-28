import { z } from 'zod'
import { DataResponseSchema } from '../../schema'

export const AppliableProjectCountResponseSchema = DataResponseSchema(
  z.object({
    myAppliableCount: z.number(),
    todayAppliableCount: z.number(),
  }),
)

export type AppliableProjectCountResponse = z.infer<
  typeof AppliableProjectCountResponseSchema
>

import { z } from 'zod'
import { DataResponseSchema } from '../../schema'

export const GetAppliableProjectCountResponseSchema = DataResponseSchema(
  z.object({
    count: z.number(),
  }),
)

export type GetAppliableProjectCountResponse = z.infer<
  typeof GetAppliableProjectCountResponseSchema
>

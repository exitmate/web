import { SupportProjectSchema } from '@/generated/zod'
import z from 'zod'
import { DataResponseSchema } from '../../schema'

export const IsAppliableRequestSchema = SupportProjectSchema.pick({
  id: true,
})

export type IsAppliableRequest = z.infer<typeof IsAppliableRequestSchema>

export const IsAppliableResponseSchema = DataResponseSchema(
  z.object({
    isAppliable: z.boolean(),
  }),
)

export type IsAppliableResponse = z.infer<typeof IsAppliableResponseSchema>

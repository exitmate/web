import {
  ApplicationTypeSchema,
  ServiceTypeSchema,
  SupportProjectSchema,
} from '@/generated/zod'
import { z } from 'zod'
import { PaginatedDataResponseSchema, PaginationRequestSchema } from '../schema'

export const ProjectSearchSchema = PaginationRequestSchema.extend({
  applicationType: ApplicationTypeSchema.optional(),
  serviceType: ServiceTypeSchema.optional(),
  maxAmountRange: z
    .enum(['under_100', '100_to_300', '300_to_500', 'above_500'])
    .optional(),
  isOpen: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .optional(),
  appliableOnly: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .optional(),
})

export type ProjectSearchParams = z.infer<typeof ProjectSearchSchema>

export const ProjectResponseSchema = PaginatedDataResponseSchema(
  z.array(SupportProjectSchema),
)

export type ProjectResponse = z.infer<typeof ProjectResponseSchema>

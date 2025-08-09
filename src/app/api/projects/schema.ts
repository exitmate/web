import {
  ApplicationTypeSchema,
  ServiceTypeSchema,
  SupportProjectSchema,
} from '@/generated/zod'
import { z } from 'zod'
import { PaginationRequestSchema, PaginationSchema } from '../schema'

export const ProjectSearchSchema = PaginationRequestSchema.extend({
  applicationType: ApplicationTypeSchema.optional(),
  serviceType: ServiceTypeSchema.optional(),
  isOpen: z.coerce.boolean().default(true),
})

export type ProjectSearchParams = z.infer<typeof ProjectSearchSchema>

export const ProjectResponseSchema = z.object({
  data: z.array(SupportProjectSchema),
  pagination: PaginationSchema,
  filters: z.object({
    applicationType: ApplicationTypeSchema.nullable(),
    serviceType: ServiceTypeSchema.nullable(),
    isOpen: z.boolean().nullable(),
  }),
})

export type ProjectResponse = z.infer<typeof ProjectResponseSchema>

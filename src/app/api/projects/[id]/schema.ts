import { z } from 'zod'
import { SupportProjectSchema } from '@/generated/zod'
import { DataResponseSchema } from '../../schema'

export const ProjectDetailRequestSchema = z.object({
  id: z.uuid('올바르지 않은 ID 형식입니다.'),
})

export type SupportProjectDetailsRequest = z.infer<
  typeof ProjectDetailRequestSchema
>

export const ProjectDetailResponseSchema =
  DataResponseSchema(SupportProjectSchema)

export type ProjectDetailResponse = z.infer<typeof ProjectDetailResponseSchema>

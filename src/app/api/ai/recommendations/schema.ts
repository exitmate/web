import { z } from 'zod'
import { DataResponseSchema } from '../../schema'
import { SupportProjectSchema } from '@/generated/zod'

export const RecommendationBridgeResponseSchema = z.object({
  business_id: z.string().optional(),
  recommended_policy_ids: z.array(z.string()),
})

export type RecommendationBridgeResponse = z.infer<
  typeof RecommendationBridgeResponseSchema
>

export const RecommendationResponseSchema = DataResponseSchema(
  z.object({
    recommendedProjects: z.array(SupportProjectSchema),
  }),
)

export type RecommendationResponse = z.infer<
  typeof RecommendationResponseSchema
>

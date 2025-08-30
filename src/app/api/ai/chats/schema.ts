import { z } from 'zod'
import { DataResponseSchema } from '../../schema'
import { ChatbotSessionSchema } from '@/generated/zod'

export const ChatbotRequestSchema = z.object({
  question: z.string().min(1, '질문을 입력해주세요.'),
  chatbotSessionId: z.string().optional(),
})

export type ChatbotRequest = z.infer<typeof ChatbotRequestSchema>

export const ChatBridgeResponseSchema = z.object({
  answer: z.string(),
})

export type ChatBridgeResponse = z.infer<typeof ChatBridgeResponseSchema>

export const ChatbotResponseSchema = DataResponseSchema(
  z.object({
    answer: z.string(),
    chatbotSessionId: z.string(),
  }),
)

export type ChatbotResponse = z.infer<typeof ChatbotResponseSchema>

export const ChatbotSessionListResponseSchema = DataResponseSchema(
  z.array(ChatbotSessionSchema),
)
export type ChatbotSessionListResponse = z.infer<
  typeof ChatbotSessionListResponseSchema
>

export const ChatbotSessionDetailResponseSchema =
  DataResponseSchema(ChatbotSessionSchema)
export type ChatbotSessionDetailResponse = z.infer<
  typeof ChatbotSessionDetailResponseSchema
>

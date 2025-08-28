import { z } from 'zod'
import { DataResponseSchema } from '../../schema'

export const ChatRequestSchema = z.object({
  question: z.string().min(1, '질문을 입력해주세요.'),
})

export type ChatRequest = z.infer<typeof ChatRequestSchema>

export const ChatBridgeResponseSchema = z.object({
  answer: z.string(),
})

export type ChatBridgeResponse = z.infer<typeof ChatBridgeResponseSchema>

export const ChatResponseSchema = DataResponseSchema(
  z.object({
    answer: z.string(),
  }),
)

export type ChatResponse = z.infer<typeof ChatResponseSchema>

import { MemberSchema } from '@/generated/zod'
import z from 'zod'
import { DataResponseSchema } from '../schema'

export const MemberInfoInputResponseSchema = DataResponseSchema(MemberSchema)

export type MemberInfoInputResponse = z.infer<
  typeof MemberInfoInputResponseSchema
>

export const MemberInfoInputSchema = MemberSchema.pick({
  name: true,
  email: true,
  birthDate: true,
  gender: true,
  agreedPrivacyPolicy: true,
  agreedTermsOfUse: true,
  agreedDataUsage: true,
  agreedMarketing: true,
}).extend({
  agreedPrivacyPolicy: z.coerce.boolean().pipe(z.literal(true)),
  agreedTermsOfUse: z.coerce.boolean().pipe(z.literal(true)),
  agreedDataUsage: z.coerce.boolean().pipe(z.literal(true)),
  agreedMarketing: z.coerce.boolean().default(false),
  birthDate: z.coerce
    .date()
    .min(new Date('1910-01-01'))
    .max(
      new Date(
        new Date().getFullYear() - 19,
        new Date().getMonth(),
        new Date().getDate(),
      ),
    ),
})

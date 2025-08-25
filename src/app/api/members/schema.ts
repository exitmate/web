import { MemberSchema } from '@/generated/zod'
import z from 'zod'
import { DataResponseSchema } from '../schema'

export const MyInfoResponseSchema = DataResponseSchema(
  MemberSchema.omit({
    id: true,
    kakaoClientId: true,
  }),
)

export type MyInfoResponse = z.infer<typeof MyInfoResponseSchema>

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
  agreedPrivacyPolicy: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .pipe(z.literal(true)),
  agreedTermsOfUse: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .pipe(z.literal(true)),
  agreedDataUsage: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .pipe(z.literal(true)),
  agreedMarketing: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .default(false),
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

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
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    error: '성별을 선택해주세요.',
  }),
  agreedPrivacyPolicy: z.coerce.boolean().refine((v) => v === true, {
    message: '개인정보 처리방침 동의는 필수입니다.',
  }),
  agreedTermsOfUse: z.coerce.boolean().refine((v) => v === true, {
    message: '이용약관 동의는 필수입니다.',
  }),
  agreedDataUsage: z.coerce.boolean().refine((v) => v === true, {
    message: '데이터 활용 동의는 필수입니다.',
  }),
  agreedMarketing: z.coerce.boolean().default(false),
  birthDate: z.coerce
    .date('생년월일을 입력해주세요')
    .min(new Date('1910-01-01'), '올바른 생년월일을 입력해주세요.')
    .max(
      new Date(
        new Date().getFullYear() - 19,
        new Date().getMonth(),
        new Date().getDate(),
      ),
      '올바른 생년월일을 입력해주세요.',
    ),
})

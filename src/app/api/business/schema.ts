import { BusinessInfoSchema } from '@/generated/zod'
import z from 'zod'
import { DataResponseSchema } from '../schema'

export const BusinessInfoInputResponseSchema =
  DataResponseSchema(BusinessInfoSchema)

export type BusinessInfoInputResponse = z.infer<
  typeof BusinessInfoInputResponseSchema
>

export const BusinessInfoInputSchema = BusinessInfoSchema.pick({
  region: true,
  industryCategory: true,
  industryDetail: true,
  openedAt: true,
  isClosed: true,
  closedAt: true,
  isReemployed: true,
  isDemolished: true,
  monthlySalesRange: true,
  areaSizeM2: true,
  employeeCount: true,
  leaseType: true,
  depositAmount: true,
  monthlyRent: true,
})
  .extend({
    openedAt: z.coerce.date(),
    closedAt: z.coerce.date().nullable(),
    isClosed: z.preprocess((v) => v === 'true' || v === true, z.boolean()),
    isReemployed: z.preprocess((v) => v === 'true' || v === true, z.boolean()).nullable(),
    isDemolished: z.preprocess((v) => v === 'true' || v === true, z.boolean()).nullable(),
    areaSizeM2: z.coerce.number().positive(),
    employeeCount: z.coerce.number().int().positive(),
    depositAmount: z.coerce.number().int().positive().nullable(),
    monthlyRent: z.coerce.number().int().positive().nullable(),
  })
  .refine(
    (data) => {
      if (data.isClosed === false) {
        return (
          data.closedAt == null && 
          data.isReemployed == null &&
          data.isDemolished == null
        )
      }
      return true;
    },
    {
      message: '폐업 상태가 아닐 때는 폐업 관련 정보를 입력할 수 없습니다',
      path: ['isClosed'],
    }
  )
  .refine(
    (data) => {
      // 개업일이 폐업일보다 이전이어야 함
      if (data.isClosed && data.closedAt) {
        return data.openedAt < data.closedAt
      }
      return true
    },
    {
      message: '개업일은 폐업일보다 이전이어야 합니다',
      path: ['closedAt'],
    },
  )
  .refine(
    (data) => {
      // 소유인 경우 월세와 보증금을 입력할 수 없음
      if (data.leaseType === 'OWNED') {
        return !data.monthlyRent && !data.depositAmount
      }
      return true
    },
    {
      message: '소유인 경우 월세와 보증금을 입력할 수 없습니다',
      path: ['leaseType'],
    },
  )

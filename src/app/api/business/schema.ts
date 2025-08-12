import { BusinessInfoSchema } from '@/generated/zod'
import z from 'zod'

export const businessInfoInputSchema = BusinessInfoSchema.pick({
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
    closedAt: z.coerce.date().optional(),
    isClosed: z.coerce.boolean().default(false),
    isReemployed: z.coerce.boolean().optional(),
    isDemolished: z.coerce.boolean().optional(),
    areaSizeM2: z.coerce.number().positive().optional(),
    employeeCount: z.coerce.number().int().positive().optional(),
    depositAmount: z.coerce.number().int().positive().optional(),
    monthlyRent: z.coerce.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      // 폐업 상태가 아닐 때는 폐업 관련 필드들이 없어야 함
      if (!data.isClosed) {
        return (
          !data.closedAt &&
          data.isReemployed === undefined &&
          data.isDemolished === undefined
        )
      }
      return true
    },
    {
      message: '폐업 상태가 아닐 때는 폐업 관련 정보를 입력할 수 없습니다',
      path: ['isClosed'],
    },
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
        return (
          data.monthlyRent === undefined && data.depositAmount === undefined
        )
      }
      return true
    },
    {
      message: '소유인 경우 월세와 보증금을 입력할 수 없습니다',
      path: ['leaseType'],
    },
  )

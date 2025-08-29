import { BusinessInfo } from '@/generated/prisma'

export function getBusinessInfoEntity(businessInfo: BusinessInfo) {
  return {
    id: businessInfo?.id,
    region: businessInfo?.region,
    industryCategory: businessInfo?.industryCategory,
    industryDetail: businessInfo?.industryDetail,
    openedAt: businessInfo?.openedAt,
    isClosed: !!businessInfo?.isClosed,
    closedAt: businessInfo?.closedAt,
    isReemployed: !!businessInfo?.isReemployed,
    isDemolished: !!businessInfo?.isDemolished,
    monthlySalesRange: 'FROM_1000_TO_1500',
    areaSizeM2: businessInfo?.areaSizeM2,
    employeeCount: businessInfo?.employeeCount,
    leaseType: businessInfo?.leaseType === 'OWNED' ? 'OWNERSHIP' : 'MONTHLY',
    depositAmount: businessInfo?.depositAmount || 0,
    monthlyRent: businessInfo?.monthlyRent || 0,
  }
}

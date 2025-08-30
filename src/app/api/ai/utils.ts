import { BusinessInfo } from '@/generated/prisma'

export function getBusinessInfoEntity(businessInfo: BusinessInfo) {
  return {
    id: businessInfo.id,
    region: businessInfo.region,
    industryCategory: businessInfo.industryCategory,
    industryDetail: businessInfo.industryDetail,
    openedAt: businessInfo.openedAt,
    isClosed: businessInfo.isClosed,
    closedAt: businessInfo.closedAt ?? null,
    isReemployed: businessInfo.isReemployed ?? false,
    isDemolished: businessInfo.isDemolished ?? false,
    monthlySalesRange: businessInfo.monthlySalesRange,
    areaSizeM2: businessInfo.areaSizeM2 ?? 0,
    employeeCount: businessInfo.employeeCount ?? 0,
    leaseType: businessInfo?.leaseType === 'OWNED' ? 'OWNERSHIP' : 'MONTHLY',
    depositAmount: businessInfo.depositAmount ?? 0,
    monthlyRent: businessInfo.monthlyRent ?? 0,
  }
}

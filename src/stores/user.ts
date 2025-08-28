import { $Enums, BusinessInfo, Gender, LeaseType, Member } from '@/generated/prisma'
import { create } from 'zustand'

type UserStore = {
  member: Member
  businessInfo: BusinessInfo
  setMember: (patch: Partial<Member>) => void
  setBusinessInfo: (patch: Partial<BusinessInfo>) => void
  reset: () => void
}

const initialMember: Member = {
  id: '',
  kakaoClientId: '',
  kakaoNickname: '',
  email: '',
  name: '',
  birthDate: new Date(),
  gender: Gender.MALE,
  agreedPrivacyPolicy: false,
  agreedTermsOfUse: false,
  agreedDataUsage: false,
  agreedMarketing: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const initialBusinessInfo: BusinessInfo = {
  id: '',
  region: '',
  industryCategory: $Enums.IndustryCategory.FOOD_SERVICE,
  industryDetail: '',
  openedAt: new Date(),
  isClosed: false,
  closedAt: null,
  isReemployed: null,
  isDemolished: null,
  monthlySalesRange: $Enums.SalesRange.BELOW_500,
  areaSizeM2: null,
  employeeCount: null,
  leaseType: LeaseType.OWNED,
  depositAmount: null,
  monthlyRent: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  memberId: null,
}

const useUserStore = create<UserStore>((set) => ({
  member: initialMember,
  businessInfo: initialBusinessInfo,

  setMember: (patch: Partial<Member>) =>
    set((state) => ({
      ...state,
      member: { ...state.member, ...patch },
    })),

  setBusinessInfo: (patch: Partial<BusinessInfo>) =>
    set((state) => ({
      ...state,
      businessInfo: { ...state.businessInfo, ...patch },
    })),

  reset: () =>
    set(() => ({
      member: { ...initialMember },
      businessInfo: initialBusinessInfo,
    })),
}))

export default useUserStore
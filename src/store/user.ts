import { BusinessInfo, Gender, Member } from '@/generated/prisma'
import { create } from 'zustand'

type UserStore = Member & {
  businessInfo: BusinessInfo | null
  setUser: (user: Partial<Member>) => void
  setBusinessInfo: (info: Partial<BusinessInfo>) => void
  resetUser: () => void
}

const initialUser: Member = {
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

const useUserStore = create<UserStore>((set) => ({
  ...initialUser,
  businessInfo: null,
  setUser: (user) => set((state) => ({
    ...state,
    ...user,
  })),
  resetUser: () => set((state) => ({
    ...state,
    ...initialUser,
    businessInfo: null,
  })),
  setBusinessInfo: (info) =>
    set((state) => ({
      ...state,
      businessInfo: state.businessInfo
        ? { ...state.businessInfo, ...info }
        : ({ ...info } as BusinessInfo),
    })),
}))

export default useUserStore
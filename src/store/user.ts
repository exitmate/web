import { Gender, Member } from '@/generated/prisma'
import { create } from 'zustand'

type UserStore = Member & {
  setUser: (user: Partial<Member>) => void
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
  businessInfo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const useUserStore = create<UserStore>((set) => ({
  ...initialUser,
  setUser: (user) => set((state) => ({ ...state, ...user })),
  resetUser: () => set(initialUser),
}))

export default useUserStore
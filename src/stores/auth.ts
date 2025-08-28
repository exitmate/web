import { create } from 'zustand'

type AuthStatus = 'guest' | 'checking' | 'authed'

type AuthStore = {
  status: AuthStatus
  setStatus: (s: AuthStatus) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: 'checking',
  setStatus: (s) => set({ status: s }),
}))
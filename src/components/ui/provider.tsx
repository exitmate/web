'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { SessionBridge } from '../SessionBridge'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

type Props = ColorModeProviderProps & { session?: Session | null }

export function Provider({ session, ...props }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ChakraProvider value={defaultSystem}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <SessionBridge />
          <ColorModeProvider {...props} />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  )
}
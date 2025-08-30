'use client'

import { Box, chakra, useToken } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const draw = keyframes`
  to { stroke-dashoffset: 0; }
`

const pop = keyframes`
  0%   { transform: scale(0.8); opacity: .6; }
  60%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`

type AnimatedCheckProps = {
  checked: boolean
  size?: number | string
  color?: string                     
  onClick?: () => void
}

export function AnimatedCheck({ checked, size = 24, color = 'blue.500', onClick }: AnimatedCheckProps) {
  const [resolved] = useToken('colors', [color as any])
  const stroke = resolved || color

  const pathLen = 26

  return (
    <Box
      as="button"
      onClick={onClick}
      lineHeight={0}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ transform: checked ? undefined : 'scale(1.03)' }}
      transition="transform .15s ease"
    >
      <chakra.svg viewBox="0 0 24 24" boxSize={size} overflow="visible">
        <chakra.circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          opacity={checked ? 1 : 0.45}
          transformOrigin="center"
          animation={checked ? `${pop} 260ms ease-out` : undefined}
        />
        <chakra.path
          d="M6 12l4 4 8-8"
          fill="none"
          stroke={stroke}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={checked ? 0 : pathLen}
          animation={checked ? `${draw} 420ms ease forwards` : undefined}
        />
      </chakra.svg>
    </Box>
  )
}
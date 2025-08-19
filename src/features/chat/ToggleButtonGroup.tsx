"use client"

import colors from "@/utils/colors"
import { SelectOption } from "@/utils/scripts"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { useState } from "react"

interface ToggleButtonGroupProps {
  items: SelectOption[][] | SelectOption[]
  setValue: (value: string, nextId: number) => void
}

export const ToggleButtonGroup = ({ items, setValue }: ToggleButtonGroupProps) => {
  const [active, setActive] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.isArray(items[0])
        ? (items as { value: string, label: string, nextId?: number }[][]).map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
              {row.map((item) => (
                <ToggleButton
                  key={item.value}
                  onClick={() => {
                    setValue(item.label, item.nextId ?? 0)
                    setActive(item.value)
                  }
                  }
                  active={active === item.value}
                >
              {item.label}
                </ToggleButton>
              ))}
            </div>
          ))
        : (
            <div style={{ display: 'flex', gap: '8px' }}>
              {(items as { value: string, label: string, nextId?: number }[]).map((item) => (
                <ToggleButton
                  key={item.value}
                  onClick={() => {
                    setValue(item.label, item.nextId ?? 0 )
                    setActive(item.value)
                    }
                  }
                  active={active === item.value}
                >
              {item.label}
                </ToggleButton>
              ))}
            </div>
          )
      }
    </div>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
  }
`

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 24px;
  border: ${({ active }) => active ? `1px solid ${colors.point}` : `1px solid ${colors.gray[6]}`};
  color: ${colors.gray[7]};
  font-size: 16px;
  background: white;
  box-sizing: border-box;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out both;
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  &:hover {
  ${({ active }) => !active && `
  background: ${colors.point};
    color: ${colors.white};
    border: 1px solid transparent;
  `}
  }

  &:active {
    border: 1px solid ${colors.point};
    background: ${colors.white};
    color: ${colors.gray[7]};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`

export default ToggleButtonGroup
"use client"

import colors from "@/utils/colors"
import { SelectOption } from "@/utils/scripts"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

interface ToggleButtonGroupProps {
  items: SelectOption[][] | SelectOption[]
  value: string
  index: number
  setValue: (value: string, nextId: number) => void
}

export const ToggleButtonGroup = ({ items, value, index, setValue }: ToggleButtonGroupProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.isArray(items[0])
        ? (items as { value: string, label: string, nextId: number }[][]).map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
              {row.map((item) => (
                <ToggleButton
                  key={item.value}
                  onClick={() => setValue(item.value, item.nextId)}
                  active={value === item.value}
                  index={index}
                >
              {item.label}
                </ToggleButton>
              ))}
            </div>
          ))
        : (
            <div style={{ display: 'flex', gap: '8px' }}>
              {(items as { value: string, label: string, nextId: number }[]).map((item) => (
                <ToggleButton
                  key={item.value}
                  onClick={() => setValue(item.value, item.nextId)}
                  active={value === item.value}
                  index={index}
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

const ToggleButton = styled.button<{ active: boolean, index: number }>`
  padding: 8px 16px;
  border-radius: 24px;
  border: ${({ active }) => active ? `1px solid ${colors.point}` : `1px solid ${colors.gray[6]}`};
  color: ${colors.gray[7]};
  font-size: 16px;
  background: white;
  box-sizing: border-box;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out both;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;

  &:hover {
  ${({ active }) => !active && `
  background: ${colors.point};
    color: ${colors.white};
    border: 1px solid transparent;
  `}

  &:active {
    border: 1px solid ${colors.point};
    background: ${colors.white};
    color: ${colors.gray[7]};
  }
`

export default ToggleButtonGroup
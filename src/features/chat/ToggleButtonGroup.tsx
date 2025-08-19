"use client"

import colors from "@/utils/colors"
import { SelectOption } from "@/utils/scripts"
import styled from "@emotion/styled"

interface ToggleButtonGroupProps {
  items: SelectOption[][] | SelectOption[]
  value: string
  setValue: (value: string, nextStep: number) => void
}

export const ToggleButtonGroup = ({ items, value, setValue }: ToggleButtonGroupProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.isArray(items[0])
        ? (items as { value: string, label: string, nextStep: number }[][]).map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
              {row.map((item) => (
                <ToggleButton
                  key={item.value}
                  onClick={() => setValue(item.value, item.nextStep)}
                  active={value === item.value}
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

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 24px;
  border: ${({ active }) => active ? `1px solid ${colors.point}` : `1px solid ${colors.gray[6]}`};
  color: ${colors.gray[7]};
  font-size: 16px;
  background: white;
  box-sizing: border-box;

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
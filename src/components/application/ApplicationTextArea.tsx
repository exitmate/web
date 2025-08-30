import colors from '@/utils/colors'
import { HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useState } from 'react'

interface ApplicationTextAreaProps {
  label: string
  index: number
  value: string
  defaultValue: string
  onChange: (value: string) => void
  active: boolean
  isSaved: boolean
  setSavedFor: (label: string, val: boolean, idx: number, value: string) => void
}

const POINT_COLOR = colors.point

export const ApplicationTextArea = ({
  label,
  index,
  value,
  defaultValue,
  onChange,
  active,
  isSaved,
  setSavedFor,
}: ApplicationTextAreaProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const onClickContainer = () => {
    if (!defaultValue || isSaved || !active) return
    if (value && value.trim() !== '') return
    onChange(defaultValue)
  }

  const onSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setSavedFor(label, true, index, value)
    setIsLoading(false)
  }

  return (
    <HStack width="100%" alignItems="center" gap={4} onClick={onClickContainer}>
      <VStack width="100%" alignItems="flex-start" gap={4}>
        <Text fontSize="16px" fontWeight="500">
          {label}
        </Text>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!active || isSaved}
          placeholder={defaultValue}
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${!active ? colors.gray[5] : colors.point}`,
            borderRadius: '8px',
            fontSize: '16px',
            color: !active ? colors.gray[4] : colors.black,
            backgroundColor: colors.white,
            resize: 'none',
            lineHeight: '1.5',
          }}
          rows={4}
        />
      </VStack>
      {isLoading ? <Spinner size="sm" color={POINT_COLOR} /> : (
      <MaterialIcon
        className="material-symbols-outlined"
        onClick={onSave}
        isSaved={isSaved}
      >
        check_circle
      </MaterialIcon>
      )}
    </HStack>
  )
}

const MaterialIcon = styled.span<{ isSaved?: boolean }>`
  color: ${({ isSaved }) => (isSaved ? POINT_COLOR : colors.gray[5])};
  font-size: 24px;
  cursor: pointer;
  padding-bottom: 8px;
`

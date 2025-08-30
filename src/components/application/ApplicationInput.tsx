import colors from '@/utils/colors'
import { Input, Spinner, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useState } from 'react'

interface ApplicationInputProps {
  label: string
  preValue: string
  value: string
  onChange: (value: string) => void
  index: number
  active: boolean
  isSaved: boolean
  setSaved: (value: boolean) => void
  fieldType?: string
}

const POINT_COLOR = colors.point

const normalizeBRN = (v: string) => v.replace(/\D/g, '')

const formatBRN = (v: string) => {
  const digits = normalizeBRN(v).slice(0, 10)
  const len = digits.length
  if (len <= 3) return digits
  if (len <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

const formatDate = (v: string) => {
  const onlyNums = v.replace(/\D/g, '')
  if (onlyNums.length <= 4) return onlyNums
  if (onlyNums.length <= 6)
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6, 8)}`
}

const formatPhoneNumber = (v: string) => {
  const onlyNums = v.replace(/\D/g, '')
  if (onlyNums.length <= 3) return onlyNums
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`
}
const formatFaxNumber = (v: string) => {
  const onlyNums = v.replace(/\D/g, '')
  if (onlyNums.length <= 3) return onlyNums
  if (onlyNums.length <= 5)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export const ApplicationInput = ({
  label,
  preValue,
  value,
  onChange,
  active,
  isSaved,
  setSaved,
  fieldType,
}: ApplicationInputProps) => {
  const onClickContainer = () => {
    if (!preValue || isSaved || !active) return
    if (value && value.trim() !== '') return
    onChange(preValue)
  }
  const [isLoading, setIsLoading] = useState(false)

  const onSave = async () => {
    if (!value.trim()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setSaved(true)
    setIsLoading(false)
  }

  const formattingInputValue = () => {
    if (fieldType === '사업자 등록번호') {
      return formatBRN(value)
    }
    if (fieldType === '사업개시일' || fieldType === '폐업예정일') {
      return formatDate(value)
    }
    if (fieldType === '전화번호') {
      return formatPhoneNumber(value)
    }
    if (fieldType === '팩스') {
      return formatFaxNumber(value)
    }
    return value
  }

  return (
    <VStack alignItems="flex-start" width="100%">
      <Label>{label}</Label>
      <CustomInputContainer
        isSaved={isSaved}
        active={active}
        onClick={onClickContainer}
      >
        <CustomInput
          value={formattingInputValue()}
          onChange={(e) => onChange(e.target.value)}
          placeholder={preValue}
          readOnly={isSaved || !active}
          disabled={isSaved || !active}
        />
        {isLoading ? (
          <Spinner size="sm" color={POINT_COLOR} />
        ) : (
          <MaterialIcon
            className="material-symbols-outlined"
            onClick={onSave}
            isSaved={isSaved}
          >
            check_circle
          </MaterialIcon>
        )}
      </CustomInputContainer>
    </VStack>
  )
}

const Label = styled.span`
  font-size: 16px;
  color: ${colors.gray[8]};
  font-weight: 500;
`

const CustomInputContainer = styled.div<{
  isSaved?: boolean
  active?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  border: 1px solid;
  font-size: 16px;
  color: ${colors.gray[7]};
  font-weight: 500;
  border-color: ${({ active, isSaved }) =>
    active || isSaved ? POINT_COLOR : colors.gray[5]};
  outline: none;
  padding: 0 12px;
  cursor: pointer;
  flex: 1;

  &:focus {
    border-color: ${({ active, isSaved }) =>
      active || isSaved ? POINT_COLOR : colors.gray[5]};
    outline: none;
    box-shadow: none;
  }
`

const CustomInput = styled(Input)`
  border: none;
  outline: none;
  box-shadow: none;
  color: ${colors.black};

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const MaterialIcon = styled.span<{ isSaved?: boolean; isLoading?: boolean }>`
  color: ${({ isSaved, isLoading }) =>
    isSaved || isLoading ? POINT_COLOR : colors.gray[5]};
  font-size: 24px;
  cursor: pointer;
`

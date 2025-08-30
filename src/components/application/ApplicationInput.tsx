import colors from '@/utils/colors'
import { Input, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

interface ApplicationInputProps {
  label: string
  preValue: string
  value: string
  onChange: (value: string) => void
  index: number
  active: boolean
  isSaved: boolean
  setSaved: (value: boolean) => void
}

const POINT_COLOR = colors.point

export const ApplicationInput = ({
  label,
  preValue,
  value,
  onChange,
  active,
  isSaved,
  setSaved,
}: ApplicationInputProps) => {
  const onClickContainer = () => {
    if (!preValue || isSaved || !active) return
    onChange(preValue)
  }

  const onSave = () => {
    if (!value.trim()) return
    setSaved(true)
  }

  return (
    <VStack alignItems="flex-start" width="100%">
      <Label>{label}</Label>
      <CustomInputContainer isSaved={isSaved} active={active} onClick={onClickContainer}>
        <CustomInput
          value={value}
          onChange={(e) => onChange(e.target.value)}  
          placeholder={preValue}
          readOnly={isSaved || !active}
          disabled={isSaved || !active}
        />
        <MaterialIcon
          className="material-symbols-outlined"
          onClick={onSave}
          isSaved={isSaved}
        >
          check_circle
        </MaterialIcon>
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
  border-color: ${({ active, isSaved }) => (active || isSaved ? POINT_COLOR : colors.gray[5])};
  outline: none;
  padding: 0 12px;
  cursor: pointer;
  flex: 1;

  &:focus {
    border-color: ${({ active, isSaved }) => (active || isSaved ? POINT_COLOR : colors.gray[5])};
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

const MaterialIcon = styled.span<{ isSaved?: boolean }>`
  color: ${({ isSaved }) => (isSaved ? POINT_COLOR : colors.gray[5])};
  font-size: 24px;
  cursor: pointer;
`
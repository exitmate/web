import colors from '@/utils/colors'
import { createListCollection, Portal, Select } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CommonSelectProps {
  placeholder: string
  items: {
    label: string
    value: string
  }[]
  register?: UseFormRegisterReturn
  isInvalid?: boolean
  onValueChange?: (value: string) => void
  errorMessage?: string
}

export const CommonSelect = ({
  placeholder,
  items,
  register,
  isInvalid,
  onValueChange,
  errorMessage,
}: CommonSelectProps) => {
  const collection = createListCollection({
    items,
  })

  return (
    <Select.Root
      collection={collection}
      onValueChange={(details) => {
        if (onValueChange && details.value) {
          onValueChange(details.value[0])
        }
      }}
    >
      <Select.HiddenSelect {...register} />
      <Select.Control>
        <CustomSelectTrigger isInvalid={isInvalid}>
          <Select.ValueText placeholder={placeholder} />
        </CustomSelectTrigger>
        <CustomIndicatorGroup>
          <Select.Indicator />
        </CustomIndicatorGroup>
      </Select.Control>
      <Portal>
  <Select.Positioner>
    <CustomSelect>
      {items.map((it) => (
        <CustomSelectItem key={it.value} item={it}>
          {it.label}
        </CustomSelectItem>
      ))}
    </CustomSelect>
  </Select.Positioner>
</Portal>
<ErrorMessage>{errorMessage}</ErrorMessage>
    </Select.Root>
  )
}

const CustomIndicatorGroup = styled(Select.IndicatorGroup)`
  border: 1px solid ${colors.gray[5]};
  box-shadow: none;
  margin-right: 16px;
  border: none;
`

const CustomSelectTrigger = styled(Select.Trigger, {
  shouldForwardProp: (prop) => prop !== 'isInvalid',
})<{ isInvalid?: boolean }>`
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid
    ${({ isInvalid }) => (isInvalid ? colors.gray[5] : colors.point)};
`

const CustomSelect = styled(Select.Content)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${colors.gray[5]};
  box-shadow: none;
  font-size: 16px;
  color: ${colors.gray[7]};
  max-height: calc(5 * 48px); /* item height * visible count */
  overflow-y: auto;
`

const CustomSelectItem = styled(Select.Item)`
  padding: 12px 16px;
`

export default CommonSelect

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 12px;
  margin-top: 2px;
`

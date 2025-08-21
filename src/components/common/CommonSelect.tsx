import colors from '@/utils/colors'
import { createListCollection, Select } from '@chakra-ui/react'
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
}

export const CommonSelect = ({
  placeholder,
  items,
  register,
  isInvalid,
  onValueChange,
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
      <Select.Positioner style={{ marginTop: '-52px' }}>
        <CustomSelect>
          <CustomSelectItem
            item={placeholder}
            style={{
              color: colors.gray[6],
              pointerEvents: 'none',
              opacity: 0.5,
            }}
          >
            {placeholder}
          </CustomSelectItem>
          {items.map((item, index) => (
            <CustomSelectItem key={index} item={item.value}>
              {item.label}
            </CustomSelectItem>
          ))}
        </CustomSelect>
      </Select.Positioner>
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
`

const CustomSelectItem = styled(Select.Item)`
  padding: 12px 16px;
`

export default CommonSelect

import { HStack, RadioGroup, Text } from "@chakra-ui/react"
import { Spacing } from "../common/Spacing"

interface CommonRadioGroupProps {
  disabled?: boolean
  label: string
  items: { label: string; value: string; disabled?: boolean }[]
  value: string
  onChange: (value: string) => void
}

export const CommonRadioGroup = ({
  label,
  items,
  value,
  onChange,
  disabled,
}: CommonRadioGroupProps) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={(detail) => onChange(detail.value ?? '')}
      disabled={disabled}
      style={{ paddingBottom: '8px' }}
    >
      <Text fontSize="16px" fontWeight="500">{label}</Text>
      <Spacing height={16} />
      <HStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item
            key={item.value}
            value={item.value}
            disabled={disabled || item.disabled}
            style={{ fontSize: '16px', color: disabled || item.disabled ? 'gray' : 'black' }}
          >
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  )
}
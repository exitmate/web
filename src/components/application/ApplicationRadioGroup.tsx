import { CommonRadioGroup } from "@/components/common/CommonRadioGroup"
import colors from "@/utils/colors"
import { HStack, Input } from "@chakra-ui/react"
import styled from "@emotion/styled"

interface ApplicationRadioGroupProps {
  label: string
  index: number
  active: boolean
  isSaved: boolean
  selected: string
  onChangeSelected: (value: string) => void
  etcText: string
  onChangeEtcText: (value: string) => void
  setSavedFor: (label: string, val: boolean, idx: number, value: string) => void
}

const POINT_COLOR = colors.point

export const ApplicationRadioGroup = ({
  label,
  index,
  active,
  isSaved,
  selected,
  onChangeSelected,
  etcText,
  onChangeEtcText,
  setSavedFor,
}: ApplicationRadioGroupProps) => {
  const onSave = () => {
    const finalValue = selected === '5' ? (etcText ?? '').trim() : selected
    if (!finalValue) return
    setSavedFor(label, true, index, finalValue)
  }

  const disabledAll = isSaved || !active

  return (
    <HStack alignItems="flex-end" gap={2}>
      <CommonRadioGroup
        label={label}
        items={[
          { value: '1', label: '아파트 상가' },
          { value: '2', label: '주택가' },
          { value: '3', label: '번화가' },
          { value: '4', label: '도로가' },
          { value: '5', label: '기타' },
        ]}
        value={selected}
        onChange={onChangeSelected}
        disabled={disabledAll}
      />

      <div style={{ width: '160px', height: '100%' }}>
        <Input
          placeholder="기타"
          type="text"
          value={etcText}
          onChange={(e) => onChangeEtcText(e.target.value)}
          style={{ padding: '0 12px', fontSize: '16px' }}
          disabled={disabledAll || selected !== '5'}
        />
      </div>

      <MaterialIcon
        className="material-symbols-outlined"
        onClick={onSave}
        isSaved={isSaved}
      >
        check_circle
      </MaterialIcon>
    </HStack>
  )
}

const MaterialIcon = styled.span<{ isSaved?: boolean }>`
  color: ${({ isSaved }) => (isSaved ? POINT_COLOR : colors.gray[5])};
  font-size: 24px;
  cursor: pointer;
  padding-bottom: 8px;
`
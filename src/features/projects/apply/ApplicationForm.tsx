import { ApplicationInput } from '@/components/application/ApplicationInput'
import { PaddedBox } from '@/components/common/PaddedBox'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import { formatYMD } from '@/utils/date'
import { HStack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useState } from 'react'

interface UserInfoSectionProps {
  activeIndex: number
  saved: Record<string, boolean>
  setSavedFor: (label: string, val: boolean, idx: number) => void
}

const UserInfoSection = ({ activeIndex, saved, setSavedFor }: UserInfoSectionProps) => {
  const { member } = useUserStore()
  const fieldMap: Record<string, string> = {
    "신청인(대표자)": member.name ?? '',
    "휴대폰": '',
    "생년월일": formatYMD(member.birthDate ?? '') ?? '',
    "이메일": member.email ?? '',
    "전화번호": '',
    "팩스": '',
  }

  const labels = Object.keys(fieldMap)
  const mid = Math.ceil(labels.length / 2)
  const leftLabels = labels.slice(0, mid)
  const rightLabels = labels.slice(mid)

  const renderCol = (col: string[], baseIdx: number) => (
    <VStack width="100%" gap={8}>
      {col.map((label, i) => {
        const idx = baseIdx + i
        return (
          <ApplicationInput
            key={label}
            label={label}
            value=""
            onChange={() => {}}
            index={idx}
            active={idx === activeIndex}
            preValue={fieldMap[label]}
            isSaved={!!saved[label]}
            setSaved={(val) => setSavedFor(label, val, idx)}
          />
        )
      })}
    </VStack>
  )

  return (
    <VStack width="100%" alignItems="flex-start" gap={8}>
      <SectionTitle>1. 신청자 정보 (대표자)</SectionTitle>
      <HStack width="100%" alignItems="flex-start" gap={8}>
        <LeftSection>{renderCol(leftLabels, 0)}</LeftSection>
        <RightSection>{renderCol(rightLabels, mid)}</RightSection>
      </HStack>
    </VStack>
  )
}

const SectionTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[8]};
`

export const ApplicationForm = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  const setSavedFor = (label: string, val: boolean, idx: number) => {
    setSaved((prev) => ({ ...prev, [label]: val }))
    if (val && idx === activeIndex) {
      setActiveIndex(idx + 1)
    }
  }

  return (
    <PaddedBox style={{ gap: 28, display: 'flex', flexDirection: 'row' }}>
      <UserInfoSection
        activeIndex={activeIndex}
        saved={saved}
        setSavedFor={setSavedFor}
      />
    </PaddedBox>
  )
}

const LeftSection = styled.div`
  flex: 1;
  width: 100%;
`

const RightSection = styled.div`
  flex: 1;
  width: 100%;
`

import { ApplicationInput } from '@/components/application/ApplicationInput'
import { ApplicationRadioGroup } from '@/components/application/ApplicationRadioGroup'
import { PaddedBox } from '@/components/common/PaddedBox'
import { $Enums } from '@/generated/prisma'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import { formatYMD } from '@/utils/date'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useState } from 'react'

interface UserInfoSectionProps {
  activeIndex: number
  saved: Record<string, boolean>
  setSavedFor: (label: string, val: boolean, idx: number) => void
  values: Record<string, string>
  setValues: (values: Record<string, string>) => void
}

interface UserInfoSectionProps {
  activeIndex: number
  saved: Record<string, boolean>
  setSavedFor: (key: string, val: boolean, idx: number) => void
  baseOffset: number
  values: Record<string, string>
  setValues: (values: Record<string, string>) => void
}

const USER_PREFIX = 'USER:'
const BIZ_PREFIX = 'BIZ:'

const renderRows = (
  items: string[],
  prefix: string,
  baseOffset: number,
  activeIndex: number,
  offset: number,
  saved: Record<string, boolean>,
  setSavedFor: (key: string, val: boolean, idx: number, value?: string) => void,
  fieldMap: Record<string, string>,
  values: Record<string, string>,
  setValues: (values: Record<string, string>) => void
) => {
  const rows: React.ReactNode[] = []
  for (let i = 0; i < items.length; i += 2) {
    const left  = items[i]
    const right = items[i + 1]

    rows.push(
      <HStack key={i} w="100%" gap={8} align="flex-start" flexWrap="nowrap">
        <Box flex="1" minW={0}>
          <ApplicationInput
            key={prefix + left}
            label={left}
            value={values[prefix + left] ?? ''}
            onChange={(v) => setValues({ ...values, [prefix + left]: v })}
            index={baseOffset + i}
            active={activeIndex === baseOffset + i}
            preValue={fieldMap[left]}
            isSaved={!!saved[prefix + left]}
            setSaved={(val) =>
              setSavedFor(
                prefix + left,
                val,
                baseOffset + i,
                (values[prefix + left] ?? '')
              )
            }
          />
        </Box>

        {right ? (
          <Box flex="1" minW={0}>
            <ApplicationInput
              key={prefix + right}
              label={right}
              value={values[prefix + right] ?? ''} 
              onChange={(v) => setValues({ ...values, [prefix + right]: v })} 
              index={baseOffset + i + 1}
              active={activeIndex === baseOffset + i + 1}
              preValue={fieldMap[right]}
              isSaved={!!saved[prefix + right]}
              setSaved={(val) =>
                setSavedFor(
                  prefix + right,
                  val,
                  baseOffset + i + 1,
                  (values[prefix + right] ?? '')
                )
              }
            />
          </Box>
        ) : (
          <Box flex="1" minW={0} />
        )}
      </HStack>
    )
  }
  return <VStack w="100%" gap={8}>{rows}</VStack>
}
const UserInfoSection = ({ activeIndex, saved, setSavedFor, baseOffset, values, setValues }: UserInfoSectionProps) => {
  const { member } = useUserStore()
  const fieldMap: Record<string, string> = {
    '신청인(대표자)': member.name ?? '',
    '휴대폰': member.phoneNumber ?? '',
    '생년월일': formatYMD(member.birthDate ?? '') ?? '',
    '이메일': member.email ?? '',
  }

  const labels = Object.keys(fieldMap)
  const mid = Math.ceil(labels.length / 2)
  const leftLabels = labels.slice(0, mid)
  const rightLabels = labels.slice(mid)


  return (
    <VStack width="100%" alignItems="flex-start" gap={8}>
      <SectionTitle>1. 신청자 정보 (대표자)</SectionTitle>
      <VStack width="100%" alignItems="flex-start" gap={8}>
      <LeftSection>
        {renderRows(leftLabels, USER_PREFIX, 0, activeIndex, 0, saved, setSavedFor, fieldMap, values, setValues)}
      </LeftSection>
      <RightSection>
        {renderRows(rightLabels, USER_PREFIX, mid, activeIndex, mid, saved, setSavedFor, fieldMap, values, setValues)}
      </RightSection>
      </VStack>
    </VStack>
  )
}

const BusinessInfoSection = ({ activeIndex, saved, setSavedFor, baseOffset, values, setValues }: UserInfoSectionProps) => {
  const { member } = useUserStore()

  const formatIndustryCategory = (category?: $Enums.IndustryCategory) => {
    if (category === $Enums.IndustryCategory.FOOD_SERVICE) return '음식점업'
    if (category === $Enums.IndustryCategory.NON_ALCOHOL_CAFE) return '비알코올 음료점업'
    return ''
  }

  const fieldMap: Record<string, string> = {
    '업체명': '',
    '사업개시일': formatYMD(member.businessInfo?.openedAt ?? '') ?? '',
    '사업자 등록번호': '',
    '폐업예정일': '',
    '업종': member.businessInfo?.industryDetail ?? '',
    '업태': formatIndustryCategory(member.businessInfo?.industryCategory),
    '전화번호': '',
    '팩스': '',
    '사업장 주소': member.businessInfo?.region ?? '',
    '상시 종업원': member.businessInfo?.employeeCount != null ? `${member.businessInfo.employeeCount}명` : '',
  }

  const labels = Object.keys(fieldMap)
  const mid = Math.ceil(labels.length / 2) + 1
  const leftLabels = labels.slice(0, mid)
  const rightLabels = labels.slice(mid)

  return (
    <VStack width="100%" alignItems="flex-start" gap={8}>
      <SectionTitle>2. 사업자 등록정보</SectionTitle>
      <VStack width="100%" alignItems="flex-start" gap={8}>
      {renderRows(leftLabels, BIZ_PREFIX, baseOffset, activeIndex, 0, saved, setSavedFor, fieldMap, values, setValues)}
      {renderRows(rightLabels, BIZ_PREFIX, mid + baseOffset, activeIndex, mid, saved, setSavedFor, fieldMap, values, setValues)}
      </VStack>
      <ApplicationRadioGroup
        label="점포 입지"
        index={14}
        value={values[BIZ_PREFIX + '점포 입지'] ?? ''}
        onChange={(v) => setValues({ ...values, [BIZ_PREFIX + '점포 입지']: v })}
        active={activeIndex === 14}
        preValue={fieldMap['점포 입지']}
        isSaved={!!saved[BIZ_PREFIX + '점포 입지']}
        setSavedFor={setSavedFor}
      />
    </VStack>
  )
}

export const ApplicationForm = () => {
  const USER_LABELS = ['신청인(대표자)', '휴대폰', '생년월일', '이메일'] as const
  const BUSINESS_LABELS = ['업체명','사업개시일','사업자 등록번호','전화번호', '팩스','폐업예정일','점포 입지','업태','업종','사업장 주소','상시 종업원', '점포 입지'] as const

  const userOffset = 0
  const businessOffset = USER_LABELS.length
  const TOTAL = USER_LABELS.length + BUSINESS_LABELS.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [values, setValues] = useState<Record<string, string>>({})

  console.log(values)

  const setSavedFor = (key: string, val: boolean, idx: number, value?: string) => {
    setSaved(prev => ({ ...prev, [key]: val }))
    if (value !== undefined) {
      setValues(prev => ({ ...prev, [key]: value }))
    }
    if (val && idx === activeIndex) {
      setActiveIndex(Math.min(idx + 1, TOTAL - 1))
    }
  }

  return (
    <PaddedBox style={{ gap: 28, display: 'flex', flexDirection: 'column' }}>
      <UserInfoSection
        activeIndex={activeIndex}
        saved={saved}
        setSavedFor={setSavedFor}
        baseOffset={userOffset}
        values={values}
        setValues={setValues}
      />
      <BusinessInfoSection
        activeIndex={activeIndex}
        saved={saved}
        setSavedFor={setSavedFor}
        baseOffset={businessOffset}
        values={values}
        setValues={setValues}
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
const SectionTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[8]};
`
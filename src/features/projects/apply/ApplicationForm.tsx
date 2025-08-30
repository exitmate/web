import { ApplicationInput } from '@/components/application/ApplicationInput'
import { ApplicationRadioGroup } from '@/components/application/ApplicationRadioGroup'
import { ApplicationTextArea } from '@/components/application/ApplicationTextArea'
import { PaddedBox } from '@/components/common/PaddedBox'
import { $Enums } from '@/generated/prisma'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import { formatYMD } from '@/utils/date'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useProjectDetail } from '../detail/ProjectDetailContext'

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
  setValues: (values: Record<string, string>) => void,
) => {
  const rows: React.ReactNode[] = []
  for (let i = 0; i < items.length; i += 2) {
    const left = items[i]
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
            fieldType={left}
            setSaved={(val) =>
              setSavedFor(
                prefix + left,
                val,
                baseOffset + i,
                values[prefix + left] ?? '',
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
              fieldType={right}
              setSaved={(val) =>
                setSavedFor(
                  prefix + right,
                  val,
                  baseOffset + i + 1,
                  values[prefix + right] ?? '',
                )
              }
            />
          </Box>
        ) : (
          <Box flex="1" minW={0} />
        )}
      </HStack>,
    )
  }
  return (
    <VStack w="100%" gap={8}>
      {rows}
    </VStack>
  )
}
const UserInfoSection = ({
  activeIndex,
  saved,
  setSavedFor,
  baseOffset,
  values,
  setValues,
}: UserInfoSectionProps) => {
  const { member } = useUserStore()
  const fieldMap: Record<string, string> = {
    '신청인(대표자)': member.name ?? '',
    휴대폰: member.phoneNumber ?? '',
    생년월일: formatYMD(member.birthDate ?? '') ?? '',
    이메일: member.email ?? '',
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
          {renderRows(
            leftLabels,
            USER_PREFIX,
            0,
            activeIndex,
            0,
            saved,
            setSavedFor,
            fieldMap,
            values,
            setValues,
          )}
        </LeftSection>
        <RightSection>
          {renderRows(
            rightLabels,
            USER_PREFIX,
            mid,
            activeIndex,
            mid,
            saved,
            setSavedFor,
            fieldMap,
            values,
            setValues,
          )}
        </RightSection>
      </VStack>
    </VStack>
  )
}

const BusinessInfoSection = ({
  activeIndex,
  saved,
  setSavedFor,
  baseOffset,
  values,
  setValues,
}: UserInfoSectionProps) => {
  const { member } = useUserStore()

  const formatIndustryCategory = (category?: $Enums.IndustryCategory) => {
    if (category === $Enums.IndustryCategory.FOOD_SERVICE) return '음식점업'
    if (category === $Enums.IndustryCategory.NON_ALCOHOL_CAFE)
      return '비알코올 음료점업'
    return ''
  }

  const fieldMap: Record<string, string> = {
    업체명: '',
    사업개시일: formatYMD(member.businessInfo?.openedAt ?? '') ?? '',
    '사업자 등록번호': '',
    폐업예정일: '',
    업종: member.businessInfo?.industryDetail ?? '',
    업태: formatIndustryCategory(member.businessInfo?.industryCategory),
    전화번호: '',
    팩스: '',
    '사업장 주소': member.businessInfo?.region ?? '',
    '상시 종업원':
      member.businessInfo?.employeeCount != null
        ? `${member.businessInfo.employeeCount}명`
        : '',
  }

  const labels = Object.keys(fieldMap)
  const mid = Math.ceil(labels.length / 2) + 1
  const leftLabels = labels.slice(0, mid)
  const rightLabels = labels.slice(mid)

  return (
    <VStack width="100%" alignItems="flex-start" gap={8}>
      <SectionTitle>2. 사업자 등록정보</SectionTitle>
      <VStack width="100%" alignItems="flex-start" gap={8}>
        {renderRows(
          leftLabels,
          BIZ_PREFIX,
          baseOffset,
          activeIndex,
          0,
          saved,
          setSavedFor,
          fieldMap,
          values,
          setValues,
        )}
        {renderRows(
          rightLabels,
          BIZ_PREFIX,
          mid + baseOffset,
          activeIndex,
          mid,
          saved,
          setSavedFor,
          fieldMap,
          values,
          setValues,
        )}
      </VStack>
      <ApplicationRadioGroup
        label="점포 입지"
        index={14}
        selected={values[BIZ_PREFIX + '점포 입지'] ?? ''}
        onChangeSelected={(v) =>
          setValues({ ...values, [BIZ_PREFIX + '점포 입지']: v })
        }
        active={activeIndex === 14}
        isSaved={!!saved[BIZ_PREFIX + '점포 입지']}
        etcText={values[BIZ_PREFIX + '점포 입지 기타'] ?? ''}
        onChangeEtcText={(v) =>
          setValues({ ...values, [BIZ_PREFIX + '점포 입지 기타']: v })
        }
        setSavedFor={(_label, _val, _idx, _value) => setSavedFor(BIZ_PREFIX + '점포 입지', _val, 14, _value ?? values[BIZ_PREFIX + '점포 입지'] ?? '')}
      />
    </VStack>
  )
}

interface ApplicationFormProps {
  isCompleted: boolean
  setIsCompleted: (isCompleted: boolean) => void
  step: number
  setStep: (step: number) => void
}

export const ApplicationForm = ({ isCompleted, setIsCompleted, step, setStep }: ApplicationFormProps ) => {
  const USER_LABELS = [
    '신청인(대표자)',
    '휴대폰',
    '생년월일',
    '이메일',
  ] as const
  const BUSINESS_LABELS = [
    '업체명',
    '사업개시일',
    '사업자 등록번호',
    '전화번호',
    '팩스',
    '폐업예정일',
    '점포 입지',
    '업태',
    '업종',
    '사업장 주소',
    '상시 종업원',
    '점포 입지',
    '컨설팅 신청 내용',
    '원상복구 신청 내용',
  ] as const

  const userOffset = 0
  const businessOffset = USER_LABELS.length
  const TOTAL = USER_LABELS.length + BUSINESS_LABELS.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [values, setValues] = useState<Record<string, string>>({})
  const { project } = useProjectDetail()

  const setSavedFor = (
    key: string,
    val: boolean,
    idx: number,
    value?: string,
  ) => {
    setSaved((prev) => ({ ...prev, [key]: val }))
    if (value !== undefined) {
      setValues((prev) => ({ ...prev, [key]: value }))
    }
    if (val && idx === activeIndex) {
      setActiveIndex(Math.min(idx + 1, TOTAL - 1))
    }
  }


  useEffect(() => { 
    if (Object.keys(saved).length === 17) {
      setIsCompleted(true)
      setStep(step + 1)
    }
  }, [isCompleted, saved])

  return (
    <PaddedBox style={{ gap: 28, display: 'flex', flexDirection: 'column' }}>
      <VStack gap={2} marginBottom={8}>
        <Text fontSize="32px" fontWeight="600" color={colors.gray[8]}>{project?.title} 신청서</Text>
        <Text fontSize="16px" fontWeight="400" color={colors.gray[6]}>사실과 내용이 다를 경우 클릭하면 수정할 수 있습니다.</Text>
      </VStack>
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
      <ApplicationTextArea
        label="컨설팅 신청 내용"
        index={15}
        value={'폐업 과정에서 필수 신고 절차와 세무·채무 정리에 대한 이해가 부족하여 법적·행정적 리스크가 우려됩니다. 또한 집기·설비·재고 처분 방법에 대한 경험이 없어 처리 과정에서 손실이 예상되며, 건물주와의 철거 범위 협의 및 분쟁 가능성도 부담으로 작용하고 있습니다. 임대차 계약 관련 문제와 향후 신용 회복 방안까지 전문적인 조언이 필요한 상황이므로, 폐업 전반에 걸친 종합적 컨설팅 지원을 받고자 합니다.'}
        onChange={(v) =>
          setValues({ ...values, [BIZ_PREFIX + '컨설팅 신청 내용']: v })
        }
        active={activeIndex === 15}
        isSaved={!!saved[BIZ_PREFIX + '컨설팅 신청 내용']}
        setSavedFor={(_label, val, _idx, value) =>
          setSavedFor(BIZ_PREFIX + '컨설팅 신청 내용', val, 15, value ?? values[BIZ_PREFIX + '컨설팅 신청 내용'] ?? '')
        }
      />
      <ApplicationTextArea
        label="원상복구 신청 내용"
        index={16}
        value={'임대차 계약 종료에 따라 점포 내 집기·설비 철거 및 원상복구가 필요하나, 철거 범위가 넓고 소요 비용이 상당하여 경제적 부담이 큽니다. 특히 면적이 넓어 철거비용이 50만 원을 초과할 것으로 예상되며, 자력으로는 비용 충당이 어려운 상황입니다. 이에 사업정리 도우미 지원사업을 통해 전용면적 기준에 따른 원상복구 비용 지원을 신청하며, 신청 후 3개월 내 철거 완료 조건을 충족해 성실히 이행할 계획입니다.'}
        onChange={(v) =>
          setValues({ ...values, [BIZ_PREFIX + '원상복구 신청 내용']: v })
        }
        active={activeIndex === 16}
        isSaved={!!saved[BIZ_PREFIX + '원상복구 신청 내용']}
        setSavedFor={(_label, val, _idx, value) =>
          setSavedFor(BIZ_PREFIX + '원상복구 신청 내용', val, 16, value ?? values[BIZ_PREFIX + '원상복구 신청 내용'] ?? '')
        }
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

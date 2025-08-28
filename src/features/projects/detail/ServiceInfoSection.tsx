import calendarIcon from '@/assets/icons/calendar.svg'
import moneyIcon from '@/assets/icons/money.svg'
import myIcon from '@/assets/icons/my.svg'
import type { ApplicationType, ServiceType } from '@/generated/prisma'
import colors from '@/utils/colors'
import { Box, HStack, Image, Text, useToken, VStack } from '@chakra-ui/react'
import React from 'react'
import { useProjectDetail } from './ProjectDetailContext'

type Props = {}

function mapApplicationType(applicationType: ApplicationType) {
  if (applicationType === 'DEADLINED') return '기한 있음'
  if (applicationType === 'ALWAYS') return '상시 모집'
  return '소진 시 종료'
}

function mapServiceType(serviceType: ServiceType) {
  if (serviceType === 'BUSINESS_EDUCATION') return '경영 교육'
  if (serviceType === 'CLOSURE_CONSULTING') return '폐업 컨설팅'
  if (serviceType === 'CLOSURE_SUPPORT_SUBSIDY') return '폐업지원금'
  if (serviceType === 'REEMPLOYMENT_EDUCATION') return '재취업/재창업 교육'
  if (serviceType === 'STORE_DEMOLITION_SUBSIDY') return '점포철거지원금'
  return '알 수 없음'
}

function InfoBox({
  title,
  value,
  bg,
  titleColor,
  valueColor,
  icon,
}: {
  title: string
  value: string
  bg: string
  titleColor: string
  valueColor: string
  icon: React.ReactNode
}) {
  return (
    <Box bg={bg} rounded="lg" p="1.5rem" width={324} height={140}>
      <VStack align="space-between" gap={8}>
        <Text fontSize="lg" fontWeight={600} color={titleColor}>
          {title}
        </Text>
        <HStack gap={4} align="flex-end" justify="flex-end">
          {icon}
          <Text
            fontSize="2xl"
            lineHeight="shorter"
            fontWeight={700}
            color={valueColor}
          >
            {value}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default function SupportSummary({}: Props) {
  const { project } = useProjectDetail()
  const { applicationType, services } = project
  const serviceType = services[0].type
  const eligible = true
  const [bg, titleColor, valueColor] = useToken('colors', [
    colors.gray[1],
    colors.gray[5],
    colors.black,
  ]) as [string, string, string]
  const applicationText = mapApplicationType(applicationType)
  const eligibleText = eligible ? '지원 가능' : '지원 불가'

  return (
    <HStack gap={{ base: 4, md: 6 }} align="stretch" flexWrap="wrap">
      <InfoBox
        icon={
          <Image
            src={moneyIcon.src}
            alt="money"
            width="2.5rem"
            height="2.5rem"
          />
        }
        title="지원 내용"
        value={mapServiceType(serviceType)}
        bg={bg}
        titleColor={titleColor}
        valueColor={valueColor}
      />
      <InfoBox
        title="모집 유형"
        value={applicationText}
        icon={
          <Image
            src={calendarIcon.src}
            alt="calendar"
            width="2.5rem"
            height="2.5rem"
          />
        }
        bg={bg}
        titleColor={titleColor}
        valueColor={valueColor}
      />
      <InfoBox
        title="나의 지원 가능 여부"
        value={eligibleText}
        icon={
          <Image src={myIcon.src} alt="my" width="2.5rem" height="2.5rem" />
        }
        bg={bg}
        titleColor={titleColor}
        valueColor={valueColor}
      />
    </HStack>
  )
}

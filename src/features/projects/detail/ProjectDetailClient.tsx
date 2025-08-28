'use client'

import projectFallback from '@/assets/images/project_fallback.webp'
import { CommonButton } from '@/components/common/CommonButton'
import PaddedBox from '@/components/common/PaddedBox'
import Spacing from '@/components/common/Spacing'
import colors from '@/utils/colors'
import { Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import DateDescriptionSection from './DateDescriptionSection'
import { useProjectDetail } from './ProjectDetailContext'
import ServiceInfoSection from './ServiceInfoSection'

export default function ProjectDetailClient() {
  const { project } = useProjectDetail()
  return (
    <PaddedBox title={project.title}>
      <DetailHeader>
        <Image
          src={project.logoSrc ?? projectFallback.src}
          alt="프로젝트 로고"
          width={100}
          height={100}
          style={{ borderRadius: '1rem' }}
        />
        <Text
          fontSize="md"
          color={colors.gray[6]}
          marginTop="0.5rem"
          fontWeight="semibold"
        >
          {project.host}
        </Text>
        <Text fontSize="3xl" fontWeight="bold" marginTop="1rem">
          {project.title}
        </Text>
      </DetailHeader>
      <DateDescriptionSection />
      <Spacing height={68} />
      <VStack gap={12}>
        <ServiceInfoSection />
        <CommonButton
          label="ExitMate와 함께 지원사업 신청서 작성하기"
          onClick={() => {}}
          style={{ width: '408px', height: '64px', fontSize: '20px' }}
          />
      </VStack>
    </PaddedBox>
  )
}

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3.5rem;
  padding-top: 3rem;
`

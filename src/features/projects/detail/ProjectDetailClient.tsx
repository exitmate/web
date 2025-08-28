'use client'

import PaddedBox from '@/components/common/PaddedBox'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Text } from '@chakra-ui/react'
import { useProjectDetail } from './ProjectDetailContext'
import projectFallback from '@/assets/images/project_fallback.webp'
import DateDescriptionSection from './DateDescriptionSection'
import colors from '@/utils/colors'
import ServiceInfoSection from './ServiceInfoSection'
import Spacing from '@/components/common/Spacing'

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
      <ServiceInfoSection />
    </PaddedBox>
  )
}

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3.5rem;
  padding-top: 3rem;
`

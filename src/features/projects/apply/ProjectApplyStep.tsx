'use client'

import { CommonButton } from '@/components/common/CommonButton'
import SegmentedProgress from '@/components/common/SegmentedProgress'
import Spacing from '@/components/common/Spacing'
import colors from '@/utils/colors'
import { HStack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useProjectDetail } from '../detail/ProjectDetailContext'

interface ProjectApplyStepCardProps {
  applicationName: string
  canAutoWrite: boolean
  isCompleted: boolean
  isActive: boolean
}

const ProjectApplyStepCard = ({
  applicationName,
  canAutoWrite,
  isCompleted,
  isActive,
}: ProjectApplyStepCardProps) => {
  return (
    <ProjectApplyStepCardContainer isActive={isActive}>
      <VStack gap={4} alignItems="flex-start">
        <ProjectApplyStepCardTitle>{applicationName}</ProjectApplyStepCardTitle>
        <ProjectApplyStepCardBadge>
          {canAutoWrite ? '자동 작성 가능' : '자동 작성 불가'}
        </ProjectApplyStepCardBadge>
      </VStack>
      <CheckIconContainer isCompleted={isCompleted}>
        <MaterialIcon className="material-symbols-outlined">check</MaterialIcon>
      </CheckIconContainer>
    </ProjectApplyStepCardContainer>
  )
}

const ProjectApplyStepCardContainer = styled.div<{
  isActive: boolean
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 363px;
  height 128px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[3]};
  ${({ isActive }) =>
    isActive &&
    `
    border-color: ${colors.point};
  `}
`

const ProjectApplyStepCardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[7]};
`

const ProjectApplyStepCardBadge = styled.div`
  width: 115px;
  height: 32px;
  border-radius: 32px;
  padding: 4px 12px;
  background-color: ${colors.backgroundBlue};
  color: ${colors.point};
`

const CheckIconContainer = styled.div<{
  isCompleted: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? colors.green : colors.gray[4]};
  display: flex;
  align-items: center;
  justify-content: center;
`

const MaterialIcon = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: ${colors.white};
`

interface ProjectApplyStepProps {
  isCompleted: boolean[]
  step: number
}

export const ProjectApplyStep = ({
  isCompleted,
  step,
}: ProjectApplyStepProps) => {
  const { project } = useProjectDetail()
  const isCompletedAll = isCompleted.every(Boolean)
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.gray[1],
        padding: '48px 0',
      }}
    >
      <VStack gap={4} alignItems="center">
        <ProjectApplyStepText>
          작성 완료된 서류:{' '}
          <span style={{ color: colors.point }}>
            {isCompleted.filter(Boolean).length}
          </span>
          개
        </ProjectApplyStepText>
        <div style={{ width: '308px', margin: '0 auto' }}>
          <SegmentedProgress total={2} current={step} />
        </div>
        <Spacing height={16} />
        <HStack gap={4}>
          <ProjectApplyStepCard
            applicationName="지원사업 신청서"
            canAutoWrite={true}
            isCompleted={isCompleted[0]}
            isActive={step === 1}
          />
          <ProjectApplyStepCard
            applicationName="원상 복구비용 신청서"
            canAutoWrite={true}
            isCompleted={isCompleted[1]}
            isActive={step === 2}
          />
        </HStack>
        <Spacing height={16} />
        <CompletedText>
          {isCompletedAll
            ? '작성이 완료되었어요. 아래에서 정보를 확인 후에 다운로드 받아주세요.'
            : '열심히 작성해요 영차영차!'}
        </CompletedText>
        <CommonButton
          label="파일 다운로드"
          onClick={() => {}}
          disabled={!isCompletedAll}
        />
        <CationText>
        허위 정보 작성 시 법적 책임을 물을 수 있습니다. 엑시트 메이트는 서류 작성 보조 도구로써 최종 책임은 제출자 본인에게 있습니다.
        </CationText>
      </VStack>
    </div>
  )
}

const ProjectApplyStepText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray[7]};
`

const CompletedText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray[7]};
`

const CationText = styled(Text)`
  font-size: 10px;
  font-weight: 600;
  color: ${colors.gray[5]};
`

import { useProjectDetail } from './ProjectDetailContext'
import { useMemo } from 'react'
import { Badge, HStack, Text, VStack } from '@chakra-ui/react'
import colors from '@/utils/colors'
import { getDday } from '@/utils/date'

export default function DateDescriptionSection() {
  const { project } = useProjectDetail()
  const DeadlineInfo = useMemo(() => {
    if (project.applicationType === 'ALWAYS') {
      return () => <DateDescription label="상시 모집" />
    }
    if (project.applicationType === 'DEADLINED') {
      const dday = getDday(project.deadline!)
      return () => (
        <DateDescription label="마감일" date={project.deadline!} badge={dday} />
      )
    }
    return () => <DateDescription label="마감일" badge="소진 시 종료" />
  }, [project.applicationType])
  const CreatedAtInfo = useMemo(() => {
    return () => <DateDescription label="공고일" date={project.createdAt} />
  }, [project.createdAt])
  return (
    <VStack align="flex-start" gap="1.25rem">
      <DeadlineInfo />
      <CreatedAtInfo />
    </VStack>
  )
}

interface DateDescriptionProps {
  label: string
  date?: Date
  badge?: string
}

function DateDescription({ label, date, badge }: DateDescriptionProps) {
  return (
    <HStack align="flex-start" gap="0.75rem">
      <Text fontSize="lg" color={colors.gray[6]}>
        {label}
      </Text>
      {date && <Text fontSize="lg">{date.toLocaleDateString()}</Text>}
      {badge && (
        <Badge
          padding="0.25rem 0.5rem"
          borderRadius="2rem"
          backgroundColor={colors.point}
          color={colors.white}
        >
          {badge}
        </Badge>
      )}
    </HStack>
  )
}

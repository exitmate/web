'use client'

import FallbackImage from '@/assets/images/project_fallback.webp'
import colors from '@/utils/colors'
import styled from '@emotion/styled'
import Image from 'next/image'
import Badge from './common/Badge'
import BookMark from './common/BookMark'

interface CardProps {
  title: string
  createdAt: Date
  deadline: Date | null
  logoSrc: string | null
  host: string
  id: string
  onClick: (id: string) => void
}

const renderDate = (date: Date | null) => {
  if (!date) return '없음'
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const renderDeadline = (date: Date | null) => {
  if (!date) return '상시'
  const now = new Date()

  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'D-DAY'
  if (diffDays > 0) return `D-${diffDays}`
  return `D+${Math.abs(diffDays)}`
}

export const ProgramCard = ({
  title,
  logoSrc,
  createdAt,
  deadline,
  host,
  id,
  onClick,
}: CardProps) => {
  return (
    <CardContainer onClick={() => onClick(id)}>
      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
        <Badge content={renderDeadline(deadline ? new Date(deadline) : null)} />
      </div>
      <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
        <BookMark isBookmarked={false} />
      </div>
      <ImageContainer>
        <StyledImage src={logoSrc || FallbackImage} alt={title} width={100} height={67} />
      </ImageContainer>
      <HorizontalLine />
      <TextContainer>
        <CenterName>{host}</CenterName>
        <CardTitle>{title}</CardTitle>
        <DeadlineSection>
          <DeadlineLabel>마감</DeadlineLabel>
          <DeadlineDate>{renderDate(deadline ? new Date(deadline) : null)}</DeadlineDate>
        </DeadlineSection>
        <PostedSection>
          <PostedLabel>공고</PostedLabel>
          <PostedDate>{renderDate(createdAt)}</PostedDate>
        </PostedSection>
      </TextContainer>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  border: 1px solid ${colors.gray[3]};
  background-color: ${colors.white};
  border-radius: 24px;
  width: 227px;
  height: 270px;
  text-align: center;
  flex: 1;
  cursor: pointer;
`

const ImageContainer = styled.div`
  display: flex;
  height: 120px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)`
  max-height: 67px;
  max-width: 100px;
  object-fit: contain;
`

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[3]};
`

const TextContainer = styled.div`
  padding: 20px;
  margin-top: 8px;
  text-align: left;
  box-sizing: border-box;
`

const CenterName = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.black};
`

const CardTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.black};
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DeadlineSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`

const DeadlineLabel = styled.p`
  font-weight: 700;
  color: ${colors.point};
  font-size: 16px;
`

const DeadlineDate = styled.p`
  font-weight: 600;
  color: ${colors.gray[7]};
  font-size: 16px;
`

const PostedSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`

const PostedLabel = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[6]};
`

const PostedDate = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[6]};
`

export default ProgramCard

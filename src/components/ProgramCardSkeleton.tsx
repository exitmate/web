'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const ProgramCardSkeleton = () => {
  return (
    <CardContainer aria-hidden="true" role="presentation">
      <BadgeSlot>
        <BadgePill />
      </BadgeSlot>

      <BookmarkSlot>
        <BookmarkCircle />
      </BookmarkSlot>

      <ImageContainer>
        <LogoSkeleton />
      </ImageContainer>

      <HorizontalLine />

      <TextContainer>
        <HostBar />

        <TitleBar />
        <TitleBar short />

        <DeadlineSection>
          <DeadlineLabelBar />
          <DeadlineValueBar />
        </DeadlineSection>

        <PostedSection>
          <PostedLabelBar />
          <PostedValueBar />
        </PostedSection>
      </TextContainer>
    </CardContainer>
  )
}

const pulseKeyframes = keyframes`
  0%   { background-color: rgba(165,165,165,0.10); }
  50%  { background-color: rgba(165,165,165,0.30); }
  100% { background-color: rgba(165,165,165,0.10); }
`

const pulse = css`
  animation: ${pulseKeyframes} 1.8s ease-in-out infinite;
`

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #e5e7eb;            /* colors.gray[3] 정도 */
  background-color: #fff;
  border-radius: 24px;
  width: 227px;
  height: 270px;
  text-align: center;
  flex: 1;
  cursor: default;
`

const BadgeSlot = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const BookmarkSlot = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
`

const ImageContainer = styled.div`
  display: flex;
  height: 120px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb; /* colors.gray[3] */
`

const TextContainer = styled.div`
  padding: 20px;
  margin-top: 8px;
  text-align: left;
  box-sizing: border-box;
`

const DeadlineSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`

const PostedSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`

const BadgePill = styled.div`
  width: 68px;
  height: 26px;
  border-radius: 9999px;
  ${pulse}
`

const BookmarkCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  ${pulse}
`

const LogoSkeleton = styled.div`
  width: 100px;
  height: 67px;
  border-radius: 8px;
  ${pulse}
`

const HostBar = styled.div`
  width: 40%;
  height: 12px;
  border-radius: 6px;
  ${pulse}
`

const TitleBar = styled.div<{ short?: boolean }>`
  margin-top: 6px;
  width: ${({ short }) => (short ? '75%' : '100%')};
  height: 16px;
  border-radius: 6px;
  ${pulse}
`

const DeadlineLabelBar = styled.div`
  width: 36px;
  height: 16px;
  border-radius: 6px;
  ${pulse}
`

const DeadlineValueBar = styled.div`
  width: 80px;
  height: 16px;
  border-radius: 6px;
  ${pulse}
`

const PostedLabelBar = styled.div`
  width: 32px;
  height: 12px;
  border-radius: 6px;
  ${pulse}
`

const PostedValueBar = styled.div`
  width: 90px;
  height: 12px;
  border-radius: 6px;
  ${pulse}
`
'use client'

import styled from '@emotion/styled'
import Card from './common/Card'

export const UserCardSkeleton = () => {
  return (
    <Card>
      <CircleSkeleton />
      <TitleContainer>
        <LineSkeleton width="120px" height="18px" />
        <LineSkeleton width="100px" height="18px" />
      </TitleContainer>
      <ProgramCountSkeleton>
        <LineSkeleton width="40px" height="36px" />
      </ProgramCountSkeleton>
    </Card>
  )
}

const SkeletonBase = styled.div<{ width?: string; height?: string; radius?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  border-radius: ${({ radius }) => radius || '4px'};
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

const CircleSkeleton = styled(SkeletonBase)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const LineSkeleton = styled(SkeletonBase)``

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`

const ProgramCountSkeleton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

export default UserCardSkeleton
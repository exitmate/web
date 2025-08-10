'use client'

import colors from '@/utils/colors'
import styled from '@emotion/styled'
import Image from 'next/image'
import Card from './common/Card'

interface UserCardProps {
  imageUrl: string
  title: string[]
  programCount: number
}

export const UserCard = ({ imageUrl, title, programCount }: UserCardProps) => {
  return (
    <Card>
      <Image src={imageUrl} alt="user" width={24} height={24} />
      <TitleContainer>
        {title.map((line, index) => (
          <TitleText key={index}>{line}</TitleText>
        ))}
      </TitleContainer>
      <ProgramCountText>{programCount}</ProgramCountText>
    </Card>
  )
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`

const TitleText = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.black};
  margin: 0;
`

const ProgramCountText = styled.p`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 36px;
  font-weight: 700;
  color: ${colors.point};
`

export default UserCard

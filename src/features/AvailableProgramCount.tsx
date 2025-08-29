import MyIcon from '@/assets/icons/my.svg'
import todayIcon from '@/assets/icons/today.svg'
import UserCard from '@/components/UserCard'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const TodayTextComponent = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return (
    <TodayText>
      <ColoredText>{year}</ColoredText>년 <ColoredText>{month}</ColoredText>월{' '}
      <ColoredText>{day}</ColoredText>일 현재 지원 가능한
    </TodayText>
  )
}

export const AvailableProgramCount = () => {
  const { status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const { data } = useQuery({
    queryKey: ['projects-count'],
    queryFn: () => {
      return fetch('/api/projects/count')
        .then((res) => res.json())
        .catch(() => {
          return { data: { myAppliableCount: 0, todayAppliableCount: 0 } }
        })
    },
    enabled: isLoggedIn,
  })

  console.log(data?.data)

  const { member } = useUserStore()
  return (
    <AvailableProgramCountContainer>
      <TextContainer>
        <TodayTextComponent />
        <BlackBoldText> 지원 사업 정보</BlackBoldText>
      </TextContainer>
      {isLoggedIn ? (
      <ProgramCardContainer>
        <UserCard
          imageUrl={MyIcon}
          title={[`${member.name}님이 신청가능한`, '지원사업 개수']}
          programCount={data?.data.myAppliableCount}
        />
        <UserCard
          imageUrl={todayIcon}
          title={[`오늘 신청가능한`, '모든 지원사업 개수']}
          programCount={data?.data.todayAppliableCount}
        />
      </ProgramCardContainer>
      ) : (
        <Text>로그인 후 이용해주세요.</Text>
      )}
    </AvailableProgramCountContainer>
  )
}

const AvailableProgramCountContainer = styled.div`
  display: flex;
  padding: 52px 0 80px 0;
  justify-content: space-between;
`

const TodayText = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[7]};
`

const ColoredText = styled.span`
  color: ${colors.point};
  font-weight: 700;
`

const BlackBoldText = styled.p`
  font-size: 32px;
  color: ${colors.black};
  font-weight: 700;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export default AvailableProgramCount

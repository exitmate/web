'use client'

import KakaoLogin from '@/assets/images/kakao_login.png'
import PaddedBox from '@/components/common/PaddedBox'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postAuth = searchParams.get('postAuth') === '1'
  const { status } = useSession()
  const { member } = useUserStore()

  useEffect(() => {
    if (!postAuth || status !== 'authenticated') return
    router.replace(member?.name ? '/' : '/signup')
  }, [postAuth, status, router, member])

  return (
    <PaddedBox
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: '20px',
      gap: '72px',
    }}>
      <LoginTitleContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginSubTitle>원하시는 로그인 방법을 선택하세요</LoginSubTitle>
      </LoginTitleContainer>
      <LoginBox>
        <KakaoLoginButton src={KakaoLogin} alt="Kakao Login" onClick={() =>
          signIn('kakao', { callbackUrl: '/login?postAuth=1' })
        }/>
      </LoginBox>
    </PaddedBox>
  )
}

const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const LoginTitle = styled(Text)`
  font-size: 40px;
  font-weight: 700;
  color: ${colors.gray[8]};
`

const LoginSubTitle = styled(Text)`
  font-size: 24px;
  font-weight: 400;
  color: ${colors.gray[7]};
`

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${colors.gray[1]};
  height: 346px;
`

const KakaoLoginButton = styled(Image)`
  cursor: pointer;
  width: 366px;
  height: 90px;
`
'use client'

import LogoImage from '@/assets/icons/logo.svg'
import PaddedBox from '@/components/common/PaddedBox'
import SearchBar from '@/components/common/SearchBar'
import colors from '@/utils/colors'
import styled from '@emotion/styled'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const Menu = () => {
  return (
    <MenuContainer>
      <span>맞춤 지원사업 찾기</span>
      <span>폐업 일정 관리</span>
      <span><span style={{ color: colors.point }}>AI</span>에게 물어보기</span>
    </MenuContainer>
  )
}

export const Header = () => {
  const { status } = useSession()
  const router = useRouter()
  const isUser = status === 'authenticated'
  const pathname = usePathname()
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup')
  return (
    <PaddedBox>
      <HeaderContainer>
        <ContentsContainer>
          <ImageContainer>
            <Image src={LogoImage} alt="Logo" width={80} height={80} onClick={() => router.push('/')} style={{ cursor: 'pointer' }} />
          </ImageContainer>
          {isAuthPage ? <Menu /> : <SearchBar />}
          {isUser ? (
            <MyPageText onClick={() => signOut()}>로그아웃</MyPageText>
          ) : (
            <MyPageText onClick={() => router.push('/login')}>로그인</MyPageText>
          )}
        </ContentsContainer>
      </HeaderContainer>
    </PaddedBox>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`

const ContentsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  justify-content: center;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const MyPageText = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.black};
  cursor: pointer;
`

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  color: ${colors.gray[8]};
  font-size: 16px;
  font-weight: 700;
`;
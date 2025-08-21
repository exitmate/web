"use client";
import PaddedBox from "@/components/common/PaddedBox";
import { ChatBox } from "@/features/chat/ChatBox";
import { SignUpStepCards } from "@/features/signup/SignUpStepCards";
import colors from "@/utils/colors";
import styled from "@emotion/styled";

const SignupDetailPage = () => {
  return (
    <PaddedBox
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '20px',
      }}
    >
      <SignupPageContainer>
        <TitleText>회원가입</TitleText>
        <SignUpStepCards step={2} />
        <ChatBox />
      </SignupPageContainer>
    </PaddedBox>
  )
}

const TitleText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.gray[7]};
`;

const SignupPageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 590px;
  align-items: center;
  flex-direction: column;
  gap: 28px;
`

export default SignupDetailPage

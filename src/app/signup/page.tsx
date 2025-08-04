"use client";
import { PaddedBox } from "@/components/common/PaddedBox";
import { SignUpForm } from "@/features/signup/SignUpForm";
import { SignUpStepCards } from "@/features/signup/SignUpStepCards";
import colors from "@/utils/colors";
import styled from "@emotion/styled";

export const SignupPage = () => {
  return (
    <PaddedBox style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "20px" }}>
      <SignupPageContainer>
        <TitleText>회원가입</TitleText>
        <SignUpStepCards step={1} />
        <SignUpForm />
      </SignupPageContainer>
    </PaddedBox>
  );
};

const SignupPageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 590px;
  align-items: center;
  flex-direction: column;
  gap: 28px;
`;

const TitleText = styled.p`
  font-size: 40px;
  font-weight: 700;
  color: ${colors.gray[8]};
`;

export default SignupPage;
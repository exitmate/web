"use client";
import Spacing from "@/components/common/Spacing";
import colors from "@/utils/colors";
import styled from "@emotion/styled";

interface SignupStepCardProps {
  disabled?: boolean;
  step: number;
  title: string;
  description: string;
}

interface SignupStepCardContentProps {
  step: number;
}

const SignupStepCard = ({ step, title, description, disabled }: SignupStepCardProps) => {
  return (
    <SignupStepCardContainer disabled={disabled ?? false}>
      <p style={{ fontSize: "10px", fontWeight: "400" }}>STEP{step}</p>
      <Spacing height={12} />
      <p style={{ fontSize: "16px", fontWeight: "700" }}>{title}</p>
      <Spacing height={4} />
      <p style={{ fontSize: "12px", fontWeight: "400" }}>{description}</p>
    </SignupStepCardContainer>
  );
};

const SignupStepCardContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ disabled }) => disabled ? "none" : colors.point};
  align-items: center;
  color: ${({ disabled }) => disabled ? colors.gray[6] : colors.point};
  background-color: ${({ disabled }) => disabled ? colors.gray[2] : colors.white};
  width: 100%;
`;

export const SignUpStepCards = ({ step }: SignupStepCardContentProps) => {
  return (
    <SignupStepCardsContainer>
      <SignupStepCard step={1} title="기본정보 입력하기" description="소셜로그인으로 입력한 개인정보를 입력해요." disabled={!(step === 1)} />
      <SignupStepCard step={2} title="업장정보 입력하기" description="채팅을 이용해서 업장 정보를 입력해주세요." disabled={!(step === 2)} />
    </SignupStepCardsContainer>
  );
};

const SignupStepCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
`;
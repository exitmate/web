"use client";
import PaddedBox from "@/components/common/PaddedBox";
import { ChatBox } from "@/features/chat/ChatBox";
import styled from "@emotion/styled";

export const SignupDetailPage = () => {
  return (
    <PaddedBox style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "20px" }}>
      <SignupPageContainer>
        <ChatBox />
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

export default SignupDetailPage;
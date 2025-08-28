"use client";

import logo from "@/assets/icons/logo.svg";
import colors from "@/utils/colors";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <LeftContainer>
          <LogoContainer>
            <Image src={logo} alt="logo" width={48} height={32} />
            <LogoText>Exitmate</LogoText>
          </LogoContainer>
        <InfoContainer>
          <div style={{ display: 'flex', gap: '8px' }}>
            <InfoElement>
              <MaterialIcon className="material-symbols-outlined">mail</MaterialIcon>
              <span>banjjaki@exitmate.kr</span>
            </InfoElement>
            <InfoElement>
              <MaterialIcon className="material-symbols-outlined">call</MaterialIcon>
              <span>051-123-4567</span>
            </InfoElement>
          </div>
          <InfoElement>
            <MaterialIcon className="material-symbols-outlined">domain</MaterialIcon>
            <span>부산광역시 금정구 부산대학로 63번길 2</span>
          </InfoElement>
        </InfoContainer>
        <PolicyContainer>
          <span>이용약관</span>
          <span style={{ fontWeight: '700' }}>개인정보처리방침</span>
          <span>©Copyright 2025. ExitMate. All Rights Reserved.</span>
        </PolicyContainer>
        </LeftContainer>
        <MenuContainer>
          <span>맞춤 지원사업 찾기</span>
          <span>폐업 일정 관리</span>
          <span><span style={{ color: colors.point }}>AI</span>에게 물어보기</span>
        </MenuContainer>
      </ContentContainer>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[2]};
  padding: 49px;
  text-align: center;
  margin-top: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 148px;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoElement = styled.div`
  display: flex;
  gap: 8px;
  color: ${colors.gray[7]};
  align-items: center;
  font-size: 12px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MaterialIcon = styled.span`
  font-size: 16px;
  font-weight: 300;
`;

const LogoText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.black};
`;

const PolicyContainer = styled.div`
  display: flex;
  gap: 8px;
  color: ${colors.gray[8]};
  font-size: 12px;
`;


const MenuContainer = styled.div`
  display: flex;
  gap: 40px;
  color: ${colors.gray[8]};
  font-size: 16px;
  font-weight: 700;
`;

export default Footer;
"use client";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";

interface CardProps {
  programCount: number;
  title: string[];
  iconUrl: string;
}

export const Card = ({ programCount, title, iconUrl }: CardProps) => {
  return (
    <CardContainer>
      <Image src={iconUrl} alt="icon" width={24} height={24} />
      <TitleContainer>
        {title.map((line, index) => (
          <TitleText key={index}>{line}</TitleText>
        ))}
      </TitleContainer>
      <ProgramCountText>{programCount}</ProgramCountText>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 16px;
  width: 228px;
  height: 176px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

const TitleText = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.black};
  margin: 0;
`;

const ProgramCountText = styled.p`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 36px;
  font-weight: 700;
  color: ${colors.point};
`;

export default Card;
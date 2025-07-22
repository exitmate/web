"use client";

import CardImage from "@/assets/temp/card-example.png";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import Badge from "./Badge";

interface CardProps {
  title: string;
  postedDate: string;
  deadline: string;
  imageUrl: string;
  centerName: string;
}

export const Card = ({ title, imageUrl, postedDate, deadline, centerName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "absolute", top: "12px", right: "12px" }}>
        <Badge content="D-999" />
      </div>
      <ImageContainer>
        <StyledImage src={CardImage} alt={title} />
      </ImageContainer>
      <HorizontalLine />
      <TextContainer>
        <CenterName>{centerName}</CenterName>
        <CardTitle>{title}</CardTitle>
        <DeadlineSection>
          <DeadlineLabel>마감</DeadlineLabel>
          <DeadlineDate>{deadline}</DeadlineDate>
        </DeadlineSection>
        <PostedSection>
          <PostedLabel>공고</PostedLabel>
          <PostedDate>{postedDate}</PostedDate>
        </PostedSection>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  border: 1px solid ${colors.gray[3]};
  background-color: ${colors.white};
  border-radius: 24px;
  width: 227px;
  height: 270px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding: 28px 0 16px 0;
  justify-content: center;
  align-items: center;
  `;
  
  const StyledImage = styled(Image)`
  width: auto;
  min-height: 67px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[3]};
`;

const TextContainer = styled.div`
  padding: 20px;
  margin-top: 8px;
  text-align: left;
`;

const CenterName = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.black};
`;

const CardTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.black};
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeadlineSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const DeadlineLabel = styled.p`
  font-weight: 700;
  color: ${colors.point};
  font-size: 16px;
`;

const DeadlineDate = styled.p`
  font-weight: 600;
  color: ${colors.gray[7]};
  font-size: 16px;
`;

const PostedSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const PostedLabel = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[6]};
`;

const PostedDate = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[6]};
`;

export default Card;

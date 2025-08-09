"use client";
import colors from "@/utils/colors";
import styled from "@emotion/styled";

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <CardContainer>
      {children}
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

export default Card;
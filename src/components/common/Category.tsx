"use client";

import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

interface CategoryProps {
  category: string;
  setCategory: (category: string) => void;
  contents: string[];
}

export const Category = ({ category, contents, setCategory }: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CategoryContainer onClick={() => setIsOpen(!isOpen)}>
      <p>{category}</p>
      <ArrowDownSection isOpen={isOpen}>
        <Image src={ArrowDownIcon} alt="arrow-down" width={24} height={24} />
      </ArrowDownSection>
      {isOpen && (
        <CategoryContents>
          {contents.map((content) => (
            <p key={content} onClick={() => setCategory(content)}>{content}</p>
          ))}
        </CategoryContents>
      )}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 16px;
  gap: 8px;
  width: fit-content;
  height: 40px;
  border: 1px solid ${colors.gray[6]};
  border-radius: 8px;
  background-color: ${colors.white};
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[7]};
`;

const ArrowDownSection = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transform: ${({ isOpen }) => isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease;
`;

const CategoryContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  gap: 8px;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: fit-content;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[6]};
`;


export default Category;
"use client";

import ArrowLeftEndIcon from "@/assets/icons/arrow-left-end.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightEndIcon from "@/assets/icons/arrow-right-end.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";

interface PageNationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const PageNation = ({ currentPage, setCurrentPage, totalPages }: PageNationProps) => {
  const currentGroup = Math.floor((currentPage - 1) / 5);
  const startPage = currentGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);
  
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <PageNationContainer>
      <ArrowSection>
        <ArrowButton onClick={handleFirstPage} disabled={currentPage === 1}>
          <Image src={ArrowLeftEndIcon} alt="left-arrow-end" width={24} height={24} />
        </ArrowButton>
        <ArrowButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <Image src={ArrowLeftIcon} alt="left-arrow" width={24} height={24} />
        </ArrowButton>
      </ArrowSection>
      <PageNumberSection>
        {pageNumbers.map((page) => (
          <PageNumber
            key={page}
            isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageNumber>
        ))}
      </PageNumberSection>
      <ArrowSection>
        <ArrowButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <Image src={ArrowRightIcon} alt="right-arrow" width={24} height={24} />
        </ArrowButton>
        <ArrowButton onClick={handleLastPage} disabled={currentPage === totalPages}>
          <Image src={ArrowRightEndIcon} alt="right-arrow-end" width={24} height={24} />
        </ArrowButton>
      </ArrowSection>
    </PageNationContainer>
  );
}

const PageNationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 276px;
  height: 28px;
  gap: 12px;
`;

const ArrowSection = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

const PageNumberSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
`;

const PageNumber = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: transparent;
  color: ${({ isActive }) => isActive ? colors.point : colors.gray[6]};
  border: none;
  border-bottom: 2px solid ${({ isActive }) => isActive ? colors.point : 'transparent'};
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ isActive }) => isActive ? 700 : 500};
  transition: all 0.2s;
`;

export default PageNation;
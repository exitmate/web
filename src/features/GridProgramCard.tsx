import PageNation from "@/components/common/PageNation";
import ProgramCard from "@/components/ProgramCard";
import { programList } from "@/utils/mocks";
import { Filter } from "@/utils/types";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import FilterSection from "./FilterSection";

export const GridProgramCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(programList.length / 15);

  const startIndex = (currentPage - 1) * 15;
  const currentPagePrograms = programList.slice(startIndex, startIndex + 15);

  const [filter, setFilter] = useState<Filter>({
    deadlineType: "모집 유형",
    supportType: "지원 유형",
    highAmountOrder: true,
    onlySuitableForMe: true,
  });

    return (
      <div>
      <FilterSection filter={filter} setFilter={setFilter} />
      <GridProgramCardContainer>
      <FlexContainer>
        {Array.from({ length: Math.ceil(currentPagePrograms.length / 5) }, (_, rowIndex) => (
          <Flex key={rowIndex} gap={4} width="100%">
            {Array.from({ length: 5 }, (_, colIndex) => {
              const programIndex = rowIndex * 5 + colIndex;
              const program = currentPagePrograms[programIndex];
              
              return program ? (
                <ProgramCard key={programIndex} {...program} />
              ) : (
                <EmptyCard key={programIndex} />
              );
            })}
          </Flex>
        ))}
      </FlexContainer>
      <PageNation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        />
      </GridProgramCardContainer>
    </div>
  )
};

const GridProgramCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  gap: 48px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const EmptyCard = styled.div`
  width: 227px;
  height: 270px;
  background: transparent;
  flex: 1;
  min-width: 0;
`;

export default GridProgramCard;
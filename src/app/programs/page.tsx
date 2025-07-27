"use client";

import Category from "@/components/common/Category";
import PaddedBox from "@/components/common/PaddedBox";
import PageNation from "@/components/common/PageNation";
import Toggle from "@/components/common/Toggle";
import AvailableProgramCount from "@/features/AvailableProgramCount";
import FilterSection from "@/features/FilterSection";
import RecommendedProgramList from "@/features/RecommendedProgramList";
import { Filter } from "@/utils/types";
import { useState } from "react";

export const ProgramsPage = () => {

  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const [filter, setFilter] = useState<Filter>({
    deadlineType: "모집 유형",
    supportType: "지원 유형",
    highAmountOrder: true,
    onlySuitableForMe: true,
  });

  return (
    <div>
      <RecommendedProgramList />
      <PaddedBox>
        <AvailableProgramCount />
        <FilterSection filter={filter} setFilter={setFilter} />
      </PaddedBox>
      <Toggle isOn={isOn} setIsOn={setIsOn} />
        <Category category={filter.deadlineType} contents={["상시모집", "마감일 존재"]} setCategory={(category) => setFilter({ ...filter, deadlineType: category })} />
      <PageNation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  ); 
}

export default ProgramsPage;
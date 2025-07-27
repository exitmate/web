"use client";

import Category from "@/components/common/Category";
import PaddedBox from "@/components/common/PaddedBox";
import PageNation from "@/components/common/PageNation";
import Toggle from "@/components/common/Toggle";
import AvailableProgramCount from "@/features/AvailableProgramCount";
import RecommendedProgramList from "@/features/RecommendedProgramList";
import { useState } from "react";

export const ProgramsPage = () => {

  const [isOn, setIsOn] = useState(false);
  const [category, setCategory] = useState("마감 유형");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <div>
      <RecommendedProgramList />
      <PaddedBox>
        <AvailableProgramCount />
      </PaddedBox>
      <Toggle isOn={isOn} setIsOn={setIsOn} />
      <Category category={category} contents={["상시모집", "마감일 존재"]} setCategory={setCategory} />
      <PageNation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  ); 
}

export default ProgramsPage;
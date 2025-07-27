"use client";

import MyIcon from "@/assets/icons/my.svg";
import Category from "@/components/common/Category";
import PageNation from "@/components/common/PageNation";
import Toggle from "@/components/common/Toggle";
import ProgramCard from "@/components/ProgramCard";
import UserCard from "@/components/UserCard";
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
      <AvailableProgramCount />
      <ProgramCard 
        title="2025년 부산시 소상공인 사업 정리 도우미 지원 사업"
        imageUrl="/path/to/image.jpg"
        postedDate="2023-03-27"
        deadline="2023-12-31"
        centerName="부산시소상공인종합지원센터"
      />
      <UserCard
        imageUrl={MyIcon}
        title={["김이름님이 신청가능한", "지원사업 개수"]}
        programCount={10}
      />
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
import MyIcon from "@/assets/icons/my.svg";
import Card from "@/components/Card";
import ProgramCard from "@/features/ProgramCard";

export const ProgramsPage = () => {
  return (
    <div>
      <ProgramCard 
        title="2025년 부산시 소상공인 사업 정리 도우미 지원 사업"
        imageUrl="/path/to/image.jpg"
        postedDate="2023-03-27"
        deadline="2023-12-31"
        centerName="부산시소상공인종합지원센터"
      />
      <Card programCount={10} title={["김이름님이 신청가능한", "지원사업 개수"]} iconUrl={MyIcon} />
    </div>
  ); 
}

export default ProgramsPage;
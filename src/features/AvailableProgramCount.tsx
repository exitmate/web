import MyIcon from "@/assets/icons/my.svg";
import UserCard from "@/components/UserCard";
import colors from "@/utils/colors";
import styled from "@emotion/styled";

const TodayTextComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return (
    <TodayText>
      <ColoredText>{year}</ColoredText>년{" "}
      <ColoredText>{month}</ColoredText>월{" "}
      <ColoredText>{day}</ColoredText>일 현재 지원 가능한
    </TodayText>
  );
};

export const AvailableProgramCount = () => {
  return (
    <AvailableProgramCountContainer>
      <TextContainer>
        <TodayTextComponent />
        <BlackBoldText> 지원 사업 정보</BlackBoldText>
      </TextContainer>
      <ProgramCardContainer>
        <UserCard
          imageUrl={MyIcon}
          title={["김이름님이 신청가능한", "지원사업 개수"]}
          programCount={10}
        />
        <UserCard
          imageUrl={MyIcon}
          title={["김이름님이 신청가능한", "지원사업 개수"]}
          programCount={10}
        />
      </ProgramCardContainer>
    </AvailableProgramCountContainer>
  );
};

const AvailableProgramCountContainer = styled.div`
  display: flex;
  padding: 52px 0 80px 0;
  justify-content: space-between;
`;

const TodayText = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[7]};
`;

const ColoredText = styled.span`
  color: ${colors.point};
  font-weight: 700;
`;

const BlackBoldText = styled.p`
  font-size: 32px;
  color: ${colors.black};
  font-weight: 700;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export default AvailableProgramCount;
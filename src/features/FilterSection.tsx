import Category from "@/components/common/Category";
import Toggle from "@/components/common/Toggle";
import colors from "@/utils/colors";
import { Filter } from "@/utils/types";
import styled from "@emotion/styled";

export const FilterSection = ({ filter, setFilter }: { filter: Filter, setFilter: (filter: Filter) => void }) => {
  return (
    <FilterContainer>
      <CategoryContainer>
        <Category category={filter.deadlineType} setCategory={(category) => setFilter({ ...filter, deadlineType: category })} contents={["상시모집", "마감일 존재"]} />
        <Category category={filter.supportType} setCategory={(category) => setFilter({ ...filter, supportType: category })} contents={["지원 유형", "지원 유형"]} />
      </CategoryContainer>
      <ToggleContainer>
        <ToggleText>나에게 맞는 지원사업만 보기</ToggleText>
        <Toggle isOn={filter.highAmountOrder} setIsOn={(isOn) => setFilter({ ...filter, highAmountOrder: isOn })} />
      </ToggleContainer>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
`;

const ToggleText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray[7]};
`;

export default FilterSection;
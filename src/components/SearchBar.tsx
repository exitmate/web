import SearchIcon from "@/assets/icons/search.svg";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";

export const SearchBar = () => {
  return (
    <InputContainer>
      <Input type="text" placeholder="궁금한 지원사업을 검색하세요" />
      <SearchIconContainer>
        <Image src={SearchIcon} alt="Search Icon" width={24} height={24} />
      </SearchIconContainer>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  heignt: 51px;
  width: 100%;
  max-width: 872px;
  border: 1px solid ${colors.point};
  decoration: none;
  border-radius: 32px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  color: ${colors.gray[7]};
  padding: 16px 20px;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 13.5px;
`;

export default SearchBar;
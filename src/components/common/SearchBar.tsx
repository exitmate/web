import InsertIcon from "@/assets/icons/insert.svg";
import SearchBarIcon from "@/assets/icons/search-bar.svg";
import SearchIcon from "@/assets/icons/search.svg";
import colors from "@/utils/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

const SearchKeyword = ({ keyword, onClick }: { keyword: string, onClick: () => void }) => {
  return (
    <SearchKeywordContainer>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Image src={SearchBarIcon} alt="Search Icon" width={24} height={24} />
        <SearchKeywordText>{keyword}</SearchKeywordText>
      </div>
      <Image src={InsertIcon} alt="Insert Icon" width={24} height={24} onClick={onClick}/>
    </SearchKeywordContainer>
  );
}


export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  console.log(isFocused);

  const handleSetSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
  }

  return (
    <InputContainer className={isFocused ? "focused" : ""}>
        <Input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          type="text" 
          placeholder="궁금한 지원사업을 검색하세요." 
          onFocus={() => setIsFocused(true)} 
          // onBlur={() => setIsFocused(false)}
          />
        <SearchIconContainer>
          <Image src={SearchIcon} alt="Search Icon" width={24} height={24} />
        </SearchIconContainer>
      {isFocused && 
      <SearchKeywordListContainer>
        <SearchKeywordList>
          <SearchKeyword keyword="검색어1" onClick={() => setSearchKeyword("검색어1")}/>
          <SearchKeyword keyword="검색어2" onClick={() => setSearchKeyword("검색어2")}/>
          <SearchKeyword keyword="검색어3" onClick={() => setSearchKeyword("검색어3")}/>
          <SearchKeyword keyword="검색어4" onClick={() => setSearchKeyword("검색어4")}/>
        </SearchKeywordList>
          <CloseSection onClick={() => setIsFocused(false)}>
            닫기
          </CloseSection>
      </SearchKeywordListContainer>
      }
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 872px;
  box-shadow: inset 0 0 0 1px ${colors.point};
  decoration: none;
  border-radius: 32px;

  &.focused {
    width: 100%;
    box-shadow: 0px 0px 4px rgba(27, 27, 27, 0.12);
    border: none;
    border-radius: 16px 16px 0 0;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  color: ${colors.black};
  padding: 16px 20px;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 13.5px 20px;
`;

const SearchKeywordListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  border-radius: 0 0 16px 16px;
  top: 50px;
  align-items: center;
  z-index: 1000;
  box-shadow: 0px 1px 4px rgba(27, 27, 27, 0.12);
  background-color: ${colors.white};
`;

const SearchKeywordList = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[3]};
  border-bottom: 1px solid ${colors.gray[3]};
  padding: 8px 0;
  background-color: ${colors.white};
  overflow: hidden;
`;

const SearchKeywordContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
`;

const SearchKeywordText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.black};
`;

const CloseSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 51px;
  width: 100%;
  padding: 12px 20px;
  cursor: pointer;
  color: ${colors.gray[6]};
`;

export default SearchBar;
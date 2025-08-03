"use client";

import colors from "@/utils/colors";
import styled from "@emotion/styled";

interface ToggleProps {
  isOn: boolean;
  setIsOn: (isOn: boolean) => void;
}

export const Toggle = ({ isOn, setIsOn }: ToggleProps) => {
  return (
    <ToggleContainer isOn={isOn} onClick={() => {setIsOn(!isOn)}}>
      <ToggleButton isOn={isOn} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div<{ isOn: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  width: 52px;
  height: 28px;
  background-color: ${({ isOn }) => isOn ? colors.point : colors.gray[2]};
  border-radius: 16px;
`;

const ToggleButton = styled.div<{ isOn: boolean }>`
  position: absolute;
  left: ${({ isOn }) => isOn ? "28px" : "4px"};
  width: 20px;
  height: 20px;
  background-color: ${({ isOn }) => isOn ? colors.white : colors.gray[3]};
  border-radius: 100%;
  transition: all 0.3s ease;
`;

export default Toggle;
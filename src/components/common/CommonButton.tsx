import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface CommonButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const CommonButton = ({ label, disabled, onClick, type = "button" }: CommonButtonProps) => {
  return <CustomButton disabled={disabled} onClick={onClick} type={type}>{label}</CustomButton>;
};

const CustomButton = styled(Button)`
  background-color: ${({ disabled }) => disabled ? colors.gray[4] : colors.point};
  color: white;
  border-radius: 8px;
  padding: 12px 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
`; 
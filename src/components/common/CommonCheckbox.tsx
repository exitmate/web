import colors from "@/utils/colors";
import { Checkbox } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

interface CommonCheckboxProps {
  label?: string;
  register?: UseFormRegisterReturn;
}

export const CommonCheckbox = ({ label, register }: CommonCheckboxProps) => {
  return (
    <CheckboxRoot>
      <Checkbox.HiddenInput name={register?.name} {...register} />
      <CustomCheckboxControl />
      <CustomCheckboxLabel>{label}</CustomCheckboxLabel>
    </CheckboxRoot>
  );
};

const CheckboxRoot = styled(Checkbox.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CustomCheckboxControl = styled(Checkbox.Control)`
  width: 16px;
  height: 16px;
  border: 1.5px solid ${colors.gray[6]};
  border-radius: 4px;
  background-color: white;

  &[data-state="checked"] {
    background-color: ${colors.point};
    border-color: ${colors.point};
  }
`;

const CustomCheckboxLabel = styled(Checkbox.Label)`
  font-size: 16px;
  color: ${colors.gray[7]};
`;

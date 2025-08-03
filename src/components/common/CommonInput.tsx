"use client";

import colors from "@/utils/colors";
import { Input } from "@chakra-ui/react";

interface CommonInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export const CommonInput = ({ placeholder, value, onChange, isValid }: CommonInputProps) => {
  return <Input placeholder={placeholder} value={value} onChange={onChange} _invalid={{
    borderColor: colors.gray[5],
  }} />;
};
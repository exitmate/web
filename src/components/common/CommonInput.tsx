'use client'

import colors from '@/utils/colors'
import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CommonInputProps {
  placeholder: string
  type: string
  register?: UseFormRegisterReturn
  isInvalid?: boolean
  errorMessage?: string
}

export const CommonInput = ({
  placeholder,
  type,
  register,
  isInvalid,
  errorMessage,
}: CommonInputProps) => {
  return (
    <>
    <CustomInput
      placeholder={placeholder}
      type={type}
      {...(register || {})}
      isInvalid={isInvalid}
    />
    <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  )
}

const CustomInput = styled(Input, {
  shouldForwardProp: (prop) => prop !== 'isInvalid',
})<{ isInvalid?: boolean, errorMessage?: string }>`
  border-radius: 8px;
  border: 1px solid;
  padding: 12px 16px;
  font-size: 16px;
  color: ${colors.gray[7]};
  font-weight: 500;
  border-color: ${({ isInvalid }) =>
    isInvalid ? colors.gray[5] : colors.point};
  outline: none;

  &:focus {
    border-color: ${({ isInvalid }) =>
      isInvalid ? colors.gray[5] : colors.point};
    outline: none;
    box-shadow: none;
  }
`

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 12px;
  margin-top: 2px;
`
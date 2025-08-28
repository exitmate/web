import colors from '@/utils/colors'
import { Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

interface CommonButtonProps {
  label?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

export const CommonButton = ({
  label,
  disabled,
  onClick,
  type = 'button',
  style,
}: CommonButtonProps) => {
  return (
    <CustomButton disabled={disabled} onClick={onClick} type={type} style={style}>
      {label}
    </CustomButton>
  )
}

const CustomButton = styled(Button)`
  background-color: ${({ disabled }) =>
    disabled ? colors.gray[4] : colors.point};
  color: white;
  border-radius: 8px;
  padding: 12px 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

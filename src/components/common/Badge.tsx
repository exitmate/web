import colors from '@/utils/colors'
import styled from '@emotion/styled'

interface BadgeProps {
  content: string
}

export const Badge = ({ content }: BadgeProps) => {
  return (
    <BadgeContainer>
      <span>{content}</span>
    </BadgeContainer>
  )
}

const BadgeContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  padding: 4px 8px;
  background-color: ${colors.point};
  width: fit-content;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.white};
`

export default Badge

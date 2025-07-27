import styled from "@emotion/styled";

interface SpacingProps {
  height: number;
}

export const Spacing = ({ height }: SpacingProps) => {
  return <SpacingContainer height={height} />;
};

const SpacingContainer = styled.div`
  height: ${({ height }: SpacingProps) => height}px;
`;

export default Spacing;
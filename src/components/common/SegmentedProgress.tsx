import colors from "@/utils/colors";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface SegmentedProgressProps {
  total: number;
  current: number;
  height?: number;
  gap?: number;
  style?: React.CSSProperties;
}

const SegmentedProgress = ({
  total,
  current,
  height = 8,
  gap = 2,
  style,
  }: SegmentedProgressProps) => {
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.min(Math.max(0, current), safeTotal);

  return (
    <SegmentedProgressContainer>
    <Bar w="100%" h={`${height}px`} gap={`${gap}px`} style={style}>
      {Array.from({ length: safeTotal }).map((_, i) => (
        <Segment
          key={i}
          $active={i < safeCurrent}
          isFirst={i === 0}
          isLast={i === safeTotal - 1}
        />
      ))}
    </Bar>
    <ProgressText><span style={{ color: colors.point }}>{current}</span> / {total}</ProgressText>
    </SegmentedProgressContainer>
  );
};

const SegmentedProgressContainer = styled(Flex)`
  width: 100%;
  align-items: center;
  gap: 8px;
  padding: 0 62px;
`;

const Bar = styled(Flex)`
`;

const Segment = styled.div<{ $active: boolean; isFirst: boolean; isLast: boolean }>`
  flex: 1;
  height: 100%;
  border-radius: ${({ isFirst, isLast }) => isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : '0'};
  background: ${({ $active }) => ($active ? colors.point : colors.gray[3])};
  transition: background 180ms ease;
`;

const ProgressText = styled.div`
  color: ${colors.gray[7]};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  white-space: nowrap;
`;

export default SegmentedProgress;
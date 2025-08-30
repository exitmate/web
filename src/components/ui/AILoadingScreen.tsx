import Logo from '@/assets/icons/logo.svg';
import colors from '@/utils/colors';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

export const AILoadingScreen = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [dots, setDots] = React.useState('');

  const steps = [
    '서류를 분석하고 있습니다',
    '필요한 정보를 추출하고 있습니다', 
    '문서 양식을 준비하고 있습니다',
    '최종 검토를 진행하고 있습니다'
  ];

  React.useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    const dotsTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);

    return () => {
      clearInterval(stepTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <LoadingContainer>
      <ContentWrapper>
        <IconContainer>
          <AIBox>
            <Image src={Logo} alt="AI" width={24} height={24} />
          </AIBox>
          <Spinner />
        </IconContainer>
        
        <TextContainer>
          <Title>AI가 신청서를 생성하고 있습니다.</Title>
          <StatusText>{steps[currentStep]}{dots}</StatusText>
        </TextContainer>
        
        <StepsContainer>
          {steps.map((step, index) => (
            <StepItem key={index}>
              <StepDot active={index <= currentStep} />
              <StepLabel active={index === currentStep}>
                {step.replace(/하고 있습니다$/, '')}
              </StepLabel>
            </StepItem>
          ))}
        </StepsContainer>

        <ProgressContainer>
          <ProgressTrack>
            <ProgressBar progress={progress} />
          </ProgressTrack>
          <ProgressInfo>
            <span>처리 중</span>
            <span>{Math.round(progress)}%</span>
          </ProgressInfo>
        </ProgressContainer>
      </ContentWrapper>
    </LoadingContainer>
  );
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const IconContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const AIBox = styled.div`
  width: 4rem;
  height: 4rem;
  background: ${colors.white};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  .emoji {
    font-size: 1.5rem;
  }
`;

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid ${colors.gray[5]};
  border-top: 2px solid ${colors.point};
  border-radius: 50%;
  margin: 0 auto;
  animation: ${spin} 1s linear infinite;
`;

const TextContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${colors.gray[4]};
  margin: 0 0 0.75rem 0;
`;

const StatusText = styled.p`
  font-size: 0.875rem;
  color: ${colors.point};
  font-weight: 500;
  height: 1.25rem;
  margin: 0;
`;

const StepsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StepDot = styled.div<{ active: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: ${props => props.active ? colors.point : colors.gray[5]};
  transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
  ${props => props.active && css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}
`;

const StepLabel = styled.span<{ active: boolean }>`
  font-size: 0.75rem;
  transition: all 0.3s ease;
  color: ${props => props.active ? colors.point : colors.gray[4]};
  font-weight: ${props => props.active ? '500' : '400'};
`;


const ProgressContainer = styled.div`
  margin-top: 2rem;
  width: 16rem;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressTrack = styled.div`
  height: 0.25rem;
  background-color: ${colors.gray[5]};
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${colors.point}, ${colors.point});
  border-radius: 9999px;
  transition: all 0.5s ease;
  width: ${props => props.progress}%;
  animation: ${shimmer} 1s ease-in-out infinite;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${colors.gray[4]};
  margin-top: 0.5rem;
`;
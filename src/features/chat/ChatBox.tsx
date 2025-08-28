'use client';

import { CommonButton } from '@/components/common/CommonButton';
import SegmentedProgress from '@/components/common/SegmentedProgress';
import Spacing from '@/components/common/Spacing';
import useUserStore from '@/stores/user';
import colors from '@/utils/colors';
import { constraintsForField } from '@/utils/inputConstraints';
import { script as scriptData, Step } from '@/utils/scripts';
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatBubbleItem } from './ChatBubbleItem';
import { ChatInput } from './ChatInput';
import { ToggleButtonGroup } from './ToggleButtonGroup';

type Msg = {
  stepId: number;
  role: 'bot' | 'user';
  _key: string;
  contentText?: string;
  contentNode?: React.ReactNode;
}

const SignupSuccess = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  }

  return (
    <div style={{ textAlign: 'center', width: '100%', backgroundColor: colors.sub, padding: '32px 76px', borderRadius: '8px' }}>
      <Text style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: colors.gray[7],
      }}>회원가입이 완료되었습니다.</Text>
      <Spacing height={32} />
      <CommonButton label="ExitMate 서비스 이용 시작하기" style={{ width: '100%' }} onClick={handleClick} />
    </div>
  )
}

export const ChatBox = () => {
  const [messages, setMessages] = useState<Msg[]>([])
  const [inputValue, setInputValue] = useState('')
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { businessInfo, setBusinessInfo, member } = useUserStore();
  const script = useMemo(() => scriptData(businessInfo, member.name || ""), [businessInfo])
  const didAutoStartRef = useRef(false)
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isUserTurn = script[stepIndex]?.role === 'user'
  const currentPlaceholder = script[stepIndex]?.placeholder ?? '메시지를 입력해주세요.';

  useEffect(() => {
    if (didAutoStartRef.current) return;
    if (script.length === 0) return;
    if (messages.length > 0) return;
    if (streamingRef.current) return;
  
    didAutoStartRef.current = true;
    setStepIndex(0);
    pushUntilUserTurnWithDelay(700, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);
  

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isUserTurn) {
      inputRef.current?.focus();
    }
  }, [isUserTurn]);

  const currentStep = script[stepIndex];

  const streamingRef = useRef(false)

  const playBotSteps = async (steps: Step[], baseDelay = 700) => {
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
  
    for (let k = 0; k < steps.length; k++) {
      const s = steps[k];
  
      setMessages(prev => [...prev, { stepId: s.id, role: 'bot', _key: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}` }]);
      if (k === steps.length - 1 && s.input === 'select') break;
  
      const shouldDelay = s.role === 'bot' && s.input !== 'select';
      if (shouldDelay) {
        await sleep(baseDelay);
      }
    }
  };

  const pushUntilUserTurnWithDelay = async (baseDelay = 700, startAt?: number) => {
    if (streamingRef.current) return;
    streamingRef.current = true;
  
    let i = typeof startAt === 'number' ? startAt : stepIndex;
    const botSteps: Step[] = [];
    const seen = new Set<number>();
  
    while (i < script.length && script[i]?.role === 'bot') {
      if (seen.has(i)) break;
      seen.add(i);
      botSteps.push(script[i] as Step);
      i = script[i].nextId ?? i + 1;
    }
  
    if (botSteps.length) {
      await playBotSteps(botSteps, baseDelay);
    }
  
    setStepIndex(i);
    streamingRef.current = false;
  };

  const handleSelect = (selectedValue: string, selectedLabel: string, nextId: number) => {
    const current = script[stepIndex];
  
    setMessages(prev => [
      ...prev,
      { stepId: current.id, role: 'user', contentText: selectedLabel, _key: `${performance.now()}-${stepIndex}` },
    ]);
  
    if (!current.field.includes('confirm')) {
      setAnswers((prev) => ({ ...prev, [current.field]: selectedValue }));
      setBusinessInfo({ [current.field]: selectedValue });
    }
  
    const target = typeof nextId === 'number' ? nextId : (current.nextId ?? stepIndex + 1);
    setStepIndex(target);
    pushUntilUserTurnWithDelay(700, target);
  };

  const inputConstraints = constraintsForField(currentStep.field ?? '');

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (stepIndex === 55) {
      try {
        const memberResponse = await fetch('/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member),
        });
        const memberData = await memberResponse.json();
        console.log("memberData", memberData)
        const businessResponse = await fetch('/api/business', {
          method: 'POST',
          body: JSON.stringify({...businessInfo }),
        });
        const businessData = await businessResponse.json();
        setBusinessInfo(businessData.data)
        const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
      setMessages(prev => [
        ...prev,
        { stepId: -1, role: 'bot', _key: uid(), contentNode: <SignupSuccess /> },
      ]);
      } catch (error) {
        console.error(error);
      }
    }
  }
    fetchBusinessInfo()
  }, [stepIndex])

  const endStep = (id: number, content: React.ReactNode): Step => ({
    step: 7,
    field: 'end',
    id,                 // 유니크하게만
    role: 'bot',
    input: 'text',
    content,
    _key: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
  });

  const handleSend = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;
  
    const current = script[stepIndex];
    const expectingUser = current?.role === 'user';
  
    setMessages(prev => [
      ...prev,
      { stepId: current.id, role: 'user', contentText: trimmed, _key: `${performance.now()}-${stepIndex}` },
    ]);
    setInputValue('');
  
    if (expectingUser) {
      setAnswers((prev) => ({ ...prev, [current.field]: trimmed }));
      if (current.field === 'city') {
      } else if (current.field === 'county') {
        setBusinessInfo({ region: answers.city + ' ' + trimmed });
      } else if (current.field.endsWith('At')) {
        const year = parseInt(trimmed.slice(0, 4), 10);
        const month = parseInt(trimmed.slice(4, 6), 10) - 1;
        const day = parseInt(trimmed.slice(6, 8), 10);
        setBusinessInfo({ [current.field]: new Date(year, month, day) });
      }
      else {
        setBusinessInfo({ [current.field]: trimmed });
      }
  
      const target = current.nextId ?? (stepIndex + 1);
      setStepIndex(target);
      pushUntilUserTurnWithDelay(700, target);
    }
  };

  const renderContent = (step: Step, fallbackUserText?: string) => {
    if (step.role === 'user' && fallbackUserText) return fallbackUserText;
  
    const c = step.content;
    if (typeof c === 'function') {
      return (c as (ctx:{businessInfo: typeof businessInfo; userName:string}) => React.ReactNode)({
        businessInfo,
        userName: member.name || '',
      });
    }
    return c;
  };

  return (
    <>
      <SegmentedProgress total={7} current={script[stepIndex].step} />
      <ChatBoxContainer ref={chatContainerRef}>
        {messages.map((m, idx) => {
          const step = script[m.stepId]
          if (!step && m.contentNode) {
            return (
              <div key={m._key}>{m.contentNode}</div>
            );
          }        
          if (step.role === 'bot' && step.input === 'select' && step.options) {
            if (answers[m.stepId]) return null;
            return (
              <ToggleButtonGroup
                key={m._key}
                items={step.options}
                setValue={handleSelect}
              />
            )
          } else {
              return <ChatBubbleItem key={m._key} message={renderContent(step, m.contentText)} isUser={m.role === 'user'} title={step.title} index={idx} />
          }
        })} 
      </ChatBoxContainer>

      <ChatInput
        ref={inputRef }
        onSend={handleSend}
        placeholder={currentPlaceholder}
        value={inputValue}
        onChange={setInputValue}
        disabled={!isUserTurn}
        constraints={inputConstraints}
      />
    </>
  )
}

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 380px;
  overflow-y: auto;
  padding: 36px 0;
  gap: 8px;

  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  scrollbar-width: thin;
  scrollbar-color: ${colors.gray[3]} transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[3]};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.gray[4]};
  }
`

const Debug = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
`

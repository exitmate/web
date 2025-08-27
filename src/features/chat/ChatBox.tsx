import { BusinessInfoInputSchema } from '@/app/api/business/schema';
import SegmentedProgress from '@/components/common/SegmentedProgress';
import useUserStore from '@/stores/user';
import colors from '@/utils/colors';
import { constraintsForField } from '@/utils/inputConstraints';
import { script as scriptData, Step } from '@/utils/scripts';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ChatBubbleItem } from './ChatBubbleItem';
import { ChatInput } from './ChatInput';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export const ChatBox = () => {
  const [messages, setMessages] = useState<Step[]>([])
  const [inputValue, setInputValue] = useState('')
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { businessInfo, setBusinessInfo, member } = useUserStore();
  const script = useMemo(() => scriptData(businessInfo, member.name || ""), [businessInfo])
  const didAutoStartRef = useRef(false)

  const { register, handleSubmit, formState: { errors } } = useForm<z.input<typeof BusinessInfoInputSchema>>({
    resolver: zodResolver(BusinessInfoInputSchema),
  })

  console.log(businessInfo)

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

  const currentStep = script[stepIndex];

  const streamingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
  }

  const playBotSteps = async (steps: Step[], baseDelay = 700) => {
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
  
    for (let k = 0; k < steps.length; k++) {
      const s = steps[k];
  
      setMessages(prev => [...prev, { ...s, _key: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}` }]);
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
  
    setMessages((prev) => [
      ...prev,
      { ...current, _key: `${performance.now()}-${stepIndex}`, role: 'user', input: 'text', content: selectedLabel },
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

  const handleSend = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;
  
    const current = script[stepIndex];
    const expectingUser = current?.role === 'user';
  
    setMessages((prev) => [
      ...prev,
      { ...(current as Step), _key: `${performance.now()}-${stepIndex}`, input: 'text', content: trimmed, role: 'user' },
    ]);
    setInputValue('');
  
    if (expectingUser) {
      setAnswers((prev) => ({ ...prev, [current.field]: trimmed }));
      if (current.field === 'city') {
      } else if (current.field === 'county') {
        setBusinessInfo({ region: answers.city + ' ' + trimmed });
      } else if (current.field.endsWith('At')) {
        setBusinessInfo({ [current.field]: new Date(trimmed) });
      }
      else {
        setBusinessInfo({ [current.field]: trimmed });
      }
  
      const target = current.nextId ?? (stepIndex + 1);
      setStepIndex(target);
      pushUntilUserTurnWithDelay(700, target);
    }
  };

  const isUserTurn = script[stepIndex]?.role === 'user'
  const currentPlaceholder = script[stepIndex]?.placeholder ?? '메시지를 입력해주세요.';

  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  }

  return (
    <>
      <SegmentedProgress total={7} current={script[stepIndex].step} />
      <ChatBoxContainer ref={chatContainerRef}>
        {messages.map((m, idx) => (
          m.input === 'select' && m.options ? (
            !answers[m.field] && <ToggleButtonGroup
            key={m._key}
            items={m.options}
            setValue={handleSelect}
          />
          ) : ( 
            <ChatBubbleItem key={m._key} message={m.content} isUser={m.role === 'user'} title={m.title} index={idx} />
          )
        ))} 
      </ChatBoxContainer>

      <ChatInput
        onSend={handleSend}
        placeholder={currentPlaceholder}
        value={inputValue}
        onChange={setInputValue}
        disabled={!isUserTurn}
        constraints={inputConstraints}
      />

      <Debug>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
        <pre>{JSON.stringify(stepIndex, null, 2)}</pre>
      </Debug>
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

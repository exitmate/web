import { BusinessInfoInputSchema } from '@/app/api/business/schema';
import SegmentedProgress from '@/components/common/SegmentedProgress';
import useUserStore from '@/stores/user';
import colors from '@/utils/colors';
import { constraintsForField } from '@/utils/inputConstraints';
import { script as scriptData, Step } from '@/utils/scripts';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ChatBubbleItem } from './ChatBubbleItem';
import { ChatInput } from './ChatInput';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export const ChatBox = () => {
  const [messages, setMessages] = useState<Step[]>([])
  const [inputValue, setInputValue] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { businessInfo, setBusinessInfo } = useUserStore();
  const script = scriptData(businessInfo)

  const { register, handleSubmit, formState: { errors } } = useForm<z.input<typeof BusinessInfoInputSchema>>({
    resolver: zodResolver(BusinessInfoInputSchema),
  })

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const stepIndexRef = useRef(index)
  console.log(stepIndexRef.current)
  const currentStep = script[stepIndexRef.current];
  console.log(script)
  console.log(currentStep)
  useEffect(() => { stepIndexRef.current = index }, [index])

  const streamingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
  }
  useEffect(() => () => clearAllTimers(), [])

  const pushUntilUserTurnWithDelay = (gapMs: number = 600) => {
    if (streamingRef.current) return;
    streamingRef.current = true;
  
    let i = stepIndexRef.current;
    const botSteps: Step[] = [];
    while (
      i < script.length &&
      script[i]?.role === 'bot'
    ) {
      // role이 string이 아니라 "bot" 리터럴 타입이어야 하므로 타입 단언 추가
      botSteps.push({ ...script[i], role: "bot" } as Step);
      i = script[i].nextId ?? i + 1;
    }

    stepIndexRef.current = i;
    setIndex(i);
  
    if (botSteps.length === 0) {
      streamingRef.current = false;
      return;
    }
  
    botSteps.forEach((step, idx) => {
      const t = window.setTimeout(() => {
        setMessages(prev => [...prev, { ...step, id: Date.now() }]);
        if (idx === botSteps.length - 1) streamingRef.current = false;
      }, idx * gapMs);
      timersRef.current.push(t);
    });
  };

const handleSelect = (selectedValue: string, selectedLabel: string, nextId: number) => {
  const current = script[stepIndexRef.current];
  console.log(selectedValue, selectedLabel, nextId)

  setMessages(prev => [
    ...prev,
    { ...current, id: Date.now(), role: 'user', input: 'text', content: selectedLabel } as Step,
  ]);

  if (!current.field.includes('confirm')) {
    setAnswers(prev => ({ ...prev, [current.field]: selectedValue }));
    setBusinessInfo({ [current.field]: selectedValue })
  }

  const target = typeof nextId === 'number' ? nextId : (current.nextId ?? stepIndexRef.current + 1);
  stepIndexRef.current = target;
  setIndex(target);

  pushUntilUserTurnWithDelay(700);
};


  useEffect(() => {
    pushUntilUserTurnWithDelay(1000)
  }, [])

  const inputConstraints = constraintsForField(currentStep.field ?? '');

const handleSend = (message: string) => {
  const trimmed = message.trim();
  if (!trimmed) return;

  const current = script[stepIndexRef.current];
  const expectingUser = current?.role === 'user';

  setMessages(prev => [
    ...prev,
    { ...(current as Step), id: Date.now(), input: 'text', content: trimmed, role: 'user' },
  ]);
  setInputValue('');

  if (expectingUser) {
    setAnswers(prev => ({ ...prev, [current.field]: trimmed }));
    setBusinessInfo({ [current.field]: trimmed })

    const targetIndex = current.nextId ?? index;
    stepIndexRef.current = targetIndex;
    setIndex(targetIndex);

    pushUntilUserTurnWithDelay(700);
  }
};

  const isUserTurn = script[stepIndexRef.current]?.role === 'user'
  const currentPlaceholder = script[stepIndexRef.current]?.placeholder ?? '메시지를 입력해주세요.';

  // any 타입 대신 명확한 타입 지정 (예시로 Record<string, unknown> 사용)
  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  }

  return (
    <>
      <SegmentedProgress total={7} current={script[stepIndexRef.current].step} />
      <ChatBoxContainer ref={chatContainerRef}>
        {messages.map((m) => (
          m.input === 'select' && m.options ? (
            !answers[m.field] && <ToggleButtonGroup
            key={m.id}
            items={m.options}
            setValue={handleSelect}
          />
          ) : ( 
            <ChatBubbleItem key={m.id} message={m.content} isUser={m.role === 'user'} title={m.title} />
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
        <pre>{JSON.stringify(stepIndexRef.current, null, 2)}</pre>
        <pre>{JSON.stringify(index, null, 2)}</pre>
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

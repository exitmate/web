import { script, Step } from '@/utils/scripts'
import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { ChatBubbleItem } from './ChatBubbleItem'
import { ChatInput } from './ChatInput'
import { ToggleButtonGroup } from './ToggleButtonGroup'

export const ChatBox = () => {
  const [messages, setMessages] = useState<Step[]>([])
  const [inputValue, setInputValue] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const nextId = () => idRef.current++

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const stepIndexRef = useRef(index)
  useEffect(() => { stepIndexRef.current = index }, [index])

  const streamingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
  }
  useEffect(() => () => clearAllTimers(), [])

  const pushUntilUserTurnWithDelay = (gapMs: number = 600) => {
    if (streamingRef.current) return
    streamingRef.current = true

    let i = stepIndexRef.current
    const botSteps: Step[] = []
    while (i < script.length && script[i].role === 'bot') {
      botSteps.push(script[i])
      i++
    }

    stepIndexRef.current = i
    setIndex(i)

    if (botSteps.length === 0) {
      streamingRef.current = false
      return
    }

    botSteps.forEach((step, idx) => {
      const t = window.setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { ...step, id: nextId() },
        ])

        if (idx === botSteps.length - 1) {
          streamingRef.current = false
        }
        }, idx * gapMs)
      timersRef.current.push(t)
    })
  }

  useEffect(() => {
    pushUntilUserTurnWithDelay(1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSend = (message: string) => {
    const trimmed = message.trim()
    if (!trimmed) return

    const current = script[stepIndexRef.current]
    const expectingUser = current?.role === 'user'

    setMessages((prev) => [
      ...prev,
      { ...current, id: nextId(), input: 'text', content: trimmed },
    ])

    setInputValue('')

    if (expectingUser) {
      setAnswers(prev => ({ ...prev, [current.field]: trimmed }))
      stepIndexRef.current += 1
      setIndex(stepIndexRef.current)
      pushUntilUserTurnWithDelay(700)
    }
  }

  const isUserTurn = script[stepIndexRef.current]?.role === 'user'
  const currentPlaceholder = isUserTurn ? '메시지를 입력해주세요.' : '업종을 선택해주세요.'
  const currentStep = script[stepIndexRef.current]?.step ?? 1

  return (
    <>
      <ChatBoxContainer ref={chatContainerRef}>
        {messages.map((m) => (
          m.input === 'select' && m.options ? (
            <ToggleButtonGroup
              key={m.id}
              items={m.options}
              value={answers[m.field]}
              setValue={(value) => {
                setAnswers({ ...answers, [m.field]: value })
                setInputValue(value)
                setIndex(stepIndexRef.current + 1)
              }}
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
      />

      <Debug>
      <ToggleButtonGroup
        items={[
          [
            { value: 'food', label: '음식점업' },
            { value: 'beverage', label: '비알코올 음료점업' }
          ],
          [
            { value: 'bar', label: '주점업' },
            { value: 'cafe', label: '카페' }
          ]
        ]}
        value={answers.industryCategory}
        setValue={(value) => setAnswers({ ...answers, industryCategory: value })}
      />
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </Debug>
    </>
  )
}

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 380px;
  overflow-y: auto;
  padding: 36px 0;
  gap: 8px;
`

const ChatText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
`

const Debug = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
`

export default ChatBox

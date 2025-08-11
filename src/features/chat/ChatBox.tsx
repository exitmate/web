import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { ChatBubbleItem } from './ChatBubbleItem'
import { ChatInput } from './ChatInput'

interface ChatMessage {
  id: number
  message: React.ReactNode
  isUser: boolean
}

type Step = {
  id: number
  role: 'bot' | 'user'
  content: React.ReactNode
}

const script: Step[] = [
  {
    id: 0,
    role: 'bot',
    content: (
      <>
        <p>안녕하세요 <span style={{ fontWeight: 'bold' }}>김이름</span> 사장님!</p>
        <p>ExitMate는 사장님의 새로운 도전을 응원합니다.</p>
      </>
    ),
  },
  {
    id: 1,
    role: 'bot',
    content: (
      <>
        <p>사장님께 도움을 드리기 위해 몇 가지 정보를 여쭤볼게요.</p>
        <p>정보를 채팅창에 입력하거나 선택지를 클릭해주세요.</p>
      </>
    ),
  },
  { id: 2, role: 'bot', content: <p>주문 받습니다. 어떤 걸 원하시나요?</p> },
  { id: 3, role: 'user', content: <p>원하시는 주문 내용을 입력하세요.</p> },
  {
    id: 4,
    role: 'bot',
    content: <p>네, 가능합니다. 연락처도 남겨주실 수 있나요?</p>,
  },
  { id: 5, role: 'user', content: <p>연락처를 입력하세요.</p> },
  { id: 6, role: 'bot', content: <p>감사합니다! 곧 확인해서 회신드릴게요.</p> },
]

export const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
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

  const stepIndexRef = useRef(stepIndex)
  useEffect(() => { stepIndexRef.current = stepIndex }, [stepIndex])

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

    // 현재 인덱스에서 연속된 bot 단계 모으기
    let i = stepIndexRef.current
    const botSteps: Step[] = []
    while (i < script.length && script[i].role === 'bot') {
      botSteps.push(script[i])
      i++
    }

    // 다음 턴 준비: 미리 인덱스를 올려두면 중간에 입력이 와도 안전
    stepIndexRef.current = i
    setStepIndex(i)

    if (botSteps.length === 0) {
      streamingRef.current = false
      return
    }

    // 순차 출력
    botSteps.forEach((step, idx) => {
      const t = window.setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: nextId(), message: step.content, isUser: false },
        ])

        if (idx === botSteps.length - 1) {
          streamingRef.current = false
        }
      }, idx * gapMs) // 0ms, 600ms, 1200ms...
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
      { id: nextId(), message: trimmed, isUser: true },
    ])

    setInputValue('')

    if (expectingUser) {
      setAnswers(prev => ({ ...prev, [current.id]: trimmed }))
      stepIndexRef.current += 1
      setStepIndex(stepIndexRef.current)
      pushUntilUserTurnWithDelay(700)
    }
  }

  const isUserTurn = script[stepIndexRef.current]?.role === 'user'

  return (
    <>
      <ChatBoxContainer ref={chatContainerRef}>
        {messages.map((m) => (
          <ChatBubbleItem key={m.id} message={m.message} isUser={m.isUser} />
        ))}
      </ChatBoxContainer>

      <ChatInput
        onSend={handleSend}
        placeholder="메시지를 입력해주세요."
        value={inputValue}
        onChange={setInputValue}
        disabled={!isUserTurn}
      />

      <Debug>
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

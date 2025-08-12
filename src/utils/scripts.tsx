
type Base = {
  step: number
  field: string
  id: number
  title?: string
}

type BotStep = Base & {
  role: 'bot'
  input?: 'text' | 'select' | 'chips'
  content?: React.ReactNode
  options?: { value: string; label: string }[][] | { value: string; label: string }[]
}

type UserTextStep = Base & {
  role: 'user'
  input: 'text'
  placeholder?: string
  content?: React.ReactNode
}

export type Step = BotStep | UserTextStep 

export const industryCategoryItems = [
  { value: '음식점업', label: '음식점업' },
  { value: '비알코올 음료점업', label: '비알코올 음료점업' },
]

export const script: Step[] = [
  {
    step: 1,
    field: 'question',
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
    step: 1,
    field: 'question',
    id: 1,
    role: 'bot',
    content: (
      <>
        <p>사장님께 도움을 드리기 위해 몇 가지 정보를 여쭤볼게요.</p>
        <p>정보를 채팅창에 입력하거나 선택지를 클릭해주세요.</p>
      </>
    ),
  },
  {
    step: 1,
    field: 'question',
    id: 2,
    role: 'bot',
    title: '사업장 소재지',
    content: (
      <>
        <p>사업장이 속한 시 또는 군을 채팅창에 입력해주세요.</p>
      </>
    ),
  },
  { 
    step: 2,
    field: 'city', 
    id: 3, 
    role: 'user',
    input: 'text',
    content: <p>시군</p> 
  },
  {
    step: 2,
    field: 'question',
    id: 4,
    role: 'bot',
    content: <p>사업장이 속한 군 또는 구를 채팅창에 입력해주세요.</p>,
  },
  {   
    step: 2,
    field: 'county', 
    id: 5, 
    role: 'user',
    input: 'text',
    content: <p>군 또는 구</p> 
  },
  { 
    step:  2,
    field: 'question', 
    id: 6, 
    role: 'bot', 
    title: '업종',
    content: <p>아래 두개의 업종 중 하나를 선택하거나 채팅창에 입력해주세요.</p> 
  },
  {
    step: 2,
    field: 'industryCategory',
    id: 7,
    role: 'bot',
    input: 'select',
    options: industryCategoryItems,
  },
  { 
    step: 2,
    field: 'answer', 
    id: 8, 
    role: 'user', 
    input: 'text',
    content: <p>감사합니다! 곧 확인해서 회신드릴게요.</p> 
  },
]
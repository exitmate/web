
type Base = {
  step: number
  field: string
  id: number
  title?: string
  nextId?: number
}

type BotStep = Base & {
  role: 'bot'
  input?: 'text' | 'select' | 'chips'
  content?: React.ReactNode
  options?: SelectOption[][] | SelectOption[]
}

type UserTextStep = Base & {
  role: 'user'
  input: 'text'
  placeholder?: string
  content?: React.ReactNode
}

export type Step = BotStep | UserTextStep 

export type SelectOption = {
  value: string
  label: string
  nextId: number
}

export const industryCategoryItems = [
  { value: '음식점업', label: '음식점업', nextId: 9},
  { value: '비알코올 음료점업', label: '비알코올 음료점업', nextId: 9},
]

export const industryCategoryDetailItems1 = [
  { value: '비알코올 음료점업', label: '비알코올 음료점업', nextId: 10},
  { value: '커피 전문점', label: '커피 전문점', nextId: 10},
  { value: '기타 비알코올 음료점업', label: '기타 비알코올 음료점업', nextId: 10},
]

export const industryCategoryDetailItems2 = [
  { value: '음식점업', label: '음식점업', nextId: 12},
  { value: '비알코올 음료점업', label: '비알코올 음료점업', nextId: 12},
]

export const script: Step[] = [
  {
    step: 1,
    field: 'question',
    id: 0,
    nextId: 1,
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
    nextId: 2,
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
    nextId: 3,
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
    nextId: 4,
    role: 'user',
    input: 'text',
    content: <p>시군</p> 
  },
  {
    step: 2,
    field: 'question',
    id: 4,
    nextId: 5,
    role: 'bot',
    content: <p>사업장이 속한 군 또는 구를 채팅창에 입력해주세요.</p>,
  },
  {   
    step: 2,
    field: 'county', 
    id: 5, 
    nextId: 6,
    role: 'user',
    input: 'text',
    content: <p>군 또는 구</p> 
  },
  { 
    step:  2,
    field: 'question', 
    id: 6, 
    nextId: 7,
    role: 'bot', 
    title: '업종',
    content: <p>아래 두개의 업종 중 하나를 선택하거나 채팅창에 입력해주세요.</p> 
  },
  {
    id: 7,
    nextId: 8,
    step: 2,
    field: 'industryCategory',
    role: 'bot',
    input: 'select',
    options: industryCategoryItems,
  },
  { 
    id : 8,
    step: 2,
    field: 'industryCategory', 
    role: 'user', 
    input: 'text',
    content: <p>감사합니다! 곧 확인해서 회신드릴게요.</p> 
  },
  {
    id: 9,
    nextId: 10,
    step: 2,
    field: 'industryCategoryDetail',
    role: 'bot',
    content: <p>업종 세분류를 선택하거나 채팅창에 입력해주세요.</p> 
  },
  {
    id: 10,
    nextId: 11,
    step: 2,
    field: 'industryCategoryDetail',
    role: 'bot',
    input: 'select',
    options: industryCategoryDetailItems1,
  },
  {
    step: 2,
    field: 'industryCategoryDetail',
    id: 11,
    nextId: 15,
    role: 'user',
    input: 'text',
    content: <p>업종 세분류 1 유저 대답</p> 
  },
  {
    id: 12,
    step: 2,
    field: 'industryCategoryDetail',
    role: 'bot',
    input: 'text',
    content: <p>업종 세분류를 선택하거나 채팅창에 입력해주세요.</p> 
  },
  {
    id: 13,
    step: 2,
    field: 'industryCategoryDetail',
    role: 'bot',
    input: 'select',
    options: industryCategoryDetailItems2,
  },
  {
    id: 14,
    step: 2,
    field: 'industryCategoryDetail2',
    nextId: 14,
    role: 'user',
    input: 'text',
    content: <p>업종 세분류 2 유저 대답</p> 
  },
  {
    id: 15,
    step: 2,
    field: 'industryCategoryDetail2',
    role: 'bot',
    input: 'text',
    content: <p>야옹</p> 
  },
]
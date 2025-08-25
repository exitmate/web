import { BusinessInfo } from "@/generated/prisma";
import colors from "./colors";
type Base = {
  step: number
  field: string
  id: number
  title?: string
  nextId?: number
  placeholder?: string
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
  nextId?: number
}

export enum SalesRange {
  BELOW_500 = 'BELOW_500',
  FROM_500_TO_1000 = 'FROM_500_TO_1000',
  FROM_1000_TO_1500 = 'FROM_1000_TO_1500',
  FROM_1500_TO_2000 = 'FROM_1500_TO_2000',
  FROM_2000_TO_5000 = 'FROM_2000_TO_5000',
  ABOVE_5000 = "ABOVE_5000",
}

export enum LeaseType {
  OWNED = 'OWNED',
  MONTHLY = 'MONTHLY',
}

export const industryCategoryItems = [
  { value: '음식점업', label: '음식점업', nextId: 12},
  { value: '비알코올 음료점업', label: '비알코올 음료점업', nextId: 9},
]

export const industryCategoryDetailItems1 = [
  { value: '비알코올 음료점업', label: '비알코올 음료점업', nextId: 15},
  { value: '커피 전문점', label: '커피 전문점', nextId: 15},
  { value: '기타 비알코올 음료점업', label: '기타 비알코올 음료점업', nextId: 15},
]

export const industryCategoryDetailItems2 = [
  [
  { value: '한식 음식점업', label: '한식 음식점업', nextId: 15},
  { value: '한식 일반 음식점업', label: '한식 일반 음식점업', nextId: 15},
  { value: '한식 면 요리 전문점', label: '한식 면 요리 전문점', nextId: 15},
  ],
  [
  { value: '한식 육류 요리 전문점', label: '한식 육류 요리 전문점', nextId: 15},
  { value: '한식 해산물 요리 전문점', label: '한식 해산물 요리 전문점', nextId: 15},
  { value: '기타 한식 음식점업', label: '기타 한식 음식점업', nextId: 15},
  ],
  [
  { value: '외국식 음식점업', label: '외국식 음식점업', nextId: 15},
  { value: '일식 음식점업', label: '일식 음식점업', nextId: 15},
  { value: '중식 음식점업', label: '중식 음식점업', nextId: 15},
  { value: '서양식 음식점업', label: '서양식 음식점업' },
  ],
  [
  { value: '기타 외국식 음식점업', label: '기타 외국식 음식점업', nextId: 15},
  { value: '기관 구내식당업', label: '기관 구내식당업', nextId: 15},
  { value: '출장 및 이동 음식점업', label: '출장 및 이동 음식점업', nextId: 15},
  ],
  [
  { value: '기타 간이 음식점업', label: '기타 간이 음식점업', nextId: 15},
  { value: '분식 및 김밥 전문점', label: '분식 및 김밥 전문점', nextId: 15},
  ],
  [
  { value: '피자, 햄버거, 샌드위치 및 유사 음식점업', label: '피자, 햄버거, 샌드위치 및 유사 음식점업', nextId: 15},
  { value: '치킨 전문점', label: '치킨 전문점', nextId: 15},
  { value: '김밥 전문점', label: '김밥 전문점', nextId: 15},
  ],
]

  const renderDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    return (
      <>
        <span style={{ color: colors.point }}>{year}</span>년{" "}
        <span style={{ color: colors.point }}>{month}</span>월{" "}
        <span style={{ color: colors.point }}>{day}</span>일
      </>
    );
  }

export const script = (businessInfo: BusinessInfo, userName: string) => {
  return [
  {
    step: 0,
    field: 'question',
    id: 0,
    nextId: 1,
    role: 'bot',
    content: (
      <>
        <p>안녕하세요 <span style={{ fontWeight: 'bold' }}>{userName}</span> 사장님!</p>
        <p>ExitMate는 사장님의 새로운 도전을 응원합니다.</p>
      </>
    ),
  },
  {
    step: 0,
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
    title: 'STEP1. 사업장 소재지',
    content: (
      <>
        <p>사업장이 속한 시 또는 군을 채팅창에 입력해주세요.</p>
      </>
    ),
  },
  { 
    step: 1,
    field: 'city', 
    id: 3, 
    nextId: 4,
    role: 'user',
    input: 'text',
    content: <p>시군</p> 
  },
  {
    step: 1,
    field: 'question',
    id: 4,
    nextId: 5,
    role: 'bot',
    content: <p>사업장이 속한 군 또는 구를 채팅창에 입력해주세요.</p>,
  },
  {   
    step: 1,
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
    title: 'STEP2. 업종',
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
    step: 2,
    nextId: 11,
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
    field: 'industryCategoryDetail',
    nextId: 15,
    role: 'user',
    input: 'text',
    content: <p>업종 세분류 2 유저 대답</p> 
  },
  {
    id: 15,
    step: 3,
    field: 'openedAt',
    role: 'bot',
    nextId: 16,
    input: 'text',
    title: 'STEP3. 개업년월일',
    content: <p>개업한 연도와 월, 일을 형식에 맞게 아래 채팅창에 입력해주세요.</p> ,
    placeholder: '개업한 연도와 월, 일을 8자리로 입력해주세요(예시: 20230803)'
  },
  {
    id: 16,
    step: 3,
    nextId: 17,
    field: 'openedAt',
    role: 'user',
    input: 'text',
    content: <p>개업년월일</p> ,
    placeholder: '개업한 연도와 월, 일을 8자리로 입력해주세요(예시: 20230803)'
  },
  {
    id: 17,
    nextId: 18,
    step: 3,
    field: 'openedAt',
    role: 'bot',
    input: 'text',
    content: <p>개업한 연도와 월, 일이 {renderDateString(businessInfo.openedAt)}이 맞나요?</p> ,
  },
  {
    id: 18,
    step: 3,
    field: 'openedAtConfirm',
    role: 'bot',
    input: 'select',
    options: [
      { value: '네', label: '네', nextId: 21},
      { value: '아니오', label: '아니오', nextId: 20},
    ],
  },
  {
    id: 19,
    step: 3,
    field: 'confirm',
    role: 'user',
    input: 'text',
    content: <p>개업한 연도와 월, 일 인가요?</p> ,
  },
  {
    id: 20,
    step: 3,
    field: 'confirm',
    role: 'bot',
    nextId: 15,
    input: 'text',
    content: <p>앗 그렇군요! 죄송합니다. 다시 한번 여쭤볼게요</p> ,
  },
  {
    id: 21,
    step: 3,
    field: 'isClosed',
    title: 'STEP4. 폐업 여부',
    role: 'bot',
    input: 'text',
    content: <p>현재 폐업완료 하셨나요?</p> ,
  },
  {
    id: 22,
    step: 4,
    field: 'isClosed',
    role: 'bot',
    input: 'select',
    options: [
      { value: 'true', label: '네', nextId: 24},
      { value: 'false', label: '아니오', nextId: 35},
    ],
  },
  {
    id: 23,
    step: 4,
    field: 'isClosed',
    role: 'user',
    input: 'text',
    content: <p>폐업 여부 답변</p> ,
  },
  {
    id: 24,
    step: 4,
    field: 'isClosed',
    role: 'bot',
    input: 'text',
    content: <p>폐업한 연도와 월, 일을 형식에 맞게 아래 채팅창에 입력해주세요.</p> ,
    placeholder: '폐업한 연도와 월, 일을 8자리로 입력해주세요(예시: 20230803)'
  },
  {
    id: 25,
    nextId: 26,
    step: 4,
    field: 'closedAt',
    role: 'user',
    input: 'text',
    content: <p>폐업 연도 월, 일 답변</p> ,
    placeholder: '폐업한 연도와 월, 일을 8자리로 입력해주세요(예시: 20230803)'
  },
  {
    id: 26,
    step: 4,
    field: 'closedAt',
    role: 'bot',
    input: 'text',
    content: <p>폐업한 연도와 월, 일 인가요?</p> ,
  },
  {
    id: 27,
    step: 4,
    field: 'confirm',
    role: 'bot',
    input: 'select',
    options: [
      { value: '네', label: '네', nextId: 29},
      { value: '아니오', label: '아니오', nextId: 24},
    ],
  },
  {
    id: 28,
    step: 4,
    field: 'confirm',
    role: 'user',
    input: 'text',
    content: <p>폐업 확인 답변</p> ,
  },
  {
    id: 29,
    step: 4,
    field: 'confirm',
    role: 'bot',
    input: 'text',
    content: <p>현재 취업하셨나요?</p> ,
  },
  {
    id: 30,
    step: 4,
    field: 'isReemployed',
    role: 'bot',
    input: 'select',
    options: [
      { value: 'true', label: '네', nextId: 32},
      { value: 'false', label: '아니오', nextId: 32},
    ],
  },
  {
    id: 31,
    step: 4,
    nextId: 32,
    field: 'isReemployed',
    role: 'user',
    input: 'text',
    content: <p>취업 여부 답변</p> ,
  },
  {
    id: 32,
    step: 4,
    field: 'confirm',
    role: 'bot',
    input: 'text',
    content: <p>해당 점포는 철거가 완료되었나요?</p> ,
  },
  {
    id: 33,
    step: 4,
    field: 'isDemolished',
    role: 'bot',
    input: 'select',
    options: [
      { value: 'true', label: '네', nextId: 35},
      { value: 'false', label: '아니오', nextId: 35},
    ],
  },
  {
    id: 34,
    step: 4,
    nextId: 35,
    field: 'isDemolished',
    role: 'user',
    input: 'text',
    content: <p>철거 여부 답변</p> ,
  },
  {
    id: 35,
    step: 4,
    field: 'confirm',
    role: 'bot',
    input: 'text',
    content: <p>ExitMate에서 사장님의 폐업 이후의 삶이 좋은 방향으로 향하도록 도와드릴게요.</p> ,
  },
  {
    id: 36, 
    step: 5,
    field: 'monthlySalesRange',
    title: 'STEP5. 월평균 매출액',
    role: 'bot',
    input: 'text',
    content: 
    <>
      <p>폐업(예정) 점포의 월평균 매출액을 알려주세요.</p>
      <p>아래에서 선택하거나 정확한 액수를 채팅창에 입력해주세요.</p>
    </>
  },
  {
    id: 37,
    step: 5,
    field: 'monthlySalesRange',
    role: 'bot',
    input: 'select',
    options: [
      [
      { value: SalesRange.BELOW_500, label: '500만원 미만', nextId: 39},
      { value: SalesRange.FROM_500_TO_1000, label: '500 ~ 1000만원', nextId: 39},
      { value: SalesRange.FROM_1000_TO_1500, label: '1000 ~ 1500만원', nextId: 39},
      ],
      [
      { value: SalesRange.FROM_1500_TO_2000, label: '1500 ~ 2000만원', nextId: 39},
      { value: SalesRange.FROM_2000_TO_5000, label: '2000 ~ 5000만원', nextId: 39},
      { value: SalesRange.ABOVE_5000, label: '5000만원 초과', nextId: 39},
      ],
    ],
  },
  {
    id: 38,
    step: 5,
    field: 'monthlySalesRange',
    role: 'user',
    input: 'text',
    content: <p>월평균 매출액 답변</p> ,
  },
  {
    id: 39,
    step: 6,
    field: 'areaSizeM2',
    role: 'bot',
    title: 'STEP6. 점포 면적',
    input: 'text',
    content: <p>폐업 (예정)점포의 면적(M2단위)을 단위 없이 입력해주세요.</p> ,
  },
  {
    id: 40,
    step: 6,
    nextId: 41,
    field: 'areaSizeM2',
    role: 'user',
    input: 'text',
    content: <p>점포 면적 답변</p> ,
  },
  {
    id: 41,
    step: 6,
    nextId: 42,
    field: 'employeeCount',
    role: 'bot',
    input: 'text',
    content: <p>사장님의 점포에서 일하는 종업원의 수를 단위 없이 입력해주세요.</p> ,
  },
  {
    id: 42,
    step: 6,
    nextId: 43,
    field: 'employeeCount',
    role: 'user',
    input: 'text',
    content: <p>종업원 수 답변</p> ,
  },
  {
    id: 43,
    step: 6,
    field: 'employeeCount',
    role: 'bot',
    input: 'text',
    content: <p>사장님의 점포는 $$$ 사업장으로 분류됩니다.</p> ,
  },
  {
    id: 44,
    step: 7,
    field: 'leaseType',
    role: 'bot',
    title: 'STEP7. 임대차 계약 형태',
    input: 'text',
    content: <p>마지막 입력 정보에요.</p> ,
    placeholder: '폐업(예정) 점포의 임대차 계약 형태를 입력해주세요.'
  },
  {
    id: 45,
    step: 7,
    field: 'leaseType',
    role: 'bot',
    input: 'text',
    content: <p>폐업(예정) 점포의 임대차 계약 형태를 알려주세요.</p> ,
    placeholder: '폐업(예정) 점포의 임대차 계약 형태를 입력해주세요.'
  },
  {
    id: 46,
    step: 7,
    field: 'leaseType',
    role: 'bot',
    input: 'select',
    options: [
      { value: LeaseType.OWNED, label: '자가', nextId: 52},
      { value: LeaseType.MONTHLY, label: '월세', nextId: 48},
    ],
    placeholder: '폐업(예정) 점포의 임대차 계약 형태를 입력해주세요.'
  },
  {
    id: 47,
    step: 7,
    field: 'leaseType',
    role: 'user',
    input: 'text',
    content: <p>임대차 계약 형태 답변</p> ,
    placeholder: '폐업(예정) 점포의 임대차 계약 형태를 입력해주세요.'
  },
  {
    id: 48,
    step: 7,
    field: 'depositAmount',
    role: 'bot',
    input: 'text',
    content: <p>점포의 보증금을 입력해주세요</p> ,
  },
  {
    id: 49,
    step: 7,
    nextId: 50,
    field: 'depositAmount',
    role: 'user',
    input: 'text',
    content: <p>보증금 답변</p> ,
  },
  {
    id: 50,
    step: 7,
    field: 'monthlyRent',
    role: 'bot',
    input: 'text',
    content: <p>점포의 월세를 입력해주세요</p> ,
  },
  {
    id: 51,
    step: 7,
    nextId: 52,
    field: 'monthlyRent',
    role: 'user',
    input: 'text',
    content: <p>월세 답변</p> ,
  },
  {
    id: 52,
    step: 7,
    field: 'confirm',
    role: 'bot',
    input: 'text',
    content: <p>정보들을 입력해주셔서 감사합니다!</p> ,
  },
  {
    id: 53,
    step: 7,
    field: 'confirm',
    role: 'user',
    input: 'text',
    content: <p>끝</p> ,
  },
]
}
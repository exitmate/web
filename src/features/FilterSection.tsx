import Category from '@/components/common/Category'
import Toggle from '@/components/common/Toggle'
import colors from '@/utils/colors'
import { Filter } from '@/utils/types'
import styled from '@emotion/styled'

const SUPPORT_TYPES = [
  { value: 'STORE_DEMOLITION_SUBSIDY', label: '철거 지원금' },
  { value: 'CLOSURE_SUPPORT_SUBSIDY',  label: '폐업 지원금' },
  { value: 'CLOSURE_CONSULTING',       label: '컨설팅' },
  { value: 'REEMPLOYMENT_EDUCATION',   label: '재취업 교육' },
  { value: 'BUSINESS_EDUCATION',       label: '창업/경영 교육' },
]

const DEADLINE_TYPES = [
  { value: 'ALWAYS',    label: '상시 모집' },
  { value: 'FIRST_COME', label: '소진 시 종료' },
  { value: 'DEADLINED',  label: '마감기한 있음' },
]

export const FilterSection = ({
  filter,
  setFilter,
}: {
  filter: Filter
  setFilter: (filter: Filter) => void
}) => {
  console.log(filter)
  return (
    <FilterContainer>
      <CategoryContainer>
        <Category
          category={filter.applicationType ?? ''}
          setCategory={(category) =>
            setFilter({ ...filter, applicationType: category, serviceType: null })
          }
          contents={DEADLINE_TYPES}
          placeholder="모집 유형"
        />
        <Category
          category={filter.serviceType ?? ''}
          setCategory={(category) =>
            setFilter({ ...filter, serviceType: category, applicationType: null })
          }
          contents={SUPPORT_TYPES}
          placeholder="지원 유형"
        />
      </CategoryContainer>
      <ToggleContainer>
        <ToggleText>나에게 맞는 지원사업만 보기</ToggleText>
        <Toggle
          isOn={filter.appliableOnly}
          setIsOn={(isOn) => setFilter({ ...filter, appliableOnly: isOn })}
        />
      </ToggleContainer>
    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  z-index: 100;
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
`

const ToggleText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray[7]};
`

export default FilterSection

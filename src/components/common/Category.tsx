'use client'

import ArrowDownIcon from '@/assets/icons/arrow-down.svg'
import colors from '@/utils/colors'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type Option = string | { value: string; label: string }

interface CategoryProps {
  category: string | null
  setCategory: (category: string | null) => void
  contents: Option[]
  placeholder: string
  clearable?: boolean
}

export const Category = ({
  category,
  contents,
  setCategory,
  placeholder,
  clearable = true,
}: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const options = useMemo(
    () => contents.map(c => (typeof c === 'string' ? { value: c, label: c } : c)),
    [contents]
  )

  const selectedLabel =
    options.find(o => o.value === category)?.label ?? placeholder

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <CategoryContainer ref={ref} onClick={() => setIsOpen(p => !p)} role="button" aria-expanded={isOpen}>
      <p>{selectedLabel}</p>
      <ArrowDownSection isOpen={isOpen}>
        <Image src={ArrowDownIcon} alt="열기" width={24} height={24} />
      </ArrowDownSection>

      {isOpen && (
        <CategoryContents onClick={e => e.stopPropagation()} role="listbox">
          {clearable && (
            <ContentItem
              key="__placeholder__"
              onClick={() => {
                setCategory(null)
                setIsOpen(false)
              }}
              aria-selected={category == null}
            >
              {placeholder}
            </ContentItem>
          )}
          {options.map(opt => (
            <ContentItem
              key={opt.value}
              onClick={() => {
                setCategory(opt.value)
                setIsOpen(false)
              }}
              aria-selected={opt.value === category}
            >
              {opt.label}
            </ContentItem>
          ))}
        </CategoryContents>
      )}
    </CategoryContainer>
  )
}

const CategoryContainer = styled.div`
  display: flex;
  position: relative;
  width: 240px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 16px;
  gap: 8px;
  height: 40px;
  border: 1px solid ${colors.gray[6]};
  border-radius: 8px;
  background-color: ${colors.white};
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[7]};
  cursor: pointer;
  user-select: none;
`

const ArrowDownSection = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`

const CategoryContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 2px;
  position: absolute;
  top: 44px;
  left: 0;
  min-width: 240px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[6]};
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
`

const ContentItem = styled.button`
  all: unset;
  padding: 10px 12px;
  cursor: pointer;
  color: ${colors.gray[7]};
  &:hover {
    background: ${colors.gray[1]};
  }
  &[aria-selected='true'] {
    background: ${colors.gray[2]};
    font-weight: 600;
  }
`

export default Category
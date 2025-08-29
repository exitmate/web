'use client'

import Modal from '@/components/common/Modal'
import colors from '@/utils/colors'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import type { Address } from 'react-daum-postcode'

const DaumPostcode = dynamic(() => import('react-daum-postcode'), {
  ssr: false,
})

type Props = {
  isOpen: boolean
  onClose: () => void
  onComplete: (addr: Address) => void
  title?: string
}

export default function SearchAddressModal({
  isOpen,
  onClose,
  onComplete,
  title = '주소검색',
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel={title}>
      <Header>
        <h3>{title}</h3>
        <CloseBtn onClick={onClose} aria-label="닫기">
          ✕
        </CloseBtn>
      </Header>
      <Body>
        <DaumPostcode
          onComplete={(data) => {
            onComplete(data)
            onClose()
          }}
          style={{ width: '100%', height: 420 }}
        />
      </Body>
    </Modal>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 12px 4px;
  border-bottom: 1px solid ${colors.gray[3]};
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: ${colors.black};
  }
`

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: ${colors.gray[6]};
  &:hover {
    color: ${colors.gray[8]};
  }
`

const Body = styled.div`
  padding: 12px 0 0;
`

import { CommonButton } from '@/components/common/CommonButton'
import { CommonCheckbox } from '@/components/common/CommonCheckbox'
import Modal from '@/components/common/Modal'
import Spacing from '@/components/common/Spacing'
import colors from '@/utils/colors'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

interface ComfirmDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ComfirmDownloadModal = ({
  isOpen,
  onClose,
}: ComfirmDownloadModalProps) => {
  const [isChecked, setIsChecked] = useState([false, false, false])
  const isCheckedAll = isChecked.every((item) => item)
  const [confirmSave, setConfirmSave] = useState(false)
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <VStack alignItems="center" paddingY={4} paddingX={8}>
          <Text fontSize="20px" fontWeight="600">
            다운로드 전 다음 사항들을 확인해주세요.
          </Text>
          <Spacing height={24} />
          <VStack gap={4}>
            <CommonCheckbox
              label="정확한 정보 확인 후 제출해주세요."
              checked={isChecked[0]}
              onChange={() => {
                setIsChecked([!isChecked[0], isChecked[1], isChecked[2]])
              }}
            />
            <CommonCheckbox
              label="허위 정보 작성 시 법적 책임을 물을 수 있습니다."
              checked={isChecked[1]}
              onChange={() => {
                setIsChecked([isChecked[0], !isChecked[1], isChecked[2]])
              }}
            />
            <CommonCheckbox
              label="ExitMate는 서류 작성 보조 도구로써 최종 책임은 제출자 본인에게 있습니다."
              checked={isChecked[2]}
              onChange={() => {
                setIsChecked([isChecked[0], isChecked[1], !isChecked[2]])
              }}
            />
          </VStack>
          <Spacing height={16} />
          <CommonCheckbox label="신청서 작성 정보 저장하기" checked={confirmSave} onChange={() => {
            setConfirmSave(!confirmSave)
          }} />
          <Spacing height={16} />
          <HStack gap={4}>
            <a href="/files/sample.pdf" download="sample.pdf">
              <CommonButton
                label="확인"
                onClick={onClose}
                disabled={!isCheckedAll}
                style={{ width: '100px' }}
              />
            </a>
            <CommonButton
              label="취소"
              onClick={onClose}
              style={{
                backgroundColor: colors.white,
                color: colors.gray[4],
                border: `1px solid ${colors.gray[4]}`,
                width: '100px',
              }}
            />
          </HStack>
        </VStack>
      </Modal>
    </div>
  )
}

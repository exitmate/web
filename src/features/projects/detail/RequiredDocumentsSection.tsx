'use client'

import PaddedBox from '@/components/common/PaddedBox'
import colors from '@/utils/colors'
import { Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useProjectDetail } from './ProjectDetailContext'

const RequiredDocumentItem = ({ requiredDoc }: { requiredDoc: string }) => {
  return (
    <RequiredDocumentItemContainer>
      <Text>{requiredDoc}</Text>
    </RequiredDocumentItemContainer>
  )
}

export const RequiredDocumentsSection = () => {
  const { project } = useProjectDetail()
  console.log(project.requiredDocs)
  return (
    <div style={{ backgroundColor: colors.backgroundBrighter, marginTop: '40px', padding: '76px 0' }}>
      <PaddedBox
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          gap: '40px',
        }}
      >
        <Text fontSize="24px" fontWeight="bold">해당 지원사업을 신청하려면 다음과 같은 서류들이 필요해요.</Text>
        <VStack gap={2} width="100%">
          {project.requiredDocs.map((requiredDoc) => (
            <RequiredDocumentItem key={requiredDoc} requiredDoc={requiredDoc} />
          ))}
        </VStack>
      </PaddedBox>
    </div>
  )
}

const RequiredDocumentItemContainer = styled.div`
  display: flex;
  border: 1px solid ${colors.gray[3]};
  padding: 20px 32px;
  border-radius: 20px;
  font-size: 18px;
  color: ${colors.gray[7]};
  width: 100%;
  background-color: ${colors.white};
`
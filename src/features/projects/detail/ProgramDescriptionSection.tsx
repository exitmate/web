'use client'

import PaddedBox from '@/components/common/PaddedBox'
import Spacing from '@/components/common/Spacing'
import { MarkdownRender } from '@/components/ui/MarkdownRender'
import colors from '@/utils/colors'
import { Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useProjectDetail } from './ProjectDetailContext'

export const ProgramDescriptionSection = () => {
  const { project } = useProjectDetail()
  return (
    <PaddedBox style={{marginTop: '40px'}}>
      { project.posterSrc && <Image src={project.posterSrc} alt={project.title} width="70%" height="auto" /> }
      { project.summary && <>
      <MarkdownRender markdown={project.summary} />
      <Spacing height={36} />
      </> }
      <Title>자격 요건</Title>
      <VStack gap={2} alignItems="flex-start">
        {project.applicationRequirements?.map((requirement) => (
          <Description key={requirement}>{requirement}</Description>
        ))}
      </VStack>
      <Spacing height={36} />
      <Title>제한사항</Title>
      <VStack gap={2} alignItems="flex-start">
        {project.restrictions?.map((restriction) => (
          <Description key={restriction}>{restriction}</Description>
        ))}
      </VStack>
      <Spacing height={36} />
      <HorizontalLine />
      <Spacing height={36} />
      <Title>{project.host}</Title>
      <Grid
      templateColumns="28px 120px 1fr"
      rowGap={3}
      columnGap={3}
      alignItems="center"
    >
      <GridItem>
        <MaterialIcon className="material-symbols-outlined">mail</MaterialIcon>
      </GridItem>
      <GridItem>
        <Text color={colors.gray[6]}>이메일</Text>
      </GridItem>
      <GridItem>
        <Text>{project.inquiryEmail || "없음"}</Text>
      </GridItem>
      <GridItem>
        <MaterialIcon className="material-symbols-outlined">call</MaterialIcon>
      </GridItem>
      <GridItem>
        <Text color={colors.gray[6]}>연락처</Text>
      </GridItem>
      <GridItem>
        <Text whiteSpace="pre-wrap">{project.inquiryPhone || "없음"}</Text>
      </GridItem>
      <GridItem>
        <MaterialIcon className="material-symbols-outlined">link</MaterialIcon>
      </GridItem>
      <GridItem>
        <Text color={colors.gray[6]}>링크</Text>
      </GridItem>
      <GridItem>
        {project.detailPageUrl ? (
          <Link href={project.detailPageUrl} target="_blank" rel="noopener noreferrer">
            <Text
              textDecoration="underline"
              wordBreak="break-all" 
              overflowWrap="anywhere" 
            >
              {project.detailPageUrl}
            </Text>
          </Link>
        ) : (
          <Text>없음</Text>
        )}
      </GridItem>
    </Grid>
    </PaddedBox>
  )
}

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.gray[7]};
  margin-bottom: 16px;
`

const Description = styled.li`
  font-size: 18px;
  color: ${colors.gray[7]};
`

const HorizontalLine = styled.hr`
  border: 1px solid ${colors.gray[3]};
`
const MaterialIcon = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: ${colors.gray[6]};
`;
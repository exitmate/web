'use client'
import { CommonButton } from "@/components/common/CommonButton"
import { VStack } from "@chakra-ui/react"
import { useParams, useRouter } from "next/navigation"
import ServiceInfoSection from "./ServiceInfoSection"

export const ProjectDetailCardsButton = () => {
  const { id } = useParams()
  const router = useRouter()
  return (
    <VStack gap={12}>
        <ServiceInfoSection />
        <CommonButton
          label="ExitMate와 함께 지원사업 신청서 작성하기"
          onClick={() => {
            router.push(`/projects/${id}/apply`)
          }}
          style={{ width: '408px', height: '64px', fontSize: '20px' }}
          />
      </VStack>
  )
}
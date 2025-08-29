import PaddedBox from '@/components/common/PaddedBox'
import ProgramCard from '@/components/ProgramCard'
import colors from '@/utils/colors'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const tempData = {
  data: {
    recommendedProjects: [
      {
        "_id": {
          "$oid": "68919d93554da81f52b29566"
        },
        "logoSrc": "https://exitmate.s3.ap-northeast-2.amazonaws.com/projectImages/busan_biz.png",
        "title": "[부산] 폐업소상공인 희망두배통장 지원사업 참여자 모집 공고",
        "host": "부산광역시",
        "applicationType": "FIRST_COME",
        "deadline": new Date("2025-12-31T00:00:00.000Z"),
        "isOpen": true,
        "detailPageUrl": "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_000000000110606",
        "inquiryPhone": "051-888-6902, 6904, 6846",
        "inquiryEmail": null,
        "requiredDocs": [
          "폐업소상공인 희망두배통장 사업 참여신청서",
          "[서식1-1] 폐업소상공인 희망두배통장 사업 신청자 확인서",
          "[서식1-2] 개인정보 수집·이용·제공 및 고유식별정보 처리에 관한 동의서",
          "주민등록등본",
          "폐업사실증명원",
          "총사업자등록내역 사실증명",
          "근로계약서",
          "고용보험 자격 이력 내역서"
        ],
        "eligibility": {
          "mustBeInRegion": "부산광역시",
          "mustBeClosedAfter": null,
          "mustBeClosedWithin": null,
          "mustOperateAtLeast": 1,
          "mustNotBeCorporation": true,
          "closureCondition": "NONE"
        },
        "applicationRequirements": [
          "신청일 기준 부산광역시에 주민등록이 되어 있는 자",
          "최저임금 이상의 급여 및 주 30시간 이상의 근로계약 체결"
        ],
        "restrictions": [
          "신청일 기준 세법에 따라 사업자등록을 한 자",
          "정부 공제사업 및 지자체 유사 자산형성사업에 참여 중인 자"
        ],
        "createdAt": new Date("2025-06-12T00:00:00.000Z"),
        "updatedAt": new Date("2025-06-12T00:00:00.000Z"),
        "services": [
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:04:51.740Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:05:38.070Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:07:35.946Z"),
          }
        ],
        "_maxAmount": 3600000
      },
      {
        "_id": {
          "$oid": "68919d93554da81f52b29567"
        },
        "logoSrc": "https://exitmate.s3.ap-northeast-2.amazonaws.com/projectImages/busan_biz.png",
        "title": "[부산] 폐업소상공인 고용인센티브 지원사업 참여자 모집 공고",
        "host": "부산광역시",
        "applicationType": "FIRST_COME",
        "deadline": new Date("2025-12-31T00:00:00.000Z"),
        "isOpen": true,
        "detailPageUrl": "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_000000000110596",
        "inquiryPhone": "051-888-6902, 6904, 6846",
        "inquiryEmail": null,
        "requiredDocs": [
          "[서식1] 폐업소상공인 고용인센티브 사업 참여 신청서",
          "[서식1-1] 폐업소상공인 고용인센티브 사업 사업주 확인서(기업용)",
          "[서식1-2] 개인정보 수집 · 이용에 대한 동의서(사업주용)",
          "사업자등록증",
          "고용보험 가입자 명부",
          "국세 납세증명서와 지방세 납세증명서",
          "[서식2] 채용자 명단 제출서",
          "[서식2-1] 개인정보 수집·이용·제공 및 고유식별정보 처리에 관한 동의서(근로자용)",
          "근로계약서 사본",
          "주민등록등본",
          "폐업사실증명원",
          "총 사업자등록내역 사실증명",
          "고용보험 자격 이력 내역서"
        ],
        "eligibility": {
          "mustBeInRegion": "부산광역시",
          "mustBeClosedAfter": null,
          "mustBeClosedWithin": null,
          "mustOperateAtLeast": 1,
          "mustNotBeCorporation": true,
          "closureCondition": "NONE"
        },
        "applicationRequirements": [
          "신청일 기준 부산광역시에 주민등록이 되어 있는 자",
          "최저임금 이상의 급여 및 주 30시간 이상의 근로계약 체결"
        ],
        "restrictions": [
          "임금 등을 체불하여 명단이 공개 중인 사업주",
          "중대 산업재해 발생 등으로 명단이 공표 중인 기업"
        ],
        "createdAt": new Date("2025-06-12T00:00:00.000Z"),
        "updatedAt": new Date("2025-06-12T00:00:00.000Z"),
        "services": [
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:04:51.749Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:05:38.076Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 3600000,
            "createdAt": new Date("2025-08-20T08:07:36.009Z"),
          }
        ],
        "_maxAmount": 3600000
      },
      {
        "_id": {
          "$oid": "68919de4554da81f52b2956d"
        },
        "logoSrc": "https://exitmate.s3.ap-northeast-2.amazonaws.com/projectImages/hope.png",
        "title": "2025년 『희망리턴패키지 원스톱폐업지원』 소상공인 모집 2차 수정 공고",
        "host": "소상공인시장진흥공단",
        "applicationType": "FIRST_COME",
        "deadline": null,
        "isOpen": true,
        "detailPageUrl": "http://hope.shiz.or.kr",
        "inquiryPhone": "1533-0100",
        "inquiryEmail": null,
        "requiredDocs": [
          "신청서 및 체크리스트",
          "개인정보 수집이용 · 제공 동의서",
          "사업자등록증명원",
          "폐업사실증명원"
        ],
        "eligibility": {
          "mustBeInRegion": null,
          "mustBeClosedAfter": null,
          "mustBeClosedWithin": null,
          "mustOperateAtLeast": 60,
          "mustNotBeCorporation": true,
          "closureCondition": "NONE"
        },
        "applicationRequirements": [
          "폐업(예정) 소상공인"
        ],
        "restrictions": [
          "업종제한: 지원제외 업종에 해당하지 않아야 함"
        ],
        "createdAt": new Date("2023-10-01T00:00:00.000Z"),
        "updatedAt": new Date("2023-10-01T00:00:00.000Z"),
        "services": [
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": {
              "$numberLong": "192745000000"
            },
            "createdAt": new Date("2025-08-20T08:04:51.768Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": {
              "$numberLong": "192745000000"
            },
            "createdAt": new Date("2025-08-20T08:05:38.091Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": {
              "$numberLong": "192745000000"
            },
            "createdAt": new Date("2025-08-20T08:07:36.174Z"),
          }
        ],
        "_maxAmount": {
          "$numberLong": "192745000000"
        }
      },
      {
        "_id": {
          "$oid": "6899f5f76655381f27820901"
        },
        "logoSrc": "https://exitmate.s3.ap-northeast-2.amazonaws.com/projectImages/smile.png",
        "title": "[모집] 2025 소상공인 사업정리 도우미 지원사업",
        "host": "부산시",
        "applicationType": "DEADLINED",
        "deadline": new Date("2025-12-31T17:59:00.000Z"),
        "isOpen": true,
        "detailPageUrl": "https://bsbsc.kr/posting/346",
        "inquiryPhone": null,
        "inquiryEmail": null,
        "requiredDocs": [],
        "eligibility": {
          "mustBeInRegion": null,
          "mustBeClosedAfter": null,
          "mustBeClosedWithin": null,
          "mustOperateAtLeast": null,
          "mustNotBeCorporation": false,
          "closureCondition": "NONE"
        },
        "applicationRequirements": [],
        "restrictions": [],
        "createdAt": new Date("2025-08-11T00:00:00.000Z"),
        "updatedAt": new Date("2025-08-11T00:00:00.000Z"),
        "services": [
          {
            "type": "CLOSURE_CONSULTING",
            "maxAmount": null,
            "createdAt": new Date("2025-08-13T00:00:00.000Z"),
          },
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 4000000,
            "createdAt": new Date("2025-08-13T00:00:00.000Z"),
          }
        ],
        "_maxAmount": 4000000
      },
      {
        "_id": {
          "$oid": "6899f5f76655381f27820902"
        },
        "logoSrc": "https://exitmate.s3.ap-northeast-2.amazonaws.com/projectImages/smile.png",
        "title": "[모집] 부산시 폐업자 재취업 지원",
        "host": "부산시",
        "applicationType": "DEADLINED",
        "deadline": new Date("2025-05-19T18:00:00.000Z"),
        "isOpen": false,
        "detailPageUrl": "https://bsbsc.kr/posting/364",
        "inquiryPhone": null,
        "inquiryEmail": null,
        "requiredDocs": [],
        "eligibility": {
          "mustBeInRegion": null,
          "mustBeClosedAfter": null,
          "mustBeClosedWithin": null,
          "mustOperateAtLeast": null,
          "mustNotBeCorporation": false,
          "closureCondition": "NONE"
        },
        "applicationRequirements": [],
        "restrictions": [],
        "createdAt": new Date("2025-08-11T00:00:00.000Z"),
        "updatedAt": new Date("2025-08-11T00:00:00.000Z"),
        "services": [
          {
            "type": "CLOSURE_SUPPORT_SUBSIDY",
            "maxAmount": 500000,
            "createdAt": {
              "$date": "2025-08-11T00:00:00.000Z"
            }
          },
          {
            "type": "REEMPLOYMENT_EDUCATION",
            "maxAmount": null,
            "createdAt": {
              "$date": "2025-08-11T00:00:00.000Z"
            }
          }
        ],
        "_maxAmount": 500000
      },
    ],
  },
}

export const RecommendedProgramList = () => {
  const { status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const { data } = useQuery({
    queryKey: ['programs'],
    queryFn: () =>
      fetch('/api/ai/recommendations')
        .then((res) => res.json())
        .catch(() => {
          return { data: { recommendedProjects: [] } }
        }),
    enabled: isLoggedIn,
  })

  const isRecommended = data?.data?.recommendedProjects.length > 0

  console.log(data)
  return (
    <RecommendedProgramListContainer isRecommended={isRecommended}>
      <PaddedBox>
        <Title>추천 지원 사업 Top 5</Title>
        <ProgramCardContainer>
          {isRecommended ? (
            data.data.recommendedProjects.map((program: any) => (
              <ProgramCard
                key={program.id}
                title={program.title}
                logoSrc={program.imageUrl}
                createdAt={new Date(program.postedDate)}
                deadline={new Date(program.deadline)}
                host={program.centerName}
                id={program.id.toString()}
                onClick={() => {}}
              />
            ))
          ) : (
            tempData.data.recommendedProjects.map((program: any) => (
              <ProgramCard
                key={program.id}
                title={program.title}
                logoSrc={program.logoSrc}
                createdAt={new Date(program.createdAt)}
                deadline={program.deadline}
                host={program.host}
                id={program._id.$oid}
                onClick={() => {}}
              />
            ))
          )}
        </ProgramCardContainer>
      </PaddedBox>
    </RecommendedProgramListContainer>
  )
}

const RecommendedProgramListContainer = styled.div<{ isRecommended: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 440px;
  box-sizing: border-box;
  background-color: ${colors.gray[1]};
`

const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.black};
`

const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-top: 24px;
  overflow: hidden;
`

export default RecommendedProgramList

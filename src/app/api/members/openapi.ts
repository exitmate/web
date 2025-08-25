import { createApiPath } from '@/utils/openapi'
import {
  MemberInfoInputResponseSchema,
  MemberInfoInputSchema,
  MyInfoResponseSchema,
} from './schema'

const paths = {
  ...createApiPath('/api/members/me', 'get', {
    summary: '내 정보 조회',
    responses: {
      200: {
        description: '내 정보 조회 성공',
        content: {
          'application/json': {
            schema: MyInfoResponseSchema,
          },
        },
      },
      401: {
        description: '로그인 필요',
      },
      404: {
        description: '회원 정보 없음',
      },
      500: {
        description: '서버 오류',
      },
    },
  }),
  ...createApiPath('/api/members', 'post', {
    summary: '사용자 정보 입력',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: MemberInfoInputSchema,
        },
      },
    },
    responses: {
      200: {
        description: '사용자 정보 입력 성공',
        content: {
          'application/json': {
            schema: MemberInfoInputResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

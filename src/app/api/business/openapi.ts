import { createApiPath } from '@/utils/openapi'
import {
  BusinessInfoInputResponseSchema,
  BusinessInfoInputSchema,
  BusinessInfoResponseSchema,
} from './schema'

const paths = {
  ...createApiPath('/api/business', 'get', {
    summary: '사용자 업장 정보 조회',
    responses: {
      200: {
        description: '사용자 업장 정보 조회 성공',
        content: {
          'application/json': {
            schema: BusinessInfoResponseSchema,
          },
        },
      },
      401: {
        description: '로그인 필요',
      },
      404: {
        description: '사용자 업장 정보 없음',
      },
    },
  }),
  ...createApiPath('/api/business', 'post', {
    summary: '사용자 업장 정보 입력',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: BusinessInfoInputSchema,
        },
      },
    },
    responses: {
      200: {
        description: '사용자 업장 정보 입력 성공',
        content: {
          'application/json': {
            schema: BusinessInfoInputResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

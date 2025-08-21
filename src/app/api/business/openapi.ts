import { createApiPath } from '@/utils/openapi'
import {
  BusinessInfoInputResponseSchema,
  BusinessInfoInputSchema,
} from './schema'

const paths = {
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

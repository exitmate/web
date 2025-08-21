import { createApiPath } from '@/utils/openapi'
import { MemberInfoInputResponseSchema, MemberInfoInputSchema } from './schema'

const paths = {
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

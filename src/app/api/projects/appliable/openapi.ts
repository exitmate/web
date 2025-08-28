import { createApiPath } from '@/utils/openapi'
import { IsAppliableRequestSchema, IsAppliableResponseSchema } from './schema'

const paths = {
  ...createApiPath('/api/projects/appliable', 'get', {
    summary: '지원사업 지원 가능 여부 조회',
    requestParams: {
      query: IsAppliableRequestSchema,
    },
    responses: {
      200: {
        description: '지원사업 지원 가능 여부 조회 성공',
        content: {
          'application/json': {
            schema: IsAppliableResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

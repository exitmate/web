import { createApiPath } from '@/utils/openapi'
import { AppliableProjectCountResponseSchema } from './schema'

const paths = {
  ...createApiPath('/api/projects/count', 'get', {
    summary: '지원 가능한 지원사업 개수 조회',
    responses: {
      200: {
        description: '지원 가능한 지원사업 개수 조회 성공',
        content: {
          'application/json': {
            schema: AppliableProjectCountResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

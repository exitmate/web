import { createApiPath } from '@/utils/openapi'
import { ProjectDetailResponseSchema } from './schema'

const paths = {
  ...createApiPath('/api/projects/:id', 'get', {
    summary: '지원사업 상세 조회',
    responses: {
      200: {
        description: '지원사업 상세 조회 성공',
        content: {
          'application/json': {
            schema: ProjectDetailResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

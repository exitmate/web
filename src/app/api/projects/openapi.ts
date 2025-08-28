import { createApiPath } from '@/utils/openapi'
import { ProjectResponseSchema, ProjectSearchSchema } from './schema'

const paths = {
  ...createApiPath('/api/projects', 'get', {
    summary: '지원사업 필터 및 조회',
    requestBody: {
      content: {
        'application/json': {
          schema: ProjectSearchSchema,
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: '지원사업 필터 및 조회 성공',
        content: {
          'application/json': {
            schema: ProjectResponseSchema,
          },
        },
      },
    },
  }),
}

export default paths

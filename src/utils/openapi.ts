import { z } from 'zod'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface ApiPathOptions {
  summary: string
  security?: any[]
  parameters?: any[]
  requestParams?: {
    query?: z.ZodType
    path?: z.ZodType
  }
  requestBody?: {
    required: boolean
    content: Record<string, { schema: z.ZodType }>
  }
  responses: Record<
    number,
    {
      description: string
      content?: Record<string, { schema: z.ZodType }>
    }
  >
}

export function createApiPath(
  path: string,
  method: HttpMethod,
  options: ApiPathOptions,
) {
  return {
    [path]: {
      [method]: {
        summary: options.summary,
        security: options.security ?? [],
        parameters: options.parameters ?? [],
        ...(options.requestParams
          ? { requestParams: options.requestParams }
          : {}),
        ...(options.requestBody ? { requestBody: options.requestBody } : {}),
        responses: options.responses,
      },
    },
  }
}

import { z } from 'zod'

export const PaginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

export type Pagination = z.infer<typeof PaginationSchema>

export const PaginationRequestSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
})

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>

export const DataResponseSchema = <TData extends z.ZodType>(
  dataSchema: TData,
) =>
  z.object({
    data: dataSchema,
  })

export type DataResponse<TData extends z.ZodType> = z.infer<
  typeof DataResponseSchema<TData>
>

export const PaginatedDataResponseSchema = <TData extends z.ZodType>(
  dataSchema: TData,
) =>
  z.object({
    data: dataSchema,
    pagination: PaginationSchema,
  })

export type PaginatedDataResponse<TData extends z.ZodType> = z.infer<
  typeof PaginatedDataResponseSchema<TData>
>

export const FieldErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
})

export type FieldError = z.infer<typeof FieldErrorSchema>

export const ErrorResponseSchema = z.object({
  error: z.string(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const ValidationErrorResponseSchema = z.object({
  errors: z.array(FieldErrorSchema),
})

export type ValidationErrorResponse = z.infer<
  typeof ValidationErrorResponseSchema
>

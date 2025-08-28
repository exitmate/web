import z from 'zod'
import { ErrorResponse, Pagination, ValidationErrorResponse } from './schema'

export function getPaginatedParams(
  page: number,
  limit: number,
): { skip: number; take: number } {
  const currentPage = Math.max(page, 1)
  const skip = (currentPage - 1) * limit
  const take = limit

  return { skip, take }
}

export function getPaginationInfo(
  page: number,
  limit: number,
  totalCount: number,
): Pagination {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit))
  const currentPage = Math.min(Math.max(page, 1), totalPages)

  return {
    currentPage,
    totalPages,
    totalCount,
    limit,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}

export function buildErrorResponse(
  error: Error | z.ZodError,
  errorMessage?: string,
): ValidationErrorResponse | ErrorResponse {
  if (error instanceof z.ZodError) {
    return {
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    }
  }
  return {
    error: errorMessage ?? 'Unexpected error',
  }
}

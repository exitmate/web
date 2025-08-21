export interface FieldError {
  field: string
  message: string
}

export type ActionResult<TData = unknown> = {
  success: boolean
  error?: string
  errors?: FieldError[]
  data?: TData
}

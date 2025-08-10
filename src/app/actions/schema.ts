export interface FieldError {
  field: string
  message: string
}

export interface ActionSuccess<TData = unknown> {
  success: true
  data: TData
}

export interface ActionError {
  success: false
  error: string
}

export interface ActionValidationError {
  success: false
  errors: FieldError[]
}

export type ActionResult<TData = unknown> =
  | ActionSuccess<TData>
  | ActionError
  | ActionValidationError

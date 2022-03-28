import { ErrorCode, ResponseType } from '..'

export interface IResponseStatus {
  responseType: ResponseType
  message: {
    title?: string
    description?: string
    code?: string
    bulletPoints?: string[]
  }
}

export interface IHilError {
  codes: ErrorCode[]
  title?: string
  description?: string
  bulletPoints?: string[]
}

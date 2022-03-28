import {
  DEFAULT_ERROR_RESPONSE,
  ErrorCode,
  IHilError,
  IResponseStatus,
  MAPPED_API_ERRORS,
  ResponseType,
} from 'shared/constants'

export function getServerUrl() {
  return process.env.GATEWAY_URL
}

export function getAemApiUrl() {
  return process.env.AEM_API_URL
}

/**
 * Construct error response
 *
 * Return an API error message based on the code provided
 *
 * @param response API response
 * @param description
 * @param title
 * @param bulletPoints
 * @returns
 */
export const constructErrorResponse = (
  errorResponse: any,
  description?: string,
  title?: string,
  bulletPoints?: string[],
): IResponseStatus => {
  const errData = errorResponse.payload?.data || {}
  const { errorCode } = errData

  // If BOOMI returns an error code, find if we have a mapped description
  const hasErrorCode = errorCode !== undefined
  const mappedApiError: IHilError | undefined = hasErrorCode
    ? MAPPED_API_ERRORS.find((apiErrorCodes: IHilError) => {
        const hilCode = apiErrorCodes.codes.some((apiErrorCode: ErrorCode) => {
          return apiErrorCode === errorCode
        })
        return hilCode
      })
    : undefined

  const getDescription = () => {
    // Custom description passed into function
    if (description) {
      return description
    }

    if (mappedApiError) {
      return mappedApiError.description
    }

    return DEFAULT_ERROR_RESPONSE.description
  }

  const getTitle = () => {
    // Custom title passed into function
    if (title) {
      return title
    }

    if (mappedApiError) {
      return mappedApiError.title
    }

    return DEFAULT_ERROR_RESPONSE.title
  }

  const getBulletPoints = () => {
    // Custom bulletPoints passed into function
    if (bulletPoints) {
      return bulletPoints
    }

    if (mappedApiError) {
      return mappedApiError.bulletPoints
    }

    return undefined
  }

  const getCode = () => {
    if (errorCode) {
      return errorCode
    }

    return undefined
  }

  return {
    responseType: ResponseType.Error,
    message: {
      title: getTitle(),
      description: getDescription(),
      ...(getBulletPoints() && {
        bulletPoints: getBulletPoints(),
      }),
      code: getCode(),
    },
  }
}

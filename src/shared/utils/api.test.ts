import cases from 'jest-in-case'
import { DEFAULT_ERROR_RESPONSE, ResponseType } from 'shared/constants'
import { constructErrorResponse, getServerUrl } from './api'

describe('get api url functions', () => {
  const mockGatewayUrl = 'http://localhost:5001'
  const MOCK_ENV = {
    GATEWAY_URL: mockGatewayUrl,
  }

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache
    process.env = { ...MOCK_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    process.env = MOCK_ENV
  })

  it('getServerUrl should return correct Server Url', () => {
    expect(getServerUrl()).toBe(mockGatewayUrl)
  })
})

cases(
  'constructErrorResponse',
  (opts) => {
    expect(
      constructErrorResponse(
        opts.response,
        opts.description,
        opts.title,
        opts.bulletPoints,
      ),
    ).toEqual(opts.constructedResponse)
  },
  {
    // tslint:disable-next-line:max-line-length
    'should return ResponseType.Error if response status is NOT a successful response, with fallback title and description':
      {
        response: {
          type: 'SIGNAL/shared/API/PERSONAL_DETAILS__CHANGE_PASSWORD/FAILURE',
          payload: {
            data: {},
            status: 404,
            statusText: 'Not Found',
            request: {},
          },
        },
        constructedResponse: {
          responseType: ResponseType.Error,
          message: {
            title: DEFAULT_ERROR_RESPONSE.title,
            description: DEFAULT_ERROR_RESPONSE.description,
          },
        },
      },

    "should return with default description if HIL code isn't found": {
      response: {
        type: 'SIGNAL/shared/API/PERSONAL_DETAILS__CHANGE_PASSWORD/FAILURE',
        payload: {
          data: {
            errorCode: 'HIL.NOEXIST.069',
            errorDescription: 'Failed to update password',
            furtherDetails: '',
          },
          status: 404,
          statusText: 'Not Found',
          request: {},
        },
      },
      constructedResponse: {
        responseType: ResponseType.Error,
        message: {
          title: DEFAULT_ERROR_RESPONSE.title,
          description: DEFAULT_ERROR_RESPONSE.description,
          code: 'HIL.NOEXIST.069',
        },
      },
    },

    'should return with title if it is passed in as a parameter': {
      response: {
        type: 'SIGNAL/shared/API/PERSONAL_DETAILS__CHANGE_PASSWORD/FAILURE',
        payload: {
          data: {},
          status: 404,
          statusText: 'Not Found',
          request: {},
        },
      },
      title: 'Error!',
      constructedResponse: {
        responseType: ResponseType.Error,
        message: {
          title: 'Error!',
          description: DEFAULT_ERROR_RESPONSE.description,
        },
      },
    },

    'should return with description if it is passed in as a parameter': {
      response: {
        type: 'SIGNAL/shared/API/PERSONAL_DETAILS__CHANGE_PASSWORD/FAILURE',
        payload: {
          data: {
            errorCode: '404',
            errorDescription: 'Failed to update password',
          },
          status: 404,
          statusText: 'Not Found',
          request: {},
        },
      },
      title: undefined,
      description: 'There is an error!',
      constructedResponse: {
        responseType: ResponseType.Error,
        message: {
          title: DEFAULT_ERROR_RESPONSE.title,
          description: 'There is an error!',
          code: '404',
        },
      },
    },

    'should return with Code if it is passed in as a parameter': {
      response: {
        type: 'SIGNAL/shared/API/PERSONAL_DETAILS__CHANGE_PASSWORD/FAILURE',
        payload: {
          data: {
            errorCode: 'HIL.MBR.002',
            errorDescription: 'Failed to update password',
          },
          status: 404,
          statusText: 'Not Found',
          request: {},
        },
      },
      title: DEFAULT_ERROR_RESPONSE.title,
      description: 'There is an error that has a code!',
      code: 'HIL.MBR.002',
      constructedResponse: {
        responseType: ResponseType.Error,
        message: {
          title: DEFAULT_ERROR_RESPONSE.title,
          description: 'There is an error that has a code!',
          code: 'HIL.MBR.002',
        },
      },
    },
  },
)

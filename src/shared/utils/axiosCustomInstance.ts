import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'

const timeout = 1000 * 120 // Timeout on 120 seconds
const instance = axios.create({ withCredentials: false, timeout })

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      body?: AxiosRequestConfig['data']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body }) => {
    try {
      const data = body
      const result = await instance({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
// request header
instance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      //'Cache-Control': 'must-revalidate, private',
      // Pragma: 'no-cache',
      // Expires: -1,
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// response parse
instance.interceptors.response.use(
  (response: any) => {
    return parseBody(response)
  },
  (error: any) => {
    console.log('error', error)
    if (error.response) {
      return parseError(error.response.data)
    } else {
      return Promise.reject(error)
    }
  },
)

/**
 *
 * parse error response
 */

function parseError(messages: string | string[]) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages })
    } else {
      return Promise.reject({ messages: [messages] })
    }
  } else {
    return Promise.reject({ messages: [messages] })
  }
}

function parseBody(response: any) {
  switch (response.status) {
    case 200:
    case 201:
      return response

    default:
      return parseError(response.data.messages)
  }
}

export default axiosBaseQuery

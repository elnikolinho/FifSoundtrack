import { createApi } from '@reduxjs/toolkit/query/react'
import axios from './axiosCustomInstance'
const { GATEWAY_URL } = process.env
export const baseApi = createApi({
  reducerPath: 'mjolAPI',
  baseQuery: axios({
    baseUrl: `${GATEWAY_URL}/user/v1`,
  }),
  endpoints: () => ({}),
})

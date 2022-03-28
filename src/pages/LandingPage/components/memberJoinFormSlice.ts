import { baseApi } from 'shared/utils/rtkQueryInstance'

interface IRegisterUser {
  firstName: string
  lastName: string
  title: string
  email: string
}
interface ISearchMemberResponse {
  memberNumber: string
  planCode: string
  customerReference: string
  title: string
  givenNames: string
  familyName: string
  birthDate: string
}

interface IRegisterUserData {
  registrationStatus: string
  id: string
}

export const apiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterUserData, Partial<IRegisterUser>>({
      query: (body) => ({ url: '/register', method: 'POST', body }),
    }),
    getUser: builder.query<ISearchMemberResponse, string>({
      query: (body) => ({ url: '/member-search', method: 'GET', body }),
    }),
  }),
})

export const { useRegisterUserMutation, useGetUserQuery } = apiSlice

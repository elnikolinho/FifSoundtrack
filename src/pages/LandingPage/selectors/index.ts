import { createSelector } from '@reduxjs/toolkit'
import { IApplicationState } from 'store/interfaces'
import { IFormValues } from 'pages/LandingPage/constants'

const usersSelector = (state: IApplicationState) => state.users

const getIsLoading = createSelector(
  [usersSelector],
  (users): boolean => users.isLoading,
)

const getFormValues = createSelector(
  [usersSelector],
  (users): IFormValues => users.formValues,
)

export const selectors = {
  getIsLoading,
  getFormValues,
}

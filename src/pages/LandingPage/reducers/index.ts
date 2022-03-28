import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormValues } from 'shared/constants'
import { IFormValues, IUsersState } from 'pages/LandingPage/constants'

export const initialState: IUsersState = {
  isLoading: false,
  formValues: {
    [FormValues.FirstName]: '',
    [FormValues.LastName]: '',
    [FormValues.Email]: '',
    [FormValues.Title]: '',
    [FormValues.Dob]: '',
    [FormValues.Address]: '',
    [FormValues.MobileNumber]: '',
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setFormValues(state, action: PayloadAction<IFormValues>) {
      state.formValues = {
        ...state.formValues,
        ...action.payload,
      }
    },
  },
})

export const { setIsLoading, setFormValues } = usersSlice.actions

export default usersSlice.reducer

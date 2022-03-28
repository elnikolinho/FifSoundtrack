import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { initialState as initialGlobalState } from 'shared/reducers/global'
import { initialState as initialUsersState } from 'pages/LandingPage/reducers'
import { apiSlice } from 'pages/LandingPage/components/memberJoinFormSlice'

// Mock app state for tests
export const initialAppState = {
  global: {
    ...initialGlobalState,
  },
  users: {
    ...initialUsersState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
}

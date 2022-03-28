import { FormValues } from 'shared/constants'

export interface ILandingPageCopy {
  banner: {
    captionSubtitle: string
    header: string
    illustrationSrc: string
  }
  cards: ICardsCopy[]
  privacyCollectionStatement: {
    checkboxText: string
    privacyCollectionStatementText: string
    privacyCollectionStatementLink: string
    declarationText: string
    declarationHeader: string
    declarationBody: string
    buttonText: string
  }
  nextButtonText: string
  resumeApplicationLink: string
}

export interface ICardsCopy {
  illustrationSrc: string
  title: string
  description: string
}

export interface IUsersState {
  isLoading: boolean
  formValues: IFormValues
}

export interface IFormValues {
  [FormValues.FirstName]: string
  [FormValues.LastName]: string
  [FormValues.Email]: string
  [FormValues.Title]: string
  [FormValues.Dob]: string
  [FormValues.Address]: string
  [FormValues.MobileNumber]: string
}

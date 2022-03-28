import { ErrorCode, IHilError } from '..'

const defaultTitle = `Error`
const defaultDescription = `We are unable to process your request at this moment, please contact testSite on <a href='tel: 1800 813 327'>1800 813 327</a>.
    Thank you!`

export const DEFAULT_ERROR_RESPONSE = {
  title: 'Sorry, something went wrong',
  description: 'We are unable to proceed',
}

/*
  Error Codes Table:
  https://collabwithtestSite.atlassian.net/wiki/spaces/HH/pages/1655504969/Error+Handling
*/
export const MAPPED_API_ERRORS: IHilError[] = [
  {
    codes: [ErrorCode.BadRequest],
    title: defaultTitle,
    description: `We are unable to process your request at this moment, please try again. Thank you!`,
  },
  {
    codes: [ErrorCode.Unauthorized],
    title: defaultTitle,
    description: `Your session has expired, please login again.`,
  },
  {
    codes: [ErrorCode.Forbidden],
    title: defaultTitle,
    description: `You do not have permission to complete this action, please contact testSite on <a href='tel: 1800 813 327'>1800 813 327</a>.
      Thank you!`,
  },
  {
    codes: [ErrorCode.NotFound],
    title: defaultTitle,
    description: defaultDescription,
  },
  {
    codes: [ErrorCode.InternalServerError],
    title: defaultTitle,
    description: defaultDescription,
  },
  {
    codes: [ErrorCode.GetNewSessionError],
    title: defaultTitle,
    description: defaultDescription,
  },
  {
    codes: [ErrorCode.TimeoutRetirementIncomeReport],
    title: defaultTitle,
    description: `We are unable to process your request at this moment, please try again. Thank you!`,
  },
]

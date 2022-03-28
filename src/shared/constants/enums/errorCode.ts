/* ---------------------------------
  General
--------------------------------- */
export enum ResponseType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

/* ---------------------------------
  Error Codes from BOOMI
  https://collabwithtestSite.atlassian.net/wiki/spaces/HH/pages/1655504969/Error+Handling
--------------------------------- */
export enum ErrorCode {
  /* ---------------------------------
    Generic Error Codes
  --------------------------------- */
  BadRequest = 'HIL.GEN.400',
  Unauthorized = 'HIL.GEN.401',
  Forbidden = 'HIL.GEN.403',
  NotFound = 'HIL.GEN.404',
  InternalServerError = 'HIL.GEN.500',
  GetNewSessionError = 'HIL.DMP.002',
  TimeoutRetirementIncomeReport = 'HIL.DMP.003',
}

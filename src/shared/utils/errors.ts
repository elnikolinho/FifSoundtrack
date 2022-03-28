export class AjaxError extends Error {
  public response = {
    code: 404,
  }
  constructor(errorCode?: number) {
    super()

    if (errorCode) {
      this.response = {
        code: errorCode,
      }
    }
  }
}

import { AjaxError } from './errors'

describe('AjaxError', () => {
  it('should have 404 error by default if no code is provided', () => {
    expect(new AjaxError().response.code).toBe(404)
  })

  it('should set the response.code to input code if it is provided', () => {
    expect(new AjaxError(500).response.code).toBe(500)
  })
})

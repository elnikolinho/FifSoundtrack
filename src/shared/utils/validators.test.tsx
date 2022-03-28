import { isValidDate, isValidMobile } from './validators'

describe('isValidDate', () => {
  const validFutureDate = '20/05/2070'
  it('Should return true if the date is valid', () => {
    const validDate = '13/12/2013'
    expect(isValidDate(validDate)).toBe(true)
  })
  it('Should return false if the date is invalid', () => {
    const invalidDate = '13/13/2013'
    expect(isValidDate(invalidDate)).toBe(false)
  })
  it('Should return true if future date is allowed', () => {
    expect(isValidDate(validFutureDate)).toBe(true)
  })
})

describe('isValidMobile', () => {
  it('Should return true if the date is valid', () => {
    const validMobile = '0476770729'
    expect(isValidMobile(validMobile)).toBe(true)
  })
  it('Should return true if the date is valid', () => {
    const validMobile = '+61476770729'
    expect(isValidMobile(validMobile)).toBe(true)
  })
  it('Should return true if the mobile number is invalid', () => {
    const invalidMobile = '23232'
    expect(isValidMobile(invalidMobile)).toBe(false)
  })
})

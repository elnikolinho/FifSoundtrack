import cases from 'jest-in-case'
import {
  setDevice,
  getWordCount,
  deleteNullAndUndefinedKey,
  parseFloatAndRoundTo2DecimalPlaces,
} from './helpers'

cases(
  'setDevice',
  (opts) => {
    expect(setDevice()).toMatchObject(opts.returnedValue)
  },
  {
    'should return breakpoint object': {
      returnedValue: {
        activeBreakpoint: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isDesktopLarge: false,
      },
    },
  },
)

describe('getWordCount', () => {
  it('return word count', () => {
    expect(getWordCount('Preparing for a change in your income')).toBe(7)
  })
})

describe('deleteNullAndUndefinedKey', () => {
  it('return object with deleted undefined and null value key', () => {
    const inputObj = {
      address: {
        street: 'test street',
        postal: 3000,
        unit: null,
        contactDetails: {
          phone: undefined,
          email: 'abc@abc.com',
        },
      },
      firstName: 'First name',
      lastName: null,
    }
    const outputObj = deleteNullAndUndefinedKey(inputObj)
    expect('lastName' in outputObj).toBeFalsy()
    expect('unit' in outputObj.address).toBeFalsy()
    expect('phone' in outputObj.address.contactDetails).toBeFalsy()
  })

  it('Return input as it is if it is not a javascript object', () => {
    const inputData = 'testData'
    const outputData = deleteNullAndUndefinedKey(inputData)
    expect(outputData).toStrictEqual(inputData)
  })
})

cases(
  'parseFloatAndRoundTo2DecimalPlaces',
  (opts) => {
    expect(parseFloatAndRoundTo2DecimalPlaces(opts.input)).toBe(
      opts.returnedValue,
    )
  },
  {
    'should return a float with 2 decimal places when 6 decimal places are passed in':
      { input: 1000.000001, returnedValue: 1000.0 },
    'should return with the rounded number': {
      input: 1000.999999999999,
      returnedValue: 1001,
    },
    'should return the same value when there is no decimals to round to': {
      input: 999,
      returnedValue: 999,
    },
    'should return the same value when user enters 600.8': {
      input: 600.8,
      returnedValue: 600.8,
    },
  },
)

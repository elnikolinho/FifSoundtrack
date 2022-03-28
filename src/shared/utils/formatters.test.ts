import {
  formatDate,
  formatDatePersistTimezone,
  isValidDateInput,
  formatUTCDate,
  formatDateToISO8601,
  getToday,
  getStartOfFinYear,
  getEndOfFinYear,
  getFullYearFromDate,
  removeCommaFromValue,
  addCommaToThousands,
  addCommaAndDecimals,
  formatMoney,
  removeNumbersAndSpecialChars,
  formatStringToDate,
  removeNonNumbers,
  formatPhoneNumber,
  allowForInternationalNumbers,
  addressToString,
  formatDateToYYYYMMDD,
  removeDecimals,
  booleanToYesOrNo,
  formatBalanceAmount,
  removeDollarAndCommas,
  addDollarAndCommas,
  hashedPhoneNumber,
  getFormattedDateDiff,
  convertToSentenceCase,
  formatPercentage,
  removePercentage,
  booleanToCoveredOrNotCovered,
  addDollarCommasAndDecimals,
} from './formatters'

describe('formatDate', () => {
  it('should provide a formatted date based on the parameters that gets passed in', () => {
    expect(formatDate('2000-10-29', 'DD MMMM YYYY')).toBe('29 October 2000')
    expect(formatDate('2000-10-29', 'DD-MM-YYYY')).toBe('29-10-2000')
    expect(formatDate('2000-10-29')).toBe('29/10/2000')
    expect(formatDate(undefined)).toBe(undefined)
  })
})

describe('formatDatePersistTimezone', () => {
  it('should provide a formatted date based on the parameters that gets passed in', () => {
    expect(formatDatePersistTimezone('2000-10-29', 'DD MMMM YYYY')).toBe(
      '29 October 2000',
    )
    expect(formatDatePersistTimezone('2000-10-29', 'DD-MM-YYYY')).toBe(
      '29-10-2000',
    )
    expect(formatDatePersistTimezone('2000-10-29', 'DD/MM/YYYY')).toBe(
      '29/10/2000',
    )
  })

  it('should return undefined if the rawDate is undefined', () => {
    expect(formatDatePersistTimezone(undefined)).toBe(undefined)
  })
})

describe('formatPercentage', () => {
  it('should provide a formatted percentage when a number is passed in', () => {
    expect(formatPercentage('100')).toBe('100%')
    expect(formatPercentage('55')).toBe('55%')
    expect(formatPercentage('0')).toBe('0%')
    expect(formatPercentage(0)).toBe('0%')
    expect(formatPercentage('04')).toBe('4%')
  })

  it('should return empty string if value is undefined or invalid numbers', () => {
    expect(formatPercentage(undefined)).toBe('')
    expect(formatPercentage('abcde')).toBe('')
  })
})

describe('removePercentage', () => {
  it('should remove the percentage from the string', () => {
    expect(removePercentage('100%')).toBe('100')
    expect(removePercentage('55%')).toBe('55')
    expect(removePercentage('0%')).toBe('0')
    expect(removePercentage(undefined)).toBe('0')
  })
})

describe('convertToSentenceCase', () => {
  it('should format words to sentence case (first letter on each word capitalised)', () => {
    expect(convertToSentenceCase('foo bar baz')).toBe('Foo Bar Baz')
    expect(convertToSentenceCase('test word')).toBe('Test Word')
    expect(convertToSentenceCase('word')).toBe('Word')
  })
})

describe('isValidDateInput', () => {
  it('should return a truthy value if the date format is valid', () => {
    expect(isValidDateInput('29/12/1990')).toBeTruthy()
  })

  it('should return a falsy value if the date format is invalid', () => {
    expect(isValidDateInput('2010/10-29')).toBeFalsy()
  })
})

describe('formatUTCDate', () => {
  it('should provide a UTC formatted date', () => {
    expect(formatUTCDate('2018/10/29', 'DD/MM/YYYY')).toBe('29/10/2018')
  })

  it('should provide a UTC formatted date with format DD/M/YYYY by default', () => {
    expect(formatUTCDate('2018/10/29')).toBe('29/10/2018')
  })

  it('should return invalid date if the rawDate is an invalid date', () => {
    expect(formatUTCDate('2018/30/29', 'DD/MM/YYYY')).toBe('Invalid date')
  })
})

describe('formatDateToISO8601', () => {
  it('should provide a ISO8601 formatted date', () => {
    expect(formatDateToISO8601('2018/10/29')).toBe('2018-10-29T00:00:00.000Z')
  })
})

describe('getToday', () => {
  it(`should provide today's date.
    As we are not able to test the current date,
    we should test that is is defined.`, () => {
    expect(getToday('DD/MM/YYYY')).toBeDefined()
  })
})

describe('getEndOfFinYear', () => {
  it('should provide the start of this financial year', () => {
    expect(getEndOfFinYear('DD/MM/YYYY')).toContain('30/06/')
  })
})

describe('getStartOfFinYear', () => {
  it('should provide the start of this financial year', () => {
    expect(getStartOfFinYear('DD/MM/YYYY')).toContain('01/07/')
  })
})

describe('getFullYearFromDate', () => {
  it('should return the year from the date passed in', () => {
    expect(getFullYearFromDate('2019-08-05T16:08:30')).toBe(2019)
  })
})

describe('removeCommaFromValue', () => {
  it('should remove commas from the value that gets passed in', () => {
    expect(removeCommaFromValue('20,000,000')).toBe('20000000')
  })

  it('should retain the same value if the value has no commas', () => {
    expect(removeCommaFromValue('100')).toBe('100')
  })

  it('should return null when value is undefined', () => {
    expect(removeCommaFromValue(undefined)).toBe(null)
  })
})

describe('removeDecimals', () => {
  it('should remove decimals from the value that gets passed in', () => {
    expect(removeDecimals('20,000.00')).toBe('20,000')
  })

  it('should retain the same value if the value has no decimals', () => {
    expect(removeDecimals('100')).toBe('100')
  })

  it('should return null when value is undefined', () => {
    expect(removeDecimals(undefined)).toBe(null)
  })
})

describe('removeDollarAndCommas', () => {
  it('should remove commas and dollars from the value that gets passed in', () => {
    expect(removeDollarAndCommas('$20,000,000')).toBe('20000000')
  })

  it('should retain the same value if the value has no commas', () => {
    expect(removeDollarAndCommas('$100')).toBe('100')
  })

  it('should retain the same value if the value has decimals', () => {
    expect(removeDollarAndCommas('$100.00')).toBe('100.00')
  })

  it('should remove third decimal if three are passed in', () => {
    expect(removeDollarAndCommas('$100.119')).toBe('100.11')
  })
  it('should return empty string if value ius undefined', () => {
    expect(removeDollarAndCommas(undefined)).toBe('')
  })
})

describe('addDollarAndCommas', () => {
  it('should add commas to value', () => {
    expect(addDollarAndCommas('20000000')).toBe('$20,000,000')
  })
  it('should keep decimal places', () => {
    expect(addDollarAndCommas('20000000.01')).toBe('$20,000,000.01')
  })
  it('should keep decimal places if there is no value behind the decimal', () => {
    expect(addDollarAndCommas('.01')).toBe('$0.01')
  })
  it('keeps decimal when returns', () => {
    expect(addDollarAndCommas('0.')).toBe('$0.')
  })
  it('keeps first 0 after decimal', () => {
    expect(addDollarAndCommas('1.')).toBe('$1.')
  })
  it('keeps first 0 after decimal', () => {
    expect(addDollarAndCommas('1.')).toBe('$1.')
  })
  it('returns 0 with dollars and commas', () => {
    expect(addDollarAndCommas(0)).toBe('$0')
  })
  it('returns 0 with dollars and commas', () => {
    expect(addDollarAndCommas('0.00')).toBe('$0.00')
  })
  it('returns null if value is undefined', () => {
    expect(addDollarAndCommas(undefined)).toBe(null)
  })
  it('returns 0. if value is .', () => {
    expect(addDollarAndCommas('.')).toBe('$0.')
  })
  it('returns $0.00 if input is 0 and isRounded is false or undefined', () => {
    expect(addDollarAndCommas('0')).toBe('$0.00')
    expect(addDollarAndCommas('0', false)).toBe('$0.00')
  })
  it('returns $0 if input is 0 and isRounded is true', () => {
    expect(addDollarAndCommas('0', true)).toBe('$0')
  })
  it('removes 0 after decimal if the number after decimal is 0', () => {
    expect(addDollarAndCommas('2.0')).toBe('$2.0')
  })
  it('returns value with 2 decimals if isBlur is true and input value has decimals', () => {
    expect(addDollarAndCommas('2.05', false, true)).toBe('$2.05')
    expect(addDollarAndCommas('2.3', false, true)).toBe('$2.30')
    expect(addDollarAndCommas('2.30', false, true)).toBe('$2.30')
  })
  it('returns formatted whole number if isBlur is true and input value has no decimals', () => {
    expect(addDollarAndCommas('2.0', false, true)).toBe('$2')
    expect(addDollarAndCommas('2.', false, true)).toBe('$2')
    expect(addDollarAndCommas('2.00', false, true)).toBe('$2')
  })
})

describe('addCommaToThousands', () => {
  it('should convert the type from number to string', () => {
    expect(typeof addCommaToThousands(20000)).toBe('string')
  })

  it('should add a comma separator to every thousand', () => {
    expect(addCommaToThousands(20000)).toBe('20,000')
  })

  it('should not add a comma separator if the value does not reach a thousand', () => {
    expect(addCommaToThousands(100)).toBe('100')
  })

  it('should add commas at the fourth position of the value', () => {
    expect(addCommaToThousands(20000000000)).toBe('20,000,000,000')
  })

  it('should remove the commas and add commas at the fourth position of the value', () => {
    expect(addCommaToThousands('2,000,000,000,0')).toBe('20,000,000,000')
  })

  it('should return null if value in undefined', () => {
    expect(addCommaToThousands(undefined)).toBe(null)
  })
})

describe('addCommaAndDecimals', () => {
  it('should add commas and decimals to the value', () => {
    expect(addCommaAndDecimals('2000')).toBe('2,000.00')
    expect(addCommaAndDecimals(0)).toBe('0.00')
  })

  it('should be rounded and add commas to the value', () => {
    expect(addCommaAndDecimals('40.45', true)).toBe('40')
    expect(addCommaAndDecimals('40.75', true)).toBe('41')
    expect(addCommaAndDecimals('2000.1', true)).toBe('2,000')
    expect(addCommaAndDecimals('2000.95', true)).toBe('2,001')
    expect(addCommaAndDecimals(40.45, true)).toBe('40')
    expect(addCommaAndDecimals(40.75, true)).toBe('41')
    expect(addCommaAndDecimals(2000.1, true)).toBe('2,000')
    expect(addCommaAndDecimals(2000.95, true)).toBe('2,001')
  })

  it('should return null if value is undefined', () => {
    expect(addCommaAndDecimals(undefined)).toBe(null)
  })
})

describe('addDollarCommasAndDecimals', () => {
  it('should add commas to value', () => {
    expect(addDollarCommasAndDecimals('50000000')).toBe('$50,000,000')
  })
  it('should keep decimal places', () => {
    expect(addDollarCommasAndDecimals('50000000.01')).toBe('$50,000,000.01')
  })
})

describe('formatMoney', () => {
  it('should add dollar sign, commas and decimals to the value', () => {
    expect(formatMoney('2000')).toBe('$2,000.00')
  })
})

describe('allowForInternationalNumbers', () => {
  it('should remove any characters not related to international calls', () => {
    expect(allowForInternationalNumbers('??###!!!(+61)')).toBe('(+61)')
  })

  it('should return null if value is undefined', () => {
    expect(allowForInternationalNumbers(undefined)).toBe(null)
  })
})

describe('removeNumbersAndSpecialChars', () => {
  it('should remove any numbers and special characters', () => {
    expect(removeNumbersAndSpecialChars('abcd12345$%^/&')).toBe('abcd')
  })

  it('should return null if value is undefined', () => {
    expect(removeNumbersAndSpecialChars(undefined)).toBe(null)
  })
})

describe('formatStringToDate', () => {
  it('should format string to date', () => {
    expect(formatStringToDate('31122020')).toBe('31/12/2020')
  })
})

describe('removeNonNumbers', () => {
  it('should convert to an empty string when a letter is entered', () => {
    expect(removeNonNumbers('A')).toBe('')
  })

  it('should convert to an empty string when a symbol is entered', () => {
    expect(removeNonNumbers('@')).toBe('')
  })

  it('should return a number when a number is entered', () => {
    expect(removeNonNumbers('1')).toBe('1')
  })

  it('should return null if value is undefined', () => {
    expect(removeNonNumbers(undefined)).toBe(null)
  })
})

describe('formatPhoneNumber', () => {
  it('should convert to an empty string when a letter is entered', () => {
    expect(formatPhoneNumber('A')).toBe('')
  })

  it('should convert to an empty string when a symbol is entered', () => {
    expect(formatPhoneNumber('@')).toBe('')
  })

  it('should return a + when a + is entered in the first position', () => {
    expect(formatPhoneNumber('+')).toBe('+')
  })

  it('should return a the correct string when a + is entered not in the first position', () => {
    expect(formatPhoneNumber('66+')).toBe('66')
  })

  it('should return a number when a number is entered', () => {
    expect(formatPhoneNumber('1')).toBe('1')
  })

  it('should return null if value is undefined', () => {
    expect(formatPhoneNumber(undefined)).toBe(null)
  })
})

describe('addressToString', () => {
  it('should convert an address object passed in to one single line', () => {
    const address = {
      addressLine1: 'Unit 1, Smith Street',
      addressLine2: 'Second Street Name',
      suburb: 'Fitzroy',
      state: 'VIC',
      postCode: '3065',
      countryCode: 'AU',
      deliveryPointIdentifier: 0,
      addressStatus: 'Valid',
    }

    expect(addressToString(address)).toBe(
      'Unit 1, Smith Street, Second Street Name, Fitzroy, 3065, VIC',
    )
  })

  it('should convert an address object with undefined value passed in to one single line', () => {
    const address = {
      addressLine1: 'Unit 1, Smith Street',
      addressLine2: undefined,
      suburb: 'Fitzroy',
      state: 'VIC',
      postCode: '3065',
      countryCode: 'AU',
      deliveryPointIdentifier: 0,
      addressStatus: 'Valid',
    }

    expect(addressToString(address)).toBe(
      'Unit 1, Smith Street, Fitzroy, 3065, VIC',
    )
  })
})

describe('formatDateToYYYYMMDD', () => {
  it('should provide a YYYY-MM-DD[T]00:00:00+10:00 AET formatted date', () => {
    expect(formatDateToYYYYMMDD('2019/05/21')).toBe('2019-05-21')
  })
  it('should provide a YYYY-MM-DD[T]00:00:00+10:00 AET formatted date', () => {
    expect(formatDateToYYYYMMDD('05/21/2019')).toBe('2019-05-21')
  })
})

describe('booleanToYesOrNo', () => {
  it('Should return "Yes" if true', () => {
    expect(booleanToYesOrNo(true)).toBe('Yes')
  })
  it('Should return "No" if false', () => {
    expect(booleanToYesOrNo(false)).toBe('No')
  })
})

describe('booleanToCoveredOrNotCovered', () => {
  it('Should return "Covered" if true', () => {
    expect(booleanToCoveredOrNotCovered(true)).toBe('Covered')
  })
  it('Should return "Not Covered" if false', () => {
    expect(booleanToCoveredOrNotCovered(false)).toBe('Not Covered')
  })
})

describe('formatBalanceAmount', () => {
  it('should add + sign with the amount if the balance amount greater than or equal to 0', () => {
    expect(formatBalanceAmount('200.00')).toBe('+$200.00')
    expect(formatBalanceAmount('0.00')).toBe('+$0.00')
  })

  it('should add - sign with the amount if the balance amount less than 0', () => {
    expect(formatBalanceAmount('-200.00')).toBe('-$200.00')
  })
})

describe('hashedPhoneNumber', () => {
  it(`should convert the phone number's first 6 numbers to a X
      and a space after the 4th and 7th digit`, () => {
    expect(hashedPhoneNumber('0411111111')).toBe('XXXX XX1 111')
  })
})

describe('getFormattedDateDiff', () => {
  it('should return 0 0 0 0 when both dates are same', () => {
    expect(
      getFormattedDateDiff('2019-10-29', '2019-10-29', [
        'years',
        'months',
        'weeks',
        'days',
      ]),
    ).toBe('0 0 0 0')
  })

  it('should return 1 0 0 0 when dates are exactly one year apart', () => {
    expect(
      getFormattedDateDiff('2019-10-29', '2020-10-29', [
        'years',
        'months',
        'weeks',
        'days',
      ]),
    ).toBe('1 0 0 0')
  })

  it('should return difference in days when both dates are same', () => {
    expect(getFormattedDateDiff('2019-10-29', '2020-01-01', ['days'])).toBe(
      '64',
    )
  })
})

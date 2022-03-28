import moment from 'moment-mini-ts'
import numeral from 'numeral'
import formatStringByPattern from 'format-string-by-pattern'
import { IAddress } from 'shared/constants/interfaces/interfaces'
import { parseFloatAndRoundTo2DecimalPlaces } from './helpers'

// REGEX USED HERE TO BE MOVED TO SHARED FILE

/*
 * Formats date and time
 * Takes in ISO format of 2017-01-01T00:00:00.000Z
 *
 * @rawDate the raw date value
 * @inputFormat (optional) the format provided @rawDate is in, e.g. DD/MM/YYYY
 * @dateFormat the format you want to output @rawDate, e.g. YYYY-MM-DD
 *
 * https://momentjs.com/
 */
export const formatDate = (
  rawDate,
  dateFormat = 'DD/MM/YYYY',
  inputFormat = '',
) => {
  if (!rawDate) {
    return
  }

  const isValidDate = moment(rawDate, inputFormat).isValid()
  const result = isValidDate
    ? moment(rawDate, inputFormat).format(dateFormat)
    : rawDate

  return result
}
/*
 * Formats date and time (Persist Timezone)
 * Takes in ISO format of 2017-01-01T00:00:00.000Z
 *
 * @rawDate the raw date value
 * @inputFormat (optional) the format provided @rawDate is in, e.g. DD/MM/YYYY
 * @dateFormat the format you want to output @rawDate, e.g. YYYY-MM-DD
 *
 * https://momentjs.com/
 */
export const formatDatePersistTimezone = (
  rawDate,
  dateFormat = 'DD/MM/YYYY',
  inputFormat = '',
) => {
  if (!rawDate) {
    return
  }

  const isValidDate = moment(rawDate, inputFormat).isValid()
  const result = isValidDate
    ? moment.parseZone(rawDate, inputFormat).format(dateFormat)
    : rawDate

  return result
}

// Determine whether given date is valid for Date Input Field (DD/MM/YYYY)
export const isValidDateInput = (date) => {
  return moment(date, 'DD/MM/YYYY', true).isValid()
}

export const formatUTCDate = (
  rawDate,
  dateFormat = 'DD/MM/YYYY',
  inputFormat = '',
) => {
  const isValidDate = moment.utc(rawDate, inputFormat).isValid()
  const result = isValidDate
    ? moment.utc(rawDate, inputFormat).format(dateFormat)
    : 'Invalid date'

  return result
}

/*
 * Formats dates
 * formatDateToYYYYMMDD assume the input to be MM/DD/YYYY.
 * So it will return 'Invalid date' if the rawDate is 27/12/1934 (see unit tests)
 *
 */
export const formatDateToYYYYMMDD = (rawDate) =>
  moment.utc(rawDate).format('YYYY-MM-DD')

export const formatLocalDateToYYYYMMDD = (rawDate) =>
  moment(rawDate).format('YYYY-MM-DD')

export const formatDateToISO8601 = (rawDate) =>
  moment.utc(rawDate).toISOString()

export const getToday = (dateFormat) => formatDate(new Date(), dateFormat)

export const getStartOfFinYear = (dateFormat) => {
  // 1st of July of current year
  const july = moment().month('july').date(1)
  return moment().isSameOrAfter(july, 'day')
    ? formatDate(july, dateFormat)
    : formatDate(july.subtract(1, 'year'), dateFormat)
}

export const getEndOfFinYear = (dateFormat) => {
  // 30 june of last year
  const june = moment().month('june').date(30)
  return moment().isSameOrAfter(june, 'day')
    ? formatDate(june, dateFormat)
    : formatDate(june.subtract(1, 'year'), dateFormat)
}

// get year from date
export const getFullYearFromDate = (rawDate) => {
  const date = new Date(rawDate)
  return date.getFullYear()
}

export const formatPercentage = (value) => {
  if (value) {
    const parsedFloat = parseFloat(value)
    if (parsedFloat || parsedFloat === 0) {
      return `${parsedFloat}%`
    }
    return ''
  }

  if (String(value) === '0') {
    return '0%'
  }

  return ''
}

export const removePercentage = (value) => {
  if (value) {
    return value.replace('%', '')
  }

  return '0'
}

// Remove commas from the value that gets passed in.
export const removeCommaFromValue = (value) => {
  if (value) {
    return value.toString().replace(/,/g, '')
  } else {
    return null
  }
}

// Change a word to follow sentence case in scenarios where text-transform: capitalise doesn't work
// i.e ALLCAPS will be Allcaps, or ALL CAPS will be All Caps
export const convertToSentenceCase = (value) => {
  const convertedString = value
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')

  return convertedString
}

// Add commas to thousands separator. E.g. 3,000.
export const addCommaToThousands = (value) => {
  if (value) {
    let stringValue = value.toString()
    if (stringValue.indexOf(',') > -1) {
      stringValue = removeCommaFromValue(stringValue)
    }
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return null
  }
}

// Add commas to thousands separator and fix to two decimal places. E.g. 3,000.00
export const addCommaAndDecimals = (
  value: string | number | undefined,
  isRounded?: boolean,
) => {
  if (isRounded) {
    return numeral(value).format('0,0')
  } else if (value !== undefined) {
    return numeral(value).format('0,0.00')
  } else {
    return null
  }
}

/*
 * Formats currency
 * @isRounded only affects zero value input
 * @isBlur on true, returns 2 decimals if value has decimals
 *
 */
export const addDollarAndCommas = (
  value: any,
  isRounded?: boolean,
  isBlur = false,
) => {
  if (value || value === 0) {
    // Remove Dollars and commas
    // tslint:disable-next-line
    let stringValue = removeDollarAndCommas(value)
    // If initial value like 0.00 return, no further formating required
    if ((stringValue === '0.00' || value === '0') && isRounded) {
      return '$0'
    } else if (stringValue === '0.00' || value === '0') {
      return '$0.00'
    }
    // Check if it has a decimal place
    const decimalIndex = stringValue.indexOf('.')
    const hasDecimal = decimalIndex > -1
    // Turn the string to a float with 2 decimal places
    const twoDecimals = parseFloatAndRoundTo2DecimalPlaces(stringValue)
    // toLocaleString returns the number with comma seperated values
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    // We also add the dollar sign here
    const finalString = `$${twoDecimals.toLocaleString()}`

    // return 2 decimals if isBlur is true and the value entered has decimals
    if (isBlur) {
      const decimals: number = Number(stringValue.substring(decimalIndex))
      if (
        hasDecimal &&
        decimalIndex !== stringValue.length - 1 &&
        decimals !== 0
      ) {
        return formatMoney(value)
      }
      return finalString
    }

    // Although if there is a '.' decimal point on the end, it will remove it
    // So we check for it here and add it back in
    if (decimalIndex === stringValue.length - 1) {
      // If the user has entered a '.' and nothing else.
      // Return $0.
      if (decimalIndex === 0) {
        return `$0.`
      }
      // Add the '.' back in
      return `${finalString}.`
    }
    // It will also remove if the number after the decimal is a 0
    const lastChar = stringValue[stringValue.length - 1]
    if (
      hasDecimal &&
      decimalIndex + 2 === stringValue.length &&
      lastChar === '0'
    ) {
      return `${finalString}.0`
    }
    // Return formatted string
    return finalString
  }
  return null
}

export const removeDollarAndCommas = (value) => {
  if (value || value === 0) {
    // Remove all commas and dollars
    const stringValue = value.toString().replace(/,/g, '').replace('$', '')

    // Restricted a third number after the decimal from being entered
    const decimalIndex = stringValue.indexOf('.')
    const hasDecimal = decimalIndex > -1
    const hasThirdNumberAfterDecimal =
      hasDecimal && decimalIndex + 4 === stringValue.length
    if (hasThirdNumberAfterDecimal) {
      return stringValue.slice(0, -1)
    }
    return stringValue
  }

  return ''
}

export const addDollarCommasAndDecimals = (value) => {
  if (value) {
    const stringValue = removeDollarAndCommas(value)
    // Check if it has a decimal place
    const decimalIndex = stringValue.indexOf('.')
    const hasDecimal = decimalIndex > -1
    const decimals = stringValue.split('.')[1]
    const decimalPlaces = decimals ? decimals.length : 0
    const finalString = hasDecimal
      ? decimalPlaces === 1
        ? numeral(stringValue).format('$0,0.0')
        : numeral(stringValue).format('$0,0.00')
      : numeral(stringValue).format('$0,0')

    // Return formatted string
    return finalString
  }
  return null
}

// -1000 -> '-$1,000.00'
export const formatMoney = (value) => numeral(value).format('$0,0.00')

// remove decimal places. E.g. 3000
export const removeDecimals = (value) => {
  if (value) {
    return numeral(value).format('0,0')
  } else {
    return null
  }
}

export const removeNonNumbers = (value) => {
  if (value) {
    return value.replace(/[^0-9]/g, '')
  }
  return null
}

export const removeSpecialCharacters = (value) => {
  if (value) {
    return value.replace(/[=~!@#$%^&*()_+`[\]}{;:"//\\|.,?><]/g, '')
  }
  return null
}

// Allows numbers and a '+' at the beginning of the number
export const formatPhoneNumber = (value) => {
  if (value) {
    const numbersAndPlusSignOnly = value.replace(/[^0-9+]/g, '')
    const indexOfPlusSign = numbersAndPlusSignOnly.lastIndexOf('+')
    if (indexOfPlusSign > 0 && value.length > 1) {
      return (
        numbersAndPlusSignOnly.slice(0, indexOfPlusSign) +
        numbersAndPlusSignOnly.slice(indexOfPlusSign + 1)
      )
    }
    return numbersAndPlusSignOnly
  }
  return null
}

// Allows numbers and only characters available to international numbers
export const allowForInternationalNumbers = (value) => {
  if (value) {
    return value.replace(/[^0-9+()\s]/g, '')
  }
  return null
}

export const removeNumbersAndSpecialChars = (value) => {
  if (value) {
    // Allows only a-A to z-Z, accented, dash and apostrophy only.
    return value.replace(/[0-9=~!@#$%^&*()_+`[\]}{;:"//\\|.,?><]/g, '')
  }
  return null
}

export const formatStringToDate = (value) => {
  return formatStringByPattern('DD/MM/YYYY', value)
}

export const addressToString = (address: IAddress) => {
  const formatProp = (addressProp: string | undefined) => {
    return addressProp ? `${addressProp}, ` : ''
  }

  if (address) {
    const { addressLine1, addressLine2, suburb, postCode, state } = address
    const stateFormat = state ? state : ''
    // tslint:disable-next-line:max-line-length
    return `${formatProp(addressLine1)}${formatProp(addressLine2)}${formatProp(
      suburb,
    )}${formatProp(postCode)}${stateFormat}`
  }
  return ''
}

export const booleanToYesOrNo = (isTrue: boolean) => {
  return isTrue ? 'Yes' : 'No'
}

export const booleanToCoveredOrNotCovered = (isTrue: boolean) => {
  return isTrue ? 'Covered' : 'Not Covered'
}

// Returning string containing balance amount with '+/-' and '$' sign
export const formatBalanceAmount = (value) => {
  const parsedValue = parseFloat(value)
  const amount = parsedValue < 0 ? value.toString().split('-')[1] : value
  const sign = parsedValue >= 0 ? '+' : '-'

  return sign + '$' + amount
}

// Returns hashed phone number as such XXXX XX1 111.
export const hashedPhoneNumber = (phoneNumber: string) => {
  const phoneNumberArray: string[] = phoneNumber.split('')
  const hashedNumbersArray: string[] = phoneNumberArray.map(
    (item: string, index: number) => {
      return index < 6 ? 'X' : item
    },
  )
  const hashedNumber: string = hashedNumbersArray
    .join('')
    .replace(/^(.{4})/, '$1 ')
    .replace(/^(.{8})/, '$1 ')
  return hashedNumber
}

export const getFormattedDateDiff = (startDate, endDate, int) => {
  const start = moment(startDate)
  const end = moment(endDate)
  const intervals: any = int
  const out: any = []

  for (const i of intervals) {
    const diff = end.diff(start, i)
    start.add(diff, i)
    out.push(diff)
  }
  return out.join(' ')
}

export const countdownToPreservationAge = (DOB, preservationAge) => {
  const year = moment(DOB).year() + preservationAge
  const month = moment(DOB).month()
  const date = moment(DOB).date() + 1
  const currentDOB = formatDateToYYYYMMDD(new Date(year, month, date))
  const today = formatDateToYYYYMMDD(new Date())
  const toPreservationAge = getFormattedDateDiff(today, currentDOB, [
    'months',
    'days',
  ])
  return toPreservationAge
}

export const removeNonNumberAndHypen = (value) => {
  if (value) {
    return value.replace(/[^0-9-]/g, '')
  }
  return null
}

export const getParsedBSB = (value) => {
  return value.replace(/^.{0}(.{3})(.*)/i, '$1-$2')
}

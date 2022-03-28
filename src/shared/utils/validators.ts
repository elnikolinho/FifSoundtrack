import moment from 'moment-mini-ts'
import { parsePhoneNumber } from 'libphonenumber-js'

export const isValidDate = (
  value: string | undefined,
  { disallowFutureDate = false, disallowCurrentDate = false } = {},
) => {
  if (value) {
    const now = moment()
    const dateValue = moment(
      value,
      [
        'DD/MM/YYYY',
        'YYYY/MM/DD',
        'DD-MM-YYYY',
        'YYYY-MM-DD',
        'DD.MM.YYYY',
        'YYYY.MM.DD',
      ],
      true,
    )
    if (
      dateValue.isValid() &&
      dateValue.isAfter('1867-01-01') &&
      (!disallowFutureDate ||
        (disallowCurrentDate
          ? dateValue.isBefore(now, 'day')
          : dateValue.isSameOrBefore(now, 'day')))
    ) {
      return true
    } else {
      return false
    }
  }
  return false
}

export const isValidMobile = (value) => {
  const phoneNumberLength = value ? value.length : 0
  if (phoneNumberLength >= 10 && phoneNumberLength <= 20) {
    try {
      const phoneNumberInfo = parsePhoneNumber(value, 'AU')
      return phoneNumberInfo.isValid()
    } catch {
      return false
    }
  } else if (phoneNumberLength === 0) {
    return true
  }
  return false
}

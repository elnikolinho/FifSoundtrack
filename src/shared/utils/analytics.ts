import isEmpty from 'lodash/isEmpty'
import MobileDetect from 'mobile-detect'
import { PAGE_DATA, IPageLoadDataParams, IPageLoadData } from 'shared/constants'

const md = new MobileDetect(window.navigator.userAgent)
// Environment variables
const isDevelopment = process.env.NODE_ENV === 'development'
const isAnalyticsLogEnabled = isDevelopment && process.env.ANALYTICS === 'true'

export const getDeviceType = () => {
  if (md.phone()) {
    return 'Mobile'
  } else if (md.tablet()) {
    return 'Tablet'
  } else {
    return 'Desktop'
  }
}

export function getSystemEnv() {
  const { origin } = window.location

  if (origin.search('mol-test') > -1) {
    return 'Test'
  }

  if (origin.search('mol-stage') > -1) {
    return 'Stage'
  }

  if (origin.search('my.testSite') > -1) {
    return 'Production'
  }

  return 'Localhost'
}

/**
 *
 * Parse Page Path
 *
 * You could pass eventPath in two different ways
 * 1. In one dot-separated string, e.g. "levers.homePageLoad"
 * 2. As additional parameter
 *
 */
const parsePagePath: any = (pagePath: string, eventPath?: string) => {
  const indexOfPeriod = pagePath.indexOf('.')

  if (indexOfPeriod > 0) {
    const section = pagePath.substr(0, indexOfPeriod)
    const event = pagePath.substr(indexOfPeriod + 1)

    return PAGE_DATA[section][event]
  } else {
    return eventPath ? PAGE_DATA[pagePath][eventPath] : PAGE_DATA[pagePath]
  }
}

export function pageLoadDataCreator(
  pageData: string | IPageLoadDataParams,
): IPageLoadData {
  let routePageData = {}

  if (typeof pageData === 'string') {
    routePageData = parsePagePath(pageData)
  } else {
    const routePageDataFunc = parsePagePath(
      pageData.pagePath,
      pageData.eventPath,
    )

    if (typeof routePageDataFunc === 'function') {
      // Call the resulting function to get the dynamic values
      routePageData = routePageDataFunc(pageData)
    }
  }

  // Error logging for data retrieval failure
  if (isAnalyticsLogEnabled && isEmpty(routePageData)) {
    // eslint-disable-next-line no-console
    console.error(
      `Error ----> Analytics logging failed. Couldn't retrieve analytics data for:`,
      pageData,
    )
  }

  // Setting path info
  const { pathname, href } = window.location
  const pathInfo = {
    pagePath: pathname,
    pageURL: href,
  }

  return {
    ...routePageData,
    ...pathInfo,
  }
}

export function getSiteData() {
  return {
    brand: 'MJOL',
    siteDomain: window.location.origin,
    sysEnv: getSystemEnv(),
    siteFormat: getDeviceType(),
  }
}

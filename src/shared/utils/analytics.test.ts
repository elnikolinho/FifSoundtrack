import {
  getSiteData,
  getSystemEnv,
  getDeviceType,
  pageLoadDataCreator,
} from './analytics'

describe('Analytics util methods test', () => {
  it('Site data object should be return with all the data field', () => {
    const siteData = getSiteData()
    expect(siteData.brand).toBe('MJOL')
    expect(siteData.sysEnv).toBe('Localhost')
    expect(siteData.siteFormat).toBe('Desktop')
  })

  it('System env should return as "Localhost"', () => {
    const systemEnv = getSystemEnv()
    expect(systemEnv).toBe('Localhost')
  })

  it('Device type should return as "Desktop"', () => {
    const deviceType = getDeviceType()
    expect(deviceType).toBe('Desktop')
  })

  it('Page data object should be returned empty for empty pagePath', () => {
    const pageData = pageLoadDataCreator({ pagePath: '' })
    expect(pageData).toBeDefined()
  })
})

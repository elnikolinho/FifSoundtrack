export const getUrlParameter = (name: string, fallback = '') => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  // eslint-disable-next-line no-restricted-globals
  const results = regex.exec(location.search)
  return results === null
    ? fallback
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

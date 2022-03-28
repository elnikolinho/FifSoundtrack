/**
 * Get Clean AEM API path
 *
 * Remove any unneeded characters from the given path, and add file extension
 * @param fullPath
 */
export const getCleanAemPath = (fullPath: string) => {
  return fullPath
    ? fullPath.replace('/content/mol/join/', '') + '.model.json'
    : ''
}

/**
 * Get AEM API model name
 * Remove any unneeded characters from the given path, and return just
 * the model name.
 * @param fullPath
 */
export const getAemModelName = (fullPath: string, extraPath?: string) => {
  const extra = extraPath ? extraPath : ''

  return fullPath ? fullPath.replace(`/content/mol/join/${extra}`, '') : ''
}

/**
 * Return formatted url params for goal & advice
 * @param url
 * @param separator
 * @returns {goalPath: string, advicePath:string }
 */
export const formatAemPathsUrlParam = (url: string, separator: string) => {
  const urlParam = url.split(separator)[1]
  const goalPath = urlParam?.split('/')[0]
  return { goalPath: goalPath, advicePath: urlParam }
}

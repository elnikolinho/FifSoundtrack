import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

/* https://github.com/remix-run/react-router/issues/5362
 Use replace instead of push when location is the same
 */

export default function useLocationBlocker() {
  const history = useHistory()
  useEffect(
    () =>
      history?.block((location, action) => {
        return action !== 'PUSH' ||
          getLocationId(location) !== getLocationId(history.location)
          ? undefined
          : false
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )
}

function getLocationId({ pathname, search, hash }) {
  return pathname + (search ? '?' + search : '') + (hash ? '#' + hash : '')
}

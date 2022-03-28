import {
  getCleanAemPath,
  getAemModelName,
  formatAemPathsUrlParam,
} from './cleanAemPath'

describe('getCleanAemPath', () => {
  it('Remove AEM path from given string and add json extension', () => {
    expect(getCleanAemPath('/content/mol/join/join/example')).toBe(
      'join/example.model.json',
    )
  })

  it('Should return empty sting if full path is empty', () => {
    expect(getCleanAemPath('')).toBe('')
  })
})

describe('getAemModelName', () => {
  it('Get model name from path', () => {
    expect(getAemModelName('/content/mol/join/example')).toBe('example')
  })

  it('Get model name from path from nested path', () => {
    expect(
      getAemModelName('/content/mol/join/example', 'advice-library/'),
    ).toBe('/content/mol/join/example')
  })

  it('Should return empty sting if full path is empty', () => {
    expect(getAemModelName('', 'test')).toBe('')
  })
})

describe('formatAemPathsUrlParam', () => {
  it('Get goal & advice paths', () => {
    expect(
      formatAemPathsUrlParam(
        'http://0.0.0.0:3000/join/advice-library/advice#take-parental-leave/preparing-for-a-change-in-income',
        '#',
      ),
    ).toMatchObject({
      goalPath: 'take-parental-leave',
      advicePath: 'take-parental-leave/preparing-for-a-change-in-income',
    })
  })
})

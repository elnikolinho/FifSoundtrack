/**
 * Our Theme config file containing all colours, fonts, etc.
 *
 * As at 12/11/2020 there's only one theme, but this could be extended
 * to support multiple themes in the future if needed.
 */
import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme {
    breakPoints: {
      xs: number
      mobile: number
      tablet: number
      desktop: number
      desktopLarge: number
    }
    colors: {
      // primary
      indigo: string
      purple: string
      purple40: string
      darkPurple: string
      textHeading: string
      textBody: string
      textBody40: string

      // secondary
      deepLilac: string
      lilac: string

      // Whites
      white: string
      white90: string
      white80: string
      white40: string
      white04: string

      // blacks
      black05: string
      black25: string
      black70: string

      // greys
      keylines: string
      background: string
      grey: string
      darkGrey: string

      // greens
      turquoise: string

      // UI
      success: string
      pending: string
      warning: string
      error: string

      // Other
      focus: string
      spinnerTrail: string
    }
    fonts: {
      family: {
        sailecLight: string
        sailecRegular: string
        sailecMedium: string
        sailecBold: string
        secondary: string
      }
      size: {
        base: number
        default: number
      }
      weight: {
        normal: number
        bold: number
      }
    }
    zIndex: {
      spinner: number
      fullScreenMenu: number
      stickyFooter: number
      stickyHeader: number
      popperMessage: number
      above: number
      default: number
      zero: number
      below: number
    }
    siteSizing: {
      maxContentWidth: number
      largeContentMaxWidth: number
      mediumContentMaxWidth: number
      mediumInnerContentMaxWidth: number
      narrowContentMaxWidth: number
      outerGutter: {
        default: number
        tablet: number
        desktop: number
        desktopLarge: number
      }
      spacer: {
        XXL: string
        XL: string
        L: string
        M: string
        S: string
        XS: string
        XXS: string
      }
      panels: {
        left: {
          desktop: { getMaxWidth(): number }
          desktopLarge: { getMaxWidth(): number }
        }
        right: {
          desktop: { maxWidth: number }
          desktopLarge: { maxWidth: number }
        }
      }
      header: {
        height: {
          mobile: number
          tablet: number
        }
      }
      stickyBarChart: {
        height: {
          mobile: number
          tablet: number
        }
      }
      informationBlock: {
        maxWidth: number
      }
    }
  }
}

const defaultTheme: DefaultTheme = {
  breakPoints: {
    xs: 375,
    mobile: 520,
    tablet: 768,
    desktop: 1024,
    desktopLarge: 1200,
  },

  colors: {
    // primary
    indigo: '#292460',
    purple: '#7226E0',
    purple40: 'rgba(70, 16, 148, 0.4)',
    darkPurple: '#461094',
    textHeading: '#333333',
    textBody: '#666666',
    textBody40: 'rgba(102, 102, 102, 0.4)',

    // secondary
    deepLilac: '#6352DC',
    lilac: '#A091EE',

    // Whites
    white: '#ffffff',
    white90: 'rgba(255, 255, 255, 0.9)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white40: 'rgba(255, 255, 255, 0.4)',
    white04: 'rgba(255, 255, 255, 0.04)',

    // blacks
    black05: 'rgba(0, 0, 0, 0.05)',
    black25: 'rgba(0, 0, 0, 0.25)',
    black70: 'rgba(0, 0, 0, 0.7)',

    // greys
    keylines: '#e6e6e6',
    background: '#f8f8f8',
    grey: '#b9b9b9',
    darkGrey: '#777676',

    // greens
    turquoise: '#A1E6DB',

    // UI
    success: '#008000',
    pending: '#FB9126',
    warning: '#FEC064',
    error: '#DD2727',

    // Other
    focus: '#2361C5',
    spinnerTrail: '#E5D4FD',
  },

  fonts: {
    family: {
      sailecLight: 'Sailec-Light, Arial, Helvetica, sans-serif',
      sailecRegular: 'Sailec-Regular, Arial, Helvetica, sans-serif',
      sailecMedium: 'Sailec-Medium, Arial, Helvetica, sans-serif',
      sailecBold: 'Sailec-Bold, Arial, Helvetica, sans-serif',
      secondary: 'HurmeGeometricSans4-Light, Arial, Helvetica, sans-serif',
    },
    size: {
      base: 10,
      default: 16,
    },
    weight: {
      normal: 400,
      bold: 700,
    },
  },

  zIndex: {
    spinner: 9999,
    fullScreenMenu: 900,
    stickyFooter: 800,
    stickyHeader: 901,
    popperMessage: 10,
    above: 2,
    default: 1,
    zero: 0,
    below: -1,
  },

  siteSizing: {
    maxContentWidth: 1280,
    largeContentMaxWidth: 965,
    mediumContentMaxWidth: 842,
    mediumInnerContentMaxWidth: 622,
    narrowContentMaxWidth: 515,
    outerGutter: {
      default: 20,
      tablet: 40,
      desktop: 40,
      desktopLarge: 80,
    },
    spacer: {
      XXL: '88px',
      XL: '60px',
      L: '36px',
      M: '24px',
      S: '16px',
      XS: '12px',
      XXS: '8px',
    },
    panels: {
      left: {
        desktop: {
          getMaxWidth: () => {
            return (
              defaultTheme.siteSizing.maxContentWidth -
              defaultTheme.siteSizing.panels.right.desktop.maxWidth
            )
          },
        },
        desktopLarge: {
          getMaxWidth: () => {
            return (
              defaultTheme.siteSizing.maxContentWidth -
              defaultTheme.siteSizing.panels.right.desktopLarge.maxWidth
            )
          },
        },
      },
      right: {
        desktop: { maxWidth: 600 },
        desktopLarge: { maxWidth: 450 },
      },
    },

    header: {
      height: {
        mobile: 60,
        tablet: 80,
      },
    },
    stickyBarChart: {
      height: {
        mobile: 145,
        tablet: 190,
      },
    },
    informationBlock: {
      maxWidth: 570,
    },
  },
}

export default defaultTheme

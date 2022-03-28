import { css } from 'styled-components'
import defaultTheme from '../theme.styles'
import { rem, minMedia } from '.'

const siteSizing = defaultTheme.siteSizing

export const contentContainer = () => {
  return css`
    margin: 0 auto;
    width: 100%;
    max-width: ${rem(
      siteSizing.maxContentWidth + siteSizing.outerGutter.desktopLarge * 2,
    )};
    padding-left: ${rem(siteSizing.outerGutter.default)};
    padding-right: ${rem(siteSizing.outerGutter.default)};

    ${minMedia.tablet} {
      padding-left: ${rem(siteSizing.outerGutter.tablet)};
      padding-right: ${rem(siteSizing.outerGutter.tablet)};
    }

    ${minMedia.desktop} {
      padding-left: ${rem(siteSizing.outerGutter.desktop)};
      padding-right: ${rem(siteSizing.outerGutter.desktop)};
    }

    ${minMedia.desktopLarge} {
      padding-left: ${rem(siteSizing.outerGutter.desktopLarge)};
      padding-right: ${rem(siteSizing.outerGutter.desktopLarge)};
    }
  `
}

/**
 * Usage: You'd apply this to an element that should touch the edge of
 * the viewport.
 * They'd be a child of an element where the parent uses contentContainer(), e.g. <ContentContainer />
 */
export const ignoreContainerGutter = () => {
  return css`
    margin-left: -${rem(siteSizing.outerGutter.default)};
    margin-right: -${rem(siteSizing.outerGutter.default)};

    ${minMedia.tablet} {
      margin-left: -${rem(siteSizing.outerGutter.tablet)};
      margin-right: -${rem(siteSizing.outerGutter.tablet)};
    }

    ${minMedia.desktop} {
      margin-left: -${rem(siteSizing.outerGutter.desktop)};
      margin-right: -${rem(siteSizing.outerGutter.desktop)};
    }

    ${minMedia.desktopLarge} {
      margin-left: -${rem(siteSizing.outerGutter.desktopLarge)};
      margin-right: -${rem(siteSizing.outerGutter.desktopLarge)};
    }
  `
}

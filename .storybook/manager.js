import { addons } from '@storybook/addons'
import theme from './TestTheme';


// List of options are available here:
// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
  enableShortcuts: false,
})

addons.setConfig({
  theme
});
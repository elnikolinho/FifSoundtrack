import React from 'react'
global.React = React
global.externalLibrary = {
  logError: (err) => {
    console.log(err) // will output errors during Jest run
  },
}

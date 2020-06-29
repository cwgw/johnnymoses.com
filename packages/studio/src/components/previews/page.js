import React from 'react'
import { ThemeProvider } from 'theme-ui'

import { renderPageModules, theme } from '@johnnymoses.com/components'

import schema from '../../../schemas/schema';

export default (props) => {
  const modules = props.document.displayed?.content?.main?.modules;
  // console.log({ props })
  return (
    <ThemeProvider theme={theme} >
      {renderPageModules(modules)}
    </ThemeProvider>
  );
}
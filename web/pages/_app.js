import React from 'react'
import BaseApp from 'next/app'
import client from '../client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

// import 'normalize.css'
import '../styles/shared.module.css'
import '../styles/layout.css'
import "@fontsource/cairo"

// 2. Extend the theme to include custom colors, fonts, etc
const fonts = {
  fonts: {
    body: 'Cario',
    heading: 'futura-pt'
  },
}

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const theme = extendTheme({ colors, fonts })

const siteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `


// const theme = extendTheme({ colors, typography })

class App extends BaseApp {
  static async getInitialProps ({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Add site config from sanity
    return client.fetch(siteConfigQuery).then(config => {
      if (!config) {
        return {pageProps}
      }
      if (config && pageProps) {
        pageProps.config = config
      }

      return {pageProps}
    })
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    )
  }
}

export default App

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: "Cairo",
    body: "futura-pt",
  },
})

export default theme
// 2. Extend the theme to include custom colors, fonts, etc
// const customTheme = {
//   fonts: {
//     body: 'Cario',
//     heading: 'futura-pt'
//   },
// }
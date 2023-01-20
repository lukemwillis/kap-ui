import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'system',
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      navy: "#2d388a",
      orange: "#eb5628",
    }
  }
})

export default theme
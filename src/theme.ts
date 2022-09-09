import { createTheme } from '@mui/material'
import { grey, orange, pink } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: pink,
    background: {
      default: orange[500],
      paper: orange[300],
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
})

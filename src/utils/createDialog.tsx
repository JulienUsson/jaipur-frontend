import { ThemeProvider } from '@emotion/react'
import { Alert, Snackbar } from '@mui/material'
import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { theme } from '../theme'

type CreateDialogChild<T> = (onClose: (arg: T) => void) => ReactNode

export default function createDialog<T = void>(child: CreateDialogChild<T>): Promise<T> {
  const root = document.createElement('div')
  const body = document.querySelector('body')
  body?.appendChild(root)

  return new Promise((resolve) => {
    function onClose(arg: T) {
      ReactDOM.unmountComponentAtNode(root)
      body?.removeChild(root)
      resolve(arg)
    }

    ReactDOM.render(<ThemeProvider theme={theme}>{child(onClose)}</ThemeProvider>, root)
  })
}

export function showError(message: string) {
  createDialog((onClose) => (
    <Snackbar open autoHideDuration={6000} onClose={() => onClose()}>
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  ))
}

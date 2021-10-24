import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

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

    ReactDOM.render(<>{child(onClose)}</>, root)
  })
}

import { CssBaseline, ThemeProvider } from '@mui/material'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Error from './components/Error'
import Loading from './components/Loading'
import { ApiConfigProvider } from './contexts/ApiConfigContext'
import Game from './pages/Game'

import Home from './pages/Home'
import { theme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiConfigProvider>
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games/:gameId/players/:playerIndex" element={<Game />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </ApiConfigProvider>
    </ThemeProvider>
  )
}

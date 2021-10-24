import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'

import Error from './components/Error'
import Loading from './components/Loading'
import Game from './pages/Game'

import Home from './pages/Home'

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/games/:gameId/player/:playerIndex" component={Game} exact />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  )
}

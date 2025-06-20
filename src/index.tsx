/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import './index.css'
import App from './App.tsx'
import SessionManager from './pages/SessionManager.tsx'

const root = document.getElementById('root')

render(() => <Router base={import.meta.env.BASE_URL} root={App}>
  <Route path="/" component={SessionManager} />
</Router>, root!)

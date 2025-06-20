import PWABadge from './PWABadge.tsx'
import { A } from '@solidjs/router'

function App(props: any) {
  return (
    <>
      <main>
        {props.children}
      </main>
      <nav>
        <A href="/">SessionManager</A>
      </nav>
      <PWABadge />
    </>
  )
}

export default App

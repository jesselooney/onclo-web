import PWABadge from './PWABadge.tsx'
import { A } from '@solidjs/router'
import styles from './App.module.css'
import featherSpriteUrl from '/public/feather-sprite.svg'

const clockIconUrl = featherSpriteUrl + "#clock"
const eyeIconUrl = featherSpriteUrl + "#eye"

function App(props: any) {
  return (
    <>
      <header class={styles.Header}>
        <h1>Onclo</h1>
      </header>
      <main class={styles.Main}>
        {props.children}
      </main>
      <nav class={styles.Navigation}>
        <A href="/track" activeClass={`${styles.NavItem} ${styles.NavItem__Active}`} inactiveClass={styles.NavItem}>
          <svg class="feather">
            <use href={clockIconUrl} />
          </svg>
          <span>Track</span>
        </A>
        <A href="/analyze" activeClass={`${styles.NavItem} ${styles.NavItem__Active}`} inactiveClass={styles.NavItem}>
          <svg class="feather">
            <use href={eyeIconUrl} />
          </svg>
          <span>Analyze</span>
        </A>
      </nav >
      <PWABadge />
    </>
  )
}

export default App

import { DateTime } from "luxon"
import { For, Switch, Match, createMemo, createSignal } from "solid-js"
import SessionView from "../components/SessionView";
import { Session } from "../models/session";
import { SessionsContext } from "../sessionsContext";
import { createStore } from "solid-js/store";
import styles from "./SessionManager.module.css"

function SessionManager() {
  // WARN: The following invariants are assumed to hold about the Session list:
  // 1. contiguous order --- for session s and its successor t in the list, s.endDate === t.startDate
  const [sessions, setSessions] = createStore<Session[]>([
    Session.new(0, DateTime.fromObject({ hour: 6, minute: 50 }), DateTime.fromObject({ hour: 7 }), "prep morning", ""),
    Session.new(1, DateTime.fromObject({ hour: 7 }), DateTime.fromObject({ hour: 7, minute: 50 }), "workout", ""),
    Session.new(2, DateTime.fromObject({ hour: 7, minute: 50 }), DateTime.fromObject({ hour: 8, minute: 5 }), "shower", ""),
    Session.new(3, DateTime.fromObject({ hour: 8, minute: 5 }), DateTime.fromObject({ hour: 8, minute: 10 }), "work pack", ""),
  ])

  const nextSessionId = createMemo(() => sessions.length > 0 ? Math.max(...sessions.map(session => session.id)) : 0)
  const lastSessionEndDate = createMemo(() => sessions[sessions.length - 1].endDate)

  const toActivity = (activityName: string) =>
    activityName.replaceAll(/\s+/g, " ").trim()

  const submitSession = () => {
    const activityName = toActivity(text())
    if (activityName === "") return

    const note = ""

    setSessions(
      sessions.length, Session.new(
        nextSessionId(),
        lastSessionEndDate(),
        DateTime.now(),
        activityName,
        note
      )
    )

    setText("")
    stopSearching()
  }

  const [text, setText] = createSignal("")

  const [isSearching, setIsSearching] = createSignal(false)
  const startSearching = () => setIsSearching(true)
  const stopSearching = () => {
    setIsSearching(false)
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur()
  }
  const [suggestions, _] = createStore<string[]>(["suggestion one", "yeet"])

  const [height, setHeight] = createSignal(0);
  setInterval(() => setHeight(window.innerHeight), 100)

  return (
    <SessionsContext.Provider value={[sessions, setSessions]}>
      <section class={styles.SessionManager}>
        <Switch>
          <Match when={!isSearching()}>
            <ol class={styles.SessionList}>
              <For each={sessions}>
                {session =>
                  <li class={styles.SessionList__ListItem}>
                    <SessionView session={session} />
                  </li>
                }
              </For>
            </ol>
          </Match>
          <Match when={isSearching()}>
            <ol class={styles.ActivitySuggestionList}>
              <For each={suggestions}>
                {
                  (suggestion, _) =>
                    <li class={styles.ActivitySuggestionList__ListItem} onClick={() => { setText(suggestion); submitSession() }}>
                      {suggestion}
                    </li>
                }
              </For>
            </ol>
          </Match>
        </Switch>
        <div>{height()}</div>
        <div class={styles.SessionSubmitInput}>
          <input
            class={styles["SessionSubmitInput__TextInput"]}
            onInput={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") submitSession() }}
            onFocusIn={() => startSearching()}
            value={text()}
          />
          <button class={styles["SessionSubmitInput__SubmitButton"]} onClick={submitSession}>^</button>
        </div>
      </section>
    </SessionsContext.Provider>
  )
}

export default SessionManager

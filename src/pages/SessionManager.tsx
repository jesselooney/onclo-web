import { DateTime } from "luxon"
import { For } from "solid-js"

type Session = { endDate: DateTime; activity: string }

function SessionManager() {
  const sessions: Session[] = [
    { endDate: DateTime.fromObject({ hour: 11, minute: 23 }), activity: "eat breakfast" },
    { endDate: DateTime.fromObject({ hour: 12, minute: 19 }), activity: "eat lunch" }
  ]

  return (
    <>
      <h1>Session Manager</h1>
      <ol>
        <For each={sessions}>
          {session =>
            <li>
              <span>{session.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
              <span>{session.activity}</span>
            </li>
          }
        </For>
      </ol>
    </>
  )
}

export default SessionManager

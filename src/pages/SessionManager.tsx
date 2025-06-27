import { DateTime } from "luxon"
import { For } from "solid-js"
import SessionView from "../components/SessionView";
import { Session } from "../models/Session";
import { SessionsContext } from "../sessionsContext";
import { createStore } from "solid-js/store";

function SessionManager() {
  const [sessions, setSessions] = createStore<Session[]>([
    { id: 49, endDate: DateTime.fromObject({ hour: 11, minute: 23 }), activityString: "eat breakfast" },
    { id: 37, endDate: DateTime.fromObject({ hour: 12, minute: 19 }), activityString: "eat lunch" }
  ])

  return (
    <SessionsContext.Provider value={[sessions, setSessions]}>
      <h1>Session Manager</h1>
      <ol>
        <For each={sessions}>
          {session =>
            <li>
              <SessionView session={session} />
              <div>
                {session.activityString}
              </div>
            </li>
          }
        </For>
      </ol>
    </SessionsContext.Provider>
  )
}

export default SessionManager

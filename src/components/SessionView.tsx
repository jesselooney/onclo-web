import { Component, useContext } from "solid-js"
import { DateTime } from "luxon"
import { Session } from "../models/Session"
import { SessionsContext } from "../sessionsContext"

const SessionView: Component<{ session: Session }> = (props) => {
  const [_, setSessions] = useContext(SessionsContext);

  const editSession = (modifiedSession: Partial<Session>) =>
    setSessions(
      (session: Session) => session.id === modifiedSession.id, modifiedSession)

  const editActivity = (sessionId: number, event: { target: HTMLInputElement }) => {
    editSession({ id: sessionId, activityString: event.target.value.trim() });
  }

  return (
    <div>
      <span>
        {props.session.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </span>
      <input onInput={[editActivity, props.session.id]} />
    </div>
  )
}

export default SessionView

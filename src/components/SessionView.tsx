import { Component } from "solid-js"
import { DateTime } from "luxon"
import { Session } from "../models/session"
import styles from "./SessionView.module.css"

const SessionView: Component<{ session: Session }> = (props) => {
  return (
    <span class={styles.SessionView}>
      <span class={styles.Time}>
        {props.session.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </span>
      <span class={styles.Activity}>{props.session.activity}</span>
    </span>
  )
}

export default SessionView

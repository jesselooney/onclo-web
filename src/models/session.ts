import { DateTime } from "luxon";

export type SessionId = number;
export type Activity = string;

export class Session {
  readonly id: SessionId;
  readonly startDate: DateTime;
  readonly endDate: DateTime;
  readonly activity: Activity;
  readonly note: string;

  private constructor(
    id: SessionId,
    startDate: DateTime,
    endDate: DateTime,
    activity: Activity,
    note: string,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.activity = activity;
    this.note = note;
  }

  public static new(id: SessionId, startDate: DateTime, endDate: DateTime, activity: Activity, note: string): Session {
    return new Session(id, startDate, endDate, activity, note)
  }

  public get duration() {
    return this.endDate.diff(this.startDate);
  }

  public toString(): string {
    return (
      `${this.duration.toFormat("dd:hh:mm")} ${this.activity.toString()}` +
      (this.note.length > 0 ? ` \u2014 ${this.note}` : "")
    );
  }
}


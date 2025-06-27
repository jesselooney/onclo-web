import { DateTime } from "luxon"

export type Session = {
  id: number;
  endDate: DateTime;
  activityString: string;
}

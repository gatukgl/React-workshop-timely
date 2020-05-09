import { DateTime } from 'luxon'

export const nowUTC = () => {
  return DateTime.local().toUTC()
}

export const nowLocal = () => {
  return DateTime.toLocaleString()
}

export const convertUTCtoLocal = (datetimeUTC) => {
  const datetime = DateTime.fromISO(datetimeUTC)
  return {
    date: datetime.toLocaleString(DateTime.DATE_HUGE),
    time: datetime.toLocaleString(DateTime.TIME_WITH_SECONDS)
  }
}

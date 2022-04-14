export enum TimeStampStyles {
  /**
   * Short time format, consisting of hours and minutes, e.g. 16:20
   */
  ShortTime = "t",
  /**
   * Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30
   */
  LongTime = "T",
  /**
   * Short date format, consisting of day, month, and year, e.g. 20/04/2021
   */
  ShortDate = "d",
  /**
   * Long date format, consisting of day, month, and year, e.g. 20 April 2021
   */
  LongDate = "D",
  /**
   * Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20
   */
  ShortDateTime = "f",
  /**
   * Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20
   */
  LongDateTime = "F",
  /**
   * Relative time format, consisting of a relative duration format, e.g. 2 months ago
   */
  RelativeTime = "R",
}

import { TimeStampStyles } from "../types/Timestamp.ts";
export function TimeStamp(time: number, style: keyof typeof TimeStampStyles) {
  return `<t:${time}:${TimeStampStyles[style]}>`;
}

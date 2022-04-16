export type Presence = {
  since?: number;
  activity: Activity;
  status: "online" | "idle" | "dnd" | "offline" | "invisible";
  afk?: boolean;
};

export type Activity = {
  name: string;
  type: keyof typeof ActivityType;
  url?: string;
};

export enum ActivityType {
  "PLAYING" = 0,
  "STREAMING" = 1,
  "LISTENING" = 2,
  "WATCHING" = 3,
  "CUSTOM_STATUS" = 4,
  "COMPETING" = 5,
}

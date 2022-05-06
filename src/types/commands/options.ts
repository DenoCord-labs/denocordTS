export enum SlashCommandOptionTypes {
  "SubCommand" = 1,
  "SubCommandGroup",
  "String",
  /** 
    Any integer between -2^53 and 2^53
    */
  "Integer",
  "Boolean",
  "User",
  "Channel",
  "Role",
  "Mentionable",
  /**
   * Any Double between -2^53 and 2^53
   */
  "Number",
  "Attachment",
}
export type SlashCommandOption = {
  type: number;
  name: string;
  description: string;
  required?: boolean;
  choices?: { name: string; value: string }[];
  options?: any;
  autocomplete?: boolean;
};

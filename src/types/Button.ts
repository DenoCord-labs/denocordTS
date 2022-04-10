export type Button = {
  type: 2;
  style: number;
  label?: string;
  url?: string;
  disabled?: boolean;
  custom_id?: string;
};
export enum ButtonStyle {
  "PRIMARY" = 1,
  "SECONDARY" = 2,
  "SUCCESS" = 3,
  "DANGER" = 4,
  "LINK" = 5
}

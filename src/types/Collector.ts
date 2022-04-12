import {} from "./Interaction.ts";
export type CollectorEvents<T> = {
  button: (collected: T) => void;
  selectMenu: (collected: T) => void;
};

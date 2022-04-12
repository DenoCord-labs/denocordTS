import {} from "./Interaction.ts";
export type CollectorEvents<T> = {
  collected: (collected: T) => void;
};

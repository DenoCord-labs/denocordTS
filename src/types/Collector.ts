import {} from "./Interaction.ts";
export type CollectorEvents<T,K> = {
  buttonInteraction: (collected: T) => void;
  selectMenuInteraction: (collected: K) => void;
};

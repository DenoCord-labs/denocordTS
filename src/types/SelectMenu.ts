export type SelectMenu = {
  type: 3;
  custom_id?: string;
  options: SelectMenuOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
};

export type SelectMenuOption = {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
};

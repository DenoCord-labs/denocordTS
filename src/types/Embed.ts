export type Embed = {
  title?: string;
  type: "rich";
  description?: string;
  color?: number;
  image?: {
    url: string;
  };
  thumbnail?: {
    url: string;
  };
  fields?: EmbedFields[];
  author: AuthorFields;
};

export type EmbedFields = {
  name: string;
  value: string;
  inline?: boolean;
};

export type AuthorFields = {
  name: string;
  icon_url?: string;
  url?: string;
};

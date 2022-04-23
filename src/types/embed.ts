import {
  APIEmbedField,
  APIEmbedAuthor,
  APIEmbedFooter,
  EmbedType,
} from "./mod.ts";
export type Embed = {
  title?: string;
  type: EmbedType.Rich;
  description?: string;
  color?: number;
  image?: {
    url: string;
  };
  thumbnail?: {
    url: string;
  };
  fields?: APIEmbedField[];
  author: APIEmbedAuthor;
  footer?: APIEmbedFooter;
  timestamp?: string;
};

export type EmbedFields = APIEmbedField;

export type AuthorFields = APIEmbedAuthor;

export type FooterFields = APIEmbedFooter;

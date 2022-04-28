import {
  AuthorFields,
  Embed as EmbedType,
  EmbedFields,
  FooterFields,
} from "../../types/embed.ts";

import { ColorResolvable, resolveColor } from "../../utils/mod.ts";
import { Messages } from "../../errors/messages.ts";
export class Embed {
  embed: EmbedType = {} as EmbedType;
  constructor() {}
  setTitle(title: string) {
    this.embed.title = title;
    return this;
  }
  setDescription(description: string) {
    this.embed.description = description;
    return this;
  }
  setColor(color: ColorResolvable) {
    this.embed.color = resolveColor(color) as number;
    return this;
  }
  setImage(url: string) {
    if (!url.includes("http")) {
      throw new Error(Messages.INVALID_URL_SCHEME(url));
    }
    this.embed.image = { url };
    return this;
  }
  setThumbnail(url: string) {
    this.embed.thumbnail = { url };
    return this;
  }
  addField(name: string, value: string, inline?: boolean) {
    this.embed.fields = this.embed.fields || [];
    this.embed.fields.push({ name, value, inline });
    return this;
  }
  addFields(fields: EmbedFields[]) {
    this.embed.fields = this.embed.fields || [];
    this.embed.fields.push(...fields);
    return this;
  }
  setAuthor(author: AuthorFields) {
    this.embed.author = author;
    return this;
  }
  setTimestamp() {
    this.embed.timestamp = new Date().toISOString();
    return this;
  }
  setFooter(footer: FooterFields) {
    this.embed.footer = footer;
    return this;
  }
  create() {
    return this.embed;
  }
}

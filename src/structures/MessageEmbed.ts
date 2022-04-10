import {
  Embed as EmbedType,
  EmbedFields,
  AuthorFields,
} from "../types/Embed.ts";

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
  setColor(color: number) {
    this.embed.color = color;
    return this;
  }
  setImage(url: string) {
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
  get() {
    return this.embed;
  }
}

import { APISticker, StickerFormatType, StickerType } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { User } from "../mod.ts";

export class GuildSticker {
  /**
   * The Id of the Sticker
   */
  id: string;
  /**
   * 	for standard stickers, id of the pack the sticker is from
   */
  packId?: string;
  /**
   * Name of the Sticker
   */
  name: string;
  /**
   * Description of the Sticker
   */
  description: string | null;
  /**
   * autocomplete/suggestion tags for the sticker (max 200 characters)
   */
  tags: string;
  /**
   * The Type of the Sticker
   */
  type: keyof typeof StickerType;
  /**
   * Type of Sticker Format
   */
  format: keyof typeof StickerFormatType;
  /**
   * whether this guild sticker can be used, may be false due to loss of Server Boosts
   */
  available?: boolean;
  /**
   * Id of the Guild that owns this sticker
   */
  guildId?: string;
  /**
   * The User who uploaded the Sticker
   */
  user?: User;
  /**
   * 	the standard sticker's sort order within its pack
   */
  sortValue?: number;

  protected deleted = false;
  constructor(protected sticker: APISticker, protected client: Base) {
    this.id = sticker.id;
    this.packId = sticker.pack_id;
    this.name = sticker.name;
    this.description = sticker.description;
    this.tags = sticker.tags;
    this.type = sticker.type === 1 ? "Standard" : "Guild";
    this.format = sticker.format_type === 1
      ? "PNG"
      : (sticker.format_type === 2 ? "APNG" : "Lottie");
    this.available = sticker.available;
    this.guildId = sticker.guild_id;
    this.user = sticker.user ? new User(sticker.user, this.client) : undefined;
    this.sortValue = sticker.sort_value;
  }
  async modifySticker({ name, tags, description, reason }: {
    /**
     * Name of the Sticker (2-30 Characters)
     */
    name: string;
    /**
     * Description of the Sticker (2-100 characters)
     */
    description?: string;
    /**
     * 	autocomplete/suggestion tags for the sticker (max 200 characters)
     */
    tags: string;
    /**
     * Reason to Modify the Sticker
     */
    reason?: string;
  }) {
    if (!this.guildId) {
      return;
    }
    if (name.length < 2) {
      throw new Error(`Name of Sticker can't be less than 2 characters.`);
    }
    if (name.length > 30) {
      throw new Error(`Name of Sticker must not exceed 30 characters.`);
    }
    if (description && description.length < 2) {
      throw new Error("Description Can't be less than 2 characters.");
    }
    if (description && description.length > 100) {
      throw new Error("Description can't exceed 100 charaters.");
    }
    if (tags.length > 200) {
      throw new Error("Tags must not exceed 200 characters.");
    }
    const body: Record<string, string> = {
      name,
      tags,
    };
    if (description) {
      body["description"] = description;
    }
    const headers = new Headers();
    if (reason) {
      headers.append("X-Audit-Log-Reason", reason);
    }
    const data: APISticker = await (await this.client.rest.request(
      `/guilds/${this.guildId}/stickers/${this.id}`,
      "PATCH",
      body,
      headers,
    )).json();
    this.id = data.id;
    this.packId = data.pack_id;
    this.name = data.name;
    this.description = data.description;
    this.tags = data.tags;
    this.type = data.type === 1 ? "Standard" : "Guild";
    this.format = data.format_type === 1
      ? "PNG"
      : (data.format_type === 2 ? "APNG" : "Lottie");
    this.available = data.available;
    this.guildId = data.guild_id;
    this.user = data.user ? new User(data.user, this.client) : undefined;
    this.sortValue = data.sort_value;
    return this;
  }
  async deleteSticker(reason?: string) {
    if (this.deleted) {
      throw new Error("Sticker Is Already Deleted.");
    }
    if (!this.guildId) return;
    const headers = new Headers();
    if (reason) {
      headers.append("X-Audit-Log-Reason", reason);
    }
    await (await this.client.rest.request(
      `/guilds/${this.guildId}/stickers/${this.id}`,
      "DELETE",
      undefined,
      headers,
    ));
    this.deleted = true;
  }
}

import { Base } from "./base.ts";
import {
  APIInteractionGuildMember,
  ClientOptions,
  GatewayOpcodes,
  GatewayPresenceUpdateData,
} from "../types/mod.ts";
import { CommandType } from "../types/commands/mod.ts";
import type { ContextMenu, SlashCommand } from "../structures/mod.ts";
import { PermissionBits } from "../types/permission.ts";
import { CDN } from "../rest/cdn.ts";
import {
  registerGlobalSlashCommands,
  registerGuildSlashCommands,
} from "../http/endpoints.ts";
declare global {
  const token: string | undefined;
  interface Window {
    token: string | undefined;
  }
}

export class Client extends Base {
  public cdn = CDN;
  displayAvatarUrl;
  constructor(protected options: ClientOptions) {
    super(options);
    this.displayAvatarUrl = super.user && super.user.avatar
      ? this.cdn.getUserAvatar
      : this.cdn.getDefaultUserAvatar;
    window.token = this.options.token;
  }
  setPresence(presence: GatewayPresenceUpdateData) {
    this.websocket.send(
      JSON.stringify({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          ...presence,
        },
      }),
    );
  }
  checkMemberPermission({
    member,
    permission,
  }: {
    member: APIInteractionGuildMember;
    permission: keyof typeof PermissionBits;
  }) {
    return BigInt(member.permissions) & PermissionBits[permission]
      ? true
      : false;
  }
  async registerGlobalSlashCommands(commands: (SlashCommand | ContextMenu)[]) {
    const contextMenuCommands = commands.filter((command) =>
      command.type === CommandType.Message
    );
    if (contextMenuCommands.length > 5) {
      throw new Error("You can only register 5 context menu commands .");
    }
    await registerGlobalSlashCommands(commands, this.options.clientId);
  }
  async registerGuildSlashCommands({
    commands,
    guildId,
  }: {
    guildId: string;
    commands: (SlashCommand | ContextMenu)[];
  }) {
    const contextMenuCommands = commands.filter((command) =>
      command.type === CommandType.Message
    );
    if (contextMenuCommands.length > 5) {
      throw new Error("You can only register 5 context menu.");
    }
    await registerGuildSlashCommands(
      commands,
      this.options.clientId,
      guildId,
    );
  }
}

import { Base } from "./base.ts";
import {
  ActivityType,
  APIInteractionGuildMember,
  ClientOptions,
  GatewayOpcodes,
  GatewayPresenceUpdateData,
  PresenceUpdateStatus,
} from "../types/mod.ts";
import { Colors } from "../../deps.ts";
import { CommandType } from "../types/commands/mod.ts";
import type { ContextMenu, SlashCommand } from "../structures/mod.ts";
import { PermissionBits } from "../types/permission.ts";
import { CDN } from "../rest/cdn.ts";
import {
  registerGlobalSlashCommands,
  registerGuildSlashCommands,
} from "../http/endpoints.ts";

export class Client extends Base {
  cdn = CDN;
  constructor(protected options: ClientOptions) {
    super(options);
    this.token = this.options.token;
  }
  /**
   * @deprecated Use updatePresence instead
   */
  setPresence(presence: GatewayPresenceUpdateData) {
    console.log(
      Colors.yellow(
        ".setPresence is Deprecated and will be removed in future release. Use .updatePresence instead.",
      ),
    );
    this.websocket.send(
      JSON.stringify({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          ...presence,
        },
      }),
    );
  }
  updatePresence(presenceObject: {
    /**
     * the user's activities
     */
    activities: {
      name: string;
      type: keyof typeof ActivityType;
      url?: string;
    }[];
    /**
     * 	whether or not the client is afk
     */
    afk?: boolean;
    /**
     * Client's New Status
     */
    status?: keyof typeof PresenceUpdateStatus;
    /**
     * unix time (in milliseconds) of when the client went idle, or null if the client is not idle
     */
    since?: number;
  }): void {
    const status = PresenceUpdateStatus[presenceObject.status || "Online"];

    const presenceData: Record<string, unknown> = {
      status,
      afk: presenceObject.afk || false,
      activities: presenceObject.activities.map((activity) => ({
        ...activity,
        type: ActivityType[activity.type],
      })),
    };
    presenceData["since"] = presenceObject.since || null;
    this.websocket.send(
      JSON.stringify({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          ...presenceData,
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
    await registerGlobalSlashCommands(
      commands,
      this.options.clientId,
      this.rest,
    );
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
      this.rest,
    );
  }
}

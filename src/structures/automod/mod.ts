import {} from "../../types/mod.ts";

enum EventType {
  MessageSend = 1,
}
enum TriggerType {
  Keyword = 1,
  HarmfulLinks,
  Spam,
  KeyWordPreset,
}
enum KeyWordPresetType {
  Profanity = 1,
  SexualContent,
  Slurs,
}
type TriggerMetaData = {
  keywordFilter: string[];
  presets: KeyWordPresetType;
};
enum ActionType {
  BlockMessage = 1,
  SendAlertMessage,
  Timeout,
}
type AutoModAction = {
  type: ActionType;
  metadata?: TriggerMetaData;
};
interface ApiAutoModeration {
  /**
   * The Id of the Rule
   */
  id: string;
  /**
   * The GuildId which this rule belongs to
   */
  guildId: string;
  /**
   * The Name of Rule
   */
  name: string;
  /**
   * The Id of the user who created this rule
   */
  creatorId: string;
  /**
   * The Rule Event Type
   */
  eventType: EventType;
  /**
   * The Rule Trigger Type
   */
  triggerType: TriggerType;
  /**
   * The Rule Trigger Metadata
   */
  triggerMetaData: TriggerMetaData;
  /**
   * The Actions which will be executed when this rule is triggered.
   */
  actions: AutoModAction[];
  /**
   * Whether the rule is enabled
   */
  enabled: boolean;
  /**
   * 	the role ids that should not be affected by the rule (Maximum of 20)
   */
  exemptRoles: string[];
  /**
   * the channel ids that should not be affected by the rule (Maximum of 50)
   */
  exemptChannels: string[];
}
export class AutoModeration implements ApiAutoModeration {
  actions;
  creatorId;
  eventType;
  enabled;
  exemptChannels;
  exemptRoles;
  guildId;
  id;
  name;
  triggerMetaData;
  triggerType;
  constructor(protected d: ApiAutoModeration) {
    this.actions = d.actions;
    this.creatorId = d.creatorId;
    this.eventType = d.eventType;
    this.enabled = d.enabled;
    this.exemptChannels = d.exemptChannels;
    this.exemptRoles = d.exemptRoles;
    this.guildId = d.guildId;
    this.id = d.id;
    this.name = d.name;
    this.triggerMetaData = d.triggerMetaData;
    this.triggerType = d.triggerType;
  }
}

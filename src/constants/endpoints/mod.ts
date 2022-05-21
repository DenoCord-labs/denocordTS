import { Snowflake } from "../../types/mod.ts";
export const endpoints = {
	getGlobalApplicationCommands: (applicationId: Snowflake) =>
		`/applications/${applicationId}/commands`,
	createGlobalApplicationCommands: (applicationId: Snowflake) =>
		`/applications/${applicationId}/commands`,
	getGlobalApplicationCommand: (
		applicationId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/commands/${commandId}`,
	editGlobalApplicationCommand: (
		applicationId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/commands/${commandId}`,
	deleteGlobalApplicationCommand: (
		applicationId: SubtleCrypto,
		commandId: Snowflake,
	) => `/applications/${applicationId}/commands/${commandId}`,
	bulkOverwriteGlobalApplicationCommands: (applicationId: Snowflake) =>
		`/applications/${applicationId}/commands`,
	getGuildApplicationCommands: (
		applicationId: Snowflake,
		guildId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands`,
	createGuildApplicationCommand: (
		applicationId: Snowflake,
		guildId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands`,
	getGuildApplicationCommand: (
		applicationId: Snowflake,
		guildId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
	editGuildApplicationCommand: (
		applicationId: Snowflake,
		guildId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
	deleteGuildApplicationCommand: (
		applicationId: Snowflake,
		guildId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,

	bulkOverWriteGuildApplicationCommands: (
		guildId: Snowflake,
		applicationId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands`,
	getGuildApplicationCommandsPermissions: (
		applicationId: Snowflake,
		guildId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/permissions`,
	getApplicationCommandPermissions: (
		applicationId: Snowflake,
		guildId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,

	editApplicationCommandPermissions: (
		applicationId: Snowflake,
		guildId: Snowflake,
		commandId: Snowflake,
	) => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
	createInteractionResponse: (
		interactionId: Snowflake,
		interactionToken: string,
	) => `/interactions/${interactionId}/${interactionToken}/callback`,
	getOriginalInteractionResponse: (
		applicationId: Snowflake,
		interactionToken: string,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/@original`,
	editOriginalInteractionResponse: (
		applicationId: Snowflake,
		interactionToken: string,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/@original`,
	deleteOriginalInteractionResponse: (
		applicationId: Snowflake,
		interactionToken: string,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/@original`,
	createFollowUpMessage: (
		applicationId: Snowflake,
		interactionToken: string,
	) => `/webhooks/${applicationId}/${interactionToken}`,
	getFollowUpMessage: (
		applicationId: Snowflake,
		interactionToken: string,
		messageId: Snowflake,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/${messageId}`,
	editFollowUpMessage: (
		applicationId: Snowflake,
		interactionToken: string,
		messageId: Snowflake,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/${messageId}`,
	deleteFollowUpMessage: (
		applicationId: Snowflake,
		interactionToken: string,
		messageId: Snowflake,
	) => `/webhooks/${applicationId}/${interactionToken}/messages/${messageId}`,
	getGuildAuditLog: (guildId: Snowflake) => `/guilds/${guildId}/audit-logs`,
	getChannel: (channelId: Snowflake) => `/channels/${channelId}`,
	modifyChannel: (channelId: Snowflake) => `/channels/${channelId}`,
	deleteOrCloseChannel: (channelId: Snowflake) => `/channels/${channelId}`,
	getChannelMessages: (channelId: Snowflake) =>
		`/channels/${channelId}/messages`,
	getChannelMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/messages/${messageId}`,
	createMessage: (channelId: Snowflake) => `/channels/${channelId}/messages`,
	crossPostMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/messages/${messageId}/crosspost`,
	createReaction: (
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
	) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`,
	deleteOwnReaction: (
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
	) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`,
	deleteUserReaction: (
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
		userId: Snowflake,
	) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`,
	getReactions: (channelId: Snowflake, messageId: Snowflake, emoji: string) =>
		`/channels/${channelId}/messages/${messageId}/reactions/${emoji}`,
	deleteAllReactions: (
		channelId: Snowflake,
		messageId: Snowflake,
	) => `/channels/${channelId}/messages/${messageId}/reactions`,
	deleteAllReactionsForEmoji: (
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
	) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`,
	editMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/messages/${messageId}`,
	deleteMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/messages/${messageId}`,
	bulkDeleteMessages: (channelId: Snowflake) =>
		`/channels/${channelId}/messages/bulk-delete`,
	editChannelPermissions: (channelId: Snowflake, overwriteId: Snowflake) =>
		`/channels/${channelId}/permissions/${overwriteId}`,
	getChannelInvites: (channelId: Snowflake) =>
		`/channels/${channelId}/invites`,
	createChannelInvite: (channelId: Snowflake) =>
		`/channels/${channelId}/invites`,
	deleteChannelPermission: (channelId: Snowflake, overwriteId: Snowflake) =>
		`/channels/${channelId}/permissions/${overwriteId}`,
	followNewsChannel: (channelId: Snowflake) =>
		`/channels/${channelId}/follow`,
	triggerTypingIndicator: (channelId: Snowflake) =>
		`/channels/${channelId}/typing`,
	getPinnedMessages: (channelId: Snowflake) => `/channels/${channelId}/pins`,
	pinMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/pins/${messageId}`,
	unpinMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/pins/${messageId}`,
	groupDmAddRecipient: (channelId: Snowflake, userId: Snowflake) =>
		`/channels/${channelId}/recipients/${userId}`,
	groupDmRemoveRecipient: (channelId: Snowflake, userId: Snowflake) =>
		`/channels/${channelId}/recipients/${userId}`,
	startThreadFromMessage: (channelId: Snowflake, messageId: Snowflake) =>
		`/channels/${channelId}/messages/${messageId}/threads`,
	startThreadWithoutMessage: (channelId: Snowflake) =>
		`/channels/${channelId}/threads`,
	startThreadInForumChannel: (channelId: Snowflake) =>
		`/channels/${channelId}/threads`,
	joinThread: (channelId: Snowflake) =>
		`/channels/${channelId}/thread-members/@me`,
	addThreadMember: (channelId: Snowflake, userId: Snowflake) =>
		`/channels/${channelId}/thread-members/${userId}`,
	leaveThread: (channelId: Snowflake) =>
		`/channels/${channelId}/thread-members/@me`,
	removeThreadMember: (channelId: Snowflake, userId: Snowflake) =>
		`/channels/${channelId}/thread-members/${userId}`,
	getThreadMember: (channelId: Snowflake, userId: Snowflake) =>
		`/channels/${channelId}/thread-members/${userId}`,
	listThreadMembers: (channelId: Snowflake) =>
		`/channels/${channelId}/thread-members`,
	listPublicArchivedThreads: (channelId: Snowflake) =>
		`/channels/${channelId}/threads/archived/public`,
	listPrivateArchivedThreads: (channelId: Snowflake) =>
		`/channels/${channelId}/threads/archived/private`,
	listJoinedPrivateArchivedThreads: (channelId: Snowflake) =>
		`/channels/${channelId}/users/@me/threads/archived/private`,
	listGuildEmojis: (guildId: Snowflake) => `/guilds/${guildId}/emojis`,
	getGuildEmoji: (guildId: Snowflake, emojiId: Snowflake) =>
		`/guilds/${guildId}/emojis/${emojiId}`,
	createGuildEmoji: (guildId: Snowflake) => `/guilds/${guildId}/emojis`,
	modifyGuildEmoji: (guildId: Snowflake, emojiId: Snowflake) =>
		`/guilds/${guildId}/emojis/${emojiId}`,
	deleteGuildEmoji: (guildId: Snowflake, emojiId: Snowflake) =>
		`/guilds/${guildId}/emojis/${emojiId}`,
	getGuild: (guildId: Snowflake) => `/guilds/${guildId}`,
	getGuildPreview: (guildId: Snowflake) => `/guilds/${guildId}/preview`,
	modifyGuild: (guildId: Snowflake) => `/guilds/${guildId}`,
	deleteGuild: (guildId: Snowflake) => `/guilds/${guildId}`,
	getGuildChannels: (guildId: Snowflake) => `/guilds/${guildId}/channels`,
	createGuildChannel: (guildId: Snowflake) => `/guilds/${guildId}/channels`,
	modifyGuildChannelPositions: (guildId: Snowflake) =>
		`/guilds/${guildId}/channels`,
	listActiveGuildThreads: (guildId: Snowflake) =>
		`/guilds/${guildId}/threads/active`,
	getGuildMember: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/members/${userId}`,
	listGuildMembers: (guildId: Snowflake) => `/guilds/${guildId}/members`,
	searchGuildMembers: (guildId: Snowflake) =>
		`/guilds/${guildId}/members/search`,
	addGuildMember: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/members/${userId}`,
	modifyGuildMember: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/members/${userId}`,
	modifyCurrentMember: (guildId: Snowflake) =>
		`/guilds/${guildId}/members/@me`,
	/**
	 * @deprecated
	 */
	modifyCurrentUserNick: (guildId: Snowflake) =>
		`/guilds/${guildId}/members/@me/nick`,
	addGuildMemberRole: (
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake,
	) => `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
	removeGuildMemberRole: (
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake,
	) => `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
	removeGuildMember: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/members/${userId}`,
	getGuildBans: (guildId: Snowflake) => `/guilds/${guildId}/bans`,
	getGuilBan: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/bans/${userId}`,
	createGuildBan: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/bans/${userId}`,
	removeGuildBan: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/bans/${userId}`,
	getGuildRoles: (guildId: Snowflake) => `/guilds/${guildId}/roles`,
	createGuildRole: (guildId: Snowflake) => `/guilds/${guildId}/roles`,
	modifyGuildRolePositions: (guildId: Snowflake) =>
		`/guilds/${guildId}/roles`,
	modifyGuildRole: (guildId: Snowflake, roleId: Snowflake) =>
		`/guilds/${guildId}/roles/${roleId}`,
	deleteGuildRole: (guildId: Snowflake, roleId: Snowflake) =>
		`/guilds/${guildId}/roles/${roleId}`,
	getGuildPruneCount: (guildId: Snowflake) => `/guilds/${guildId}/prune`,
	beginGuildPrune: (guildId: Snowflake) => `/guilds/${guildId}/prune`,
	getGuildVoiceRegions: (guildId: Snowflake) => `/guilds/${guildId}/regions`,
	getGuildInvites: (guildId: Snowflake) => `/guilds/${guildId}/invites`,
	getGuildIntegrations: (guildId: Snowflake) =>
		`/guilds/${guildId}/integrations`,
	deleteGuildIntegration: (guildId: Snowflake, integrationId: Snowflake) =>
		`/guilds/${guildId}/integrations/${integrationId}`,
	getGuildWidgetSettings: (guildId: Snowflake) => `/guilds/${guildId}/widget`,
	getGuildWidget: (guildId: Snowflake) => `/guilds/${guildId}/widget.json`,
	getGuildVanityUrl: (guildId: Snowflake) => `/guilds/${guildId}/vanity-url`,
	getGuildWidgetImage: (guildId: Snowflake) =>
		`/guilds/${guildId}/widget.png`,
	getGuildWelcomeScreen: (guildId: Snowflake) =>
		`/guilds/${guildId}/welcome-screen`,
	modifyGuildWelcomeScreen: (guildId: Snowflake) =>
		`/guilds/${guildId}/welcome-screen`,
	modifyCurrentUserVoiceState: (guildId: Snowflake) =>
		`/guilds/${guildId}/voice-states/@me`,
	modifyUserVoiceState: (guildId: Snowflake, userId: Snowflake) =>
		`/guilds/${guildId}/voice-states/${userId}`,
	listGuildScheduledEvents: (guildId: Snowflake) =>
		`/guilds/${guildId}/scheduled-events`,
	createGuildScheduledEvent: (guildId: Snowflake) =>
		`/guilds/${guildId}/scheduled-events`,
	getGuildScheduledEvent: (guildId: Snowflake, scheduledEventId: Snowflake) =>
		`/guilds/${guildId}/scheduled-events/${scheduledEventId}`,
	modifyGuildScheduledEvent: (
		guildId: Snowflake,
		scheduledEventId: Snowflake,
	) => `/guilds/${guildId}/scheduled-events/${scheduledEventId}`,
	deleteGuildScheduledEvent: (
		guildId: Snowflake,
		scheduledEventId: Snowflake,
	) => `/guilds/${guildId}/scheduled-events/${scheduledEventId}`,
	getGuildScheduledEventUsers: (
		guildId: Snowflake,
		scheduledEventId: Snowflake,
	) => `/guilds/${guildId}/scheduled-events/${scheduledEventId}/users`,
	getGuildsTemplate: (templateCode: string) =>
		`/guilds/templates/${templateCode}`,
	createGuildFromTemplate: (templateCode: string) =>
		`/guilds/templates/${templateCode}`,
	getGuildTemplate: (guildId: Snowflake) => `/guilds/${guildId}/templates`,
	createGuildTemplate: (guildId: Snowflake) => `/guilds/${guildId}/templates`,
	syncGuildTemplate: (guildId: Snowflake, templateCode: string) =>
		`/guilds/${guildId}/templates/${templateCode}`,
	modifyGuildTemplate: (guildId: Snowflake, templateCode: string) =>
		`/guilds/${guildId}/templates/${templateCode}`,
	deleteGuildTemplate: (guildId: Snowflake, templateCode: string) =>
		`/guilds/${guildId}/templates/${templateCode}`,
	getInvite: (inviteCode: string) => `/invite/${inviteCode}`,
	deleteInvite: (inviteCode: string) => `/invite/${inviteCode}`,
	createStageInstance: () => `/stage-instances`,
	getStageInstance: (channelId: Snowflake) => `/stage-instances/${channelId}`,
	modifyStageInstance: (channelId: Snowflake) =>
		`/stage-instances/${channelId}`,
	deleteStageInstance: (channelId: Snowflake) =>
		`/stage-instances/${channelId}`,
	getSticker: (stickerId: Snowflake) => `/stickers/${stickerId}`,
	listNitroStickerPacks: () => `/stickers-packs`,
	listGuildStickers: (guildId: Snowflake) => `/guilds/${guildId}/stickers`,
	getGuildSticker: (guildId: Snowflake, stickerId: Snowflake) =>
		`/guilds/${guildId}/stickers/${stickerId}`,
	createGuildSticker: (guildId: Snowflake) => `/guilds/${guildId}/stickers`,
	modifyGuildSticker: (guildId: Snowflake, stickerId: Snowflake) =>
		`/guilds/${guildId}/stickers/${stickerId}`,
	deleteGuildSticker: (guildId: Snowflake, stickerId: Snowflake) =>
		`/guilds/${guildId}/stickers/${stickerId}`,
	getCurrentUser: () => `/users/@me`,
	getUser: (userId: Snowflake) => `/users/${userId}`,
	modifyCurrentUser: () => `/users/@me`,
	getCurrentUserGuilds: () => `/users/@me/guilds`,
	getCurrentUserGuildUsername: (guildId: Snowflake) =>
		`/users/@me/guilds/${guildId}/member`,
	leaveGuild: (guildId: Snowflake) => `/users/@me/guilds/${guildId}`,
	createDM: () => `/users/@me/channels`,
	createGroupDm: () => `/users/@me/channels`,
	getUserConnections: () => `/users/@me/connections`,
	listVoiceRegions: () => `/voice/regions`,
	createWebhook: (channelId: Snowflake) => `/channels/${channelId}/webhooks`,
	getChannelWebhooks: (channelId: Snowflake) =>
		`/channels/${channelId}/webhooks`,
	getGuildWebhooks: (guildId: Snowflake) => `/guilds/${guildId}/webhooks`,
	getWebhook: (webhookId: Snowflake) => `/webhooks/${webhookId}`,
	getWebhookWithToken: (webhookId: Snowflake, token: string) =>
		`/webhooks/${webhookId}/${token}`,
	modifyWebhook: (webhookId: Snowflake) => `/webhooks/${webhookId}`,
	modifyWebhookWithToken: (webhookId: Snowflake, token: string) =>
		`/webhooks/${webhookId}/${token}`,
	deleteWebhook: (webhookId: Snowflake) => `/webhooks/${webhookId}`,
	deleteWebhookWithToken: (webhookId: Snowflake, token: string) =>
		`/webhooks/${webhookId}/${token}`,
	executeWebhook: (webhookId: Snowflake, webhookToken: string) =>
		`/webhooks/${webhookId}/${webhookToken}`,
	executeSlackCompatibleWebhook: (
		webhookId: Snowflake,
		webhookToken: string,
	) => `/webhooks/${webhookId}/${webhookToken}/slack`,
	executeGithubCompatibleWebhook: (
		webhookId: Snowflake,
		webhookToken: string,
	) => `/webhooks/${webhookId}/${webhookToken}/github`,
	getWebhookMessage: (
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
	) => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
	editWebhookMessage: (
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
	) => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
	deleteWebhookMessage: (
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
	) => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
};

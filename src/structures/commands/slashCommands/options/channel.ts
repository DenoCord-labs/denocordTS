import {
	APIApplicationCommandChannelOption,
	ApplicationCommandOptionType,
	ChannelType,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

enum ChannelTypeParameter {
	GuildText = ChannelType.GuildText,
	GuildVoice = ChannelType.GuildVoice,
	GuildCategory = ChannelType.GuildCategory,
	GuildNews = ChannelType.GuildNews,
	GuildNewsThread = ChannelType.GuildNewsThread,
	GuildPublicThread = ChannelType.GuildPublicThread,
	GuildPrivateThread = ChannelType.GuildPrivateThread,
	GuildStageVoice = ChannelType.GuildStageVoice,
	GuildDirectory = ChannelType.GuildDirectory,
	GuildForum = ChannelType.GuildForum,
}

export class ChannelOptions extends BaseCommandOption {
	options: APIApplicationCommandChannelOption = {
		type: ApplicationCommandOptionType.Channel,
		description_localizations: undefined,
		name_localizations: undefined,
		required: false,
	} as APIApplicationCommandChannelOption;
	constructor() {
		super();
	}
	setRequired(required: boolean) {
		this.options.required = required;
		return this;
	}
	setName(name: string) {
		this.options.name = name;
		return this;
	}
	setDescription(desc: string) {
		this.options.description = desc;
		return this;
	}
	setChannelType(...channelTypes: (keyof typeof ChannelTypeParameter)[]) {
		this.options.channel_types = channelTypes.map(
			(c) => ChannelTypeParameter[c],
		) as any;

		return this;
	}
	override toJSON() {
		super.validate({
			description: this.options.description,
			name: this.options.name,
		});
		return super.toJSON(this.options);
	}
}

import { APIGuildIntegration } from "../../../deps.ts";
import { Snowflake } from "../../types/mod.ts";
import { RestClient } from "../../http/rest.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
export class GuildIntegration {
	id: Snowflake;
	name: string;
	type: string;
	enabled?: boolean;
	syncing?: boolean;
	roleId?: Snowflake;
	enableEmoticons?: boolean;
	expierBehaviour?: boolean;
	expireGracePeriod?: number;
	user?: APIGuildIntegration["user"];
	account?: APIGuildIntegration["account"];
	syncedAt?: number;
	revoked?: boolean;
	application?: APIGuildIntegration["application"];
	protected restClient = new RestClient();
	constructor(data: APIGuildIntegration, protected guildId: Snowflake) {
		this.id = data.id;
		this.name = data.name;
		this.type = data.type;
	}
	async deleteIntegration() {
		return void await this.restClient.request(
			endpoints.deleteGuildIntegration(this.guildId, this.id),
			"DELETE",
		);
	}
}

import { CDN } from "../../rest/cdn.ts";
import { request } from "../../rest/request.ts";
import { APIUser, UserFlags, UserPremiumType } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
export class User {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
	bot?: boolean | undefined;
	system?: boolean | undefined;
	mfaEnabled?: boolean | undefined;
	banner?: string | null | undefined;
	accentColor?: number | null | undefined;
	locale?: string | undefined;
	verified?: boolean | undefined;
	email?: string | null | undefined;
	flags?: UserFlags | undefined;
	premiumType?: UserPremiumType | undefined;
	publicFlags?: UserFlags | undefined;

	// urls
	avatarUrl?: string;
	bannerUrl?: string;

	// flags decoding
	isStaff?: boolean;
	isPartner?: boolean;
	isInHypesquad?: boolean;
	isBravelyMember?: boolean;
	isBrillianceMember?: boolean;
	isBalanceMember?: boolean;
	isEarlyNitroSupporter?: boolean;
	isTeam?: boolean;
	isBugHunterLevel2?: boolean;
	isVerifiedBot?: boolean;
	isVerifiedDeveloper?: boolean;
	isCertifiedMod?: boolean;
	isHttpBot?: boolean;
	hasNitro?: boolean;
	nitroType?: string;
	constructor(d: any, private client: Base) {
		this.id = d.id;
		this.username = d.username;
		this.discriminator = d.discriminator;
		this.avatar = d.avatar;
		this.bot = d.bot;
		this.system = d.system;
		this.mfaEnabled = d.mfa_enabled;
		this.banner = d.banner;
		this.accentColor = d.accent_color;
		this.locale = d.locale;
		this.verified = d.verified;
		this.email = d.email;
		this.flags = d.flags;
		this.premiumType = d.premium_type;
		this.publicFlags = d.public_flags;

		// urls
		this.avatarUrl = this.avatar
			? CDN.getUserAvatar({
					id: this.id,
					hash: this.avatar,
					animated: true,
			  })
			: CDN.getDefaultUserAvatar({ discriminator: this.discriminator });
		this.bannerUrl = CDN.getUserBanner({
			id: this.id,
			hash: this.banner as string,
		});

		// decode flags
		this.isStaff = (d.public_flags & UserFlags.Staff) === UserFlags.Staff;
		this.isPartner =
			(d.public_flags & UserFlags.Partner) === UserFlags.Partner;
		this.isInHypesquad =
			(d.public_flags & UserFlags.Hypesquad) === UserFlags.Hypesquad;
		this.isBravelyMember =
			(d.public_flags & UserFlags.HypeSquadOnlineHouse1) ===
			UserFlags.HypeSquadOnlineHouse1;
		this.isBrillianceMember =
			(d.public_flags & UserFlags.HypeSquadOnlineHouse2) ===
			UserFlags.HypeSquadOnlineHouse2;
		this.isBalanceMember =
			(d.public_flags & UserFlags.HypeSquadOnlineHouse3) ===
			UserFlags.HypeSquadOnlineHouse3;
		this.isEarlyNitroSupporter =
			(d.public_flags & UserFlags.PremiumEarlySupporter) ===
			UserFlags.PremiumEarlySupporter;
		this.isTeam =
			(d.public_flags & UserFlags.TeamPseudoUser) ===
			UserFlags.TeamPseudoUser;
		this.isBugHunterLevel2 =
			(d.public_flags & UserFlags.BugHunterLevel2) ===
			UserFlags.BugHunterLevel2;
		this.isVerifiedBot =
			(d.public_flags & UserFlags.VerifiedBot) === UserFlags.VerifiedBot;
		this.isVerifiedDeveloper =
			(d.public_flags & UserFlags.VerifiedDeveloper) ===
			UserFlags.VerifiedDeveloper;
		this.isCertifiedMod =
			(d.public_flags & UserFlags.CertifiedModerator) ===
			UserFlags.CertifiedModerator;
		this.isHttpBot =
			(d.public_flags & UserFlags.BotHTTPInteractions) ===
			UserFlags.BotHTTPInteractions;
		this.hasNitro = this.premiumType !== 0;
		if (this.hasNitro) {
			this.nitroType = this.premiumType === 1 ? "classic" : "nitro";
		}
	}
	async createDM() {
		return await (
			await request(
				`/users/${this.id}/channels`,
				"POST",
				this.client.token
			)
		).json();
	}
}

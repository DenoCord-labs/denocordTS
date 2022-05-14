import { CDN } from "../../rest/cdn.ts";
import { discordFetch } from "../../rest/request.ts";
import { APIUser, UserFlags, UserPremiumType } from "../../types/mod.ts";

export class User implements APIUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean | undefined;
  system?: boolean | undefined;
  mfa_enabled?: boolean | undefined;
  banner?: string | null | undefined;
  accent_color?: number | null | undefined;
  locale?: string | undefined;
  verified?: boolean | undefined;
  email?: string | null | undefined;
  flags?: UserFlags | undefined;
  premium_type?: UserPremiumType | undefined;
  public_flags?: UserFlags | undefined;

  // urls
  avatarUrl?: string;
  bannerUrl?: string;

  // flags decoding
  is_staff?: boolean;
  is_partner?: boolean;
  is_in_hypesquad?: boolean;
  is_bravely_member?: boolean;
  is_brilliance_member?: boolean;
  is_balance_member?: boolean;
  is_early_nitro_supporter?: boolean;
  is_team?: boolean;
  is_bug_hunter_level_2?: boolean;
  is_verified_bot?: boolean;
  is_verified_developer?: boolean;
  is_certified_mod?: boolean;
  is_http_bot?: boolean;
  has_nitro?: boolean;
  nitro_type?: string;
  constructor(d: any) {
    this.id = d.id;
    this.username = d.username;
    this.discriminator = d.discriminator;
    this.avatar = d.avatar;
    this.bot = d.bot;
    this.system = d.system;
    this.mfa_enabled = d.mfa_enabled;
    this.banner = d.banner;
    this.accent_color = d.accent_color;
    this.locale = d.locale;
    this.verified = d.verified;
    this.email = d.email;
    this.flags = d.flags;
    this.premium_type = d.premium_type;
    this.public_flags = d.public_flags;

    // urls
    this.avatarUrl = CDN.getUserAvatar({
      id: this.id,
      hash: this.avatar as string,
    });
    this.bannerUrl = CDN.getUserBanner({
      id: this.id,
      hash: this.banner as string,
    });

    // decode flags
    this.is_staff = (d.public_flags & UserFlags.Staff) === UserFlags.Staff;
    this.is_partner =
      (d.public_flags & UserFlags.Partner) === UserFlags.Partner;
    this.is_in_hypesquad =
      (d.public_flags & UserFlags.Hypesquad) === UserFlags.Hypesquad;
    this.is_bravely_member =
      (d.public_flags & UserFlags.HypeSquadOnlineHouse1) ===
        UserFlags.HypeSquadOnlineHouse1;
    this.is_brilliance_member =
      (d.public_flags & UserFlags.HypeSquadOnlineHouse2) ===
        UserFlags.HypeSquadOnlineHouse2;
    this.is_balance_member =
      (d.public_flags & UserFlags.HypeSquadOnlineHouse3) ===
        UserFlags.HypeSquadOnlineHouse3;
    this.is_early_nitro_supporter =
      (d.public_flags & UserFlags.PremiumEarlySupporter) ===
        UserFlags.PremiumEarlySupporter;
    this.is_team = (d.public_flags & UserFlags.TeamPseudoUser) ===
      UserFlags.TeamPseudoUser;
    this.is_bug_hunter_level_2 =
      (d.public_flags & UserFlags.BugHunterLevel2) ===
        UserFlags.BugHunterLevel2;
    this.is_verified_bot =
      (d.public_flags & UserFlags.VerifiedBot) === UserFlags.VerifiedBot;
    this.is_verified_developer =
      (d.public_flags & UserFlags.VerifiedDeveloper) ===
        UserFlags.VerifiedDeveloper;
    this.is_certified_mod = (d.public_flags & UserFlags.CertifiedModerator) ===
      UserFlags.CertifiedModerator;
    this.is_http_bot = (d.public_flags & UserFlags.BotHTTPInteractions) ===
      UserFlags.BotHTTPInteractions;
    this.has_nitro = this.premium_type !== 0;
    if (this.has_nitro) {
      this.nitro_type = this.premium_type === 1 ? "classic" : "nitro";
    }
  }
}

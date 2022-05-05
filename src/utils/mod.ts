import { Colors } from "../constants/mod.ts";

export type HexColorString = `#${string}`;
export type ColorResolvable =
	| keyof typeof Colors
	| "RANDOM"
	| readonly [red: number, green: number, blue: number]
	| number
	| HexColorString;
export function parseEmoji(text: string) {
	if (text.includes("%")) text = decodeURIComponent(text);
	if (text.includes("<a:") || text.includes("<:")) {
		const a = text.split(":");
		return `${a[1]}:${a[2].replace(">", "")}`;
	}
	return text;
}

export function parseEmojiForComponents(text: string) {
	if (text.includes("%")) text = decodeURIComponent(text);
	if (!text.includes(":")) {
		return { animated: false, name: text, id: undefined };
	}
	const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
	return match &&
		{ animated: Boolean(match[1]), name: match[2], id: match[3] };
}

export function resolveColor(color: ColorResolvable) {
	if (typeof color === "string") {
		if (color === "RANDOM") {
			return Math.floor(Math.random() * (0xffffff + 1));
		}
		if (color === "DEFAULT") return 0;

		color = Colors[color as keyof typeof Colors] ??
			parseInt(color.replace("#", ""), 16);
	} else if (Array.isArray(color)) {
		color = (color[0] << 16) + (color[1] << 8) + color[2];
	}

	if (color < 0 || color > 0xffffff) throw new RangeError("COLOR_RANGE");
	else if (Number.isNaN(color)) throw new TypeError("COLOR_CONVERT");

	return color;
}

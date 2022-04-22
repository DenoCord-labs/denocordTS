export function parseEmoji(text: any) {
  if (text.includes("%")) text = decodeURIComponent(text);
  if (text.includes("<a:") || text.includes("<:")) {
    const a = text.split(":");
    return `${a[1]}:${a[2].replace(">", "")}`;
  }
  return text;
}

export function parseEmojiForComponents(text: any) {
  if (text.includes("%")) text = decodeURIComponent(text);
  if (!text.includes(":"))
    return { animated: false, name: text, id: undefined };
  const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
  return match && { animated: Boolean(match[1]), name: match[2], id: match[3] };
}

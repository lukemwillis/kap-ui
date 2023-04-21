import emojiRegex from "emoji-regex";

export function isASCII(name: string): boolean {
  // function excludes all known emojis from ascii check
  const emojiRxp = emojiRegex();
  // check both ascii and emoji character set
  const newEmojiRxp = new RegExp(
    `^([\x00-\x7F]|${emojiRxp.source})+$`,
    emojiRxp.flags
  );
  return newEmojiRxp.test(name);
}

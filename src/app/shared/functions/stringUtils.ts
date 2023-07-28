export function formatToTextWithoutSpaces(text: string): string {
  return text.replace(/\s+/g, '-');
}

export function unFormatToTextWithUnderscores(text: string): string {
  return text.replace(/-/g, ' ');
}

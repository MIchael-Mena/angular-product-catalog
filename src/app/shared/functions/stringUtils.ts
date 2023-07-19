export function formatToTextWithoutSpaces(text: string): string {
  return text.replace(/\s+/g, '_');
}

export function unFormatToTextWithUnderscores(text: string): string {
  return text.replace(/_/g, ' ');
}

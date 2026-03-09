export function unescapeMdCode(text: string) {
  return text.replace(/\n```$/g, '')
    .replace(/^```[a-zA_Z]*\n/g, '')
}
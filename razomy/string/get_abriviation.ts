export function getAbriviation(fullName: string) {
  const shortName = fullName.match(/\b\w/g)?.join('-');
  if (!shortName) {
    throw new Error('String is not provided')
  }
  return shortName;
}
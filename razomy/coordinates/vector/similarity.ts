export function similarity(subject: number[], target: number[]): number {
  if (subject.length != target.length) {
    throw new Error('Length is different.');
  }
  let length = subject.length;
  let total = 0;

  for (let i = 0; i < length; i++) {
    const subjectValue = subject[i];
    const targetValue = target[i];
    total += (1 - Math.abs(subjectValue - targetValue));
  }

  return total / length;
}

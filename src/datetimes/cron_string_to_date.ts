import parser from 'cron-parser';

export function cronStringToDate(string: string): Date {
  return parser
    .parse(string, {
      currentDate: new Date(new Date().toISOString().split('T')[0]),
      strict: true,
    })
    .next()
    .toDate();
}

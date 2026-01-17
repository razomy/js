import parser from 'cron-parser';

export function cronStringToDate(string: string): Date {
  return parser.parseExpression(string, {
    currentDate: new Date(new Date().toISOString().split('T')[0]),
    utc: true,
  }).next().toDate();
}



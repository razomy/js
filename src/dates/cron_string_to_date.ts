import parser from 'cron-parser';

export function cron_string_to_date(string: string): Date {
  return parser.parseExpression(string, {
    currentDate: new Date(new Date().toISOString().split('T')[0]),
    utc: true,
  }).next().toDate();
}

export default cron_string_to_date;

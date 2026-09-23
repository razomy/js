import type { IdRef } from '@razomy/abstracts/domains';

export interface Domain {
  name: string;
  type: string;
  company: IdRef<Company>;
}

export interface Company {
  name: string;
}

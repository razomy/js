#!/usr/bin/env node
'use strict';

import * as cli from '@razomy/cli';

cli.cli(process.argv.slice(2) as any).then();

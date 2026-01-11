#!/usr/bin/env node
'use strict';

import {cli} from 'razomy/cli/cli';

await cli(process.argv.slice(2) as any);
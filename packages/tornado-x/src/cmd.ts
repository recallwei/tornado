/* eslint-disable no-console */

import { program } from 'commander'

import { add } from './add'
import { check } from './check'
import { TORNADO_X_NAME, TORNADO_X_VERSION } from './constants'
import { t } from './i18n'
import { CSpellUtils } from './utils'

program
  .name(TORNADO_X_NAME)
  .description('Add engineering suites for your projects.')
  .version(TORNADO_X_VERSION, '-v, --version', 'Display the current version')
  .helpOption('-h, --help', 'Display help for command')

program
  .command('check')
  .description('Check the project engineering suite.')
  .action(() => {
    check()
  })

program
  .command('add')
  .description('Select engineering suites to install.')
  .action(() => {
    add().catch(() => {})
  })

program
  .command('cspell')
  .argument('<action>', 'specify the action you want to take')
  .description('Sort your cspell custom dictionary.')
  .action((action) => {
    if (action === 'sort') {
      CSpellUtils.sort().catch(() => {})
    } else {
      console.log(t('ActionNotMatch'))
    }
  })

program.parse(process.argv)

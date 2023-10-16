/* eslint-disable no-console */

import { program } from 'commander'

import { add } from './add'
import { check } from './check'
import { TORNADO_X_NAME, TORNADO_X_VERSION } from './constants'
import { t } from './i18n'
import { CSpellUtils } from './utils'

program
  .name(TORNADO_X_NAME)
  .description(t('App.Description'))
  .version(TORNADO_X_VERSION, '-v, --version', t('DisplayCurrentVersion'))
  .helpOption('-h, --help', t('DisplayHelpCommand'))
  .addHelpCommand(false)

program
  .command('check')
  .description(t('Check.Description'))
  .action(() => {
    check()
  })

program
  .command('add')
  .description(t('Add.Description'))
  .action(() => {
    add().catch(() => {})
  })

program
  .command('cspell')
  .description(t('CSpell.Description'))
  .argument('<action>', t('Argument.Action'))
  .action((action) => {
    if (action === 'sort') {
      CSpellUtils.sort().catch(() => {})
    } else {
      console.log(t('ActionNotMatch'))
    }
  })

program.parse(process.argv)

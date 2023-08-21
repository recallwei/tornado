import prompts from 'prompts'

const test = async () =>
  prompts({
    type: 'number',
    name: 'value',
    message: 'Project Name:',
    validate: (value) => (value < 18 ? 'Nightclub is 18+ only' : true)
  })

test()

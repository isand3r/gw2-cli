const fetch = require('node-fetch')
const url = 'https://api.guildwars2.com'
const prettyjson = require('prettyjson')
const encodeurl = require('encodeurl')

async function printer(argv, data) {
    if (argv.inventory) {
        console.log(prettyjson.render(data.bags))
    }
    else {
        console.log(prettyjson.render(data))
    }
}

module.exports = {
    command: 'chars <apiKey>',
    desc: 'Get info on your accounts characters',
    builder: yargs => yargs
    .option({
      char: {
        alias: 'c',
        describe: 'Get a character by name',
        nargs: 1,
        type: 'string',
      },
      inventory: {
        alias: 'i',
        type: 'boolean',
        describe: 'Show inventory info only'
      },
      raw: {
          alias: 'r',
          type: 'boolean'
      }
    }),
    handler: async (argv) => {
        if (argv.char) {
            param = `${encodeurl(argv.char)}`
        }
        const r = await fetch(`${url}/v2/characters/${param}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${argv.apiKey}`
            }
        })
        const data = await r.json()
        if (argv.raw) {
            console.log(JSON.stringify(data, null, 4))
        } else {
            printer(argv, data)
        }
    }
}
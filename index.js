#!/usr/bin/env node

const { Form } = require('enquirer')

// TODO(yamatatsu):  Search required installed packages
const { platform } = require('os')
const { exec } = require('child_process')

const WINDOWS_PLATFORM = 'win32'
const MAC_PLATFORM = 'darwin'
const osPlatform = platform()

const exampleFormText = `
Example Form:

                Keywords : Twitter Fun
           Min favorites : 10000
            Min retweets : 50
          From user name : Twitter
   Except from user name : Example
            To user name : Facebook
      Since (yyyy-mm-dd) : 2020-03-09
      Until (yyyy-mm-dd) : 2022-10-28
           Filter images : true
           Filter videos :
            Filter links :
`
console.log(exampleFormText)

const prompt = new Form({
  name: 'twesearch',
  message: 'Please input the following information:',
  choices: [
    { name: 'keywords', message: 'Keywords', initial: '' },
    { name: 'min_faves', message: 'Min favorites', initial: '0' },
    { name: 'min_retweets', message: 'Min retweets', initial: '0' },
    { name: 'from', message: 'From user name', initial: '' },
    { name: '-from', message: 'Except from user name', initial: '' },
    { name: 'to', message: 'To user name', initial: '' },
    { name: 'since', message: 'Since (yyyy-mm-dd)', initial: '' },
    { name: 'until', message: 'Until (yyyy-mm-dd)', initial: '' },
    { name: 'filter:images', message: 'Filter images', initial: '' },
    { name: 'filter:videos', message: 'Filter videos', initial: '' },
    { name: 'filter:links', message: 'Filter links', initial: '' }
  ]
})

prompt.run()
  .then(value => {
    if (value.keywords === '') {
      console.log('Keyword is required')
      return
    }
    // example: https://twitter.com/search?q=Flutter%20min_faves%3A10&src=typed_query&f=top
    const baseUrl = 'https://twitter.com/search'
    let queries = '?q=' + value.keywords
    queries += ' min_faves:' + value.min_faves
    queries += ' min_retweets:' + value.min_retweets

    // queries
    if (value.from !== '') {
      queries += ' from:' + value.from
    }
    if (value.to !== '') {
      queries += ' to:' + value.to
    }
    if (value.since !== '') {
      queries += ' since:' + value.since
    }
    if (value.until !== '') {
      queries += ' until:' + value.until
    }
    if (value['filter:images'] === 'true') {
      queries += ' filter:images'
    }
    if (value['filter:videos'] === 'true') {
      queries += ' filter:videos'
    }
    if (value['filter:links'] === 'true') {
      queries += ' filter:links'
    }

    queries += '&src=typed_query&f=top'

    const uri = baseUrl + queries
    const url = encodeURI(uri)
    console.log(url)

    let command
    if (osPlatform === WINDOWS_PLATFORM) {
      command = `start ${url}`
    } else if (osPlatform === MAC_PLATFORM) {
      command = `open ${url}`
    }

    exec(command)
  })
  .catch(console.error)

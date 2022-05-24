#!/usr/bin/env node

const { Form } = require('enquirer')

// TODO(yamatatsu):  Search required installed packages
const { platform } = require('os')
const { exec } = require('child_process')

const WINDOWS_PLATFORM = 'win32'
const MAC_PLATFORM = 'darwin'
const osPlatform = platform()

class Key {
  static keywords = 'keywords'
  static minFaves = 'min_faves'
  static minRetweets = 'min_retweets'
  static from = 'from'
  static exceptFrom = '-from'
  static to = 'to'
  static since = 'since'
  static until = 'until'
  static filterImages = 'filter_images'
  static filterVideos = 'filter_videos'
  static filterLinks = 'filter_links'
}

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
           Filter videos : true
            Filter links : true
`
console.log(exampleFormText)

const prompt = new Form({
  name: 'twesearch',
  message: 'Please input the following information:',
  choices: [
    { name: Key.keywords, message: 'Keywords', initial: '' },
    { name: Key.minFaves, message: 'Min favorites', initial: '0' },
    { name: Key.minRetweets, message: 'Min retweets', initial: '0' },
    { name: Key.from, message: 'From user name', initial: '' },
    { name: Key.exceptFrom, message: 'Except from user name', initial: '' },
    { name: Key.to, message: 'To user name', initial: '' },
    { name: Key.since, message: 'Since (yyyy-mm-dd)', initial: '' },
    { name: Key.until, message: 'Until (yyyy-mm-dd)', initial: '' },
    { name: Key.filterImages, message: 'Filter images', initial: '' },
    { name: Key.filterVideos, message: 'Filter videos', initial: '' },
    { name: Key.filterLinks, message: 'Filter links', initial: '' }
  ]
})

prompt.run()
  .then(value => {
    if (value.keywords === '' && value.from === '' && value.to === '') {
      console.log('Keywords or From user name or To user name is required')
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
    if (value['-from'] !== '') {
      queries += ' -from:' + value.from
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

class Query {

}

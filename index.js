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
  static filterImages = 'filter:images'
  static filterVideos = 'filter:videos'
  static filterLinks = 'filter:links'
}

class Query {
  constructor (key, description, type, defaultValue) {
    this.key = key
    this.description = description
    this.type = type
    this.defaultValue = defaultValue
  }

  setValue (value) {
    this.value = value
  }

  validate () {
    if (this.type === Number && this.value < 0) {
      console.log('Invalid number. Please use positive number')
      process.exit(1)
    }
    if (this.type === Date && this.value !== '') {
      if (!this.value.match(/\d{4}-\d{2}-\d{2}/)) {
        console.log(`Invalid date format. Please use yyyy-mm-dd. Your input data: ${this.value}`)
        process.exit(1)
      }
      const date = new Date(this.value)
      if (isNaN(date.getDate())) {
        console.log(`Invalid date. Please confirm your input data: ${this.value}`)
        process.exit(1)
      }
    }
  }

  toString () {
    const value = this.value || this.defaultValue
    if (this.type === String) {
      if (this.key === Key.keywords) {
        return value
      }
      return value === '' ? '' : `${this.key}:${value}`
    }
    if (this.type === Number) {
      return `${this.key}:${value}`
    }
    if (this.type === Date) {
      return value === '' ? '' : `${this.key}:${value}`
    }
    if (this.type === Boolean && value === 'true') {
      return this.key
    }
    throw new Error('Invalid type')
  }
}

function showHelp () {
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
            Filter links : false
`
  console.log(exampleFormText)
}

showHelp()

const queries = [
  new Query(Key.keywords, 'Keywords', String, ''),
  new Query(Key.minFaves, 'Min favorites', Number, '0'),
  new Query(Key.minRetweets, 'Min retweets', Number, '0'),
  new Query(Key.from, 'From user name', String, ''),
  new Query(Key.exceptFrom, 'Except from user name', String, ''),
  new Query(Key.to, 'To user name', String, ''),
  new Query(Key.since, 'Since (yyyy-mm-dd)', Date, ''),
  new Query(Key.until, 'Until (yyyy-mm-dd)', Date, ''),
  new Query(Key.filterImages, 'Filter images', Boolean, ''),
  new Query(Key.filterVideos, 'Filter videos', Boolean, ''),
  new Query(Key.filterLinks, 'Filter links', Boolean, '')
]

const choices = queries.map(query => {
  return {
    name: query.key,
    message: query.description,
    initial: query.defaultValue
  }
})

const prompt = new Form({
  name: 'twesearch',
  message: 'Please input the following information:',
  choices
})

function removeConsecutiveSpace (value) {
  return value.replace(/^\s+|\s+$/g, '').replace(/ +/g, ' ')
}

prompt.run()
  .then(value => {
    queries.forEach(query => {
      query.setValue(value[query.key])
      query.validate()
    })
    if (value.keywords === '' && value.from === '' && value.to === '') {
      console.log('Keywords or From user name or To user name is required')
      return
    }
    // example: https://twitter.com/search?q=Flutter%20min_faves%3A10&src=typed_query&f=top
    const baseUrl = 'https://twitter.com/search?q='

    const querySuffix = '&src=typed_query&f=top'

    const queryString = removeConsecutiveSpace(queries.join(' '))
    const uri = baseUrl + queryString + querySuffix
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

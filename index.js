#!/usr/bin/env node

const { Form } = require('enquirer')

const Key = require('./key')
const Query = require('./query')
const TwitterUrl = require('./twitter-url')
const Browser = require('./browser')

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

class TwiSearch {
  static async run () {
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

    try {
      const value = await prompt.run()
      const url = new TwitterUrl(queries, value).toString()
      console.log(url)
      Browser.openWith(url)
    } catch (e) {
      console.error(e)
    }
  }
}

TwiSearch.run()

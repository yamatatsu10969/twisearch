#!/usr/bin/env node

const { Form } = require('enquirer')
const minimist = require('minimist')

const Key = require('./lib/key')
const Query = require('./lib/query')
const TwitterUrl = require('./lib/twitter-url')
const Browser = require('./lib/browser')

class TwiSearch {
  static async run () {
    const argv = minimist(process.argv.slice(2))
    if (argv.help || argv.h) {
      TwiSearch.#showHelp()
      return
    }

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

  static #showHelp () {
    const helpText = `
Usage:  twisearch [options]
        twisearch

        Search Twitter is Enter key.
        Move next form is Tab key.
        Move previous form is Shift + Tab key.
        Keywords or From user name or To user name is required.

Options:
  -h, --help              Show this help message

Parameters:
  Keywords                :String: Keywords to search. Multiple words can be set by separating them with a half space.
  Min favorites           :Integer: Minimum favorites. Integer value must be positive.
  Min retweets            :Integer: Minimum retweets. Integer value must be positive.
  From user name          :String: User name to search from.
  Except from user name   :String: User name to exclude from search.
  To user name            :String: User name to search to.
  Since (yyyy-mm-dd)      :Date: Date format is yyyy-mm-dd. Search tweets since the date.
  Until (yyyy-mm-dd)      :Date: Date format is yyyy-mm-dd. Search tweets until the date.
  Filter images           :Boolean: Filter tweets that contain images. Default is false.
  Filter videos           :Boolean: Filter tweets that contain videos. Default is false.
  Filter links            :Boolean: Filter tweets that contain links. Default is false.

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
    console.log(helpText)
  }
}

TwiSearch.run()

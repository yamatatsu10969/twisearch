#!/usr/bin/env node



const { Form } = require('enquirer');

// TODO(yamatatsu):  Search required installed packages
const { platform } = require('os');
const { exec } = require('child_process');

const WINDOWS_PLATFORM = 'win32';
const MAC_PLATFORM = 'darwin';
const osPlatform = platform();

const prompt = new Form({
  name: 'twesearch',
  message: 'Please input the following information:',
  choices: [
    { name: 'keywords', message: 'Keywords', initial: '' },
    { name: 'min_faves', message: 'Min Favorites', initial: '0' },
    { name: 'min_retweets', message: 'Min Retweets', initial: '0' }
  ]
});

prompt.run()
  .then(value => {
    if (value['keyword'] === '') {
      console.log('Keyword is required');
      return
    }
    // example: https://twitter.com/search?q=Flutter%20min_faves%3A10&src=typed_query&f=top
    const baseUrl = 'https://twitter.com/search'
    var queries = '?q=' + value['keywords']
    queries += ' min_faves:' + value['min_faves']
    queries += ' min_retweets:' + value['min_retweets']
    queries += '&src=typed_query&f=top'
    const uri = baseUrl + queries
    const url = encodeURI(uri)
    console.log(url)

    let command;
    if (osPlatform === WINDOWS_PLATFORM) {
      command = `start ${url}`;
    } else if (osPlatform === MAC_PLATFORM) {
      command = `open ${url}`;
    }

    exec(command);
  })
  .catch(console.error);

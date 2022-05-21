#!/usr/bin/env node

// enquirer をインストール

//　Select を require する

// enquirer で実行する方法を調べる

// enquirer で入力した内容を取得する

// 取得した内容から url を作成する

// clg で表示

const { Form } = require('enquirer');

const prompt = new Form({
  name: 'twesearch',
  message: 'Please input the following information:',
  choices: [
    { name: 'keyword', message: 'Keyword', initial: '' },
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
    var queries = '?q=' + value['keyword']
    queries += ' min_faves:' + value['min_faves']
    queries += ' min_retweets:' + value['min_retweets']
    queries += '&src=typed_query&f=top'
    const uri = baseUrl + queries
    console.log(encodeURI(uri))
    open(encodeURI(uri))
  })
  .catch(console.error);

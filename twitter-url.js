module.exports = class TwitterUrl {
  static #baseUrl = 'https://twitter.com/search?q='
  static #querySuffix = '&src=typed_query&f=top'

  constructor (queries, formValue) {
    this.queries = queries
    if (formValue.keywords === '' && formValue.from === '' && formValue.to === '') {
      console.log('Keywords or From user name or To user name is required')
      process.exit(1)
    }
    queries.forEach(query => {
      query.setValue(formValue[query.key])
    })
  }

  toString () {
    const queryString = this.#removeConsecutiveSpace(this.queries.join(' '))
    const uri = TwitterUrl.#baseUrl + queryString + TwitterUrl.#querySuffix
    return encodeURI(uri)
  }

  #removeConsecutiveSpace (value) {
    return value.replace(/^\s+|\s+$/g, '').replace(/ +/g, ' ')
  }
}

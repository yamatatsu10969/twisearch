const Key = require('./key')

module.exports = class Query {
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
    if (this.type === Boolean) {
      return value === 'true' ? this.key : ''
    }
    throw new Error('Invalid type')
  }
}

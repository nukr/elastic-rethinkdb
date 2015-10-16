export default function checkArgs (...args) {
  if (args.length === 0) throw new Error('arguments length not enough')

  let options = {}

  if (args.length === 1) {
    if (typeof args[0] === 'object') {
      options = args[0]
    } else {
      throw new Error('if argument just 1 must provide object')
    }
  }

  if (args.length === 2) {
    if (typeof args[0] === 'string' && typeof args[1] === 'string') {
      options.dbName = args[0]
      options.tableName = args[1]
    } else {
      throw new Error('if argument have 2 must be string')
    }
  }

  if (args.length === 3) {
    options = {
      dbName: args[0],
      tableName: args[1],
      ...args[2]
    }
  }

  options.elasticsearch = options.elasticsearch || {}
  options.rethinkdb = options.rethinkdb || {}
  options.elasticsearch.host = options.elasticsearch.host || 'localhost'
  options.elasticsearch.port = options.elasticsearch.port || '9200'
  options.rethinkdb.host = options.rethinkdb.host || 'localhost'
  options.rethinkdb.port = options.rethinkdb.port || '28015'

  return options
}


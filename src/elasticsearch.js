import fetch from 'node-fetch'
import checkArgs from './checkArgs'

export function activateRiver (...args) {
  let options = checkArgs(...args)
  let addr = `http://${options.elasticsearch.host}:${options.elasticsearch.port}/_river/rethinkdb/_meta`

  return fetch(addr, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'rethinkdb',
      rethinkdb: {
        databases: {
          [options.dbName]: {
            [options.tableName]: {
              backfill: true
            }
          }
        },
        host: options.dbHost,
        port: options.dbPort
      }
    })
  })
}

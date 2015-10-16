/* global describe, it */

import { expect } from 'chai'
import { activateRiver } from '../src/elasticsearch'
import checkArgs from '../src/checkArgs'
import config from './config'

describe('Check Args', () => {
  it('provide 0 argument expect throw error', async () => {
    try {
      await checkArgs()
    } catch (e) {
      expect(e.message).to.be.equal('arguments length not enough')
    }
  })

  it('provide 1 argument but object expect throw error', async () => {
    try {
      await checkArgs('gg')
    } catch (e) {
      expect(e.message).to.be.equal('if argument just 1 must provide object')
    }
  })

  it('provide 2 argument but string expect throw error', async () => {
    try {
      await checkArgs('aaa', 'bbb')
    } catch (e) {
      expect(e.message).to.be.equal('if argument have 2 must be string')
    }
  })
})

describe('Activate River', () => {
  it('provide 1 argument object', async () => {
    let response = await activateRiver({
      dbName: 'mtg',
      tableName: 'cards',
      ...config
    })

    let result = await response.json()
    expect(result._index).to.be.equal('_river')
  })
})

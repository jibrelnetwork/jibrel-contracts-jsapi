import should from 'should'

import jibrelContractsApi from '../index'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const getAddressFromPrivateKey = jibrelContractsApi.getAddressFromPrivateKey

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const privateKey = testParams.privateKeys[0]
const address = testParams.accounts[0]

describe('getAddressFromPrivateKey', function() {

  it('with valid privateKey returns address', function(done) {
    const result = getAddressFromPrivateKey(privateKey)

    result.should.be.a.String()
    result.should.be.equal(address)
    result.length.should.be.equal(42)
    result.should.match(/^0x[a-fA-F0-9]+/)

    done()
  })

  describe('throws error because privateKey', function() {

    it('has wrong type', function(done) {
      const invalidPrivateKey = 123456

      try {
        getAddressFromPrivateKey(invalidPrivateKey)

        done(new Error('Did not throw with invalid privateKey'))
      } catch (e) {
        e.should.be.an.Object()
        e.message.should.be.equal(`Private key '${invalidPrivateKey}' is invalid`)

        done()
      }
    })

    it('has wrong string length', function(done) {
      const invalidPrivateKey = 'ABC123'

      try {
        getAddressFromPrivateKey(invalidPrivateKey)

        done(new Error('Did not throw with invalid privateKey'))
      } catch (e) {
        e.should.be.an.Object()
        e.message.should.be.equal(`Private key '${invalidPrivateKey}' is invalid`)

        done()
      }
    })

    it('has wrong string content', function(done) {
      const invalidPrivateKey = '&'.repeat(64)

      try {
        getAddressFromPrivateKey(invalidPrivateKey)

        done(new Error('Did not throw with invalid privateKey'))
      } catch (e) {
        e.should.be.an.Object()
        e.message.should.be.equal(`Private key '${invalidPrivateKey}' is invalid`)

        done()
      }
    })

  })

})

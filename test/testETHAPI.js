import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const eth = jibrelContractsApi.eth

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const privateKey = testParams.privateKeys[0]
const address = testParams.accounts[0]
const to = testParams.accounts[1]
const value = new BigNumber(1, 10)

describe('ETH API', function() {

  describe('sendTransaction', function() {

    it('returns transaction hash', function(done) {
      eth.sendTransaction({
        rpcaddr,
        rpcport,
        privateKey,
        to,
        value,
      }).then((result) => {
        result.should.be.a.String()
        result.length.should.be.equal(66)
        result.should.match(/^0x[a-zA-Z0-9]+/)

        done()
      }).catch(done)
    })
  })

  describe('getBalance', function() {
    it('returns balance of specific account', function(done) {
      eth.getBalance({
        rpcaddr,
        rpcport,
        address,
      }).then((result) => {
        result.greaterThan(0).should.be.equal(true)
        result.toNumber().should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('estimateGas', function() {
    it('returns the used gas for the simulated transaction', function(done) {
      eth.estimateGas({
        rpcaddr,
        rpcport,
        to,
        value,
      }).then((result) => {
        result.should.be.a.Number()
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

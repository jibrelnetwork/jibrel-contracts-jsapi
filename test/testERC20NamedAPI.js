import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const erc20Named = jibrelContractsApi.contracts.erc20Named

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.JNTViewERC20

describe('ERC20Named API', function() {

  describe('name', function() {
    it('returns token name', function(done) {
      erc20Named.name({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        result.should.be.a.String()
        result.length.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('symbol', function() {
    it('returns token symbol', function(done) {
      erc20Named.symbol({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        result.should.be.a.String()
        result.length.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('decimals', function() {
    it('returns token decimals', function(done) {
      erc20Named.decimals({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        result.greaterThan(0).should.be.equal(true)
        result.toNumber().should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

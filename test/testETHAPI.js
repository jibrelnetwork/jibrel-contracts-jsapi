import should from 'should'

import jibrelContractsApi from '../index'

import testParams from '../../jibrel-contracts/.jsapi.json'

const eth = jibrelContractsApi.eth

const rpcaddr = '127.0.0.1'
const rpcport = 8545
const privateKey = testParams.privateKeys[0]
const address = testParams.accounts[0]
const to = testParams.accounts[1]
const value = 1

describe('ETH API', function() {

  this.timeout(20000)

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
        const balance = result.toNumber()

        balance.should.be.equal(0)
        //balance.should.be.greaterThan(0)

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
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

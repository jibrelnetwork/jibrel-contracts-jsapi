import should from 'should'

import jibrelContractsApi from '../index'

const eth = jibrelContractsApi.eth

const rpcaddr = '127.0.0.1'
const rpcport = 8545
const contractAddress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const privateKey = '11f8eccc5270476d0488b2d853ff9643b26835f537cd7f2338433c0510b9e17d'
const address = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const to = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const value = 1000

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

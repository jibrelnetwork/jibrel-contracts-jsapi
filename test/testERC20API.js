import should from 'should'

import jibrelContractsApi from '../index'

const erc20 = jibrelContractsApi.contracts.ERC20

const rpcaddr = '127.0.0.1'
const rpcport = 8545
const contractAddress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const privateKey = '11f8eccc5270476d0488b2d853ff9643b26835f537cd7f2338433c0510b9e17d'
const owner = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const to = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const value = 1000

describe('ERC20 API', function() {

  this.timeout(20000)

  describe('totalSupply', function() {
    it('returns total supply of tokens', function(done) {
      erc20.totalSupply({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const totalSupply = result.toNumber()

        totalSupply.should.be.equal(0)
        //totalSupply.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('balanceOf', function() {
    it('returns balance of specific account', function(done) {
      erc20.balanceOf({
        rpcaddr,
        rpcport,
        contractAddress,
        owner,
      }).then((result) => {
        const balance = result.toNumber()

        balance.should.be.equal(0)
        //balance.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('transfer', function() {
    it('returns transaction hash', function(done) {
      erc20.transfer({
        rpcaddr,
        rpcport,
        contractAddress,
        privateKey,
        to,
        value,
      }).then((result) => {
        const txHash = result

        txHash.should.be.a.String()

        done()
      }).catch(done)
    })
  })

  describe('Transfer', function() {
    it('returns event emitter for Transfer event', function(done) {
      erc20.Transfer({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const eeTransfer = result

        eeTransfer.on('data', (event) => {
          done()
        })

        eeTransfer.on('error', (err) => {
          done(err)
        })

        erc20.transfer({
          rpcaddr,
          rpcport,
          contractAddress,
          privateKey,
          to,
          value,
        }).catch(done)
      }).catch(done)
    })
  })

  describe('estimateGas', function() {
    it('returns the used gas for the simulated call/transaction', function(done) {
      erc20.estimateGas({
        rpcaddr,
        rpcport,
        contractAddress,
        method: 'transfer',
        args: [to, value],
      }).then((result) => {
        const estimateGas = result.toNumber()

        estimateGas.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

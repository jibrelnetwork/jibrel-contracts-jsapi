import should from 'should'

import jibrelContractsApi from '../index.js'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const erc20 = jibrelContractsApi.contracts.ERC20

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.JNTViewERC20
const privateKey = testParams.privateKeys[1]
const owner = testParams.accounts[1]
const to = testParams.accounts[2]
const value = 1

const transferOptions = {
  from: owner,
  gas: 4712388,
  gasPrice: 100000000000000,
}

describe('ERC20 API', function() {

  describe('totalSupply', function() {
    it('returns total supply of tokens', function(done) {
      erc20.totalSupply({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        // result is BigNumber
        result.greaterThan(0).should.be.equal(true)
        result.toNumber().should.be.greaterThan(0)

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
        // result is BigNumber
        result.greaterThan(0).should.be.equal(false)
        result.toNumber().should.be.equal(0)

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
        options: { ...transferOptions },
      }).then((result) => {
        result.should.be.a.String()
        result.length.should.be.equal(66)
        result.should.match(/^0x[a-zA-Z0-9]+/)

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
          console.log('event', event)

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
          options: { ...transferOptions },
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
        args: [to, value, { ...transferOptions }],
      }).then((result) => {
        result.should.be.a.Number()
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

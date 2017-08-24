import should from 'should'

import jibrelContractsApi from '../index'

import testParams from '../../jibrel-contracts/.jsapi.json'

const erc20 = jibrelContractsApi.contracts.ERC20

const rpcaddr = '127.0.0.1'
const rpcport = 8560
const contractAddress = testParams.ERC20ContractAddress
const privateKey = testParams.privateKeys[0]
const owner = testParams.accounts[0]
const to = testParams.accounts[2]
const value = 1

const transferOptions = {
  from: owner,
  gas: 1000000,
}

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
        options: transferOptions,
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
          options: transferOptions,
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
        args: [to, value, transferOptions],
      }).then((result) => {
        const estimateGas = result.toNumber()

        estimateGas.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

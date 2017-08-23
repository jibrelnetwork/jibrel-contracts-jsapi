import should from 'should'

import jibrelContractsApi from '../index'

const erc20Validatable = jibrelContractsApi.contracts.ERC20Validatable

const rpcaddr = '127.0.0.1'
const rpcport = 8545
const contractAddress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const privateKey = '11f8eccc5270476d0488b2d853ff9643b26835f537cd7f2338433c0510b9e17d'
const spender = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const from = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const to = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
const value = 1000

describe('ERC20Validatable API', function() {

  this.timeout(20000)

  describe.skip('isRegulated', function() {
    it('returns isRegulated boolean flag', function(done) {
      erc20Validatable.isRegulated({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isReceivingAllowed', function() {
    it('returns isReceivingAllowed boolean flag', function(done) {
      erc20Validatable.isReceivingAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        account: to,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isSpendingAllowed', function() {
    it('returns isSpendingAllowed boolean flag', function(done) {
      erc20Validatable.isSpendingAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        account: from,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isTransferAllowed', function() {
    it('returns isTransferAllowed boolean flag', function(done) {
      erc20Validatable.isTransferAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        from,
        to,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isApproveAllowed', function() {
    it('returns isApproveAllowed boolean flag', function(done) {
      erc20Validatable.isApproveAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        from,
        spender,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isApprovedSpendingAllowed', function() {
    it('returns isApprovedSpendingAllowed boolean flag', function(done) {
      erc20Validatable.isApprovedSpendingAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        from,
        spender,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('isTransferFromAllowed', function() {
    it('returns isTransferFromAllowed boolean flag', function(done) {
      erc20Validatable.isTransferFromAllowed({
        rpcaddr,
        rpcport,
        contractAddress,
        spender,
        from,
        to,
        value,
      }).then((result) => {
        result.should.be.equal(false)

        done()
      }).catch(done)
    })
  })

  describe('estimateGas', function() {
    it('returns the used gas for the simulated call/transaction', function(done) {
      erc20Validatable.estimateGas({
        rpcaddr,
        rpcport,
        contractAddress,
        method: 'isReceivingAllowed',
        args: [to, value],
      }).then((result) => {
        const estimateGas = result.toNumber()

        estimateGas.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

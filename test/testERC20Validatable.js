import should from 'should'

import jibrelContractsApi from '../index'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const erc20Validatable = jibrelContractsApi.contracts.ERC20Validatable

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.jTBillViewERC20Validatable
const privateKey = testParams.privateKeys[0]
const spender = testParams.accounts[0]
const from = testParams.accounts[1]
const to = testParams.accounts[2]
const value = 1

describe('ERC20Validatable API', function() {

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
        privateKey,
        method: 'isReceivingAllowed',
        args: [to, value],
      }).then((result) => {
        result.should.be.a.Number()
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

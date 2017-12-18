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
const privateKeyTo = testParams.privateKeys[1]
const address = testParams.accounts[0]
const to = testParams.accounts[1]
const value = new BigNumber(1, 10)

const filterOptions = {
  fromBlock: 0,
  toBlock: 'latest',
}

let txHash

describe('ETH API', function() {

  // timeout should be increased to wait while transaction was mined
  this.timeout(10000)

  describe('sendTransaction', function() {

    it('returns transaction hash', function(done) {
      eth.sendTransaction({
        rpcaddr,
        rpcport,
        privateKey,
        to,
        value,
      }).then((result) => {
        txHash = result

        result.should.be.a.String()
        result.length.should.be.equal(66)
        result.should.match(/^0x[a-fA-F0-9]+/)

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

  describe('getBlockNumber', function() {
    it('returns block number', function(done) {
      eth.getBlockNumber({
        rpcaddr,
        rpcport,
      }).then((result) => {
        result.should.be.a.Number()
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('getBlock', function() {
    it('returns block data', function(done) {
      eth.getBlock({
        rpcaddr,
        rpcport,
        blockId: 'latest',
      }).then((result) => {
        result.should.be.an.Object()

        result.number.should.be.a.Number()
        result.hash.should.be.a.String()
        result.parentHash.should.be.a.String()
        result.nonce.should.be.a.String()
        result.sha3Uncles.should.be.a.String()
        result.logsBloom.should.be.a.String()
        result.transactionsRoot.should.be.a.String()
        result.stateRoot.should.be.a.String()
        result.miner.should.be.a.String()
        result.difficulty.should.be.an.Object()
        result.totalDifficulty.should.be.an.Object()
        result.extraData.should.be.a.String()
        result.size.should.be.a.Number()
        result.gasLimit.should.be.a.Number()
        result.gasUsed.should.be.a.Number()
        result.timestamp.should.be.greaterThan(0)
        result.transactions.should.be.an.Array()
        result.uncles.should.be.an.Array()

        done()
      }).catch(done)
    })
  })

  describe('getTransaction', function() {
    it('returns transaction data', function(done) {
      eth.getTransaction({
        rpcaddr,
        rpcport,
        transactionHash: txHash,
      }).then((result) => {
        result.should.be.an.Object()

        result.hash.should.be.a.String()
        result.nonce.should.be.a.Number()
        result.blockHash.should.be.a.String()
        result.blockNumber.should.be.a.Number()
        result.transactionIndex.should.be.a.Number()

        result.from.should.be.a.String()
        result.from.should.be.equal(address)

        result.to.should.be.a.String()
        result.to.should.be.equal(to)

        result.value.should.be.an.Object()
        result.value.toNumber().should.be.equal(value.toNumber())

        result.gas.should.be.a.Number()

        result.gasPrice.should.be.an.Object()
        result.gasPrice.toNumber().should.be.greaterThan(0)

        result.input.should.be.a.String()

        done()
      }).catch(done)
    })
  })

  describe('getTransactionReceipt', function() {
    it('returns transaction receipt', function(done) {
      eth.getTransactionReceipt({
        rpcaddr,
        rpcport,
        transactionHash: txHash,
      }).then((result) => {
        result.should.be.an.Object()

        result.transactionHash.should.be.a.String()
        result.transactionIndex.should.be.a.Number()
        result.blockHash.should.be.a.String()
        result.blockNumber.should.be.a.Number()
        result.gasUsed.should.be.a.Number()
        result.cumulativeGasUsed.should.be.a.Number()
        should(result.contractAddress).be.equal(null)
        result.logs.should.be.an.Array()

        done()
      }).catch(done)
    })
  })

  describe('getLogsFilter', function() {
    let isDone

    it('returns object for filtering of logs', function(done) {
      eth.getLogsFilter({
        rpcaddr,
        rpcport,
        options: filterOptions,
      }).then((result) => {

        result.should.be.an.Object()

        result.watch(function(err, log) {
          if (err) {
            return done(err)
          }

          log.should.be.an.Object()

          log.logIndex.should.be.a.Number()
          log.transactionIndex.should.be.a.Number()

          log.transactionHash.should.be.a.String()
          log.transactionHash.length.should.be.equal(66)
          log.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

          log.blockHash.should.be.a.String()
          log.blockNumber.should.be.a.Number()
          log.address.should.be.a.String()
          log.data.should.be.a.String()
          log.topics.should.be.an.Array()

          // ignore, if this test has already done
          if (isDone) {
            return
          }

          isDone = true

          done()
        })

        eth.sendTransaction({
          rpcaddr,
          rpcport,
          value,
          to: address,
          privateKey: privateKeyTo,
        }).catch(done)
      }).catch(done)
    })
  })

  describe('getPastLogs', function() {
    it('returns past logs', function(done) {
      eth.getPastLogs({
        rpcaddr,
        rpcport,
        options: filterOptions,
      }).then((result) => {

        result.should.be.an.Array()
        result.length.should.be.greaterThan(0)

        const log = result[result.length - 1]

        log.should.be.an.Object()

        log.logIndex.should.be.a.Number()
        log.transactionIndex.should.be.a.Number()

        log.transactionHash.should.be.a.String()
        log.transactionHash.length.should.be.equal(66)
        log.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

        log.blockHash.should.be.a.String()
        log.blockNumber.should.be.a.Number()
        log.address.should.be.a.String()
        log.data.should.be.a.String()
        log.topics.should.be.an.Array()

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

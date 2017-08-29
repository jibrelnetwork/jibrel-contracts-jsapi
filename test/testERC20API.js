import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index.js'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const erc20 = jibrelContractsApi.contracts.ERC20

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.jTBillViewERC20
const privateKey = testParams.privateKeys[3]
const owner = testParams.accounts[3]
const to = testParams.accounts[4]
const value = new BigNumber(1, 10)

describe('ERC20 API', function() {

  // timeout should be increased to wait while transaction was mined
  this.timeout(10000)

  describe('totalSupply', function() {
    it('returns total supply of tokens', function(done) {
      erc20.totalSupply({
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

  describe('balanceOf', function() {
    it('returns balance of specific account', function(done) {
      erc20.balanceOf({
        rpcaddr,
        rpcport,
        contractAddress,
        owner,
      }).then((result) => {
        result.greaterThan(0).should.be.equal(true)
        result.toNumber().should.be.greaterThan(0)

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
        result.should.be.a.String()
        result.length.should.be.equal(66)
        result.should.match(/^0x[a-zA-Z0-9]+/)

        done()
      }).catch(done)
    })
  })

  describe('Transfer', function() {
    let isDone

    it('returns event emitter for Transfer event', function(done) {
      erc20.Transfer({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const eeTransfer = result

        eeTransfer.on('data', (event) => {
          event.should.be.an.Object()

          event.logIndex.should.be.a.Number()
          event.transactionIndex.should.be.a.Number()

          event.transactionHash.should.be.a.String()
          event.transactionHash.length.should.be.equal(66)
          event.transactionHash.should.match(/^0x[a-zA-Z0-9]+/)

          event.blockHash.should.be.a.String()
          event.blockNumber.should.be.a.Number()
          event.address.should.be.a.String()
          event.type.should.be.a.String()

          event.event.should.be.equal('Transfer')

          event.args.should.be.an.Object()
          event.args.from.should.be.equal(owner)
          event.args.to.should.be.equal(to)
          event.args.value.equals(new BigNumber(value)).should.be.equal(true)

          // ignore, if this test has already done
          if (isDone) {
            return
          }

          isDone = true

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

  describe('allEvents', function() {
    let isDone

    it('returns event emitter for all events', function(done) {
      erc20.allEvents({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const eeAllEvents = result

        eeAllEvents.on('data', (event) => {
          event.should.be.an.Object()

          event.logIndex.should.be.a.Number()
          event.transactionIndex.should.be.a.Number()

          event.transactionHash.should.be.a.String()
          event.transactionHash.length.should.be.equal(66)
          event.transactionHash.should.match(/^0x[a-zA-Z0-9]+/)

          event.blockHash.should.be.a.String()
          event.blockNumber.should.be.a.Number()
          event.address.should.be.a.String()
          event.type.should.be.a.String()

          event.event.should.be.equal('Transfer')

          event.args.should.be.an.Object()
          event.args.from.should.be.equal(owner)
          event.args.to.should.be.equal(to)
          event.args.value.equals(new BigNumber(value)).should.be.equal(true)

          // ignore, if this test has already done
          if (isDone) {
            return
          }

          isDone = true

          done()
        })

        eeAllEvents.on('error', (err) => {
          done(err)
        })
      }).catch(done)
    })
  })

  describe('getPastEvents', function() {
    const eventName = 'Transfer'

    it('returns past Transfer events', function(done) {
      erc20.getPastEvents({
        rpcaddr,
        rpcport,
        contractAddress,
        event: eventName,
        options: {
          filter: { from: owner },
          fromBlock: 1,
          toBlock: 'latest',
          topics: null,
        },
      }).then((result) => {
        const logs = result

        result.should.be.an.Array()
        result.length.should.be.greaterThan(0)

        const event = result[0]

        event.should.be.an.Object()

        event.logIndex.should.be.a.Number()
        event.transactionIndex.should.be.a.Number()

        event.transactionHash.should.be.a.String()
        event.transactionHash.length.should.be.equal(66)
        event.transactionHash.should.match(/^0x[a-zA-Z0-9]+/)

        event.blockHash.should.be.a.String()
        event.blockNumber.should.be.a.Number()
        event.address.should.be.a.String()
        event.type.should.be.a.String()

        event.event.should.be.equal(eventName)

        event.args.should.be.an.Object()
        event.args.from.should.be.equal(owner)
        event.args.to.should.be.equal(to)
        event.args.value.equals(new BigNumber(value)).should.be.equal(true)

        done()
      }).catch(done)
    })
  })

  describe('estimateGas', function() {
    it('returns the used gas for the simulated call/transaction', function(done) {
      erc20.estimateGas({
        rpcaddr,
        rpcport,
        contractAddress,
        privateKey,
        method: 'transfer',
        args: [to, value],
      }).then((result) => {
        result.should.be.a.Number()
        result.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

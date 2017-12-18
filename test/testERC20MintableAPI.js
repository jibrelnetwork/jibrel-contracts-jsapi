import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index.js'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const controller = jibrelContractsApi.contracts.controller
const erc20Mintable = jibrelContractsApi.contracts.erc20Mintable

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddressController = testParams.contracts.JNTController
const contractAddress = testParams.contracts.JNTViewERC20
const privateKey = testParams.privateKeys[4] // privateKey of managerMint
const account = testParams.accounts[7] // address of testInvestor1
const value = new BigNumber(1, 10)

describe('ERC20Mintable API', function() {

  // timeout should be increased to wait while transaction was mined
  this.timeout(100000)

  describe('MintEvent', function() {
    let isDone

    it('returns event emitter for MintEvent event', function(done) {
      erc20Mintable.MintEvent({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const eeMint = result

        eeMint.on('data', (event) => {
          event.should.be.an.Object()

          event.logIndex.should.be.a.Number()
          event.transactionIndex.should.be.a.Number()

          event.transactionHash.should.be.a.String()
          event.transactionHash.length.should.be.equal(66)
          event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

          event.blockHash.should.be.a.String()
          event.blockNumber.should.be.a.Number()
          event.address.should.be.a.String()
          event.type.should.be.a.String()

          event.event.should.be.equal('MintEvent')

          event.args.should.be.an.Object()
          event.args.owner.should.be.equal(account)
          event.args.value.equals(new BigNumber(value)).should.be.equal(true)

          // ignore, if this test has already done
          if (isDone) {
            return
          }

          isDone = true

          done()
        })

        eeMint.on('error', (err) => {
          done(err)
        })

        controller.mint({
          rpcaddr,
          rpcport,
          privateKey,
          account,
          value,
          contractAddress: contractAddressController,
        }).catch(done)
      }).catch(done)
    })

    it('wait while "mint" transaction was mined', function(done) {
      this.timeout(30000);
      setTimeout(done, 25000);
    });

    describe('returns error', function() {

      describe('because options', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20Mintable.MintEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            options: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "options" fails because ["options" must be an object]'
            )

            done()
          })
        }) // MintEvent returns error because options is invalid (wrong type)

        it('is invalid (wrong key of object)', function(done) {
          erc20Mintable.MintEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            options: { foo: 'bar' },
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "options" fails because ["foo" is not allowed]'
            )

            done()
          })
        }) // MintEvent returns error because options is invalid (wrong key of object)

      }) // MintEvent returns error because options

      describe('because callback', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20Mintable.MintEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            callback: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "callback" fails because ["callback" must be a Function]'
            )

            done()
          })
        }) // MintEvent returns error because callback is invalid (wrong type)

      }) // MintEvent returns error because callback

    }) // MintEvent returns error

  })

  /**
   * NOTE: burn of tokens is not working
   * TODO: investigate an issue and unskip these tests
   */
  describe.skip('BurnEvent', function() {
    let isDone

    it('returns event emitter for BurnEvent event', function(done) {
      erc20Mintable.BurnEvent({
        rpcaddr,
        rpcport,
        contractAddress,
      }).then((result) => {
        const eeMint = result

        eeMint.on('data', (event) => {
          event.should.be.an.Object()

          event.logIndex.should.be.a.Number()
          event.transactionIndex.should.be.a.Number()

          event.transactionHash.should.be.a.String()
          event.transactionHash.length.should.be.equal(66)
          event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

          event.blockHash.should.be.a.String()
          event.blockNumber.should.be.a.Number()
          event.address.should.be.a.String()
          event.type.should.be.a.String()

          event.event.should.be.equal('BurnEvent')

          event.args.should.be.an.Object()
          event.args.owner.should.be.equal(account)
          event.args.value.equals(new BigNumber(value)).should.be.equal(true)

          // ignore, if this test has already done
          if (isDone) {
            return
          }

          isDone = true

          done()
        })

        eeMint.on('error', (err) => {
          done(err)
        })

        controller.burn({
          rpcaddr,
          rpcport,
          privateKey,
          account,
          value,
          contractAddress: contractAddressController,
        }).catch(done)
      }).catch(done)
    })

    it('wait while "burn" transaction was mined', function(done) {
      this.timeout(30000);
      setTimeout(done, 25000);
    });

    describe('returns error', function() {

      describe('because options', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20Mintable.BurnEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            options: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "options" fails because ["options" must be an object]'
            )

            done()
          })
        }) // BurnEvent returns error because options is invalid (wrong type)

        it('is invalid (wrong key of object)', function(done) {
          erc20Mintable.BurnEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            options: { foo: 'bar' },
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "options" fails because ["foo" is not allowed]'
            )

            done()
          })
        }) // BurnEvent returns error because options is invalid (wrong key of object)

      }) // BurnEvent returns error because options

      describe('because callback', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20Mintable.BurnEvent({
            rpcaddr,
            rpcport,
            contractAddress,
            callback: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "callback" fails because ["callback" must be a Function]'
            )

            done()
          })
        }) // BurnEvent returns error because callback is invalid (wrong type)

      }) // BurnEvent returns error because callback

    }) // BurnEvent returns error

  })

  describe('allEvents', function() {
    let isDone

    it('returns event emitter for all events', function(done) {
      erc20Mintable.allEvents({
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
          event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

          event.blockHash.should.be.a.String()
          event.blockNumber.should.be.a.Number()
          event.address.should.be.a.String()
          event.type.should.be.a.String()

          event.event.should.be.equal('MintEvent')

          event.args.should.be.an.Object()
          event.args.owner.should.be.equal(account)
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

        controller.mint({
          rpcaddr,
          rpcport,
          privateKey,
          account,
          value,
          contractAddress: contractAddressController,
        }).catch(done)
      }).catch(done)
    })

    it('wait while "mint" transaction was mined', function(done) {
      this.timeout(30000);
      setTimeout(done, 25000);
    });

  })

  describe('getPastEvents', function() {
    const eventName = 'MintEvent'

    it('returns past MintEvent events', function(done) {
      erc20Mintable.getPastEvents({
        rpcaddr,
        rpcport,
        contractAddress,
        event: eventName,
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
        event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

        event.blockHash.should.be.a.String()
        event.blockNumber.should.be.a.Number()
        event.address.should.be.a.String()
        event.type.should.be.a.String()

        event.event.should.be.equal(eventName)

        event.args.should.be.an.Object()
        event.args.owner.should.be.equal(account)
        event.args.value.equals(new BigNumber(value)).should.be.equal(true)

        done()
      }).catch(done)
    })

  })

})

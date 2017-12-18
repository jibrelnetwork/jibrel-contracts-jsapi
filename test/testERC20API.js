import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index.js'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const erc20 = jibrelContractsApi.contracts.erc20

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.JNTViewERC20
const privateKey = testParams.privateKeys[8] // privateKey of testInvestor2
const owner = testParams.accounts[8] // address of testInvestor2
const to = testParams.accounts[7] // address of testInvestor1
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

    describe('returns error', function(done) {

      describe('because rpcaddr', function(done) {

        it('is absent', function(done) {
          erc20.totalSupply({
            rpcport,
            contractAddress,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcaddr" fails because ["rpcaddr" is required]'
            )

            done()
          })
        }) // totalSupply returns error because rpcaddr is absent

        it('is invalid (wrong type)', function(done) {
          erc20.totalSupply({
            rpcport,
            contractAddress,
            rpcaddr: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcaddr" fails because ["rpcaddr" must be a string]'
            )

            done()
          })
        }) // totalSupply returns error because rpcaddr is invalid (wrong type)

        it('is invalid (short string)', function(done) {
          erc20.totalSupply({
            rpcport,
            contractAddress,
            rpcaddr: 'a',
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcaddr" fails because ["rpcaddr" length must be at least 3 characters long]'
            )

            done()
          })
        }) // totalSupply returns error because rpcaddr is invalid (short string)

        it('is invalid (large string)', function(done) {
          erc20.totalSupply({
            rpcport,
            contractAddress,
            rpcaddr: 'a'.repeat(500),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcaddr" fails because ["rpcaddr" length must be less than or equal to 300 characters long]'
            )

            done()
          })
        }) // totalSupply returns error because rpcaddr is invalid (large string)

      }) // totalSupply returns error because rpcaddr

      describe('because rpcport', function(done) {

        it('is absent', function(done) {
          erc20.totalSupply({
            rpcaddr,
            contractAddress,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcport" fails because ["rpcport" is required]'
            )

            done()
          })
        }) // totalSupply returns error because rpcport is absent

        it('is invalid (wrong type)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            contractAddress,
            rpcport: 'qwe',
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcport" fails because ["rpcport" must be a number]'
            )

            done()
          })
        }) // totalSupply returns error because rpcport is invalid (wrong type)

        it('is invalid (float)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            contractAddress,
            rpcport: 1.2345,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcport" fails because ["rpcport" must be an integer]'
            )

            done()
          })
        }) // totalSupply returns error because rpcport is invalid (integer)

        it('is invalid (small number)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            contractAddress,
            rpcport: 0,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcport" fails because ["rpcport" must be larger than or equal to 1]'
            )

            done()
          })
        }) // totalSupply returns error because rpcport is invalid (small number)

        it('is invalid (big number)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            contractAddress,
            rpcport: 999999,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "rpcport" fails because ["rpcport" must be less than or equal to 65535]'
            )

            done()
          })
        }) // totalSupply returns error because rpcport is invalid (big number)

      }) // totalSupply returns error because rpcport

      describe('because contractAddress', function(done) {

        it('is absent', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "contractAddress" fails because ["contractAddress" is required]'
            )

            done()
          })
        }) // totalSupply returns error because contractAddress is absent

        it('is invalid (wrong type)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
            contractAddress: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "contractAddress" fails because ["contractAddress" must be a string]'
            )

            done()
          })
        }) // totalSupply returns error because contractAddress is invalid (wrong type)

        it('is invalid (short string)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
            contractAddress: 'a',
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "contractAddress" fails because ["contractAddress" length must be 42 characters long]'
            )

            done()
          })
        }) // totalSupply returns error because contractAddress is invalid (short string)

        it('is invalid (large string)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
            contractAddress: 'a'.repeat(300),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "contractAddress" fails because ["contractAddress" length must be 42 characters long]'
            )

            done()
          })
        }) // totalSupply returns error because contractAddress is invalid (large string)

        it('is invalid (wrong format)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
            contractAddress: 'y'.repeat(42),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "contractAddress" fails because ["contractAddress" with value "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" fails to match the required pattern: /^[a-fx0-9]+$/i]'
            )

            done()
          })
        }) // totalSupply returns error because contractAddress is invalid (wrong format)

        it('is invalid (full string of zeros)', function(done) {
          erc20.totalSupply({
            rpcaddr,
            rpcport,
            contractAddress: '0'.repeat(42),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal('invalid address')

            done()
          })
        }) // totalSupply returns error because contractAddress is invalid (full string of zeros)

      }) // totalSupply returns error because contractAddress

    }) // totalSupply returns error

  }) // totalSupply

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

  /**
   * NOTE: transfer of tokens is not allowed until 1st Feb
   */
  describe.skip('transfer', function() {

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
        result.should.match(/^0x[a-fA-F0-9]+/)

        done()
      }).catch(done)
    })

    describe('returns error', function(done) {

      describe('because privateKey', function(done) {

        it('is absent', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "privateKey" fails because ["privateKey" is required]'
            )

            done()
          })
        }) // transfer returns error because privateKey is absent

        it('is invalid (wrong type)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: 12345,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "privateKey" fails because ["privateKey" must be a string]'
            )

            done()
          })
        }) // transfer returns error because privateKey is invalid (wrong type)

        it('is invalid (short string)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: 'a',
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "privateKey" fails because ["privateKey" length must be 64 characters long]'
            )

            done()
          })
        }) // transfer returns error because privateKey is invalid (short string)

        it('is invalid (large string)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: 'a'.repeat(100),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "privateKey" fails because ["privateKey" length must be 64 characters long]'
            )

            done()
          })
        }) // transfer returns error because privateKey is invalid (large string)

        it('is invalid (wrong format)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: 'y'.repeat(64),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "privateKey" fails because ["privateKey" with value "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" fails to match the required pattern: /^[a-fx0-9]+$/i]'
            )

            done()
          })
        }) // transfer returns error because privateKey is invalid (wrong format)

        it('is invalid (full string of zeros)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: '0'.repeat(64),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal('Cannot read property \'fromRed\' of null')

            done()
          })
        }) // transfer returns error because privateKey is invalid (full string of zeros)

        it('is invalid (nonexistent privateKey)', function(done) {
          erc20.transfer({
            rpcaddr,
            rpcport,
            contractAddress,
            to,
            value,
            privateKey: 'f'.repeat(64),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.startWith(
              'VM Exception while processing transaction: revert'
            )

            done()
          })
        }) // transfer returns error because privateKey is invalid (nonexistent privateKey)

      }) // transfer returns error because privateKey

    }) // transfer returns error

  })

  /**
   * NOTE: transfer of tokens is not allowed until 1st Feb
   */
  describe.skip('Transfer', function() {
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
          event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

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

    describe('returns error', function() {

      describe('because options', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20.Transfer({
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
        }) // Transfer returns error because options is invalid (wrong type)

        it('is invalid (wrong key of object)', function(done) {
          erc20.Transfer({
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
        }) // Transfer returns error because options is invalid (wrong key of object)

      }) // Transfer returns error because options

      describe('because callback', function(done) {

        it('is invalid (wrong type)', function(done) {
          erc20.Transfer({
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
        }) // Transfer returns error because callback is invalid (wrong type)

      }) // Transfer returns error because callback

    }) // Transfer returns error

  })

  /**
   * NOTE: transfer of tokens is not allowed until 1st Feb
   */
  describe.skip('allEvents', function() {
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
          event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

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

  /**
   * NOTE: transfer of tokens is not allowed until 1st Feb
   */
  describe.skip('getPastEvents', function() {
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
        event.transactionHash.should.match(/^0x[a-fA-F0-9]+/)

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

    describe('returns error', function() {

      describe('because method', function(done) {

        it('is absent', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            args: [to, value],
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "method" fails because ["method" is required]'
            )

            done()
          })
        }) // estimateGas returns error because method is absent

        it('is invalid (wrong type)', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            method: 123,
            args: [to, value],
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "method" fails because ["method" must be a string]'
            )

            done()
          })
        }) // estimateGas returns error because method is invalid (wrong type)

        it('is invalid (empty)', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            method: '',
            args: [to, value],
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "method" fails because ["method" is not allowed to be empty]'
            )

            done()
          })
        }) // estimateGas returns error because method is invalid (short string)

        it('is invalid (large string)', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            method: 'a'.repeat(1000),
            args: [to, value],
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "method" fails because ["method" length must be less than or equal to 99 characters long]'
            )

            done()
          })
        }) // estimateGas returns error because method is invalid (large string)

      }) // estimateGas returns error because method

      describe('because args', function(done) {

        it('is absent', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            method: 'transfer',
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "args" fails because ["args" is required]'
            )

            done()
          })
        }) // estimateGas returns error because args is absent

        it('is invalid (wrong type)', function(done) {
          erc20.estimateGas({
            rpcaddr,
            rpcport,
            contractAddress,
            privateKey,
            method: 'transfer',
            args: 123,
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal(
              'ValidationError: child "args" fails because ["args" must be an array]'
            )

            done()
          })
        }) // estimateGas returns error because args is invalid (wrong type)

      }) // estimateGas returns error because args

    }) // estimateGas returns error

  })

})

import should from 'should'
import BigNumber from 'bignumber.js'

import jibrelContractsApi from '../index.js'

if (process.env.JSON_PATH == null) {
  throw (new Error('JSON_PATH env variable not found'))
}

const testParams = require(process.env.JSON_PATH)

const { controller, erc20 } = jibrelContractsApi.contracts

const rpcaddr = process.env.RPCADDR || '127.0.0.1'
const rpcport = process.env.RPCPORT || 8545
const contractAddress = testParams.contracts.JNTController
const contractAddressView = testParams.contracts.JNTViewERC20
const privateKey = testParams.privateKeys[4] // privateKey of managerMint
const account = testParams.accounts[7] // address of testInvestor1
const value = new BigNumber(1, 10)

describe('Controller API', function() {

  // timeout should be increased to wait while transaction was mined
  this.timeout(40000)

  describe('mint', function() {

    it('returns transaction hash', function(done) {
      controller.mint({
        rpcaddr,
        rpcport,
        contractAddress,
        privateKey,
        account,
        value,
      }).then((result) => {
        result.should.be.a.String()
        result.length.should.be.equal(66)
        result.should.match(/^0x[a-fA-F0-9]+/)

        done()
      }).catch(done)
    })

    it('wait while "mint" transaction was mined', function(done) {
      this.timeout(30000);
      setTimeout(done, 25000);
    });

    describe('returns error', function(done) {

      describe('because privateKey', function(done) {

        it('is absent', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is absent

        it('is invalid (wrong type)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is invalid (wrong type)

        it('is invalid (short string)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is invalid (short string)

        it('is invalid (large string)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is invalid (large string)

        it('is invalid (wrong format)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is invalid (wrong format)

        it('is invalid (full string of zeros)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
            value,
            privateKey: '0'.repeat(64),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal('Cannot read property \'fromRed\' of null')

            done()
          })
        }) // mint returns error because privateKey is invalid (full string of zeros)

        it('is invalid (nonexistent privateKey)', function(done) {
          controller.mint({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // mint returns error because privateKey is invalid (nonexistent privateKey)

      }) // mint returns error because privateKey

    }) // mint returns error

  })

  describe('check that balance of account was increased by "mint" call', function() {
    it('returns positive balance of account', function(done) {
      erc20.balanceOf({
        rpcaddr,
        rpcport,
        owner: account,
        contractAddress: contractAddressView,
      }).then((result) => {
        result.greaterThan(0).should.be.equal(true)
        result.toNumber().should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

  describe('burn', function() {
    it('returns transaction hash', function(done) {
      controller.burn({
        rpcaddr,
        rpcport,
        contractAddress,
        privateKey,
        account,
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
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is absent

        it('is invalid (wrong type)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is invalid (wrong type)

        it('is invalid (short string)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is invalid (short string)

        it('is invalid (large string)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is invalid (large string)

        it('is invalid (wrong format)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is invalid (wrong format)

        it('is invalid (full string of zeros)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
            value,
            privateKey: '0'.repeat(64),
          }).then(() => {
            done(new Error('Exception was not thrown'))
          }).catch((err) => {
            err.should.be.an.Object()
            err.message.should.be.equal('Cannot read property \'fromRed\' of null')

            done()
          })
        }) // burn returns error because privateKey is invalid (full string of zeros)

        it('is invalid (nonexistent privateKey)', function(done) {
          controller.burn({
            rpcaddr,
            rpcport,
            contractAddress,
            account,
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
        }) // burn returns error because privateKey is invalid (nonexistent privateKey)

      }) // burn returns error because privateKey

    }) // burn returns error

  })

})

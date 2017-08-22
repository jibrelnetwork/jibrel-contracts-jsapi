import should from 'should'

import jibrelContractsApi from '../index'

const erc20api = jibrelContractsApi.contracts.ERC20

describe('ERC20 API', function() {

  this.timeout(20000)

  describe('totalSupply', function() {
    it('returns total supply of tokens', function(done) {
      erc20api.totalSupply({
        rpcaddr: '127.0.0.1',
        rpcport: '8545',
        /**
         * Golem token address
         * NOTE: make sure that you connected to main network to pass this test
         */
        contractAddress: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
      }).then((result) => {
        const totalSupply = result.toNumber()

        totalSupply.should.be.greaterThan(0)

        done()
      }).catch(done)
    })
  })

})

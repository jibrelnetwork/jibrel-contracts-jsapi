const ETHAPI = require('./lib/ETHAPI');
const ERC20API = require('./lib/ERC20API');
const ERC20ValidatableAPI = require('./lib/ERC20ValidatableAPI');

module.exports = {
  eth: ETHAPI,
  contracts: {
    ERC20: ERC20API,
    ERC20Validatable: ERC20ValidatableAPI
  }
};

const ETHAPI = require('./lib/ETHAPI');
const ERC20API = require('./lib/ERC20API');
const ERC20NamedAPI = require('./lib/ERC20NamedAPI');
const ERC20ValidatableAPI = require('./lib/ERC20ValidatableAPI');

module.exports = {
  eth: ETHAPI,
  contracts: {
    ERC20: ERC20API,
    ERC20Named: ERC20NamedAPI,
    ERC20Validatable: ERC20ValidatableAPI
  }
};

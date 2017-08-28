'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoize = require('./memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERC20ABI = [{
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: 'remaining',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}];
var ERC20ValidatableABI = [{
  constant: true,
  inputs: [{
    name: '_account',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isReceivingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isTransferFromAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_account',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isSpendingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isApproveAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isApprovedSpendingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isTransferAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}];


function _getContract(contractInterface) {
  if (contractInterface === 'ERC20') {
    return web3.eth.contract(ERC20ABI);
  } else if (contractInterface === 'ERC20Validatable') {
    return web3.eth.contract(ERC20ValidatableABI);
  }

  throw new Error('ABI for the contractInterface ' + contractInterface + ' not found');
}

var getContract = (0, _memoize2.default)(_getContract);

function _getContractInstance(contractAddress, contractInterface) {
  var contract = getContract(contractInterface);

  return contract.at(contractAddress);
}

var getContractInstance = (0, _memoize2.default)(_getContractInstance);

exports.default = getContractInstance;
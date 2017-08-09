
// https://github.com/ethereum/wiki/wiki/JavaScript-API
// http://web3js.readthedocs.io/en/1.0/index.html
​
​
const erc20abi = require('./erc20abi.json');
​
​
class ERC20Api { // eslint-disable-line react/prefer-stateless-function
​
  constructor (web3Obj, contractAddress, privateKey = null) {
    this.web3Obj        = web3Obj;
    this.privateKey     = privateKey;
    const contractClass = web3Obj.eth.contract(erc20abi);
    this.contractObj    = contractClass.at(contractAddress);
  }
​
  async balanceOf(account) {
    return await contractObj.balanceOf.call(account);
  }
​
  async transfer(to, value) {
    return await submitTx(contractObj.transfer, [to, value]);
  }
​
  async submitTx(method, args) {
    if (this.privateKey === null) {
      // use MetaMask
      return await method.sendTransaction(...args);
    }
    else {
      // manually assemble and sign tx
      // have to check sources
      // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendtransaction
      // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendrawtransaction
      // https://etherdelta.github.io
      // https://github.com/etherdelta/etherdelta.github.io
      // todo
    }
  }
}

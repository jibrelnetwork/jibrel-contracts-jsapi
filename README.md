# jibrel-contracts-jsapi

web3 wrapper for jibrel-contracts

[Exhaustive API description](https://jibrelnetwork.github.io/jibrel-contracts-jsapi/)

  * [jibrel-contracts-jsapi](#jibrel-contracts-jsapi)
    * [About](#about)
    * [Get Started](#get-started)
      * [Available npm scripts](#available-npm-scripts)
    * [Public API definitions](#public-api-definitions)
      * [ETH](#eth-api)
      * [ERC20](#erc20-api)
      * [ERC20Named](#erc20named-api)
      * [getAddressFromPrivateKey](#getaddressfromprivatekeyprivatekey)
    * [Testing](#testing)

## About

jibrel-contracts-jsapi is a set of stateless methods that make easier work with Ethereum blockchain, ERC20 Tokens and Jibrel Network contracts.

## Get Started

```
npm install jibrel-contracts-jsapi
```

```javascript
const jibrelContractsJsapi = require('jibrel-contracts-jsapi')
```

### Available npm scripts:

  * `compile:standalone`: build:standalone & minify
  * `compile`: lint & build
  * `clean`: cleans `./lib` dir
  * `build`: cleans & compiles library
  * `build:standalone`: builds standalone webpack bundle to test library in browser without including it somewhere
  * `lint`: check code-style errors
  * `minify`: minifies webpack standalone bundle
  * `test`: runs mocha tests
  * `docs`: compile jsdocs
  * `docs:open`: open docs index.html

## Public API definitions

See [mocha tests](https://github.com/jibrelnetwork/jibrel-contracts-jsapi/tree/master/test) for examples of usage

### `ETH` API

web3.eth functions wrapper

#### eth.sendTransaction(props)

Sends transaction. Returns Promise that will be resolved with the hash of created transaction.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * privateKey: Private key (64 hex symbols, without '0x' prefix)
  * to: Address of the transaction receiver
  * value: Transaction value
  * gasLimit: (optional) Gas limit for the transaction
  * gasPrice: (optional) Gas price for the transaction
  * nonce: (optional) Nonce for the transaction
  * data: (optional) Transaction data
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getBalance(props)

Returns Promise that will be resolved with balance of the provided address.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * address: Address to check balance
  * defaultBlock: (optional) Redefines of web3.eth.defaultBlock
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getBlockNumber(props)

Returns Promise that will be resolved with current block number.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getBlock(props)

Returns Promise that will be resolved with block data.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * blockId: (optional) Block number or hash. Or the string "earliest"/"latest"/"pending"
  * returnTransactionObjects: (optional) Return all transactions as objects if true
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getTransaction(props)

Returns Promise that will be resolved with transaction data.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * transactionHash: Transaction hash
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getTransactionReceipt(props)

Returns Promise that will be resolved with transaction receipt.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * transactionHash: Transaction hash
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getLogsFilter(props)

Returns Promise that will be resolved with filter object, that can be used for getting of past logs or watching of new.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * options: (optional) Event options
    * fromBlock: (optional) The number of the earliest block
    * toBlock: (optional) The number of the latest block
    * address: (optional) An address(es) to get logs from
    * topics: (optional) Allows to manually set the topics for the event filter
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.getPastLogs(props)

Returns Promise that will be resolved with past logs.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * options: (optional) Event options
    * fromBlock: (optional) The number of the earliest block
    * toBlock: (optional) The number of the latest block
    * address: (optional) An address(es) to get logs from
    * topics: (optional) Allows to manually set the topics for the event filter
  * ssl: (optional) Defines using of ssl for connection or not

#### eth.estimateGas(props)

Returns Promise that will be resolved with estimate gas value.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * to: Address of the transaction receiver
  * value: Transaction value
  * data: (optional) Transaction data
  * ssl: (optional) Defines using of ssl for connection or not

### `ERC20` API

#### contracts.erc20.totalSupply(props)

Returns Promise that will be resolved with the total supply of tokens.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20.balanceOf(props)

Returns Promise that will be resolved with the balance of owner address

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * owner: Address to check balance
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20.transfer(props)

Transfers tokens. Returns Promise that will be resolved with the hash of created contract transaction

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * privateKey: Private key (64 hex symbols, without '0x' prefix)
  * to: Address of the transaction receiver
  * value: Transaction value
  * gasLimit: (optional) Gas limit for the transaction
  * gasPrice: (optional) Gas price for the transaction
  * nonce: (optional) Nonce for the transaction
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20.allEvents(props)

Subscribes to all contract events. Returns Promise that will be resolved with the event emitter.

The event emitter has the following events:
  * `data`: Fires on each incoming event with the event object as argument
  * `error`: Fires when an error in the subscription occours

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * options: (optional) Event options
    * filter: (optional) Filter options by indexed event parameters
    * fromBlock: (optional) The number of the earliest block
    * toBlock: (optional) The number of the latest block
    * address: (optional) An address(es) to get logs from
    * topics: (optional) Allows to manually set the topics for the event filter
  * callback: (optional) Callback which fired for each event or error
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20.Transfer(props)

Subscribes to Transfer event. Returns Promise that will be resolved with the event emitter (the same as for [allEvents](#contractserc20alleventsprops)).

##### props

The same as for [allEvents](#props-6)

#### contracts.erc20.getPastEvents(props)

Returns Promise that will be resolved with the past event logs.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * event: optional Event name
  * options: (optional) The same options as for [allEvents](#props-6)
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20.estimateGas(props)

Returns Promise that will be resolved with estimate gas value.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * privateKey: Private key (64 hex symbols, without '0x' prefix)
  * method: Method name
  * args: Method arguments
  * ssl: (optional) Defines using of ssl for connection or not

### `ERC20Named` API

#### contracts.erc20Named.name(props)

Returns Promise that will be resolved with the token name.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20Named.symbol(props)

Returns Promise that will be resolved with the token symbol.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * ssl: (optional) Defines using of ssl for connection or not

#### contracts.erc20Named.decimals(props)

Returns Promise that will be resolved with token decimals.

##### props

  * rpcaddr: RPC address of Ethereum node to connect on
  * rpcport: RPC port of Ethereum node to connect on
  * contractAddress: Contract address
  * ssl: (optional) Defines using of ssl for connection or not

### getAddressFromPrivateKey(privateKey)

Gets account's address from its private key.

  * privateKey: Private key (64 hex symbols, without '0x' prefix)

## Testing

Testrpc should be launched before tests.
Also `JSON_PATH` env variable should exists. `JSON_PATH` stores path to .json file, that contains:

  * account addresses
  * private keys
  * contract addresses

The simplest way to `test` - is launch jibrel-contracts tests. During tests execution it will check that jibrel-contracts-jsapi project is in the same dir, and will agregate all need information and write it to .json file.

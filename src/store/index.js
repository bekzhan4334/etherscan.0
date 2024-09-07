import { createStore } from 'vuex'
const Web3 = require('web3')
const web3 = new Web3('wss://eth-mainnet.g.alchemy.com/v2/8wkuCcN0vz65NZdQbkyg6I82bk6x7UCX')
import {ABI} from '@/contracts/Example.abi.js'
import {bytecode} from '@/contracts/Example.bin.js'

export default createStore({
  state: {
    blocks: [],
    transactions:[],
    web3Wallet: {},
    wallet: {
      address: "",
      chainId: "",
      chain: ""
    },
    contractAddress: ""
  },
  getters: {
  },
  mutations: {
    addBlock(state, newBlock){
      state.blocks.unshift(newBlock)
    }
  },
  actions: {
    async newBlockHeaders({commit}){
      let subscribe = web3.eth.subscribe("newBlockHeaders")
      .on('data', block => {
        let newBlock = {
          number: block.number,
          hash: block.hash
        }
        commit("addBlock", newBlock)
      })
    },
    async getBlock({commit}, blockNumberOrHash){
      let tempBlock =  await web3.eth.getBlock(blockNumberOrHash, true)
      this.state.transactions = tempBlock.transactions
      return tempBlock
    },
    async getTransaction({commit}, transactionHash){
      return await web3.eth.getTransaction(transactionHash)
    },
    async connectionWallet({state}){
      if(typeof window.ethereum !== 'undefined'){
        console.log("Ethereum client installed")
        if(ethereum.isMetaMask === true){
          console.log("Metemask installed")
          if(ethereum.isConnected() !== true){
            console.log("Metamask is not connected")
            await ethereum.enable()
          }
          else{
            console.log("Metamask connected")
          }
        }
        else{
          alert("Metamask is not installed")
        }
      }
      else{
        alert("Ethereum client not installed")
      }
      //connecting Metamask account
      ethereum.request({method: "eth_requestAccounts"})
      .then(accounts => {
        state.wallet.address = accounts[0]
        console.log(`Account ${state.wallet.address} connected`)
      })
      //creating provider
      state.web3Wallet = new Web3(ethereum)
      //saving the info in wallet
      state.wallet.chainId = await state.web3Wallet.eth.net.getId()
      state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()

      ethereum.on('accountsChanged', (accounts) => {
        state.wallet.address = accounts[0]
        console.log(`Account changed to ${state.wallet.address}`)
      })

      ethereum.on('chainChanged', async (chainId) => {
        state.web3Wallet = new Web3(ethereum)
        state.wallet.chainId = await state.web3Wallet.eth.net.getId()
        state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()
        console.log(`chainId changed to: ${state.wallet.chainId}`)

      })

      
    },
    async sendTransaction({state}, {to, value}){
      let tempValue = state.web3Wallet.utils.numberToHex(value)
      let tempHash = ""
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          to: to,
          value: tempValue
        }]
      })
      .then(hash => {
        tempHash = hash
      })
      return tempHash
    },
    async deployContract({state}){
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          data: bytecode
        }]
      })
      .then(hash => {
        console.log(hash)
      })
    },
    async setNumber({state}, args ){
      const [contractAddress, number] = args

      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)

      let txData = myContract.methods.setNumber(number).encodeABI()
  
      ethereum.request({
          method: "eth_sendTransaction",
          params: [{
              from: state.wallet.address,
              to: contractAddress,
              data: txData
          }]
      })
      .then(hash => {
          console.log(`Tx hash ${hash}`)
      })
  },
    async getNumber({state}, contractAddress){
      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)
      return await myContract.methods.getNumber().call({from: state.wallet.address})
    }

  },
  modules: {
  }
})

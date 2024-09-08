import { createStore } from 'vuex'
const Web3 = require('web3')
const web3 = new Web3('wss://eth-sepolia.g.alchemy.com/v2/dDYT6WucN8-Yl9X_i1dgbtTQEgq5ikHN')
import {ABI} from '@/contracts/Example.abi.js'
import {bytecode} from '@/contracts/Example.bin.js'

export default createStore({
  state: {
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
    // addBlock(state, newBlock){
    //   state.blocks.unshift(newBlock)
    // }
  },
  actions: {
    // async newBlockHeaders({commit}){
    //   let subscribe = web3.eth.subscribe("newBlockHeaders")
    //   .on('data', block => {
    //     let newBlock = {
    //       number: block.number,
    //       hash: block.hash
    //     }
    //     commit("addBlock", newBlock)
    //   })
    // },
    // async getBlock({commit}, blockNumberOrHash){
    //   let tempBlock =  await web3.eth.getBlock(blockNumberOrHash, true)
    //   this.state.transactions = tempBlock.transactions
    //   return tempBlock
    // },
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
    async deployContract({ state }) {
      try {
        const hash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: state.wallet.address,
            data: bytecode
          }]
        });
        console.log(`Deployment transaction hash: ${hash}`);
        return hash;
      } catch (error) {
        console.error(`Error deploying contract: ${error.message}`);
        throw error; // Re-throw the error for handling in the component
      }
    },
    async getContractAddress({ state }, hash) {
      try {
        let receipt = null;
        while (receipt === null) {
          // Wait for a short period before polling again
          await new Promise(resolve => setTimeout(resolve, 1000));
    
          receipt = await web3.eth.getTransactionReceipt(hash);
    
          if (receipt) {
            if (receipt.contractAddress) {
              state.contractAddress = receipt.contractAddress;
              console.log(`Contract address: ${receipt.contractAddress}`);
              return receipt.contractAddress;
            } else if (receipt.status === '0x0') {
              console.error('Transaction failed.');
              return null; // Indicate failure
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching contract address: ${error.message}`);
        throw error;
      }
    },
    async setNumber({state}, args ){
      const [contractAddress, number] = args

      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)

      let txData = myContract.methods.setNumber(number).encodeABI()
  
      const hash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
              from: state.wallet.address,
              to: contractAddress,
              data: txData
          }]
      })
      console.log(hash)
      return hash
    },
    async setString({state}, args ){
      const [contractAddress, string] = args

      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)

      let txData = myContract.methods.setString(string).encodeABI()
  
      const hash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
              from: state.wallet.address,
              to: contractAddress,
              data: txData
          }]
      })
      return hash
    },
    async setArray({state}, args ){
      const [contractAddress, number] = args

      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)

      let txData = myContract.methods.setArray(number).encodeABI()
  
      const hash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
              from: state.wallet.address,
              to: contractAddress,
              data: txData
          }]
      })
      
      return hash
    },
    async getNumber({state}, contractAddress){
      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)
      return await myContract.methods.getNumber().call({from: state.wallet.address})
    },
    async getString({state}, contractAddress){
      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)
      return await myContract.methods.getString().call({from: state.wallet.address})
    },
    async getArray({state}, contractAddress){
      let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)
      return await myContract.methods.getArray().call({from: state.wallet.address})
    }

  },
  modules: {
  }
})

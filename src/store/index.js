import { createStore } from 'vuex'
const Web3 = require('web3')
const web3 = new Web3('wss://eth-mainnet.g.alchemy.com/v2/8wkuCcN0vz65NZdQbkyg6I82bk6x7UCX')

export default createStore({
  state: {
    blocks: [],
    transactions:[]
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
    }
  },
  modules: {
  }
})

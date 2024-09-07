<template>
     <div>
        <button @click="connectionWallet">Connect wallet</button>
        <div>User address: {{ $store.state.wallet.address }}</div>
        <div>Chain ID: {{ $store.state.wallet.chainId }}</div>
        <div>Chain: {{ $store.state.wallet.chain }}</div>
    </div>
    <div>
        <input v-model="to" placeholder="Enter recipient address"/>
        <input v-model="txValue" placeholder="Enter sum that you want to send">
        <button @click="sendTx">Send</button>
        <div v-if="hash">
            <a :href="`https://sepolia.etherscan.io/tx/${hash}`" target="_blank">
                View Transaction on Etherscan
            </a>
        </div>
    </div>
    <div>
        <button @click="deployContract">Deploy contract</button>
    </div>
    <div>
        <input v-model="cAddress" placeholder="Enter contract address"/>
        <input v-model="number" placeholder="Enter number">
        <button @click="sNumber" type="number">Send</button>
    </div>
    <div>
        Number: {{ ans }}
        <button @click="gNumber">Get number</button>
    </div>
    <block
        v-for="block in $store.state.blocks"
        :block = "block"
    />
   
</template>

<script>
import { mapActions } from 'vuex'
export default{
    data(){
        return{
            to: "",
            txValue: "",
            hash: "",
            number: "",
            cAddress: "",
            ans: ""
        }
    },
    methods:{
        ...mapActions({
            newBlockHeaders: "newBlockHeaders",
            connectionWallet: "connectionWallet",
            sendTransaction: "sendTransaction",
            deployContract: "deployContract",
            setNumber: "setNumber",
            getNumber: "getNumber"
        }),
        async sendTx(){
            this.hash = await this.$store.dispatch('sendTransaction', {to: this.to, value: this.txValue})
            this.to = ""
            this.txValue = ""
        },
        async sNumber(){
            await this.setNumber([this.cAddress, this.number])
        },
        async gNumber(){
            this.ans = await this.getNumber(this.cAddress)
        }
    },
    mounted(){
        this.newBlockHeaders()
    }
}
</script>

<style>
/* Основные стили для контейнера компонента */
template {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    padding: 16px;
}

/* Стили для элементов блока */
block {
    width: 100%;
    max-width: 800px;
    margin-bottom: 16px;
}

/* Отделение элементов друг от друга */
block + block {
    margin-top: 16px;
}

/* Прокрутка, если содержимое превышает высоту контейнера */
template {
    overflow-y: auto;
}
</style>

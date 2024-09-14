<template>
    <!-- Connect wallet container -->
    <div class="container"> 
        <button @click="connectionWallet" class="btn">Connect wallet</button>
        <p>User address: {{ $store.state.wallet.address }}</p>
        <p> Chain ID: {{ $store.state.wallet.chainId }}</p>
        <p>Chain: {{ $store.state.wallet.chain }}</p>
    </div>
    <!-- Send eth to another account -->
    <div class="container">
        <h1 class="header1">Send eth to account</h1>
        <input v-model="to" class="input" placeholder="Enter recipient address"/>
        <input v-model="txValue" class="input" placeholder="Enter sum that you want to send">
        <button @click="sendTx" class="btn">Send</button>
        <div v-if="tHash" class="link-container">
            <a :href="`https://sepolia.etherscan.io/tx/${tHash}`" target="_blank" class="link">
                View Transaction on Etherscan
            </a>
        </div>
    </div>
    <!-- Deploying the contract --> 
    <div class="container">
        <h1 class="header1">Deploying the contract</h1>
        <button @click="deployCont" class="btn">Deploy contract</button>
        <p>Contract address: {{ contractAddress }}</p>
        <button v-if="cHash" @click="$router.push(`/transaction/${cHash}`)">{{ cHash }}</button>
    </div>
    <!-- Interaction with contract --> 
    <div class="container">
        <h1>Contract interaction</h1>
        <h2>Setting the number</h2>
        <input v-model="contractAddress" class="input" placeholder="Enter contract address"/>
        <input v-model="number" class="input" placeholder="Enter number" type="number">
        <button @click="sNumber" class="btn">Send</button>
        <button v-if="numberHash" @click="$router.push(`/transaction/${numberHash}`)">{{ numberHash }}</button>

        <h2>Setting the string</h2>
        <input v-model="contractAddress" class="input" placeholder="Enter contract address"/>
        <input v-model="string" class="input" placeholder="Enter string">
        <button @click="sString" class="btn">Send</button>
        <button v-if="stringHash" @click="$router.push(`/transaction/${stringHash}`)">{{ stringHash }}</button>

        <h2>Setting the number for array</h2>
        <input v-model="contractAddress" class="input" placeholder="Enter contract address"/>
        <input v-model="arrayNumber" class="input" placeholder="Enter number" type="number">
        <button @click="sArray" class="btn">Send</button>
        <button v-if="arrayHash" @click="$router.push(`/transaction/${arrayHash}`)"> {{ arrayHash }}</button>
    </div>
    <div class="container">
        <h1>Get the information</h1>
        <h2>Number: {{ answer1 }}</h2>
        <button @click="gNumber" class="btn">Get number</button>

        <h2>String: {{ answer2 }}</h2>
        <button @click="gString" class="btn">Get string</button>

        <h2>Array: {{ answer3 }}</h2>
        <button @click="gArray" class="btn">Get array</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default{
    data(){
        return{
            to: "",
            txValue: "",
            tHash: "",
            number: "",
            answer1: "",
            answer2: "",
            answer3: "",
            string: "",
            arrayNumber: "",
            numberHash: "",
            stringHash: "",
            arrayHash: "",
            cHash: ""
        }
    },
    computed: {
        ...mapState({
        contractAddress: state => state.contractAddress
        })
    },
    methods:{
        ...mapActions({
            connectionWallet: "connectionWallet",
            sendTransaction: "sendTransaction",
            deployContract: "deployContract",
            getContractAddress: "getContractAddress",
            setNumber: "setNumber",
            setString: "setString",
            setArray: "setArray",
            getNumber: "getNumber",
            getString: "getString",
            getArray: "getArray"
        }),
        async sendTx(){
            this.tHash = await this.$store.dispatch('sendTransaction', {to: this.to, value: this.txValue})
            this.to = ""
            this.txValue = ""
        },
        async deployCont(){
            let hash = await this.deployContract()
            this.contractAddress = await this.getContractAddress(hash)
            this.cHash = hash
        },
        async sNumber(){
            this.numberHash = await this.setNumber([this.contractAddress, this.number])
        },
        async sString(){
            this.stringHash = await this.setString([this.contractAddress, this.string])
        },
        async sArray(){
            this.arrayHash = await this.setArray([this.contractAddress, this.arrayNumber])
        },
        async gNumber(){
            this.answer1 = await this.getNumber(this.contractAddress)
        },
        async gString(){
            this.answer2 = await this.getString(this.contractAddress)
        },
        async gArray(){
            this.answer3 = await this.getArray(this.contractAddress)
        }
    },
    mounted(){
        this.connectionWallet()
    },
}
</script>


import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main'
import BlockPage from '@/pages/BlockPage'
import TransactionPage from '@/pages/TransactionPage'
import components from '@/components'

const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/block/:blockNumberOrHash",
        component: BlockPage
    },
    {
        path: "/block/transaction/:transactionHash",
        component: TransactionPage
    },
    {
        path: "/transaction/:transactionHash",
        component: TransactionPage
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
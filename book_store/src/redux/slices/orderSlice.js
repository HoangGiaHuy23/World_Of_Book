import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
    ],
    shippingAddress: {
    },
    paymentMethod: '', itemsPrice: 0,
    shippingPrice: 0, taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: ''
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        checkOrderProduct: (state, action) => {
            const idProduct = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.check = true
        },
        uncheckOrderProduct: (state, action) => {
            const idProduct = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.check = false
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (itemOrder.amount > 1) {
                itemOrder.amount--
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct)
        },
        payOrder: (state, action) => {
            const bill = action.payload
            state.shippingPrice = bill[0]
            state.totalPrice = bill[1]
        },

    },
})

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, checkOrderProduct, uncheckOrderProduct, payOrder } = orderSlice.actions

export default orderSlice.reducer
import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Set token from localStorage
                },
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrders: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetOrdersQuery,
    useDeliverOrdersMutation,
} = ordersApiSlice;

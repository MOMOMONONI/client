import axios from 'axios'


export const payment = async (token) => 
    await axios.post('https://api-omega-seven-66.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

async function getTripHistory(customerId: string, driverId: string | null) {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/ride/'

    try {
        if (!driverId) {
            const res = await axios.get(`${API_URL}${customerId}`)
            return res.data
        } else {
            const res = await axios.get(`${API_URL}${customerId}/${driverId}`)
            return res.data
        }
    } catch (err: any) {
        toast.error(err.response.data.error_description)
        throw new Error(err.response.data)
    }
}

export default getTripHistory

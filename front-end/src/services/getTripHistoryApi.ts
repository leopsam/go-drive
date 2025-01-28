import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

async function getTripHistory(customerId: string, driverId: string | null) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const endpoint = driverId ? `${API_URL}${customerId}/${driverId}` : `${API_URL}${customerId}`
    const res = await axios.get(endpoint)
    return res.data
  } catch (err: any) {
    toast.info(err.response.data.error_description)
  }
}

export default getTripHistory

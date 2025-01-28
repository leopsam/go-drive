import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

async function postRideEstimate(customerId: string, origin: string, destination: string) {
  const body = {
    customer_id: customerId,
    origin,
    destination,
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await axios.post(`${API_URL}estimate`, body)
    return res.data
  } catch (err: any) {
    toast.error(err.response.data.error_description)
    throw new Error(err.response.data)
  }
}

export default postRideEstimate

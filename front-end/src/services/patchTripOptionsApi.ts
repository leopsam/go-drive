import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

async function patchTripOptions(body: object) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await axios.patch(`${API_URL}confirm`, body)
    return res.data
  } catch (err: any) {
    toast.error(err.response.data.error_description)
    throw new Error(err.response.data)
  }
}

export default patchTripOptions

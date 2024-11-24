import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequestTrip from './pages/RequestTrip'
import TripOptions from './pages/TripOptions'
import 'react-toastify/dist/ReactToastify.css'
import './styles/reset.css'
import './styles/global.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RequestTrip />} />
                <Route path="/confirm" element={<TripOptions />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

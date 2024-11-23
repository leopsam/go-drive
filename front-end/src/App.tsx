import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequestTrip from "./pages/RequestTrip";

function App() {
  return (   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequestTrip />} />
        </Routes>
      </BrowserRouter>
    );  
}

export default App;

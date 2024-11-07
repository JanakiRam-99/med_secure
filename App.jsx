import { BrowserRouter, Routes, Route} from "react-router-dom"
import Doctorsdashboard from "./Components/Doctorsdashboard"
import Login from "./Components/Login"
import PatientsDashboard from "./Components/PatientsDashboard"
import Register from "./Components/Register"
import Submission from "./Components/Submission"
import "./App.css"


const App = () => {  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pdashboard" element={<PatientsDashboard />} />
      <Route path="/ddashboard" element={<Doctorsdashboard />} />
      <Route path="/submission" element={<Submission />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

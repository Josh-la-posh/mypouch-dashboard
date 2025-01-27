import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RouteSystem from "./routes"
import { AuthProvider } from "./context/AuthProvider"

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<RouteSystem />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App

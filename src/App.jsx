import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RouteSystem from "./routes"
import Navigation from "./components/navigation"

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/*" element={<RouteSystem />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

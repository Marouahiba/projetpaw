import Navbar from "./components/Navbar.jsx";
import Auth from "./pages/auth.jsx";
import LandingPage from "./pages/LandingPage.jsx"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import Todos from "./pages/Todos.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  useEffect(() => {

  }, [])
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<Auth />} />
            <Route path="/signUp" element={<Auth />} />
            <Route
              path="/taches/*"
              element={<PrivateRoute element={<Todos />} />} />
            <Route path="*" element={<h1>ROUTE NOT FOUND</h1>} />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App

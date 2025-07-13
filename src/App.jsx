import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import UpdatePassword from "./pages/Auth/UpdatePassword.jsx";

import PrivateRoute from "./components/PrivateRoute";
import OpenRoute from "./components/OpenRoute.jsx";
import ProRoute from "./components/ProRoute.jsx";

import Dashboard from "./pages/Dashboard/Dashboard";
import Favorites from "./pages/Favorites";
import AddEditAccommodation from "./pages/AddEditAccommodation.jsx";
import AiSearch from "./pages/AiSearch.jsx";
import Error from "./pages/Error.jsx";

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <OpenRoute>
            <Home />
          </OpenRoute>
          } />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
          } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
          } />
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
          } />
        <Route path="/update-password/:token" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
          } />


         {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/accommodation/:id?" 
          element={
            <PrivateRoute>
              <AddEditAccommodation />
            </PrivateRoute>
          }
        />
        <Route
          path="/aisearch" 
          element={
            <ProRoute>
              <AiSearch />
            </ProRoute>
          }
        />

        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;

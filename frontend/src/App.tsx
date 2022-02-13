import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// const PrivateRoute = () => {
//   const auth = true; // determine if authorized, from context or however you're doing it

//   // If authorized, return an outlet that will render child elements
//   // If not, return element that will navigate to login page
//   return auth ? <Outlet /> : <Navigate to="/login" />;
// };

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;

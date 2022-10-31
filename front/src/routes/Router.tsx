import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home/home";
import { Login } from "../pages/Login/Login";
import { UserList } from "../pages/Users/User";
import { CategoryList } from "../pages/Categories/categories";
import { StateList } from "../pages/States/State";
import { CityList } from "../pages/Cities/City";
import { PaymentList } from "../pages/Payments/payment";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/states" element={<StateList />} />
        <Route path="/cities" element={<CityList />} />
        <Route path="/payments" element={<PaymentList />} />
      </Route>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home/home";
import { Login } from "../pages/Login/Login";
import { UserList } from "../pages/Users/User";
import { CategoryList } from "../pages/Categories/categories";
import { StateList } from "../pages/States/State";
import { CityList } from "../pages/Cities/City";
import { ProductList } from "../pages/Products/Product";
import { PaymentList } from "../pages/Payments/payment";
import { Dashboard } from "../pages/Dashboards/dashboards";
import { InitialPage } from "../pages/InitialPage/initialPage";
import { ProductUserList } from "../pages/ProductsUser/Product";
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
        <Route path="/users/pdf" element={<UserList />} />
        <Route path="/states" element={<StateList />} />
        <Route path="/cities" element={<CityList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productsUser" element={<ProductUserList />} />
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/dashboards" element={<Dashboard />} />
        <Route path="/initialPage" element={<InitialPage />} />
      </Route>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home/home";
import { Login } from "../pages/Login/Login";
import { UserList } from "../pages/Users/User";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
      </Route>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

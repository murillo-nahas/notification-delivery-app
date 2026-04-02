import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./pages/not-found";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import RootRedirect from "./components/root-redirect";
import ProtectedRoute from "./components/protected-route";
import AppLayout from "./components/app-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

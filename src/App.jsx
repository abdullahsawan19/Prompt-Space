import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicLayout from "./layouts/PublicLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FormsLayout from "./layouts/FormsLayout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          <Route element={<FormsLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route path="/admin/stats" element={<AdminDashboardLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;

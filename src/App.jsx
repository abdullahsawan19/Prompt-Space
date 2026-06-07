import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import ProtectedRoute from "./features/auth/ProtectedRoute";

const PublicLayout = lazy(() => import("./layouts/PublicLayout"));
const FormsLayout = lazy(() => import("./layouts/FormsLayout"));
const AdminDashboardLayout = lazy(
  () => import("./layouts/AdminDashboardLayout"),
);
const UserDashboardLayout = lazy(() => import("./layouts/UserDashboardLayout"));

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Prompts = lazy(() => import("./pages/Prompts"));
const CreatePrompt = lazy(() => import("./pages/CreatePrompt"));
const Workspaces = lazy(() => import("./pages/Workspaces"));
const CreateWorkspace = lazy(
  () => import("./features/workspaces/CreateWorkspace"),
);
const WorkspaceDetails = lazy(() => import("./pages/WorkspaceDetails"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

// TODO: Admin pages to be implemented in the future

const AdminStats = () => (
  <div className="text-2xl font-bold">System Stats Content</div>
);
const AdminUsers = () => (
  <div className="text-2xl font-bold">Manage Users Content</div>
);
const AdminSettings = () => (
  <div className="text-2xl font-bold">Admin Settings Content</div>
);

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
            <Route element={<UserDashboardLayout />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/createPrompt" element={<CreatePrompt />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/workspaces/new" element={<CreateWorkspace />} />
              <Route path="/workspaces/:id" element={<WorkspaceDetails />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route element={<AdminDashboardLayout />}>
              <Route path="/admin/stats" element={<AdminStats />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 4000 },
          error: { duration: 5000 },
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

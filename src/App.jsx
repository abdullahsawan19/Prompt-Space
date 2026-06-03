import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicLayout from "./layouts/PublicLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FormsLayout from "./layouts/FormsLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import Prompts from "./pages/Prompts";
import CreatePrompt from "./pages/CreatePrompt";
import Workspaces from "./pages/Workspaces";
import CreateWorkspace from "./features/workspaces/CreateWorkspace";
import WorkspaceDetails from "./pages/WorkspaceDetails";

const UserHome = () => (
  <div className="text-2xl font-bold">User Dashboard Content</div>
);

const Settings = () => (
  <div className="text-2xl font-bold">Settings Content</div>
);

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
              <Route path="/user-dashboard" element={<UserHome />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/createPrompt" element={<CreatePrompt />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/workspaces/new" element={<CreateWorkspace />} />
              <Route path="/workspaces/:id" element={<WorkspaceDetails />} />
              <Route path="/settings" element={<Settings />} />
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

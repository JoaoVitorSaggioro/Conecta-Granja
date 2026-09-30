import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CrudPage from "./pages/CrudPage";
import LoteDetalhe from "./pages/LoteDetalhe";
import { crudModules } from "./config/modules";

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/lotes/:id"
        element={
          <PrivateRoute>
            <LoteDetalhe />
          </PrivateRoute>
        }
      />
      {crudModules.map((item) => (
        <Route
          key={item.key}
          path={item.path}
          element={
            <PrivateRoute adminOnly={item.adminOnly}>
              <CrudPage moduleKey={item.key} />
            </PrivateRoute>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// App.jsx
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ManageAccountPage from './pages/ManageAccountPage';
import NewInvoicePage from './pages/NewInvoicePage';
import ViewInvoicePage from './pages/ViewInvoicePage'; 

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-account"
                    element={
                        <ProtectedRoute>
                            <ManageAccountPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invoices/new"
                    element={
                        <ProtectedRoute>
                            <NewInvoicePage />
                        </ProtectedRoute>
                    }
                />

           
                <Route
                    path="/invoices/:invoiceId"
                    element={
                        <ProtectedRoute>
                            <ViewInvoicePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/auth" replace />} />
            </Routes>
        </AuthProvider>
    )
}

export default App

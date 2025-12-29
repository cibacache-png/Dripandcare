import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import { SimpleAuthProvider, useSimpleAuth } from './components/SimpleAuthContext.tsx';
import { NewAdminPanel } from './components/NewAdminPanel.tsx';
import { SimpleLoginForm } from './components/SimpleLoginForm.tsx';

function AdminRoute() {
  const { isAuthenticated, loading } = useSimpleAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-slate-600">Cargando...</p>
      </div>
    );
  }

  return isAuthenticated ? <NewAdminPanel /> : <SimpleLoginForm />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SimpleAuthProvider>
        <AppRoutes />
      </SimpleAuthProvider>
    </AuthProvider>
  </StrictMode>,
);

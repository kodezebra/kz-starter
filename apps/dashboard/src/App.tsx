import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useSession } from '@/lib/auth';

import HomePage from './pages/index';
import PagesList from './pages/pages/index';
import PageEditor from './pages/pages/editor';
import SettingsPage from './pages/settings/index';

import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <div className="min-h-screen flex items-center justify-center bg-zinc-50">Loading...</div>;
  if (!session) return <Navigate to="/auth/signin" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<HomePage />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/:id" element={<PageEditor />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
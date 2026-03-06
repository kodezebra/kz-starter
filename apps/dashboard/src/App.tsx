import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';

import HomePage from './pages/index';
import PagesList from './pages/pages/index';
import PageEditor from './pages/pages/editor';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/:id" element={<PageEditor />} />
      </Route>
    </Routes>
  );
}

import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import Loading from '../pages/LoadingPage'

const LoginPage = lazy(() => import('../pages/LoginPage'));
const MapPage = lazy(() => import('../pages/MapPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));


const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
         <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
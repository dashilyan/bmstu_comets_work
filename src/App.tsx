import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import { FaqPage } from "./pages/FaqPage";
import { NotFoundPage } from "./pages/404Page";
import { ForbiddenPage } from "./pages/403Page";
import { NewObservationPage } from "./pages/NewObservationPage";
import { ObservationDetailsPage } from "./pages/ObservationDetailsPage";
import { UserProfile } from "./pages/UserProfilePage";
import { Base } from "./pages/BasePage";
import { Main } from "./pages/MainPage";
import { Auth } from "./pages/AuthPage";
import { Register } from "./pages/RegisterPage";
import { ModeratorProfile } from "./pages/ModeratorProfilePage";
import { EditProfile } from "./pages/EditProfile";
import { UserObservations } from "./pages/ObservationTable";
import { ModeratorQueue } from "./pages/ModeratorTable";
import { CometsPage } from "./pages/CometsPage";
import { AllObservationsPage } from "./pages/ObservationsListPage";
import { CometPage } from "./pages/CometDetails";

function ProtectedRoute({ children, requireMod = false }: { children: ReactNode; requireMod?: boolean }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (requireMod && !user?.is_staff) return <Navigate to="/403" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/reg" element={<Register />} />
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/base" element={<Base />} />
      <Route path="/comets" element={<CometsPage />} />
      <Route path="/comet-details/:id" element={<CometPage />} />
      <Route path="/comet-details" element={<CometPage />} />
      <Route path="/obs-list" element={<AllObservationsPage />} />
      <Route path="/obs-details/:id" element={<ObservationDetailsPage />} />
      <Route path="/obs-details" element={<ObservationDetailsPage />} />

      <Route path="/new-observation" element={
        <ProtectedRoute><NewObservationPage /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><UserProfile /></ProtectedRoute>
      } />
      <Route path="/profile-edit" element={
        <ProtectedRoute><EditProfile /></ProtectedRoute>
      } />
      <Route path="/obs-table" element={
        <ProtectedRoute><UserObservations /></ProtectedRoute>
      } />

      <Route path="/profile-mod" element={
        <ProtectedRoute requireMod><ModeratorProfile /></ProtectedRoute>
      } />
      <Route path="/mod-table" element={
        <ProtectedRoute requireMod><ModeratorQueue /></ProtectedRoute>
      } />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

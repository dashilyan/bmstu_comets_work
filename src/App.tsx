import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/new-observation" element={<NewObservationPage />} />
        <Route path="/obs-details" element={<ObservationDetailsPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/base" element={<Base />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/profile-mod" element={<ModeratorProfile />} />
        <Route path="/profile-edit" element={<EditProfile />} />
        <Route path="/obs-table" element={<UserObservations />} />
        <Route path="/mod-table" element={<ModeratorQueue />} />
        <Route path="/comets" element={<CometsPage />} />
        <Route path="/obs-list" element={<AllObservationsPage />} />
        <Route path="/comet-details" element={<CometPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
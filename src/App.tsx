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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/new-observation" element={<NewObservationPage />} />
        <Route path="/observation" element={<ObservationDetailsPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/base" element={<Base />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/profile-mod" element={<ModeratorProfile />} />
        <Route path="/profile-edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
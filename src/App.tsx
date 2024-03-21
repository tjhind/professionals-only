import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";

export default function App() {
  return (
    <div className="mx-2 md:mx-10">
      <Routes>
        <Route path="ProfileForm" element={<ProfileForm />} />
      </Routes>
      <Header />
      <ProfileForm />
    </div>
  );
}

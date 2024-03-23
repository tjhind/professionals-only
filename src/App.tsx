import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";

export default function App() {
  return (
    <div className="mx-2 md:mx-10">
      <Header />
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/profile-card" element={<ProfileCard />} />
      </Routes>
    </div>
  );
}

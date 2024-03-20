import Header from "./components/Header";
import UserForm from "./components/ProfileForm";

export default function App() {
  return (
    <div className="mx-2 md:mx-10 bg-slate-50">
      <Header />
      <UserForm />
    </div>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./components/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import ManageRestaurant from "./components/ManageRestaurant";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/search/:city" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/manage-restaurant" element={<ManageRestaurant />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

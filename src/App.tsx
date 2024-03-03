import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App () {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/sign-in" element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignupPage/>}/>
      </Routes>
    <Footer/>  
    </BrowserRouter>
  )
}

import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Main></Main>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}

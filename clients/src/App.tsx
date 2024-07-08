import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SettingAccount from "./Layout/SettingAccount";
import SettingYourAccount from "./Layout/SettingYourAccount";
import ManagerPost from "./Layout/ManagerPost";
import SuggestFriends from "./Layout/SuggestFriends";

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settingAccount" element={<SettingYourAccount />}></Route>
      <Route path="/myFriend" element={<SettingAccount></SettingAccount>} />
      <Route path="/managePost" element={<ManagerPost></ManagerPost>}></Route>
      <Route
        path="/friends"
        element={<SuggestFriends></SuggestFriends>}
      ></Route>
    </Routes>
  );
}

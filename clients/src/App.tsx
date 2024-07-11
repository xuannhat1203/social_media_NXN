import { Route, Routes } from "react-router-dom";
import Main from "./Layout/Main";
import Register from "./Layout/Register";
import Login from "./Layout/Login";
import SettingAccount from "./Page/SettingAccount";
import SettingYourAccount from "./Page/SettingYourAccount";
import ManagerPost from "./Page/ManagerPost";
import SuggestFriends from "./Page/SuggestFriends";
import CreateGroups from "./Page/CreateGroups";
import Search from "./Page/Search";
import Admin from "./Layout/Admin";
import AdminAccount from "./Components/AdminAccount";
import DetailAcc from "./Components/DetailAcc";
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
      <Route path="/group" element={<CreateGroups></CreateGroups>}></Route>
      <Route path="/search" element={<Search></Search>}></Route>
      <Route path="/admin" element={<Admin></Admin>}></Route>
      <Route
        path="/adminAccount"
        element={<AdminAccount></AdminAccount>}
      ></Route>
      <Route path="/detail" element={<DetailAcc></DetailAcc>}></Route>
    </Routes>
  );
}

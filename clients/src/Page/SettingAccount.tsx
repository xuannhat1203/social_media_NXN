import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/reducers/getUser";
import { useNavigate } from "react-router-dom";
import { deleteUsers } from "../store/reducers/deleteFriends";

const SettingAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setEmail(JSON.parse(list));
    }
  }, []);

  const getUser = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (getUser.length) {
      const find = getUser.find((user: any) => user.email === email);
      if (find) {
        const friendDetails = find.friends
          .map((friend: any) => {
            return getUser.find(
              (user: any) => user.userName === friend.userName
            );
          })
          .filter((friend: any) => friend !== undefined);
        setFriends(friendDetails);
      }
    }
  }, [getUser, email]);

  if (!getUser) {
    return <div>Loading...</div>;
  }

  const goToMyAccount = () => {
    navigate("/settingAccount");
  };
  const goToManagerFriends = () => {
    navigate("/myFriend");
  };
  const deleteUser = (friendId: number) => {
    const user = getUser.find((user: any) => user.email === email);
    if (user) {
      dispatch(deleteUsers({ userId: user.id, friendId })).then(
        (result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            setFriends((prevFriends) =>
              prevFriends.filter((friend) => friend.id !== friendId)
            );
          }
        }
      );
    }
  };
  const goToHome = () => {
    navigate("/home");
  };
  const goToManagerPost = () => {
    navigate("/managePost");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Rikkei Academy</div>
        <nav>
          <ul>
            <li
              onClick={goToHome}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Home
            </li>
            <li
              onClick={goToMyAccount}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí tài khoản
            </li>
            <li
              onClick={goToManagerFriends}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí bạn bè
            </li>
            <li
              onClick={goToManagerPost}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí bài viết
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer">
              <span className="mr-2">◻️</span>Quản lí ảnh và video
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <div className="text-sm">Help</div>
          <div className="text-sm">Contact us</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lí danh sách bạn bè</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-2 py-1 mr-2"
            />
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              RA
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((user: any, index: number) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                      Bạn bè
                    </span>
                  </td>
                  <td className="p-3">{user.create_at}</td>
                  <td className="p-3">
                    <button className="text-blue-500 mr-2">View</button>
                    <button className="text-yellow-500 mr-2">Edit</button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center p-4">
            <button className="px-3 py-1 rounded bg-gray-200 mr-1">1</button>
            <button className="px-3 py-1 rounded bg-black text-white mr-1">
              2
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 mr-1">3</button>
            <button className="px-3 py-1 rounded bg-gray-200 mr-1">4</button>
            <button className="px-3 py-1 rounded bg-gray-200 mr-1">5</button>
            <button className="px-3 py-1 rounded bg-gray-200">...</button>
            <button className="px-3 py-1 rounded bg-gray-200">20</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingAccount;

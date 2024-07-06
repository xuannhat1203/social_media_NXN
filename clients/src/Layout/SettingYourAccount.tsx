import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/reducers/getUser";
import { useNavigate } from "react-router-dom";
import "../SCSS/admin.scss";

const SettingYourAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({
    userName: "",
    email: "",
    password: "",
    avata: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setEmail(JSON.parse(list));
    }
  }, []);

  const getUser = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!getUser) {
    return <div>Loading...</div>;
  }

  const find = getUser.filter((user: any) => user.email === email);
  console.log(find);

  if (!find.length) {
    return <div>No user found with email: {email}</div>;
  }

  const findFriends: any = [];
  for (let i = 0; i < find[0]?.friends.length; i++) {
    const findFriend = getUser.filter(
      (user: any) => user.userName === find[0].friends[i].userName
    );
    if (findFriend.length > 0) {
      findFriends.push(findFriend[0]);
    }
  }

  const goToMyAccount = () => {
    navigate("/settingAccount");
  };

  const goToManagerFriends = () => {
    navigate("/myFriend");
  };

  const openModal = () => {
    setUserInfo({
      userName: find[0].userName,
      email: find[0].email,
      password: "",
      avata: find[0].avata,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log(userInfo);
    closeModal();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Rikkei Academy</div>
        <nav>
          <ul>
            <li
              onClick={goToMyAccount}
              className="px-4 py-2 hover:bg-gray-700 flex items-center"
            >
              <span className="mr-2">◻️</span>Quản lí tài khoản
            </li>
            <li
              onClick={goToManagerFriends}
              className="px-4 py-2 hover:bg-gray-700 flex items-center"
            >
              <span className="mr-2">◻️</span>Quản lí bạn bè
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <span className="mr-2">◻️</span>Quản lí bài viết
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <span className="mr-2">◻️</span>Quản lí ảnh và video
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <span className="mr-2">◻️</span>Settings
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
          <h1 className="text-2xl font-bold">Quản lí tài khoản</h1>
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
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="left">
              <div
                className="avata"
                style={{ backgroundImage: `url(${find[0]?.avata})` }}
              ></div>
              <div>
                <h2 style={{ fontSize: "30px" }}>{find[0]?.userName}</h2>
              </div>
            </div>
            <div className="right">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Tên đăng nhập: </label>
                <br />
                <input
                  className="input"
                  type="text"
                  value={find[0]?.userName}
                  readOnly
                />
                <br />
                <label>Email: </label>
                <br />
                <input
                  className="input"
                  type="text"
                  value={find[0]?.email}
                  readOnly
                />
                <br />
                <label>PassWord: </label>
                <br />
                <input
                  className="input"
                  type="text"
                  value={"******"}
                  readOnly
                />
                <br />
                <label>Avata của bạn: </label>
                <br />
                <input
                  className="input"
                  type="text"
                  value={find[0]?.avatar}
                  readOnly
                />
                <br />
              </div>
              <button onClick={openModal} className="btn">
                Sửa
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            id="model"
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="modal-content">
              <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>
              <div className="mb-4">
                <label className="block mb-1">Tên đăng nhập:</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="text"
                  name="userName"
                  value={userInfo.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password:</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Avata:</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="text"
                  name="avata"
                  value={userInfo.avata}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={closeModal} className="btn-cancel">
                  Hủy
                </button>
                <button onClick={handleSave} className="btn-save">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingYourAccount;
